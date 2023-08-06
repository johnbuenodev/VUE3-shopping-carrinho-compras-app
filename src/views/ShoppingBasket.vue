<template>
  <div class="basket">
    <div class="items" v-if="this.$store.state.productsInBag.length > 0">

      <!-- <div class="item">
        <div class="remove">Remover Produto</div>
        <div class="photo"><img src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" alt=""></div>
        <div class="description">Mens Casual Premium Slim Fit T-Shirts </div>
        <div class="price">
          <span class="quantity-area">
            <button disabled="">-</button>
            <span class="quantity">1</span>
            <button>+</button>
          </span>
          <span class="amount">R$ 22.30</span>
        </div>
      </div> -->

      <div v-for="product in productsInBag" :key="product.id" class="item">
        <div class="remove" @click="removeProductInBag(product)">Remover Produto</div>
        <div class="photo"><img :src="product.image" :alt="product.title"></div>
        <div class="description">{{ product.description }} </div>
        <div class="price">
          <span class="quantity-area">
            <!-- v-if="product.quantity > 0" -->
            <button  :disabled="product.quantity <= 1" @click="removeQuantityProductInBag(product)">-</button>
            <span class="quantity">{{ product.quantity }}</span>
            <button @click="addQuantityProductInBag(product)">+</button>
          </span>
          <span class="amount">R$ {{ product.price }}</span>
        </div>
      </div>

      <div class="grand-total"> Total do pedido: R$ {{ this.totalCar() }}</div>

    </div>

    <!--- v-if="this.$store.state.productsInBag.length <= 0" -->
    <div class="items" v-else>
     <span>Você ainda não possui produtos no carrinho</span>
    </div>
  </div>
</template>

<script>

// import { mapState } from 'vuex'

export default {
  name: 'ShoppingBasket',
  data() {
    return {
      
    }
  },
  methods: {

    addQuantityProductInBag(product) {
      product.quantity = product.quantity + 1;
      //this.$store.dispatch('addProductInBag', product);
      //this.totalCar();
    },
    removeQuantityProductInBag(product) {
      product.quantity = product.quantity - 1;
      //this.$store.dispatch('addProductInBag', product);
      //this.totalCar();
    },
    totalCar() {
    //.toFixed(2)
    let totalCarrinho = 0;

    for(let i = 0; i < this.$store.state.productsInBag.length; i++) {
     
      let totalProd = this.$store.state.productsInBag[i].price * this.$store.state.productsInBag[i].quantity;
      totalCarrinho = totalCarrinho + totalProd;  
      console.log(totalCarrinho);
    } 

    return (totalCarrinho > 0) ? totalCarrinho.toFixed(2) : 0;
  },
  removeProductInBag(product) {

    if(confirm('Vc deseja remover o item do carrinho?')) { 
      product.quantity = 0;
      this.$store.dispatch('removeProductInBag', product);
    }

  },
   
  },
  created() {}, 
  beforeUpdate() {},
  computed: { 
    // this.totalCar() {
    // //.toFixed(2)
    // let totalCarrinho = 0;

    // for(let i = 0; i < this.$store.state.productsInBag.length; i++) {
     
    //   let totalProd = this.$store.state.productsInBag[i].price * this.$store.state.productsInBag[i].quantity;
    //   totalCarrinho = totalCarrinho + totalProd;  
    //   console.log(totalCarrinho);
    // } 

    // return (totalCarrinho > 0) ? totalCarrinho.toFixed(2) : 0;
    // },
    
    productsInBag () {

      return this.$store.state.productsInBag;

    }

  }, 

  

 
}
</script>

<style lang="scss">

.basket {
  padding: 60px 0;  
  .items {
    max-width: 800px;
    margin: auto;
    .item {
      display: flex;
      justify-content: space-between;
      padding: 40px 0;
      border-bottom: 1px solid lightgrey;
      position: relative;

      .remove {
        position: absolute;
        top: 8px;
        right: 0;
        font-size: 11px;
        text-decoration: underline;
        cursor: pointer;
      }

      .quantity-area {
        margin: 8px auto;
        height: 14px;

        button {
          width: 16px;
          height: 16px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }

        .quantity {

            margin: 0 4px;
        }
      }

      .photo {
        img {
          max-width: 80px;
        }
      }

      .description {
        padding-left: 30px;
        box-sizing: border-box;
        max-width: 50%;

      }

      .price {
        .amount {
          font-size: 16px;
          margin-left: 8px;
          vertical-align: middle;

        }
      }
    }
      .grand-total {
          font-size: 24px;
          font-weight: bold;
          text-align: right;
          margin-top: 8px;
      }

  }

}

</style>
