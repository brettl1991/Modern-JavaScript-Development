//exporting module
console.log('Exporting module');

//these are scoped to the current module, if we want to use somewhere else we need to use exports
//named exports
const shippingCost = 10;
export const cart = [];
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

//exports always need to happen on top level code, would not work like this:
// if (true) {
//   export const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} added to cart`);
//   };
// }

//we can export multiple values in the same time
const totalPrice = 237;
const totalQuantity = 23;
// we can also change here their names with as
export { totalPrice, totalQuantity as tq };

//default exports we use it when we only want to export 1 thing per module
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
