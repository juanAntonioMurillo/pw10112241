let express = require( 'express');
let mysql = require('mysql');
let cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors());

//Rutas De Acceso
app.get("/",function(req,res){
    res.send("Ruta De Inicio");
})



//Encender Servidor
let puerto = 3000;
app.listen(puerto, function(){
    console.log('SErvidor escuchando puerto ' + puerto);
})