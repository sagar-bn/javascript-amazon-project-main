import {renderOrderSummary} from './checkout/OrderSummary.js';
import { renderpaymentSummary } from './checkout/PaymentSummary.js';
import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';

//import  '../data/cart-class.js';
//import '../backend/backend.js';


// this helps us to understand how to use promise class 
new Promise((resolve)=>{
  loadProducts(()=>{
    resolve();
  })
}).then(()=>{
  new Promise((resolve)=>{
    loadCart(()=>{
     resolve();
    })
  })
}).then(()=>{
  renderOrderSummary();
  renderpaymentSummary();
})





// this makes more nested code
// loadProducts(()=>{
//   loadCart(()=>{
//    renderOrderSummary();
//    renderpaymentSummary();
//   })
// });



