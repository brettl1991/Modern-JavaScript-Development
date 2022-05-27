'use strict';
//this code is about a very simple budget application
//we need to clean as much as possible, the bad code will be commented out and underneath will be the clean version

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

//Object.freeze it's just freeze the first level of code so we can still do this:
// budget[0].value = 10000;
// //so we just can not add new elemen
// budget[9] = 'jonas';

//make immutable: so we can not add new property to it,
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

const getLimit = (limits, user) => limits?.[user] ?? 0;

//Pure function
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase(); //that is why Uppercase Matilda works just fine below

  // let lim;
  // if (spendingLimits[user]) {
  //   lim = spendingLimits[user];
  // } else {
  //   lim = 0;
  // }

  // const limit = spendingLimits[user] ? spendingLimits[user] : 0;//or getLimit above

  return value <= getLimit(limits, cleanUser)
    ? // budget.push({ value: -value, description, user: cleanUser });
      //instead this we want to return an array but with one more obj, this will create a copy of the state array
      [...state, { value: -value, description, user: cleanUser }]
    : state;
};
//because of immutabality we can not add them to it, but we can fix (addExpense is an inpure function as produces side effects becuse addExpense trying to mutate the outside object)
//so we can fiz by adding all the data in to the function and in this way the func does not need to look for outside data, so we need to create a copy and return that copy of the sate(data)
//the state will be the budget obj and the limits will be the spendingLimits
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');

const newBudget2 = addExpense(
  newBudget1, //we passed this in to adding to the previos and not just to simple budget
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay'); //does not matter as Jay not allowed to add anything

//this functions check if non of the values exceeds the spending limit

//Data transformation: transform this func to a pure func
// const checkExpenses = function (state, limits) {
//   //so when the value less than the limit we want to copy the obj and add the new property  flag on to that copy
//   return state.map(entry => {
//     return entry.value < -getLimit(limits, entry.user)
//       ? { ...entry, flag: 'limit' }
//       : entry;
//   });
//{
//   for (const entry of newBudget3)
//     if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit';
// };
// };

//transform to an arrow func the above, basically to pure func

const checkExpenses = (state, limits) =>
  state.map(
    entry =>
      entry.value < -getLimit(limits, entry.user)
        ? { ...entry, flag: 'limit' } //copy of original entry plus flag property
        : entry //original entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

//Impure function(all console.log is impure as put sume input output in the console)
//this function loops over all of the entries in budget array and whenever we have a big expense than add an emojy to the output
const logBigExpenses = function (state, biglimit) {
  // let output = '';
  // {
  //   if (entry.value <= -limit) {
  //     output += `${entry.description.slice(-2)} +  / `; // Emojis counts 2 chars that is why -2
  //   }
  // for (const entry of budget)
  //   output +=
  //     entry.value <= -biglimit ? `${entry.description.slice(-2)} / ` : '';
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
  //instead of these:
  const bigExpenses = state
    .filter(entry => entry.value <= -biglimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  //or another way:
  //.reduce((str, cur) => `${str} / ${cur.description.slice(-2)}`, '');
  console.log(bigExpenses); //new iphone, new laptop array in the console
};

logBigExpenses(finalBudget, 500);
