import api from './util/api.js'
import { fetchGQL } from './util/api.js'

function revoqueSource(url) {
  URL.revokeObjectURL(url)
}

function parsePoints(string) {
  if(string && string.includes) {
    string = string.replaceAll('.', '')
    string = string.replaceAll(',', '.')

    return Number(string)
  }  
}

export default {
  productRegister: {
    newProduct: {
      name: '',
      description: '',
      
      isAvailable: true,
      price: '',
      byRequest: false,

      stock: '',

      photos: [],
      cover: '',
    },

    async deletePhoto(id) {

      const newPhotos = this.newProduct.photos.filter( photo => photo.id !== id )
      this.newProduct.photos.forEach( photo => {
        if (photo.id === id) {
          revoqueSource(photo.url)
        }
      })

      this.newProduct.photos = newPhotos;
    },

    async registProduct() {

      const productData = this.newProduct

      const toClone = {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        isAvailable: productData.isAvailable,
        byRequest: productData.byRequest,
        stock: productData.stock,
        cover: productData.cover  
      }

      const newProduct = JSON.parse(JSON.stringify(toClone))

      newProduct.price = parsePoints(newProduct.price)
      newProduct.stock = parsePoints(newProduct.stock)

      const photos = await api.sendPhotos(this.newProduct.photos)

      newProduct.photos = photos

      const data = await fetchGQL({
        variables: {
          article: newProduct
        },
        query: 
        `
          mutation creatingProduct($article: ArticleInput) {
            createArticle(article: $article) {
              id
              name
              photos {
                id
                url
              }
            }
          }
        `
      })


      console.log('registing product: ')
      console.log(newProduct)
      console.log(data)

      //api.registProduct(product, this.photos);
      
      this.newProduct.name = ''
      this.newProduct.description = ''

      
      this.newProduct.isAvailable = true
      this.newProduct.price = ''
      this.newProduct.stock = ''

      this.newProduct.byRequest = false

      this.newProduct.photos.forEach( photo => {
        revoqueSource(photo.url)
      })

      this.newProduct.cover = ''
      this.newProduct.photos = []
    },
  },

  async deleteProduct(id) {
    return await api.deleteProduct(id)
  },

  registedProducts: []


}