import api from '../../util/api.js'
import PhotoUploader from './PhotoUploader.js'

const template = 
`
  <div v-if="isReady">
    <h1>Editando el Producto: {{ product.id }}</h1>
    <div>
      <div>
        <label for="name">Nombre</label>
        <input id="name" name="editingName" type="text" autocomplete="off" v-model="product.name"/>
      </div>

      <div>
        <label for="description">Descripción</label>
        <textarea id="description" 
          
          name="description" 
          v-model="product.description"/>
      </div>

      <div v-show="product.isAvailable">
        <div>
          <div>
            <label for="price">Precio</label>
            <input 
              id="price" 
              name="price" 
              type="text" 
              autocomplete="off" 
              v-model="product.price"
              placeholder="1.000,00"
              />
          </div>

          <div>
            <label for="stock">En Venta</label>
            <input id="stock" name="stock" type="text" autocomplete="off" 
            v-model="product.stock"
            placeholder="1.000,00"/>
          </div>
        </div>
      </div>

      <photo-uploader :photos="photosToUpload"/>

      <div>
        <h3>Online</h3>
        <div v-for="photo in product.photos">
          <img :src="photo.url" :key="photo.id" width="70" height="70"/>
          <input type="radio" :value="photo.id" v-model="product.cover" />
          <button @click="deletePhoto(photo.id)">X</button>
        </div>
      </div>

      <div>
        <h3>OnDisk</h3>
        <div v-for="photo in photosToUpload">
          <img :src="photo.url" :key="photo.id" width="70" height="70"/>
          <input type="radio" :value="photo.id" v-model="product.cover" />
          <button @click="deletePhoto(photo.id)">X</button>
        </div>
      </div>

      <button @click="update">Actualizar</button>
    </div>
  </div>
`

export default {
  name: 'ProductEditor',
  props: ['id'],
  data() {
    return {
      product: {},
      photosToUpload: []
    }
  },

  methods: {
    async update() {
      console.log(this.product.id + "is updated")

      const product = JSON.parse(JSON.stringify(this.product))

      if(product.price && product.price.includes) {
        product.price = product.price.replaceAll('.', '')
        product.price = product.price.replaceAll(',', '.')

        product.price = Number(product.price)
      }

      if(product.stock && product.stock.includes) {
        product.stock = product.stock.replaceAll('.', '')
        product.stock = product.stock.replaceAll(',', '.')

        product.stock = Number(product.stock)
      }

      product.urlOfCover = undefined
      await api.updateProduct(product, this.photosToUpload)
      this.$router.push('/admin/products')
      //this.$emit('product-updated')
    },

    async deletePhoto(id) {
      console.log("delete: " + id)

      const newPhotos = this.product.photos.filter( photo => photo.id !== id )
      
      /*this.product.photos.forEach( photo => {
        if (photo.id === id) {
          revoqueSource(photo.url)
        }
      })*/

      this.product.photos = newPhotos;
    },

    async getProduct() {
      console.log(this.id)
      this.product = await api.getProduct(this.id);
      console.log(this.product)
    }
  },

  computed: {
    isReady() {
      return (this.product)
    }
  },

  created() {
    this.getProduct();
  },

  components: {
    PhotoUploader
  },
  template
}