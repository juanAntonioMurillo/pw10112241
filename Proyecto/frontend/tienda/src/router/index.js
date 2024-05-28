import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClientesView from '../views/ClientesView.vue';
import ProveedoresView from '@/views/ProveedoresView.vue';
import VentasView from '@/views/VentasView.vue'
import clientesCreateView from '@/views/clientesCreateView.vue';
import ClientesEditarView from '@/views/ClientesEditarView.vue';
import RegistroView from '@/views/RegistroView.vue'
import EntradaView from '@/views/EntradaView.vue'

// import RegistroView from '../views/RegistroView.vue';
//  import RegistroView from '@/views/RegistroView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/clientes',
      name: 'clientes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ClientesView.vue')
    },
    {
      path: '/proveedores',
      name: 'proveedores',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProveedoresView.vue')
    }
    ,
    {
      path: '/ventas',
      name: 'ventas',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/VentasView.vue')
    }
    ,
    {
      path: '//clientes/create',
      name: 'clientesCreate',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: clientesCreateView
    } ,
    {
      path: '/clientes/:id/edit',
      name: 'clientesEditar',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ClientesEditarView
    }
    ,
    {
      path: '/clientes/registro',
      name: 'Registro',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: RegistroView
    }
    ,
    {
      path: '/clientes/entrada',
      name: 'entrada',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: EntradaView
    }
  ]
})

export default router
