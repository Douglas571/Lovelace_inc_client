import api from '../util/api.js'

const template =
`
  <div>
    <h1>Inicio</h1>

    <h3>Mis principales productos:</h3>
    <div>
      <template v-for="product in products">
        <div :key="product.id">
          <h4>{{ product.name }}</h4>
          <p>{{ product.description }}</p>
          <p>precio:{{ product.price }} - {{ product.stock }} uni. disponibles</p>

          <div>
            <img :src="product.urlOfCover" width="70" height="70"/>
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