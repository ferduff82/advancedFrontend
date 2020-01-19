
export function expireEvent(expireValue, type) {
  return (dispatch) => {
    if (type === 'expireInsurance') {
      returnExpire('INSURANCE_EXPIRE')
    } else {
      returnExpire('MATRICULA_EXPIRE')
    }

    function returnExpire(dispatchValue) {
      dispatch({
        type: dispatchValue,
        payload: expireValue
      })
    }
  }
}
