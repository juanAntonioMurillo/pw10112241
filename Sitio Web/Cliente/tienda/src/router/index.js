import { createRouter, createWebHistory } from 'vue-router'


import clientesCreateView from '@/views/Clientes/ClientesCreateView.vue';
import ClientesEditarView from '@/views/Clientes/ClientesEditarView.vue';
import RegistroView from '@/views/RegistroView.vue'
import EntradaView from '@/views/EntradaView.vue'

import NoAutorizaView from '@/views/NoAutorizaView.vue'

import { getAuth } from "firebase/auth";

// 
// Proyecto fonal
import vendedores from '@/views/Vendedores/vendedores.vue';
import vendedoresCreateView from '@/views/Vendedores/vendedoresCreateView.vue';
import vendedoresEditarView from '@/views/Vendedores/vendedoresEditarView.vue';

import VentasView from '@/views/Ventas/VentasView.vue';

import detalleVentaView from '@/views/DetalleVentas/detalleVentaView.vue';

import Articulos from '@/views/Articulos/Articulos.vue';
import ArticulosCreateView from '@/views/Articulos/ArticulosCreateView.vue';
import ArticulosEditView from '@/views/Articulos/ArticulosEditView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: detalleVentaView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import('../views/Clientes/ClientesView.vue'),
      meta:{
        requireAuth:true,
      }
    },
    
    {
      path: '/ventas',
      name: 'ventas',
      component: VentasView,
      meta:{
        requireAuth:true,
      }
    }
    ,
    {
      path: '//clientes/create',
      name: 'clientesCreate',
      component: clientesCreateView
    } ,
    {
      path: '/clientes/:id/edit',
      name: 'clientesEditar',
      component: ClientesEditarView
    }
    ,
    {
      path: '/clientes/registro',
      name: 'Registro',
      component: RegistroView
    }
    ,
    {
      path: '/clientes/entrada',
      name: 'entrada',
      component: EntradaView
    }
    ,
    {
      path: '/clientes/noautorizar',
      name: 'noautorizar',
      component: NoAutorizaView
    }
    ,
    {
      path: '/vendedores',
      name: 'vendedores',
      component: vendedores,
      meta:{
        requireAuth:true,
      }
    }
    ,
    {
      path: '/vendedores/create',
      name: 'vendedoresCreate',
      component: vendedoresCreateView
    } 
    ,
    {
      path: '/vendedores/:id/edit',
      name: 'vendedoresEditar',
      component: vendedoresEditarView
    } 
    ,
    {
      path: '/detalleventas',
      name: 'detalleventas',
      component: detalleVentaView
    } ,
    {
      path: '/articulos',
      name: 'Articulos',
      component: Articulos,
      meta:{
        requireAuth:true,
      }
  },

  {
      path: '/articulos/:id/edit',
      name: 'ArticulosEditar',
      component: ArticulosEditView
  },

  {
      path: '/articulos/create',
      name: 'ArticulosCreate',
      component: ArticulosCreateView,
      meta:{
        requireAuth:true,
      }
  },
  ]
})

//analizamos todas las rutas antes de que se ejecute
router.beforeEach((to,from,next)=>{
  //si alguna ruta tiene meta.requiereAuth
  if(to.matched.some((record) => record.meta.requireAuth)){
    //si existe un usario registrado
    if(getAuth().currentUser){
      next();//continuar sin problema
    }else{
      // alert("Acceso no autorizado")
      next("/clientes/noautorizar")
    }
  }else{
    next();
  }
})

export default router
