import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {GenericHeader} from '../../GeneralComponents/Headers';
import StartCall from './StartCall';
import DBConnection from '../../../config/DBConnection';
import Rating from '../Rating/Rating';
import '@opentok/client';
import './polyfills';

export const CallContainer = (props) => {
  const dispatch = useDispatch()
  const salatoken = useSelector((state) => state.queries.callSettings)
  const calling = useSelector(state => state.call.call)
  const [call, setCall] = React.useState({room: "", token: ""})

  useEffect(() => {
    const firestore = DBConnection.firestore()
    if(salatoken.room === "") {
      console.log("ENTRO")
      try {
        let queryUser = firestore.collection('auth').where("dni", "==", props.match.params.ws)
        queryUser.onSnapshot(async function(querySnapshot) {
            await querySnapshot.forEach((each) => {
                let data = each.data()._start_date.split('///')
                if(data[0] !== salatoken.sala) {
                  console.log("Nuevo salatoken")
                  dispatch({type: 'SET_CALL_ROOM', payload: {room: data[0], token: data[1]}})
                } else {
                  console.log("No hay nuevo salatoken")
                }
            })
        })
      }
      catch (err) {
          console.error("FAILED QueryUser", err)
      }
    }
    dispatch({type: 'START_CALL'})
    setCall(salatoken)
  }, [call, dispatch, props.match.params.ws, salatoken.sala])


  return (
  <> 
    <GenericHeader onClick={() => {this.props.history.go(`/${this.props.match.params.dni}/`)}}>Atención online</GenericHeader>
    {
      salatoken.room !== "" && calling === true ?
        <StartCall sala={salatoken.room} token={salatoken.token} />
        :
      <div className="jumpin">
        <Rating  />
      </div>
    }
     </>
  )
}