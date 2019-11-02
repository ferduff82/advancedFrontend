
 //ES6 introduce For of:

 //Puede iterar tanto Sets como Maps.

 for (let letter of 'Javascript') {
   console.log(letter);
 }

 var topics = ['Javascript','Node','React'];

 for (let topic of topics) {
   console.log(topic);
 }

 var prog = new Map();

 prog.set('HTML','/class/html'); 
 prog.set('CSS','/class/css');
 prog.set('Javascript','/class/javascript');
 prog.set('Node','/class/node');

 for (let pro of prog) {
   console.log(pro);
 }

 for (let pro of prog.entries()) {
   console.log(pro);
 }

 for (let pro of prog.keys()) {
   console.log(pro, 'is the course name');
 }

 for (let pro of prog.values()) {
   console.log(pro, 'where you can find these courses');
 }