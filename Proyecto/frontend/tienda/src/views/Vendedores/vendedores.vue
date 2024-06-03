<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Vendedores
                    <RouterLink to="/vendedores/create" class=" btn btn-primary float-end">
                        agregar
                    </RouterLink>
                </h4>
            </div>
            <div class="card-body">
                <table class="table table-bordered table-striped">
                    <thead>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Departamento</th>
                        <th>Acciones</th>
                    </thead>
                    <tbody v-if="vendedores.length > 0">
                        <tr v-for="(Vendedor, index) in vendedores" :key="index">
                            <td>{{ Vendedor.idvendedor }}</td>
                            <td>{{ Vendedor.nombre }}</td>
                            <td>{{ Vendedor.apellido }}</td>
                            <td>{{ Vendedor.departamentotienda }}</td>
                            <td> 
                                <RouterLink  :to="{path: '/vendedores/'+ Vendedor.idvendedor+'/edit'}" class="btn btn-warning"> Editar</RouterLink>
                                <!-- <button class="btn btn-warning" >Editar</button> -->
                                &nbsp;
                                <button class="btn btn-danger" @click="deletevendedores(Vendedor.idvendedor )">Borrar</button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="9" style="text-align: center;"> sin Clientes</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>


</template>

<script>
import axios from 'axios'
import { RouterLink } from 'vue-router';
export default {
    name: "VendedoresView",
    data() {
        return {
            vendedores: [],
        }
    },
    mounted() {// cuando se carga la pagina
        this.getVendedores();
    },
    methods: {
        getVendedores() {
            axios.get('http://localhost:3000/api/vendedores').then(res => {
                this.vendedores = res.data;
            });
        },
        deletevendedores(idvendedorBorrar){
            axios.delete('http://localhost:3000/api/vendedores/' + idvendedorBorrar).then(res=>{
                if(res.data.affectedRows > 0){
                    this.getVendedores();//reclagre los datos
                }
            });
        }
    }
}
</script>