import {products, getProduct} from '../../data/products.js';
import {currencyFormating} from '../utils/utitility.js';  
import { cart,countItem } from '../../data/cart.js';
import { deliveryOptions,getdeliveryOption } from '../../data/deliveryOption.js';
import { addOrder } from '../../data/order.js';

export function renderpaymentSummary(){
  let productPriceCents=0;
  let shippingCharge=0;
  let Html ='';
   cart.forEach((cartItem)=>{
    let productId =cartItem.productId;
    const product =getProduct(productId);
    let deliveryOptionId= cartItem.deliveryOptionId;
    const deliveryOption = getdeliveryOption(deliveryOptionId);
    productPriceCents += product.priceCents * cartItem.quantity;
    shippingCharge += deliveryOption.priceCents;
   });

  const totalBeforeTax= productPriceCents+shippingCharge;
  const taxTenPerCent = totalBeforeTax * 0.1;
  const finalTotal = totalBeforeTax + taxTenPerCent;

  Html += `
   <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${countItem()}):</div>
            <div class="payment-summary-money">$${currencyFormating(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${currencyFormating(shippingCharge)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${currencyFormating(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${currencyFormating(taxTenPerCent)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${currencyFormating(finalTotal)}</div>
          </div>

          <button class="place-order-button button-primary
          js-place-order">
            Place your order
          </button>
        </div>
  `;
 document.querySelector('.js-payment-summary').innerHTML=Html;

 document.querySelector('.js-place-order')
  .addEventListener('click',async ()=>{
    try{
        const response =await fetch('https://supersimplebackend.dev/orders',{
      method : 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        cart : cart
      })
    });
    const order = await response.json();
    console.log(order);
    addOrder(order);
    }
    catch(error){
      console.log('Unexpected error. Try again later.');
    }
 
   window.location.href='orders.html';
  });
}