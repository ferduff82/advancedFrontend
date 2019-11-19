
/* Las clases en ES6 son "Sintactic Sugar", es decir que solo son visuales, 
under the hood siguen siendo prototipos trabajando. Es decir que las clases no son nativas */

// EJ:

class Vehicle {
	constructor (description, wheels) {
		this.description = description;
		this.wheels = wheels;
	}
	describeYourself() {
		console.log(`I am a ${this.description} whith ${this.wheels} wheels`);
	}
}

var coolSkiVan = new Vehicle('cool ski van', 4);
coolSkiVan.describeYourself();

class SemiTruck extends Vehicle {
	constructor() {
		super('semi truck', 18)
	}
}

var groceryStoreSemi = new SemiTruck();
groceryStoreSemi.describeYourself();
