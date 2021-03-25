import Header from './components/Header.js';
import ProductUploader from './components/ProductUploader.js';

import Admin from './pages/admin/index.js'
import AdminProducts from './pages/admin/AdminProducts.js'
import AdminProductRegister from './pages/admin/admin-product-register.js'
import AdminProductEditor from './pages/admin/ProductEditor.js'

import Home from './pages/Home.js'
import Products from './pages/products/index.js'
import ProductsProduct from './pages/products/product.js'


import Storage from './storage.js'

const routes =     
[
  { path: '/admin', 
    component: Admin,
    children: [
      { path: 'products/edit/:id', component: AdminProductEditor, props: true },
      { path: 'products/new', component: AdminProductRegister },
      { path: 'products', component: AdminProducts },
      
    ] },

  { path: '/products',
    component: Products,
    children: [
      { path: ':id', component: ProductsProduct, props: true },
      { path: '', component: { template: '<h2>home</h2>'} }
    ]
  },

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