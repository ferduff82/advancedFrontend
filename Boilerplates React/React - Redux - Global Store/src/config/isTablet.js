/**
 * Retorna si el dispositivo es Tablet o no
 * @return {boolean}   es Tablet
 */
const isTablet = (() => {
    let check = navigator.userAgent.indexOf('iPad') !== -1 || (navigator.userAgent.indexOf('Android') !== -1 && !((navigator.userAgent.indexOf('Android') !== -1 && navigator.userAgent.indexOf('Mobile') !== -1) || navigator.userAgent.indexOf('Mobile') !== -1));
  return check;
})();

export default isTablet;
