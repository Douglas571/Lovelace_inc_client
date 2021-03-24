const template = 
`
  <div>
    <div v-for="product in products">
      <h1>
        {{product.name}} 
        <button @click="setEditing(product.id)">Editar</button>
        <button @click="deleteEvent(product.id)">Eliminar</button>
      </h1>

      <div>
        <img :src="product.urlOfCover" width="70" height="70"/>
      </div>

      <span v-for="photo in product.photos">
        <img :key="photo.id" :src="photo.url" width="70" height="70"/>
      </span>
    </div>
  </div>
`

export default {
  name: 'registedProductsPreview',
  components: {},
  props: ['products'],
  data() {
    return {}
  },
  
  methods: {

    setEditing(id) {
      this.$emit('edit', id)
    },

    deleteEvent(id) {
      this.$emit('delete', id)
    }

  },

  template,
}