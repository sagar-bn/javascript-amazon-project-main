import {cart, removefromCart, saveToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {currencyFormating} from './utils/utitility.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from '../data/deliveryOption.js';

// First: Define the helper functions
function attachDeleteListeners() {
  document.querySelectorAll('.link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.deleteId;
        removefromCart(productId);
        updateCount();
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        if (container) container.remove();
        saveToCart();
        renderCart();
      });
    });
}

function attachUpdateListeners() {
  document.querySelectorAll('.js-update')
    .forEach((update) => {
      update.addEventListener('click', () => {
        const updateProductId = update.dataset.updateId;
        update.outerHTML = `
          <input class="input-${updateProductId}" type="text" style="width: 50px;">
          <span class="saveG-${updateProductId} link-primary">Save</span>
        `;
        setTimeout(() => {
          const saveG = document.querySelector(`.saveG-${updateProductId}`);
          if (saveG) {
            saveG.addEventListener('click', () => {
              const inputBox = document.querySelector(`.input-${updateProductId}`);
              const number = Number(inputBox.value);
              updateQuantity(number, updateProductId);
              saveToCart();
              renderCart();
            });
          }
        }, 0);
      });
    });
}

// Now: renderCart (which uses those functions)
function renderCart() {
  let OrderSummary = '';
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let MatchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        MatchingProduct = product;
      }
    });
   const deliveryOptionId =cartItem.deliveryOptionId;
   let deliveryOption;
    deliveryOptions.forEach((option)=>{
      if(option.id===deliveryOptionId){
          deliveryOption = option; 
      }
    });
      const now = dayjs();
      const deliverdate = now.add(deliveryOption.delivaryDays,'days');
      const dateString= deliverdate.format(
          'dddd, MMMM D'
        );


    OrderSummary += ` <div class="cart-item-container js-cart-item-container-${MatchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${MatchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${MatchingProduct.name}
                </div>
                <div class="product-price">
                $${currencyFormating(MatchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update"data-update-id="${cartItem.productId}">
                    Update
                  </span>
                  <!--  <span class="save-area"></span> -->
                  <span class="delete-quantity-link link-primary link" 
                  data-delete-id="${MatchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>
              <div>
              ${DeliveryOptionHtml(MatchingProduct,cartItem)}
               
              </div>
            </div>
          </div>
`; 
  });

  document.querySelector('.js-order-summary').innerHTML = OrderSummary;
  attachDeleteListeners();
  attachUpdateListeners();

 }
 function DeliveryOptionHtml(MatchingProduct,cartItem){
    let HTML ='';
    deliveryOptions.forEach((deliveryOption)=>{
    const now = dayjs();
    const deliverdate = now.add(deliveryOption.delivaryDays,'days');
   const dateString= deliverdate.format(
        'dddd, MMMM D'
      );
  const ischecked = deliveryOption.id === cartItem.deliveryOptionId;
    const priceCents = deliveryOption.priceCents === 0
                        ? ' FREE'
                        : ` ${currencyFormating(deliveryOption.priceCents)}`;
     HTML += ` <div class="delivery-option">
                  <input type="radio"
                  ${ischecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${MatchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                     ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      $${priceCents} - Shippings
                    </div>
                  </div>
          </div>`;
    });
   
    return HTML;
    
  }

function updateCount() {
  let counts = saveToCart();
  document.querySelector('.js-checkout-itemCount').innerHTML = `${counts} items`;
}

function updateQuantity(number, updateProductId) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === updateProductId) {
      cartItem.quantity = number;
      
    }
  });
}

renderCart();

updateCount();




// import {cart, removefromCart,saveToCart} from '../data/cart.js';
// import {products} from '../data/products.js';
// import {currencyFormating} from './utils/utitility.js';
// //import {updateCartQuantity} from './amazon.js';


// renderCart();

// function renderCart(){
// let OrderSummary = '';


// cart.forEach((cartItem) => {
//   const productId = cartItem.productId;

//   let MatchingProduct;

//   products.forEach((product) => {
//     if (product.id === productId) {
//       MatchingProduct = product;
//     }
//   })


// OrderSummary += ` <div class="cart-item-container js-cart-item-container-${MatchingProduct.id}">
//             <div class="delivery-date">
//               Delivery date: Tuesday, June 21
//             </div>

