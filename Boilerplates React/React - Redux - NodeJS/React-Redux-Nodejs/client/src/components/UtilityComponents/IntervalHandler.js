import { useEffect, useRef } from 'react';

//Set de intervalos con limpieza de intervalo para evitar bugs y facilitar el uso en react
// ALEJANDRO ALFONZO
/*
    useInterval(() => {LOGICA}, INTERVALO);
    
    EJEMPLO DE USO :
    useInterval(() => {
        setCount(count + 1);
    }, 1000);
*/
function intervalHandler(callback, delay) {
  const savedCallback = useRef();

  // Recuerda el ultimo Callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Setea el intervalo
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default intervalHandler;