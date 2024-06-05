let express = require('express');
let mysql = require('mysql');
let cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors());

// Conexion a Mysql
let conexion = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'pwdata',
    port: '3306'
});

//Nos conectamos a Mysql
conexion.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log("conecto ala ase de datos");
    }
});

//Rutas De Acceso
app.get("/", function (req, res) {
    res.send("Ruta De Inicio");
});

//seleccionamos un cliente en especifico
app.get("/api/clientes/:id", (req, res) => {
    conexion.query('select * from clientes where id = ?', [req.params.id], (error, regristos) => {
        if (error) {
            throw error;
        } else {
            res.send(regristos);
        }
    });
});

//seleccionamos todo los clientes
app.get("/api/clientes", (req, res) => {
    conexion.query('select * from clientes', (error, regristos) => {
        if (error) {
            throw error;
        } else {
            res.send(regristos);
        }

    });
});

//borrar
app.delete('/api/clientes/:id', (req, res) => {
    let id = req.params.id;
    conexion.query('DELETE FROM clientes WHERE id = ?', [id], (error, regristos) => {
        if (error) {
            throw error;
        } else {
            res.send(regristos);
        }
    });
});

//insertar un nuevo cliente
app.post('/api/clientes', (req, res) => {
    let data = {
        id: req.body.id,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        rfc: req.body.rfc,
        curp: req.body.curp,
        cp: req.body.cp
    }
    let sql = "INSERT INTO clientes SET ?";
    conexion.query(sql, data, (error, regristos) => {
        if (error) {
            throw error;
        } else {
            res.send(regristos);
        }
    });
});

//Actualizar
app.put('/api/clientes/:id', (req, res) => {
    let id = req.params.id;
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let direccion = req.body.direccion;
    let telefono = req.body.telefono;
    let rfc = req.body.rfc;
    let curp = req.body.curp;
    let cp = req.body.cp;

    let sql = "UPDATE clientes set nombre = ?,apellido = ?,direccion = ?,telefono = ?,rfc = ?,curp = ?,cp = ? WHERE id = ?"

    conexion.query(sql, [nombre, apellido, direccion, telefono, rfc, curp, cp, id], (error, regristos) => {
        if (error) {
            throw error;
        } else {
            res.send(regristos);
        }
    });
});

//proyecto final
//seleccionamos todo los vendedores
app.get("/api/vendedores", (req, res) => {
    conexion.query('select * from vendedores', (error, regristos) => {
        if (error) {
            throw error;
        } else {
            res.send(regristos);
        }

    });
});
//borrar vendedores
app.delete('/api/vendedores/:id', (req, res) => {
    let id = req.params.id;
    conexion.query('DELETE FROM vendedores WHERE idvendedor = ?', [id], (error, regristos) => {
        if (error) {
            throw error;
        } else {
            res.send(regristos);
        }
    });
});

//seleccionamos un vendedores en especifico
app.get("/api/vendedores/:id", (req, res) => {
    conexion.query('select * from vendedores where idvendedor = ?', [req.params.id], (error, regristos) => {
        if (error) {
            throw error;
        } else {
            res.send(regristos);
        }
    });
});

//insertar un nuevo vendedores
app.post('/api/vendedores', (req, res) => {
    let data = {
        idvendedor: req.body.idvendedor,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        departamentotienda: req.body.departamentotienda,
    }
    let sql = "INSERT INTO vendedores SET ?";
    conexion.query(sql, data, (error, regristos) => {
        if (error) {
            throw error;
        } else {
            res.send(regristos);
        }
    });
});
//Actualizar vendedores
app.put('/api/vendedores/:id', (req, res) => {
    let idvendedor = req.params.id;
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let departamentotienda = req.body.departamentotienda;


    let sql = "UPDATE vendedores set nombre = ?,apellido = ?,departamentotienda = ? WHERE idvendedor = ?"

    conexion.query(sql, [nombre, apellido, departamentotienda, idvendedor], (error, regristos) => {
        if (error) {
            throw error;
        } else {
            res.send(regristos);
        }
    });
});

//articulos
//Seleccionar todos los Articulos:
app.get("/api/articulos", (req, res) => {
    conexion.query('select * from articulos', (error, regristos) => {
        if (error) {
            throw error;
        } else {
            res.send(regristos);
        }

    });
});

