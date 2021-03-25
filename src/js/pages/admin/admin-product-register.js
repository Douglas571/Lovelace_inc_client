import storage from '../../storage.js'

const borrador = 
`
  <div>
    <h1>Registra un producto</h1>

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
        <input type="radio" :value="photo.id" v-model="newProduct.cover" />
        <button @click="deletePhoto(photo.id)">X</button>
      </div>
    </div>

    {{newProduct.cover}}
    <button @click="registProduct">Registrar</button>
    <button @click="getAllProducts">mostrar productos</button>

    <div v-if='photoCover'>
      <h3>cover: {{ newProduct.cover }}</h3>
      <img :src="photoCover" width="70" height="70"/>
    </div>
  </div>
`

const template = 
`
  <div>
    <h1>Registrar un nuevo producto</h1>

    <div>
      <div>
        <label for="name">Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          autocomplete="off"
          v-model="newProduct.name"
          placeholder="nombre"
        />
      </div>

      <div>
        <label for="description">Descripción</label>
        <textarea 
          id="description" 
          name="description" 
          v-model="newProduct.description"
          placeholder="descripción"
        />
      </div>

      <div>
        <label>
          Disponible
          <input type="checkbox" v-model="newProduct.isAvailable">
        </label>
      </div>

      <div v-show="newProduct.isAvailable">

        <div>
          <label for="price">Precio</label>
          <input 
            id="price" 
            name="price" 
            type="text" 
            autocomplete="off" 
            v-model="newProduct.price"
            placeholder="1.000,00"
          />
        </div>

        <div>
          <label for="stock">En Venta</label>
          <input 
            id="stock" 
            name="stock" 
            type="text" 
            autocomplete="off" 
            v-model="newProduct.stock"
            placeholder="1.000,00"
          />
        </div>

      </div>

      <div>
        <label>Imagenes</label>
        <input 
          style="display: none" 
          ref="fileInput" 
          type="file" id="up" 
          name="photos" 
          @change="updatePhotos" 
          multiple
        />
        <button @click="addPhotos" >Subir foto</button>

      </div>

      <div>
        <div v-for="photo in newProduct.photos">
          <img 
            :src="photo.url" 
            :key="photo.id" 
            width="70" 
            height="70"
          />
          <input 
            type="radio" 
            :value="photo.id" 
            v-model="newProduct.cover" 
          />
          <button @click="deletePhoto(photo.id)">X</button>
        </div>
      </div>

      {{newProduct.cover}}
      <button @click="registProduct">Registrar</button>
      <button @click="getAllProducts">mostrar productos</button>

    </div>
  </div>
`

export default {
  name: 'AdminProductRegister',
  props: [],
  data() {
    return {
      newProduct: storage.productRegister.newProduct
    }
  },

  methods: {
    updatePhotos: async function(evt) {
      const files = evt.target.files
      let photosToUpload = []

      for (let file of files) {
        const id = String(Math.ceil(Math.random()*1000000000))
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
        this.newProduct.photos.push(photo)
      })
    },

    addPhotos:  async function() {

      this.$refs.fileInput.click()
    },

    deletePhoto: async function(id) {

      storage.productRegister.deletePhoto(id)
    },

    getAllProducts: async function() {

      storage.productRegister.getAllProducts()
    },

    registProduct: async function() {
      
      //api.sendPhotos(photos);

      await storage.productRegister.registProduct()
      this.$router.push('/admin/products')
    },
  },

  template
}