//             <div class="cart-item-details-grid">
//               <img class="product-image"
//                 src="${MatchingProduct.image}">

//               <div class="cart-item-details">
//                 <div class="product-name">
//                   ${MatchingProduct.name}
//                 </div>
//                 <div class="product-price">
//                 $${currencyFormating(MatchingProduct.priceCents)}
//                 </div>
//                 <div class="product-quantity">
//                   <span>
//                     Quantity: <span class="quantity-label">${cartItem.quantity}</span>
//                   </span>
//                   <span class="update-quantity-link link-primary js-update"data-update-id="${cartItem.productId}">
//                     Update
//                   </span>
//                   <!--  <span class="save-area"></span> -->
//                   <span class="delete-quantity-link link-primary link" 
//                   data-delete-id="${MatchingProduct.id}">
//                     Delete
//                   </span>
//                 </div>
//               </div>

//               <div class="delivery-options">
//                 <div class="delivery-options-title">
//                   Choose a delivery option:
//                 </div>
//                 <div class="delivery-option">
//                   <input type="radio" checked
//                     class="delivery-option-input"
//                     name="delivery-option-${MatchingProduct.id}">
//                   <div>
//                     <div class="delivery-option-date">
//                       Tuesday, June 21
//                     </div>
//                     <div class="delivery-option-price">
//                       FREE Shipping
//                     </div>
//                   </div>
//                 </div>
//                 <div class="delivery-option">
//                   <input type="radio"
//                     class="delivery-option-input"
//                     name="delivery-option-${MatchingProduct.id}">
//                   <div>
//                     <div class="delivery-option-date">
//                       Wednesday, June 15
//                     </div>
//                     <div class="delivery-option-price">
//                       $4.99 - Shipping
//                     </div>
//                   </div>
//                 </div>
//                 <div class="delivery-option">
//                   <input type="radio"
//                     class="delivery-option-input"
//                     name="delivery-option-${MatchingProduct.id}">
//                   <div>
//                     <div class="delivery-option-date">
//                       Monday, June 13
//                     </div>
//                     <div class="delivery-option-price">
//                       $9.99 - Shippings
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
// `;
// });
// document.querySelector('.js-order-summary').innerHTML = OrderSummary;
// attachDeleteListeners(); // Re-bind again
//               attachUpdateListeners();

// }
// updateCount();

// document.querySelectorAll('.link')
// .forEach((link)=>{
//    link.addEventListener('click',()=>{
//      const productId = link.dataset.deleteId;
//      removefromCart(productId);
//      updateCount();
//      const container = document.querySelector(`.js-cart-item-container-${productId}`);
//       container.remove();
     
//   renderCart();
//       attachDeleteListeners(); // Re-bind again
//               attachUpdateListeners();
//    })
// });


// function updateCount(){
//  let counts = saveToCart();
//      document.querySelector('.js-checkout-itemCount').innerHTML=`${counts} items`;
    
// }

// document.querySelectorAll('.js-update')
//  .forEach((update)=>{
//   update.addEventListener('click',()=>{
//     const updateProductId = update.dataset.updateId;
//     // Replace the update span directly
//     update.outerHTML = `
//       <input class="input-${updateProductId}" type="text" style="width: 50px;">
//       <span class="saveG-${updateProductId} link-primary">Save</span>
//     `;
//     // update.remove();
//     // const save_area= document.querySelector('.save-area');
//     // save_area.innerHTML=`<input class="input-${updateProductId}" type="text"> <span class="saveG-${updateProductId}">save</span>`;
//    setTimeout(() => {
//   const saveG = document.querySelector(`.saveG-${updateProductId}`);
//   if (saveG) {
//     saveG.addEventListener('click', () => {
//       const inputBox = document.querySelector(`.input-${updateProductId}`);
//       const number = Number(inputBox.value);
//       updateQuantity(number, updateProductId);
//       saveToCart();
//       renderCart();
//        attachDeleteListeners(); // Re-bind again
//               attachUpdateListeners();
//     });   
//   }
// }, 0);
//   });
//     });
  
//   function updateQuantity(number,updateProductId){
//     let updateProuct;
//     cart.forEach((cartItem)=>{
//        if(cartItem.productId===updateProductId){
//              updateProuct =cartItem;
//              updateProuct.quantity=number;
//        }
//     })
//   }