export  let cart =JSON.parse(localStorage.getItem('cart'));
if(!cart){
  cart =[
  {
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2
  },
   {
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1
  }
];
}


function saveToCart(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId){
    let MatchingProduct;
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
}