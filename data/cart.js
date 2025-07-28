export const cart =[];

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
