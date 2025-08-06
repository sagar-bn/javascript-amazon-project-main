import { orders } from '../data/order.js';
import { getProduct } from '../data/products.js';
import { dateformat } from './utils/dateformate.js';
import { currencyFormating } from './utils/utitility.js';
import { loadProductsFetch } from '../data/products.js';

loadProductsFetch().then(() => {
  renderOrderPlaced();
});
function renderOrderPlaced() {
  let Html = '';
  orders.forEach((order) => {
    let productHtml = '';
    order.products.forEach((product) => {
      const productId = product.productId;
      let MatchingProduct;

      MatchingProduct = getProduct(productId);



      productHtml += `
        <div class="product-image-container">
              <img src="${MatchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${MatchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on:${dateformat(product.estimatedDeliveryTime)}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${productId}">
  <button class="track-package-button button-secondary">
    Track package
  </button>
</a>
          </div>
   `;


    })

    Html += `
   <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dateformat(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${currencyFormating(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
     
       ${productHtml}
 
            </div>
          </div>
        </div>


  `;

  })
  document.querySelector('.js-placed-orders').innerHTML = Html;
}
