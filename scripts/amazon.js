import {cart,addToCart} from '../data/cart.js';
import {products,loadProducts} from '../data/products.js';
import {currencyFormating} from './utils/utitility.js';


loadProducts(renderProductGrid);

function renderProductGrid(){
      let HTML='';
      products.forEach((products)=>{
      HTML += `<div class="product-container ">
                <div class="product-image-container">
                  <img class="product-image"
                    src="${products.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                ${products.name}
                </div>

                <div class="product-rating-container">
                  <img class="product-rating-stars"
                    src="${products.getUrl()}">
                  <div class="product-rating-count link-primary">
                    ${products.getRatingCount()}
                  </div>
                </div>

                <div class="product-price">
                  $${products.getPrice()}
                </div>

                <div class="product-quantity-container" >
                  <select class="js-select-quantity-${products.id}" >
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
              <div class="appliance-links">
                  ${products.getExtenalHtml()}
                  </div>
            
                <div class="product-spacer"></div>

                <div class="added-to-cart js-added-to-cart-${products.id}">
                <img src="images/icons/checkmark.png">
                  Added
                </div>
              
                <button class="add-to-cart-button button-primary 
                js-add-to-cart" data-products-id=${products.id}>
                  Add to Cart
                </button>
              </div>
      `
      //console.log(`js-select-quantity-${products.id}`);

      });
      document.querySelector('.js-products').innerHTML=HTML;
      updateCartQuantity();

      

      document.querySelectorAll('.js-add-to-cart')
      .forEach((button)=>{
        button.addEventListener('click',()=>{
          const productId = button.dataset.productsId; 
            addToCart(productId);
            
            updateCartQuantity();
          
            addMessage(productId);

            

        console.log(cart);
        });
      });

}
export function updateCartQuantity(){
        let cartQuantity=0;
            cart.forEach((cartItem)=>{
              cartQuantity += cartItem.quantity;
            });

            document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
      }
      function addMessage(productId){
        const added = document.querySelector(`.js-added-to-cart-${productId}`);
            added.style.opacity=1;

            setTimeout(()=>{
              added.style.opacity=0;
            },2000);
            // console.log(added.innerHTML=` <img src="images/icons/checkmark.png">
            //       Added`);

      }





// document.querySelectorAll('.js-add-to-cart')
//    .forEach((button)=>{
//       button.addEventListener('click',()=>{
       
//       productId= button.dataset.productsId;
      
//        let isMatching;
//       cart.forEach((item)=>{
//          if(productId === item.productId){
//             isMatching = item;
//          }
//         });
//         if(!isMatching){
//           cart.push({
//           productId:productId,
//           quantity:1
//           });
//         }
//         else{
//           isMatching.quantity +=1;
//         }
      
//         let cartQuantity=0;
//       cart.forEach((item)=>{
//         cartQuantity += item.quantity;
//       });

//       document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
     
//       })
//    });
  