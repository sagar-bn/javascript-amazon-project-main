let HTML='';
products.forEach((products)=>{
 HTML += `       <div class="product-container ">
          <div class="product-image-container">
            <img class="product-image"
              src="${products.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${products.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${products.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${products.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(products.priceCents/100).toFixed(2)}
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

          <div class="product-spacer"></div>

          <div class="added-to-cart">
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


let MatchingProduct;
document.querySelectorAll('.js-add-to-cart')
.forEach((button)=>{
  button.addEventListener('click',()=>{
    const productId = button.dataset.productsId; 
   const select = document.querySelector(`.js-select-quantity-${productId}`);
  const selectedQuantity=Number(select.value);
   select.value=1;
 


   cart.forEach((item)=>{
    if(productId === item.productId){
      MatchingProduct= item;
    }
   });
   if(MatchingProduct){
    MatchingProduct.quantity += selectedQuantity;
   }
   else{
     cart.push({
    productId:productId ,
    quantity : selectedQuantity
     });}
      let cartQuantity=0;
      cart.forEach((item)=>{
        cartQuantity += item.quantity;
      });

      document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
     
  console.log(cart);
  });
});




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
  