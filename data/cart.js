export const cart =[
  {
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2
  },
   {
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1
  }
];

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
}
