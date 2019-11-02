import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Home from '../components/HomePage';
import Loading from '../components/GeneralComponents/Loading';
import app from "../config/DBConnection";

const Index = (props) => {
    const dispatch = useDispatch()
    const [user, setUser] = useState(localStorage.getItem('userRegistered'))
    const [token, setToken] = useState(localStorage.getItem('userToken'))
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let t = localStorage.getItem('userToken')
        let u = localStorage.getItem('userRegistered')
        var userId = app.auth().currentUser.uid;
        if(t && t !== '' && t !== undefined) {
            setToken(t)
            setUser(u)
        } else if (false) {
            console.log(false) // 
        } else {
            setToken(userId)
            setUser(props.match.params.ws)
        }
        setLoading(false)
    }, [props.match.params.ws, token, user])

    useEffect(() => {
        // Just for permissions
        navigator.mediaDevices.getUserMedia({ audio: true, video: { facingMode: 'user' } })
            .then((res) => {
                res.getTracks().forEach(function(track) {
                    track.stop();
                  });
            })
            .catch(err => console.log(err))
        navigator.geolocation.getCurrentPosition((p) => {
            dispatch({ type: 'SET_GEOLOCATION', payload: {lat: p.coords.latitude, lng: p.coords.longitude}})
        })
        
    }, [dispatch])
    
        return(
            <> 
               { loading ? <Loading /> : <Home ws={user} /> }
            </>
        )
}

export default Index
