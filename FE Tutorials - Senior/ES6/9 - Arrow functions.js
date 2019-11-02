
//Lo más interesante de las arrow functions es el "Lexical this", ej:

this.nums.forEach((v) => {
  if (v % 5 === 0) 
    this.fives.push(v)
})

/*
Las arrow function utilizan Lexical que significa que el this puede utilizarse dentro de la arrow function
sin perder el contexto, lo logra utilizando "LEXICAL SCOPING" que toma "this" del código que contiene a la 
Arrow function.
(La arrow function al retornar el valor contenido alcanza el scope padre que la contiene 
y por eso el this toma el contexto padre en lugar del contexto del forEach del ejemplo).

https://hackernoon.com/javascript-es6-arrow-functions-and-lexical-this-f2a3e2a5e8c4
*/