
//Let funciona como variable en scope local:

var x = 10;

if (x) {
 var x = 5
}

console.log(x) // 5

var x = 10;

if (x) {
 let x = 5
}

console.log(x) // 10