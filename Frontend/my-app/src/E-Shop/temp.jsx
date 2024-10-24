let itemss = [
    { "Product": "Car", "Count": 0 },
    { "Product": "Bike", "Count": 5 },
    { "Product": "Cycle", "Count": 8 },
    { "Product": "Train", "Count": 7 }];

console.log("Inital state when we started", itemss)
// const Cart=item[2].Count;
// console.log("Count:",Cart)

let index = itemss.findIndex((product )=> {
    return product.Product == "Train"
});
console.log("Train is present on index: ", itemss[index].Count)

itemss[index].Count = itemss[index].Count + 1
// print it
console.log(itemss)

let count =itemss.map((curElement)=>curElement.Count)
let sum = 0; 
for (let i = 0; i < count.length; i++) 
{ sum += count[i];}
 console.log("Sum",sum)

 //array destrac
let arr = [4,15,8,6];
let [Count,a,c,d] = arr;
console.log("Count",Count,a,c,d);
