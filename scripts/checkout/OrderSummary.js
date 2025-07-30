import {cart, removefromCart, saveToCart,updateDeliveryOption ,updateQuantity} from '../../data/cart.js';
import {products,getProduct} from '../../data/products.js';
import {currencyFormating} from '../utils/utitility.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getdeliveryOption } from '../../data/deliveryOption.js';
import { renderpaymentSummary } from './PaymentSummary.js';

export function renderOrderSummary() {
  let OrderSummary = '';
  cart.forEach((cartItem) => {
              const productId = cartItem.productId;
              const MatchingProduct=getProduct(productId);
              const deliveryOptionId =cartItem.deliveryOptionId;
              const deliveryOption = getdeliveryOption(deliveryOptionId);
              
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
                HTML += ` <div class="delivery-option js-delivery-option" data-product-id="${MatchingProduct.id}"
                          data-delivery-option="${deliveryOption.id}"">
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
  //for deleting specific item
  document.querySelectorAll('.link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.deleteId;
        removefromCart(productId);
        updateCount();
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        if (container) container.remove();
        saveToCart();
        renderOrderSummary();
        renderpaymentSummary();
      });
    });


  //update quantity
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
              renderOrderSummary();
              renderpaymentSummary();
            });
          }
        }, 0);
      });
    });

  //select delivery option
  document.querySelectorAll('.js-delivery-option')
   .forEach((element)=>{
    element.addEventListener('click',()=>{
      const {productId,deliveryOption} = element.dataset;
      updateDeliveryOption(productId,deliveryOption);
      renderOrderSummary();
      renderpaymentSummary();
    })
  });

// update the items count
 function updateCount() {
  let counts = saveToCart();
  document.querySelector('.js-checkout-itemCount').innerHTML = `${counts} items`;
}


updateCount();
}