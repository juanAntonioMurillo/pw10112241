<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Agregar Clientes</h4>
                <div  v-if="mensaje == 1" class="alert alert-success" role = "alert">
                    Datos guardados con exito
                </div>
            </div>
            <div class="card-body">
                <div class="md-3">
                    Id <input class="form-control" type="text" v-model="model.cliente.id">
                </div>
                <div class="md-3">
                    Nombre <input class="form-control" type="text" v-model="model.cliente.nombre">
                </div>
                <div class="md-3">
                    Apellido <input class="form-control" type="text" v-model="model.cliente.apellido">
                </div>
                <div class="md-3">
                    Direccion <input class="form-control" type="text" v-model="model.cliente.direccion">
                </div>
                <div class="md-3">
                    Telefono <input class="form-control" type="text" v-model="model.cliente.telefono">
                </div>
                <div class="md-3">
                    Rfc <input class="form-control" type="text" v-model="model.cliente.rfc">
                </div>
                <div class="md-3">
                    Curp <input class="form-control" type="text" v-model="model.cliente.curp">
                </div>
                <div class="md-3">
                    Cp <input class="form-control" type="text" v-model="model.cliente.cp">
                </div>
                <p></p>
                <div class="md-3">
                    <button class="btn btn-primary btn-block btn-lg" @click="guardarCliente()">Guardar</button>
                </div>
            </div>
        </div>


    </div>

</template>

<script>
import axios from 'axios';

export default {
    name: "ClientesCreate",
    data() {
        return {
            mensaje: 0,
            model: {
                cliente: {
                    id: '',
                    nombre: '',
                    apellido: '',
                    direccion: '',
                    telefono: '',
                    rfc: '',
                    curp: '',
                    cp: ''
                }
            }
        }
    },
    methods: {
        guardarCliente() {
            axios.post('http://localhost:3000/api/clientes', this.model.cliente).then(res => {
                if (res.data.affectedRows == 1) {// si inesetamos 1 registros
                    //limpiar el cuadro de textos
                    this.model.cliente = {
                        id: '',
                        nombre: '',
                        apellido: '',
                        direccion: '',
                        telefono: '',
                        rfc: '',
                        curp: '',
                        cp: ''
                    }
                    this.mensaje = 1;
                }
            });
        }
    }
}
</script>