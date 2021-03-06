
//Para activar el uso de Modules en html (type="module"):

<script type="module" defer src="main.js"></script>

// defer y async permiten cargar archivs JS de maner as�ncrona, async en cualquier momento y defer al final.


//Tipos de Export:

//Default se utiliza cuando solo se va a exportar 1 elemento

export default User;


//Cuando vas a exportar m�s de 1 elemente se saca el default.

export { printName, printAge }

//SE EXPORTA ESTO:

class User {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}

function printName(user) {
  console.log(`User name is ${user.age}`)
}

function printAge(user) {
  console.log(`User age is ${user.age}`)
} 


//Import:

import User from '/user.js';
import { printName, printAge } from '/user.js';


//Proveer de un namespace a todo lo que se exporte de un archivo:

import * as lib from 'lib';

//SE IMPORTA ESTO:

const user = new User('Bob', 11);
printUserName(user);
printAge(user);




//Link:

//https://www.youtube.com/watch?v=cRHQNNcYf6s