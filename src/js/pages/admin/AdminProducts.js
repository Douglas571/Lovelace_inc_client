import storage from '../../storage.js'
import api from '../../util/api.js'
import RegistedProductsPreviewer from './RegistedProductsPreviewer.js'
import ProductEditor from './ProductEditor.js'

const template = 
`
  <div>
    <div>
      <h1>Registra un producto</h1>
      
      <div>
        <div>
          <div>
            <label for="name">Nombre</label>
            <input id="name" name="name" type="text" autocomplete="off" v-model="name" placeholder="nombre"/>
          </div>

          <div>
            <label for="description">Descripción</label>
            <textarea id="description" 
              
              name="description" 
              v-model="description"
              placeholder="descripción"/>
          </div>

          <div >
            <label>
              Disponible
              <input type="checkbox" v-model="isAvailable">
            </label>
          </div>

          <div v-show="isAvailable">

            <div>
              <div>
                <label for="price">Precio</label>
                <input 
                  id="price" 
                  name="price" 
                  type="text" 
                  autocomplete="off" 
                  v-model="price"
                  placeholder="1.000,00"
                  />
              </div>

              <div>
                <label for="stock">En Venta</label>
                <input id="stock" name="stock" type="text" autocomplete="off" v-model="stock"
                placeholder="1.000,00"/>
              </div>
            </div>
          </div>

          <div>
            <label>Imagenes</label>
            <input style="display: none" ref="fileInput" type="file" id="up" name="photos" @change="updatePhotos" multiple/>
            <button @click="uploadPhoto" >Subir foto</button>
          </div>

          <div>
            <div v-for="photo in photos">
              <img :src="photo.url" :key="photo.id" width="70" height="70"/>
              <input type="radio" :value="photo.id" v-model="cover" />
              <button @click="deletePhoto(photo.id)">X</button>
            </div>
          </div>
          {{cover}}
          <button @click="registProduct">Registrar</button>
          <button @click="getAllProducts">mostrar productos</button>

          <div v-if='photoCover'>
            <h3>cover: {{ cover }}</h3>
            <img :src="photoCover" width="70" height="70"/>
          </div>
          <registed-products-previewer :products="registedProducts" 
          @delete="deleteProduct"/>
        </div>
      </div>    
    </div>
  </div>
`


export default {
  name: 'App',
  components: {
    RegistedProductsPreviewer,
    ProductEditor
  },
  data() {
    return storage
  },

  computed: {
    photoCover() {
      const cover = this.cover;
      const photo = this.photos.find( photo => photo.id == cover)

      if(photo) {
        return photo.url
      }

      return false

    },

    isEditing() {
      return this.currentEditingId !== null;
    },

    productEditing() {
      if(this.currentEditingId) {
        return this.registedProducts.find( product => product.id === this.currentEditingId)
      } else {
        return { id: 0, name: 'no tiene', description: 'sin comentarios'}
      }
    }
  },

  methods: {
    setEditingProduct(id) {
      console.log('editing:' + id)
      this.currentEditingId = id
    },

    async deleteProduct(id) {
      console.log('theleting: ' + id)
      const deletedProduct = await api.deleteProduct(id)
      console.log('deleted product:')
      console.log(deletedProduct)
      
      this.getAllProducts()
    },

    updateProduct() {
      this.currentEditingId = null
      
      this.getAllProducts()
    },

    registProduct() {
        
      const toClone = {
        name: this.name,
        description: this.description,
        price: this.price,
        isAvailable: this.isAvailable,
        byRequest: this.byRequest,
        stock: this.stock,
        //photos: this.photos,
        cover: this.cover  
      }

      const product = JSON.parse(JSON.stringify(toClone))

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

      api.registProduct(product, this.photos);
      
      this.name = ''
      this.description = ''

      
      this.isAvailable = true
      this.price = ''
      this.stock = ''

      this.byRequest = false

      this.photos.forEach( photo => {
        revoqueSource(photo.url)
      })

      this.photos = []

      this.cover = ''

      //api.sendPhotos(photos);
      this.getAllProducts()
    },

    uploadPhoto() {
      this.$refs.fileInput.click()
    },

    updatePhotos(evt) {
      const files = evt.target.files
      let photosToUpload = []

      for (let file of files) {
        const id = Math.ceil(Math.random()*1000000000)
        const url = URL.createObjectURL(file)
        const newName = `${id}.${file.type.split('/')[1]}`
        const fileRenamed = new File([file], newName, { type: file.type })

        photosToUpload.push({
          id,
          url,
          file: fileRenamed
        })
      }

      photosToUpload.forEach( photo => {
        this.photos.push(photo)
      })

      //console.log(this.photos);
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