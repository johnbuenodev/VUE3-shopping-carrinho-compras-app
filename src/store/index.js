import { createStore } from 'vuex';
import axios from 'axios'

export default createStore({
  state: {
    products: [], //[1,2,3]
    productsInBag: [] 
  },
  mutations: {

    //pode passar a estancia de state aqui ou chamar ela por this.state
    getProduct( state, products) {
      console.log("Mutation products");
      state.products = products;
      //this.state.products = products;
      console.log(state.products);
    },
    addProductInBag(state, product) {
      console.log("Mutation add product in bag");
      console.log(product);
      state.productsInBag.push(product);
      console.log(state.productsInBag);
    },
    removeProductInBag(state, product) {
      //state.productsInBag.filter(value => product != value);
      //ATENÇÃO SE COMPARAR PELO PRODUTO NUNCA VAI SER IGUAL POIS TEM O QUANTITY COM VALOR NELE
      
      //pegar indice do objeto dentro da ARRAY PARA PASSAR PARA O SPLICE REMOVER
      const index = state.productsInBag.indexOf(product);
      //removendo registro com splice
      state.productsInBag.splice(index, 1);
      console.log(state.productsInBag);

    }
  },
  actions: {

    getProduct({commit}) { //precisa passar o commit aqui
      axios.get("https://fakestoreapi.com/products").then((res) => {
       console.log(res.data);
       //chama a mutation (commit)
       console.log("Chegou ate aqui");
       //commit('getProduct'); 
       commit('getProduct', res.data);
      }).catch((err) => {
       console.log(err);
      }); 
    },
    addProductInBag({commit}, product) {
      commit('addProductInBag', product);
    },
    removeProductInBag({commit}, product) {
      commit('removeProductInBag', product);
    }

  },
  modules: {
  }
});
