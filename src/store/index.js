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

    //VERIFICAR O BUG
    async addProductInBag(state, product) {
      console.log("Mutation add product in bag");
      console.log(product);
      
      let productsInBagLocalStorage = state.productsInBag;

      for(let i = 0; i < productsInBagLocalStorage.length; i++) {
        if(productsInBagLocalStorage[i].id == product.id) {
          alert("Produto já adicionado no carrinho");
          return;
        } else {
          console.log("Nao tem");
        }
      }

      state.productsInBag.push(product);

      let productsInBagString = JSON.stringify(state.productsInBag);
      localStorage.setItem("@productsAppShopping", productsInBagString);
      
      console.log(state.productsInBag);
        
    },
    removeProductInBag(state, product) {
      //state.productsInBag.filter(value => product != value);
      //ATENÇÃO SE COMPARAR PELO PRODUTO NUNCA VAI SER IGUAL POIS TEM O QUANTITY COM VALOR NELE
      
      //pegar indice do objeto dentro da ARRAY PARA PASSAR PARA O SPLICE REMOVER
      
      //funcionando ok inicio primeira opção
      //const index = state.productsInBag.indexOf(product);
      //removendo registro com splice
      
      //funcionando ok fim
      //state.productsInBag.splice(index, 1);
      //console.log(state.productsInBag);

      /* outra forma de remover e atualizar


      */
      // segunda opção
      let updatedListBag = state.productsInBag.filter(item => product.id != item.id);
      state.productsInBag = updatedListBag;

      let productsInBagString = JSON.stringify(state.productsInBag);
      localStorage.setItem("@productsAppShopping", productsInBagString);
      console.log(state.productsInBag);

    },
    getProductInBagStorage(state) {
      
      let productsInBagProcess = localStorage.getItem("@productsAppShopping");
      
      let productsInBagJSON = JSON.parse(productsInBagProcess);
      
      state.productsInBag = (productsInBagJSON.length > 0) ? productsInBagJSON : [];
      console.log(state.productsInBag);
    },
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
    },
    getProductInBagStorage({commit}) {
    
       commit('getProductInBagStorage');
    }, 

  },
  modules: {
  }
});
