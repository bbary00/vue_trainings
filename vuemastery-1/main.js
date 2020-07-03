Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    },
    in_cart: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div class="product">
      <div class="product-image">
        <img :src="image" alt="">
      </div>

      <div class="product-info">
        <h1>{{ title }} </h1>
        <p v-if="inventory>10">In stock</p>
        <p v-else-if="inventory<=10 && inventory>0">Almost sold out</p>
        <p v-else
            :style="{textDecoration: 'line-through'}">
          Out of stock
        </p>

        <div class="price">
          <p v-if="on_sale && sale_price">
            SALE: was {{ price }} now {{ sale_price }}
          </p>
          <p v-else> {{ price }} </p>
        </div>

        <ul>
          <li v-for="detail in details">{{detail}}</li>
        </ul>

        <p> Shipping: {{ shipping }} </p>

        <div class="color-group">
          <div v-for="(variant, index) in variants" 
                :key="variant.id"
                class="color-box"
                :style="{backgroundColor: variant.color}"
                @mouseover="updateProduct(index)">
          </div>
        </div>


        <button v-on:click="addToCart" 
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }">
          Add to cart
        </button>
        <button v-on:click="removeFromCart" 
                class="color-box"
                :disabled="!in_cart">
          -
        </button>


      </div>
    </div>
  `,
  data() {
    return {
      brand: "LvivSklo",
      product: "Cup",
      selectedVariant: 0,
      details: ["Material: Glass", "Strong", "With picture"],
      variants: [
        {id: 1, color: "Green", image: "img/gr.png", price: 150, quantity: 3}, 
        {id: 2, color: "Red", image: "img/re.png", price: 120, quantity: 15}, 
        {id: 3, color: "Yellow", image: "img/ye.png", price: 180, on_sale: true, sale_price: 100, quantity: 0}]
    }
  },
  mounted(){
    this.$emit('update-cart', this.variants[this.selectedVariant], '=')
  },
  methods:{
    addToCart(){
      this.variants[this.selectedVariant].quantity -= 1;
      this.$emit('update-cart', this.variants[this.selectedVariant], '+')
    },
    removeFromCart(){
      this.variants[this.selectedVariant].quantity += 1;
      this.$emit('update-cart', this.variants[this.selectedVariant], '-')
    },
    updateProduct(index){
      this.selectedVariant = index;
      this.$emit('update-cart', this.variants[this.selectedVariant], '=')
    }
  },
  computed: {
    title() {
      return this.brand + " " + this.product
    },
    inStock() {
      return this.inventory > 0
    },
    image() {
      return this.variants[this.selectedVariant].image
    },
    inventory() {
      return this.variants[this.selectedVariant].quantity
    },
    price() {
      price = this.variants[this.selectedVariant].price
      if (this.premium)
        price *= 0.86
      return price
    },
    on_sale() {
      return this.variants[this.selectedVariant].on_sale
    },
    shipping() {
      return this.premium ? "Free" : "2.99$"
    },
    sale_price() {
      return this.variants[this.selectedVariant].sale_price
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: [],
    in_cart: false
  },
  methods:{
    updateCart(obj, sign){
      if (sign=="+")
        this.addToCart(obj)
      else if (sign=="-")
        this.removeFromCart(obj)
      else 
        this.in_cart = this.cart.indexOf(obj.id) != -1
    },
    addToCart(obj){
      this.cart.push(obj.id)
    },
    removeFromCart(obj){
      index = this.cart.indexOf(obj.id)
      if (index != -1)
        this.cart.splice(index, 1)
    }
  }
});