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
    let sql = 'INSERT INTO ventas (claveArticulo, cantidad, precio, fecha, idVendedor) VALUES ?';
    let values = compras.map(compra => [
        compra.claveArticulo,
        compra.cantidad,
        compra.precio,
        compra.fecha,
        compra.idVendedor
    ]);
    conexion.query(sql, [values], (error, regristos) => {
        if (error) {
            throw error;
        } else {
            res.send(regristos);
        }
    });
});


//Encender Servidor
let puerto = 3000;
app.listen(puerto, function () {
    console.log('Servidor escuchando puerto ' + puerto);
})