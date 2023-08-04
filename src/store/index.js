import { createStore } from 'vuex';
import axios from 'axios'

export default createStore({
  state: {
    products: [] //[1,2,3]
  },
  mutations: {

    //pode passar a estancia de state aqui ou chamar ela por this.state
    getProduct( state, products) {
      console.log("Mutation products");
      state.products = products;
      //this.state.products = products;
      console.log(state.products);
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
    }

  },
  modules: {
  }
});
