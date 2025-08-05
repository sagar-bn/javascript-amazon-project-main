import {renderOrderSummary} from './checkout/OrderSummary.js';
import { renderpaymentSummary } from './checkout/PaymentSummary.js';
import { loadProducts,loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';

//import  '../data/cart-class.js';
//import '../backend/backend.js';

async function loadPages(){
try{
 // throw 'error'
  await loadProductsFetch();
 // throw 'error';
   await new Promise((resolve,reject)=>{
    loadCart(()=>{
      reject();
     //resolve();
    });
  })
}
catch(error){
  console.log('error occured please try again.');
}

  renderOrderSummary();
  renderpaymentSummary();
}
loadPages();

/*
async function loadPages(){
  await loadProductsFetch();
  //async works with promise loadProduct do not return promise so creating a promie
   await new Promise((resolve)=>{
    loadCart(()=>{
     resolve();
    });
  })

  renderOrderSummary();
  renderpaymentSummary();


  const value = await new Promise((resolve)=>{
    loadCart(()=>{
     resolve('resolved');
    });
  })
  console.log(value); 


}
loadPages();

*/
/*

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
*/



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



