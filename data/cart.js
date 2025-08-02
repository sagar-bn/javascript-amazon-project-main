export  let cart ;

 loadFromStorage();

export function loadFromStorage(){
cart =JSON.parse(localStorage.getItem('cart'));
if(!cart){
  cart =[
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
}


export function saveToCart(){
  localStorage.setItem('cart',JSON.stringify(cart));
  return countItem();
}



export function addToCart(productId, quantity = null) {
  let selectedQuantity = quantity;

  if (selectedQuantity === null) {
    const select = document.querySelector(`.js-select-quantity-${productId}`);
    selectedQuantity = Number(select?.value || 1);
    if (select) select.value = 1;
  }

  let MatchingProduct;
  cart.forEach((item) => {
    if (productId === item.productId) {
      MatchingProduct = item;
    }
  });

  if (MatchingProduct) {
    MatchingProduct.quantity += selectedQuantity;
  } else {
    cart.push({
      productId,
      quantity: selectedQuantity,
      deliveryOptionId: '1'
    });
  }

  saveToCart();
}


export function removefromCart(productId){
  let newCart =[];
  cart.forEach((cartItem)=>{
    if(productId != cartItem.productId){
      newCart.push(cartItem);
    }
  })
  cart= newCart;

  saveToCart();
};
export function countItem(){
  let count=0;
  cart.forEach((cartItem)=>{
     count++;
  });
  return count;
}
export function updateDeliveryOption(productId,deliveryOption){
  cart.forEach((cartItem)=>{
     if(cartItem.productId===productId){
      cartItem.deliveryOptionId= deliveryOption;
      saveToCart();
     }
    
  });
}

export function updateQuantity(number, updateProductId) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === updateProductId) {
      cartItem.quantity = number;
      
    }  
  });
}