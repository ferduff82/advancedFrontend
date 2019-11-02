
 //Async con promesas:

 const delay = seconds => {
   return new Promise(
     resolve => setTimeout(resolve, seconds * 1000)
   )
 }

 const countToFive = async() => {
   console.log('zero seconds');
   await delay(1)
   console.log('one seconds');
   await delay(1);
   console.log('two seconds');
   await delay(3);
   console.log('five seconds');
 }

 countToFive();