app.post('/api/ventas', (req, res) => {
    const compras = req.body;
    // Obtener el máximo iddetalleVenta antes de insertar los registros
    let maxIdSql = 'SELECT MAX(iddetalleVenta) + 1 AS maxIdDetalleVenta FROM detalleventa';
    conexion.query(maxIdSql, (maxIdError, maxIdResult) => {
        if (maxIdError) {
            return res.status(500).send(maxIdError);
        }

        let maxIdDetalleVenta = maxIdResult[0].maxIdDetalleVenta;

        // Preparar la consulta de inserción para ventas
        let ventasSql = 'INSERT INTO ventas (claveArticulo, cantidad, precio, fecha, idVendedor) VALUES ?';
        let ventasValues = compras.map(compra => [
            compra.claveArticulo,
            compra.cantidad,
            compra.precio,
            compra.fecha,
            compra.idVendedor
        ]);

        // Realizar la inserción en la tabla ventas
        conexion.query(ventasSql, [ventasValues], (ventasError, ventasRegistros) => {
            if (ventasError) {
                return res.status(500).send(ventasError);
            }

            // Preparar la consulta de inserción para detalleventa
            let detalleventaSql = 'INSERT INTO detalleventa (iddetalleVenta, claveArticulo, cantidad, precio, fecha, idVendedor) VALUES ?';
            let detalleventaValues = compras.map(compra => [
                maxIdDetalleVenta, // Usar el mismo iddetalleVenta obtenido
                compra.claveArticulo,
                compra.cantidad,
                compra.precio,
                compra.fecha,
                compra.idVendedor
            ]);

            // Realizar la inserción en la tabla detalleventa
            conexion.query(detalleventaSql, [detalleventaValues], (detalleError, detalleRegistros) => {
                if (detalleError) {
                    return res.status(500).send(detalleError);
                }

                // Enviar solo el resultado de la inserción en la tabla ventas
                res.send(ventasRegistros);
            });
        });
    });
});
//DetalleVenta el dia de hoy
app.get('/api/detalleventas/hoy', (req, res) => {
    // Consulta para obtener los registros de hoy con la información de articulos y vendedores
    let sql = `
        SELECT dv.iddetalleVenta,dv.clavearticulo,dv.cantidad,dv.precio,dv.idvendedor, a.descripcion AS descripcion_articulo, v.nombre, v.apellido, v.departamentotienda, TIME(dv.fecha) AS hora
        FROM detalleventa dv
        INNER JOIN articulos a ON dv.claveArticulo = a.claveArticulo
        INNER JOIN vendedores v ON dv.idVendedor = v.idVendedor
        WHERE DATE(dv.fecha) = CURDATE()
    `;
    conexion.query(sql, (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(results);
    });
});
//Seleccionar un Articulo por ID:
app.get('/api/articulos/:id', (request, response) => {
    const id = request.params.id;
    const queryData = "SELECT * FROM articulos WHERE claveArticulo = ?";
    conexion.query(queryData, [id], (error, fila) => {
        if (error) {
            throw error;
        } else {
            response.send(fila);
        }
    });
})

//Borrar Articulos por claveArticulo:
app.delete('/api/articulos/:id', (request, response) => {
    const id = request.params.id;
    const query = 'DELETE FROM articulos WHERE claveArticulo = ?';

    conexion.query(query, [id], (error, result) => {
        if (error) {
            return response.status(500).json({ error: error });
        }
        return response.json({ affectedRows: result.affectedRows });
    });
})

//Insertar un nuevo articulo
app.post('/api/articulos', (request, response) => {
    let data = {
        claveArticulo: request.body.claveArticulo,
        descripcion: request.body.descripcion,
        existencia: request.body.existencia,
        precio: request.body.precio,
    }
    let sql = 'INSERT INTO articulos SET ?';
    conexion.query(sql, data, (error, fila) => {
        if (error) {
            throw error;
        } else {
            response.send(fila);
        }
    })
})

//Actualizar un articulo:
app.put('/api/articulos/:id', (request, response) => {
    const id = request.params.id;
    let data = {
        claveArticulo: request.body.claveArticulo,
        descripcion: request.body.descripcion,
        existencia: request.body.existencia,
        precio: request.body.precio,
    }
    let sql = 'UPDATE articulos SET ? WHERE claveArticulo = ?';
    conexion.query(sql, [data, id], (error, fila) => {
        if (error) {
            throw error;
        } else {
            response.send(fila);
        }
    })
})




//Encender Servidor
let puerto = 3000;
app.listen(puerto, function () {
    console.log('Servidor escuchando puerto ' + puerto);
})