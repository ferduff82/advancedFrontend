
// Los generators pausan la ejecución del código y avanza solo cuando nosotros querramos.

//Ejemplo básico:

function* director() {
	yield "three";
	yield "two";
	yield "one";
	yield "action";
}

var action = director();

console.log(action.next());


//Ejemplo práctico:

function* eachItem(arr) {
	for(var i=0; i < arr.length; i++) {
		yield arr[i];
	}
}

var letters = eachItem(["a", "b", "c", "d"]);

var abcs = setInterval(function(){
	var letter = letters.next();
	if (letter.done) {
		clearInterval(abcs)
	} else {
		console.log(letter.value);
	}
}, 500);