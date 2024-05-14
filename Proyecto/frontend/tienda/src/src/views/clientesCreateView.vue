<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Agregar Clientes</h4>
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
                <div class="md-3" >
                    <button class="btn btn-primary btn-block btn-lg">Guardar</button>
                </div>
            </div>
        </div>


    </div>

</template>

<script>
export default {
    name: "ClientesCreate",
    data() {
        return {
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
}
</script>