export default {
  name: 'ProductUploader',
  data() {
    return {
      name: '',
      description: '',
      price: '',
      stock: '',
      isAvailable: false,
      byRequest: false
    }
  },
  template: `
    <div class="container ">
      <h1>Registra un producto</h1>
      
      <div class="row">
        <div class="col s12 m8">
          <div class="input-field">
            <input id="name" name="name" type="text" autocomplete="off" :value="name"/>
            <label for="name">Nombre</label>
          </div>

          <div class="input-field">
            <textarea id="description" 
              class="materialize-textarea"
              name="description" 
              v-model="description"/>
            <label for="description">Descripción</label>
          </div>

          <div class="switch">
            <label>
              Disponible
              <input type="checkbox" v-model="isAvailable">
              <span class="lever"></span>
              No Disponible
            </label>
          </div>

          <div v-bind:class="{hide: !isAvailable}">

            <div class="row">
              <div class="input-field col m7">
                <input id="price" name="price" type="text" autocomplete="off" :value="price"/>
                <label for="price">Precio</label>
              </div>

              <div class="input-field col m5">
                <input id="stock" name="stock" type="text" autocomplete="off" :value="stock"/>
                <label for="stock">En Venta</label>
              </div>
            </div>
          </div>

          <div>
            <label>Imagenes</label>
            <input type="file" name="photos" onChange={props.onChange} multiple/>
          </div>
        </div>
      </div>    
      
    </div>
  `,

}