export async function fetchGQL(data) {
  const res = await fetch('http://localhost:4000/query', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    }
  )

  const json = await res.json()

  if(json.data) {
    return json.data
  }

  return json
}

async function gqlFetch(data) {
  return await fetch('http://localhost:4000/query', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    }
  )
}

async function parseData(res) {
  const json = await res.json()
  console.log(json)
  return json.data
}


export default {
  async registProduct(product, photos) {

    const photosData = await this.sendPhotos(photos)

    //console.log(photosData)

    product.photos = photosData
    product.cover = String(product.cover)
    product.price = Number(product.price)
    product.stock = Number(product.stock)
    
    //console.log(product)
    const res = await gqlFetch(
      {
        variables: {
          article: product
        },
        query: `mutation creatingArticle($article: ArticleInput) {
            createArticle(article: $article) {
              id
              name
              description
              price
              isAvailable
              byRequest
              stock
              photos {
                id
                url
              }
              cover
            }
          }`
      }
    )

    const json = await res.json()
    console.log(json)
    return json.data.createArticle
  },

  async getAllProducts() {
    const res = await gqlFetch(
      {
        variables: {
          
        },
        query: `query getArticles {
          allArticles {
            id
              name
              description
              price
              isAvailable
              byRequest
              stock
              photos {
                id
                url
              }
              cover
              urlOfCover
          }
        }`
      }
    )

    const { data } = await res.json()
    //console.log(data)

    /*data.allArticles.forEach( product => {
      product.photos.forEach( photo => {
        photo.url = 'http://localhost:4000' + photo.url
      })

      product.urlOfCover = 'http://localhost:4000' + product.urlOfCover
    })
    */

    //console.log('rewrite:')
    //console.log(data.allArticles)

    return data.allArticles
  },

  async getProduct(id) {
    const res = await gqlFetch(
      {
        variables: {
          id
        },
        query: `query getArticle($id: String) {
          article(id: $id) {
            id
            name
            description
            price
            isAvailable
            byRequest
            stock
            photos {
              id
              url
            }
            cover
            urlOfCover
          }
        }`
      }
    )

    const data = await parseData(res)
    return data.article
  },

  async sendPhotos(listOfPhotos) {
    const form = new FormData();
    for(let photo of listOfPhotos) {
      form.append('photos', photo.file)
    }

    form.append('name', 'douglas');

    //console.log(form.getAll('photos'))
    //console.log(form.getAll('name'))

    const res = await fetch('http://localhost:4000/upload', 
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: form
    })

    const photosUploadedData = await res.json()
    return photosUploadedData;
  },

  async updateProduct(product, photosToUpload) {

    const newPhotosData = await this.sendPhotos(photosToUpload)

    product.photos = product.photos.concat(newPhotosData)
    console.log('The product to update:')
    console.log(product)

    product.cover = String(product.cover)

    const res = await gqlFetch({
        variables: {
          article: product
        },
        query: 
          `mutation updatingArticle($article: ArticleUpdateInput) {
            updateArticle(article: $article) {
              id
              name
              description
              price
              isAvailable
              byRequest
              stock
              photos {
                id
                url
              }
              cover
            }
          }`
      })

    const data = await parseData(res)
    return data
  },

  async deleteProduct(id) {
    const res = await gqlFetch({
      variables: {
        id
      }, 
      query: `
        mutation deletProduct($id: String) {
          deleteArticle(id: $id) {
            id
            name
          }
        }
      `
    })

    const data = await parseData(res)
    return data.deleteArticle
  }
}

//TAte guja
//Shinmai mao no testament 2 temporadas
//isekai mokushiroku mynoghra hametsu nobunmei dejayiremu recai seifuku