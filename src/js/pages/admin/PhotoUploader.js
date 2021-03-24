const template = 
`
  <div>
    <label>Imagenes</label>
    <input style="display: none" 
      ref="fileInput" 
      type="file" id="up" 
      name="photos" 
      @change="updatePhotos" 
      multiple/>
    
    <button @click="uploadPhoto" >Subir foto</button>
  </div>
`

export default {
  name: 'photoUploader',
  props: ['photos'],
  data() {
    return {

    }
  },
  methods: {
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

      console.log(this.photos);
    },
  },
  template
}