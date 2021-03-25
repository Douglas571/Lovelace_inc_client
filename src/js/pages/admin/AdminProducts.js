import storage from '../../storage.js'
import api from '../../util/api.js'
import RegistedProductsPreviewer from './RegistedProductsPreviewer.js'
import ProductEditor from './ProductEditor.js'

const template = 
`
  <div>      

    <button @click="newProduct"class="waves-effect waves-light btn">
      <i class="material-icons">add_circle_outlined</i>
      Nuevo Producto
    </button>

    <div>
      <registed-products-previewer :products="registedProducts" 
        @delete="deleteEvent"/>
    </div>    
  </div>
`


export default {
  name: 'App',
  components: {
    RegistedProductsPreviewer
  },
  data() {
    return {
      registedProducts: storage.registedProducts
    }
  },

  methods: {
    newProduct() {
      this.$router.push('/admin/products/new')
    },

    async deleteEvent() {
      this.getAllProducts()
    },

    updateProduct() {
      this.currentEditingId = null
      
      this.getAllProducts()
    },

    deletePhoto(id) {
      console.log("delete: " + id)

      const newPhotos = this.photos.filter( photo => photo.id !== id )
      this.photos.forEach( photo => {
        if (photo.id === id) {
          revoqueSource(photo.url)
        }
      })

      this.photos = newPhotos;
    },

    async getAllProducts() {
      const allProducts = await api.getAllProducts();
      

      this.registedProducts = allProducts
      //console.log(this.registedProducts);
    },

    async selectCover(id) {

    }
  },

  created() {
    this.getAllProducts()
  },

  template,
};

function revoqueSource(url) {
  URL.revokeObjectURL(url)
}