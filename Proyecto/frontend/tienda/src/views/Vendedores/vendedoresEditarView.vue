<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Editar Vendedor</h4>
                <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                    Datos Actualizados con éxito
                </div>
            </div>
            <div class="card-body">
                <Form :validation-schema="validationSchema" @submit="onTodoBien">
                <div class="mb-3">
                    Id
                    <Field name="idvendedor" id="idvendedor" type="number" class="form-control" v-model="model.vendedor.idvendedor" />
                    <ErrorMessage name="idvendedor" class="errorValidacion" />
                </div>
                 <div class="mb-3">
                    Nombre
                    <Field name="nombre" id="nombre" type="text" class="form-control" v-model="model.vendedor.nombre" />
                    <ErrorMessage name="nombre" class="errorValidacion" />
                </div>
                 <div class="mb-3">
                    Apellido
                    <Field name="apellido" id="apellido" type="text" class="form-control" v-model="model.vendedor.apellido" />
                    <ErrorMessage name="apellido" class="errorValidacion" />
                </div>
                 <div class="mb-3">
                    Departamento
                    <Field name="departamentotienda" id="departamentotienda" type="text" class="form-control" v-model="model.vendedor.departamentotienda" />
                    <ErrorMessage name="departamentotienda" class="errorValidacion" />
                </div>
                <div class="mb-3">
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </div>
                </Form>
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios';
import { Field,Form,ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
export default {
    name: "VendedoresEditar",
    components: { Field,Form,ErrorMessage },
    data(){
        const validationSchema = toTypedSchema(
            zod.object({
                idvendedor: zod.number({message:'Solo Numeros'}).int(),
                nombre: zod.string().min(1,{message: 'Requerido'}),
                apellido: zod.string().min(1,{message: 'Requerido'}),
                departamentotienda: zod.string().min(1,{message: 'Requerido'}),
            })
        )
        return{
            validationSchema,
            mensaje: 0,
            model:{
                vendedor:{
                    idvendedor: '',
                    nombre: '',
                    apellido: '',
                    departamentotienda: '',
                }
            }
        }
    },
    mounted(){
        this.getVendedore(this.$route.params.id);
    },
    methods:{
        getVendedore(VendedorID){
            axios.get('http://localhost:3000/api/vendedores/'+ VendedorID)
            .then(res=>{
                this.model.vendedor = res.data[0];
            });
        },
        onTodoBien(){
            alert('Todo validado');
            this.guardarVendedores();
        },
        guardarVendedores(){
            console.log(this.model.vendedor);
            this.mensaje = 1;
            this.limpiarFormulario();
            // axios.put('http://localhost:3000/api/vendedores/'+this.$route.params.id,this.model.vendedor)
            // .then(res => {
            //     //si insertamos 1 registro
            //     if(res.data.affectedRows == 1){ 
            //         //limpiamos los cuadros de texto
            //         this.model.vendedor = { 
            //             idvendedor: '',
            //             nombre: '',
            //             apellido: '',
            //             departamentotienda: '',
            //         }
            //         //Para que salga el mensaje de éxito
            //         this.mensaje = 1;
            //     }
            // })
        },
        limpiarFormulario() {
            this.model.vendedor = {
                idvendedor: '',
                nombre: '',
                apellido: '',
                departamentotienda: ''
            };
        }
    }
}
</script>

<style scoped>
    .errorValidacion{
        color: red;
        font-weight: bold;
    }
</style>