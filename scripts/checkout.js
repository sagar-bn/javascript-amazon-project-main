import {renderOrderSummary} from './checkout/OrderSummary.js';
import { renderpaymentSummary } from './checkout/PaymentSummary.js';
import { loadProducts } from '../data/products.js';

//import  '../data/cart-class.js';
//import '../backend/backend.js';

loadProducts(()=>{
renderOrderSummary();
renderpaymentSummary();
}
);



