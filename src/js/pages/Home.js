import api from '../util/api.js'

const template =
`
  <div class="">
    <h5>NOMBRE_PAGINA</h5>

    <h3>Mis principales productos:</h3>
    <div>
      <template v-for="product in products">
        <div :key="product.id" class="card">
          <div class="card-image">
            <img :src="product.urlOfCover" />
            
          </div>
          <div class="card-content">
            <span class="card-title">{{ product.name }}</span>
            <p>precio:{{ product.price }} - {{ product.stock }} uni. disponibles</p>
            {{ product.description }}
          </div>

          <div class="card-action">

            <router-link :to="'products/' + product.id">ver más...</router-link>
          </div>
        </div>
      </template>
    </div>
  </div>
`

export default {
  name: 'Home',
  template,
  data() {
    return {
      products: []
    }
  },
  created() {
    this.getAllProducts()
  },
  methods: {
    async getAllProducts() {
      const products = await api.getAllProducts()
      console.log(products)

      this.products = products
    }
  }
}