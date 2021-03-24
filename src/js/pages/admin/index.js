export default {
  name: 'admin',
  template: 
  `
    <div>
      <h1>administración</h1>
      <router-link to="/admin/products">/products</router-link>
      <router-view></router-view>
    </div>
  `
}