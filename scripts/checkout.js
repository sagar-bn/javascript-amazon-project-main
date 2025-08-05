import {renderOrderSummary} from './checkout/OrderSummary.js';
import { renderpaymentSummary } from './checkout/PaymentSummary.js';
import { loadProducts,loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';

//import  '../data/cart-class.js';
//import '../backend/backend.js';

Promise.all([
 loadProductsFetch()
 ,
new Promise((resolve)=>{
    loadCart(()=>{
     resolve('resolved');
    });
  })

]).then((values)=>{
  console.log(values);
  renderOrderSummary();
  renderpaymentSummary();
});



// this helps us to understand how to use promise class 
// new Promise((resolve)=>{
//   loadProducts(()=>{
//     resolve();
//   })
// }).then(()=>{
//  return new Promise((resolve)=>{
//     loadCart(()=>{
//      resolve();
//     })
//   })
// }).then(()=>{
//   renderOrderSummary();
//   renderpaymentSummary();
// })





// this makes more nested code
// loadProducts(()=>{
//   loadCart(()=>{
//    renderOrderSummary();
//    renderpaymentSummary();
//   })
// });



