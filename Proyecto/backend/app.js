let express = require( 'express');
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
conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("conecto ala ase de datos");
    }
});

//Rutas De Acceso
app.get("/",function(req,res){
    res.send("Ruta De Inicio");
})
 //seleccionamos todo los clientes
app.get("/api/clientes",(req,res)=>{
    conexion.query('select * from clietes', (error,regristos)=>{
        if(error){
            throw error;
        }else{
            res.send(regristos);
        }

    });
});


//Encender Servidor
let puerto = 3000;
app.listen(puerto, function(){
    console.log('Servidor escuchando puerto ' + puerto);
})