import Header from './components/Header.js';
import ProductUploader from './components/ProductUploader.js';

import Admin from './pages/admin/index.js'
import AdminProducts from './pages/admin/AdminProducts.js'
import AdminProductEditor from './pages/admin/ProductEditor.js'
import Home from './pages/Home.js'

import Storage from './storage.js'

const routes =     
[
  /*
  { path: '/admin/products/:id',
    component: AdminProductEditor,
    props: true 
  },

  { path: '/admin/products', 
    component: AdminProducts
  },*/

  { path: '/admin', 
    component: Admin,
    children: [
      { path: 'products/:id', component: AdminProductEditor, props: true },
      { path: 'products', component: AdminProducts },
      
    ] },

  { path: '/', 
    component: Home
  },

  { path: '*', component: {
    name: 'notFound',
    template: '<h1>Page not found :(</h1>'
  }}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

const app = new Vue({ router }).$mount('#app')