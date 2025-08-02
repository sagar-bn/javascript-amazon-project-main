
function Cart(localStorageKey){
  const cart ={
   cartItem : undefined,

  loadFromStorage(){
  this.cartItem =JSON.parse(localStorage.getItem(localStorageKey));
  if(!this.cartItem ){
    this.cartItem =[
    {
      productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity:2,
      deliveryOptionId :'1'
    },
     {
      productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity:1,
       deliveryOptionId :'3'
    }
  ];
  }
   this.saveToCart();
  }
  ,
  
  saveToCart(){
    localStorage.setItem(localStorageKey,JSON.stringify(this.cartItem ));
    return this.countItem();
  } 
  
  ,
  
   addToCart(productId, quantity = null) {
    let selectedQuantity = quantity;
  
    if (selectedQuantity === null) {
      const select = document.querySelector(`.js-select-quantity-${productId}`);
      selectedQuantity = Number(select?.value || 1);
      if (select) select.value = 1;
    }
  
    let MatchingProduct;
    this.cartItem .forEach((item) => {
      if (productId === item.productId) {
        MatchingProduct = item;
      }
    });
  
    if (MatchingProduct) {
      MatchingProduct.quantity += selectedQuantity;
    } else {
      this.cartItem .push({
        productId,
        quantity: selectedQuantity,
        deliveryOptionId: '1'
      });
    }
  
    this.saveToCart();
  }
  
  ,
removefromCart(productId){
    let newCart =[];
   this.cartItem .forEach((cartItem)=>{
      if(productId != cartItem.productId){
        newCart.push(cartItem);
      }
    })
    this.cartItem = newCart;
  
    this.saveToCart();
  }
  ,
  countItem(){
    let count=0;
    this.cartItem .forEach((cartItem)=>{
       count++;
    });
    return count;
  }
  ,
  updateDeliveryOption(productId,deliveryOption){
      let found=false;
    this.cartItem .forEach((cartItem)=>{
    
       if(cartItem.productId===productId){
        cartItem.deliveryOptionId= deliveryOption;
        this.saveToCart();
        found =true;
       }
     
    });
     if(!found){
        console.log('no found');
      }
      
  }
  ,
  
 updateQuantity(number, updateProductId) {
   this.cartItem .forEach((cartItem) => {
      if (cartItem.productId === updateProductId) {
        cartItem.quantity = number;
        
      }  
    });
  }

};
  return cart;
}

const cart =Cart('cart-oop');

const bcart= Cart('cart-b');

cart.loadFromStorage();
// cart.addToCart('3fdfe8d6-9a15-4979-b459-585b0d0545b9');
bcart.loadFromStorage();

console.log(cart);
console.log(bcart);

