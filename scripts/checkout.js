import {cart, removefromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {currencyFormating} from './utils/utitility.js';
let OrderSummary = '';


cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let MatchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      MatchingProduct = product;
    }
  })


OrderSummary += ` <div class="cart-item-container js-cart-item-container-${MatchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
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
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary link" 
                  data-delete-id="${MatchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${MatchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${MatchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${MatchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shippings
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
`
});
document.querySelector('.js-order-summary').innerHTML = OrderSummary;



document.querySelectorAll('.link')
.forEach((link)=>{
   link.addEventListener('click',()=>{
     const productId = link.dataset.deleteId;
     removefromCart(productId);

     const container = document.querySelector(`.js-cart-item-container-${productId}`);
     container.remove();
   })
})
 
