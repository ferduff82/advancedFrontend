/*
 ES6 introduce el concepto de mapas, guardan valores en pares, se utilizan en lugar de objetos cuando se quiere
 guardar una key que no sea un string sino puede ser un objeto, un número o un array.
 También sirve para iterar elementos en orden de inserción (ya que los objetos no pueden hacer esto).
*/

var course = new Map();

course.set('react', {description: 'ui'});
course.set('jest', {description: 'testing'});

console.log(course);
console.log(course.react);
console.log(course.get('react'));

var details = new Map([
	[new Date(), 'today'],
	['items', [1,2]]
])

console.log(details.size);

details.forEach(function(item) {
	console.log(item)
})