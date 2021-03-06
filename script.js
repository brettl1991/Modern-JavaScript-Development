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
// console.log('Importing module');

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
import add, { cart } from './shoppingCart.js';
add('pizza', 2); //2 pizza added to cart
add('bread', 5); //5 bread added to cart
add('apples', 4); //4 bread added to cart

console.log(cart); //(3)??[{???}, {???}, {???}] we have this array with objects we added above:
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
// console.log(ShoppingCart2); //{cart: Array(2), totalPrice: 237, totalQuantity: 23, addToCart: ??}
// console.log(ShoppingCart2.shippingCost); //undefined

//these above works because of closure (allow a func to have access to all variables which present on it's birthplace)
//the problem with module patterns is if we wanted 1 module per file we need to create different scripts and link them to html file

//COMMON JS MODULES (NOT NATIVE ES6 MODULES)
//exist in nodjs as well, nodejs: is the way of running js on a webserver outside of the browser

//export
// export.addToCart =function (product, quantity) {
//         cart.push({ product, quantity });
//         console.log(
//           `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
//         );
//     }; //it wont work in browser but will work in nodejs

//     //import
//     const {addToCart} = require('./shoppingCart.js')//require not defined in browser but defined in nodejs

// //COMMAND LINE
//ls - shows contents of current folder
//cd - change directory
//../.. - move up 2 levels
//clear - clear the console
//mkdir foldername - create a new folder
//touch index.html - create index.html file and we can add multiple files just writing one after an other
//rm index.html - deleting index.html
// mv script2.js ../ - moving script2.js in to the parent folder
//rmdir TEST - remove (TEST) empty folder
// rm -R TEST -  remove any directory

//NPM- NODE PACKAGE MANAGER
//both a software on our computer and a package repository
//npm -v            with this we can check if it is installed and which version is on our computer
// npm init         with this we initialising it and will ask couple of questions, we just need to keep hit enter and will be creted a {package.json} file: this file stores the entire configuration of our file

//we installing the leaflet library but this time using npm not html script tags: npm install leaflet    npm to call than install or i in short version of install than library name: with this we got leaflet current version in package.json file, we got node_modules folder which basically the code of the leaflet libraray
//if we want to use this library we need module bundler, without it we can not directly import to our code

//install most popular js library: lodash: collection of useful functions
//we need cloneDeep.js from the library: this is a default export
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
//we created a deeply nested object
const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

//copy of an object
const stateClone = Object.assign({}, state);
console.log(stateClone); //get back same nested obj above
state.user.loggedIn = false;
console.log(stateClone); //become loggedIn false

// instead use loadesh function
const stateDeepClone = cloneDeep(state);
console.log(stateDeepClone); //will be cloned

//if you want to move your project to an other computer or share it with an other developer or check with git version controle: in all these cases you never EVER include the node_modules!!!!! so we can delete the modules folder than type - npm i - in the terminal and we get back or .gitignore

//BUILDING WITH PARCEL AND NPM SCRIPTS
// Parcel is the module bundler or Webpack in react world

//to install:        npm i parcel --save-dev
// a dev dependency has been created in package.json, to use parcel we can use: npx: npx parcel index.html (if error happen use sudo nmp i parcel, if this still does not work install the exact version of parcel: npm uninstall parcel than npm i parcel@1.12.4, )
//  or use: nmp scripts

//the goal of using parcel to bundle scripts: in this file script, cloneDeep.js and shoppingCart.js
//dist folder has been created which we will send for production
//with parcel we can implement this: hot module replacement: whenever we change the modules, then trigger the rebuild, and that modified bundle automatically get injected in the borwser without triggering the whole page reload
if (module.hot) {
  module.hot.accept();
}

//in module bundler we dont need to specify a path to any module like above with cloneDeep instead we just want to include the loadash library:
import cloneDeep from 'lodash-es';

//using npm scripts: basically when we are creating a new script in package.json by scripts: that is mainly how we do it in development
//parcel index.html
//than type in the console:
//npm run start

//final bundle: adding other script (build) to package.json

//we can also intall packages globally but better to install locally like we did it before
//npm i parcel -g

//CONFIGURING BABEL AND POLYFILLING
//we want our application to work for everyone, even for windowx xp users as well
//Babel transfyling our code to ES5: Babel works with plugins and presets that both can be configured
//basically parcel doing us to convert our code to ES5

class Person {
  greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas'); //Hey, Jonas

console.log('Jonas' ?? null); //Jonas

//find products in a cart that is added more than once
console.log(cart.find(el => el.quantity >= 2)); //{product: 'pizza', quantity: 2} find method has not been converted to ES5
//same true for promises
Promise.resolve('TEST').then(x => console.log(x)); //TEST

//The reason Babel just only can transpyle js syntax, so new features like promises or all the array methods can not be converted
// so these new features we have to polyfill them
//we using for this a library

import 'core-js/stable';
//npm i core-js
//so with plyfill the code in other js script still the same (find and promise), it does recreate the find func and make it available in this budle, so the code can use it, so if we search for array.prototype where all the array method were put togeter we can see Babel converted it
//this library polyfill everything, even that we dont use, we can also just cherry-pick what we want it to be converted but will reduce the bundle size:
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

//we always need to install: this for polyfilling async functions
//npm i regenerator-runtime
import 'regenerator-runtime/runtime';
