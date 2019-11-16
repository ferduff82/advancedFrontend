
// Destructuring Object

var vacation = {
	destination: "Chile",
	travelers: 2,
	activity: "skyiing",
	cost: 4000
};

function vacationMarketing({destination, activity}) {
	return `Come to ${destination} and do some ${activity}`
}

console.log(vacationMarketing(vacation));

// Destructuring Array

var foo = ["uno", "dos", "tres", "cuatro", "cinco", "seis"];

var [uno, dos, tres, ...rest] = foo; 
