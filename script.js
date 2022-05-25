//Module: reusable piece of code, that encapsulates implementation details. Usually a stand alone file.
//Contains code but also can have imports and exports.
//Export: we can export values out of a module. And whatever we export it is called public API.
//Import: we can import values from other modules, and these other modules from which we import called dependencies of the importing module, because the code is in the module that is importing can not work without the code that is importing from the external module.
//Benefits of using modules: 1. Compose software: modules are small building blocks that we put together to build complex applications. 2.Isolate components: modules can be developed in isolation without thinking about the entire codebase. 3. Abstract code: implement low-level code in modules and import these abstractions into other modules. 4. Leads to more organised code. 5. Reuse code: allow us to reuse same code across multiple projects.

//JavaScript has a nativ built in ES6 modules system.
//Modules are stored in files, 1 module per file. Top-level variables private to modules by default. Only way that an outside module can have access to a value which is inside of a module is by exporting that value. In scripts they are global. Modules are executing always in strict mode while scripts in "sloppy" mode. In modules this keyword always undefined at the top level, while in scripts it points at the window object.In modules we can export and import just on the top level while in scripts it is impossible. All imports are hoisted. In modules HTML linking: <script type="module">. File downloading in modules happens in an async way, while in scripts files downloaded in a blocking sync way unless we using async or defer attributes on the script tag. Modules are imported synchronously thanks to top-level imports, which make imports known before execution. This makes bundling and dead code elimination possible. Import is just a reference of an exported value, so not copied. So when the value changes in the exporting module, than the same value also changes in the importing module.

//Exporting and Importing in ES6 modules

//importing module
//we can also change here their names with as
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
console.log('Importing module');

//this will be the order always as imported modules hoisted to the top always
//Exporting module
//Importing module

// console.log(shippingCost); //not defined here
// addToCart('bread', 5); //5 bread added to cart

// console.log(price, tq);

//we can import everything in the same time
// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);

//default exports and we can give any name(add)
// import add from './shoppingCart.js';
// add('pizza', 2); //2 pizza added to cart

//we can mix them in the same import statement, but dont do it :)
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// add('pizza', 2);
// console.log(price);

//imports are live connctions to export, so not copies of exports
//export cart array
// import add, { cart } from './shoppingCart.js';
// add('pizza', 2); //2 pizza added to cart
// add('bread', 5); //5 bread added to cart
// add('apples', 4); //4 bread added to cart

// console.log(cart); //(3) [{…}, {…}, {…}] we have this array with objects we added above:
// // 0: {product: 'pizza', quantity: 2}
// // 1: {product: 'bread', quantity: 5}
// // 2: {product: 'apples', quantity: 4}

// //IMPLEMENTATION OF THE MODULE PATTERN
// //create an iffy (just return once)
// const ShoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(
//       `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
//     );
//   };

//   const orderStock = function (product, quantity) {
//     console.log(`${quantity} ${product} ordered from supplier`);
//   };

//   //return a public API
//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

// ShoppingCart2.addToCart('apple', 4);
// ShoppingCart2.addToCart('pizza', 2);
// console.log(ShoppingCart2); //{cart: Array(2), totalPrice: 237, totalQuantity: 23, addToCart: ƒ}
// console.log(ShoppingCart2.shippingCost); //undefined

//these above works because of closure (allow a func to have access to all variables which present on it's birthplace)
//the problem with module patterns is if we wanted 1 module per file we need to create different scripts and link them to html file

//COMMON JS MODULES (NOT NATIVE ES6 MODULES)
//exist in nodjs as well, nodejs: is the way of running js on a webserver outseide of the browser

//export
export.addToCart =function (product, quantity) {
        cart.push({ product, quantity });
        console.log(
          `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
        );
    }; //it wont work in browser but will work in nodejs

    //import
    const {addToCart} = require('./shoppingCart.js')//require not defined in browser but defined in nodejs