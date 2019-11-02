
/*
 ES6 introduce Sets:

 Son una collection de valores.
 Cada valor debe ser único.
 (PUEDE SER ÚTIL PARA LIMPIAR VALORES DUPLICADOS)
*/


 var books = new Set();

 books.add('Price and Prejudice');
 books.add('War and Peace');
 books.add('Oliver Twist');

 books.delete('Oliver Twist');

/* ---------------------------------- */

 var data = [3,2,2,4,3,5,3,2,6,4,6,3];

 var set = new Set(data);
 
 console.log(data.length);
 console.log(set.size);