import Header from './components/Header.js';
import ProductUploader from './components/ProductUploader.js';

import Admin from './pages/admin/index.js'
import AdminProducts from './pages/admin/AdminProducts.js'
import Home from './pages/Home.js'

import Storage from './storage.js'

const User = { template: `<h1>User</h1>` }

const routes =     
[
  { path: '/admin/products/edit/:id',
    component: ProductEditorExp,
    props: true 
  }

  { path: '/admin/products', 
    component: AdminProducts
  },

  { path: '/admin', component: Admin },

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

/*
let app = new Vue({
  el: '#app',
  data: {
    
  },
  template: 
  `
    <div>
      <router-link to="/foo">Go to Foo</router-link>
    </div>
  `
  ,
  components: {
    App
  }
})
*/
