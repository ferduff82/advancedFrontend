import React, { useEffect } from 'react';
/* import Home from '../components/HomePage'; */
import Loading from '../../components/global/Utilities/Loading';
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "../../store/actions/frontActions"
import { withRouter } from "react-router-dom"
import { Header } from '../../components/global/Header';
import Menu from "./Menu"
const Home = (props) => {
    const dispatch = useDispatch()
    const { user, loading } = useSelector(state => state.front)
    // const [user, setUser] = useState(localStorage.getItem('userRegistered'))
    // const [token, setToken] = useState(localStorage.getItem('userToken'))
    // useEffect(() => {
    //     let t = localStorage.getItem('userToken')
    //     let u = localStorage.getItem('userRegistered')
    //     var userId = app.auth().currentUser.uid;
    //     if(t && t !== '' && t !== undefined) {
    //         setToken(t)
    //         setUser(u)
    //     } else {
    //         setToken(userId)
    //         setUser(props.history.params)
    //     }
    // }, [props.history.params, token, user])
    useEffect(() => {
        dispatch({
            type: "SET_LOADING"
        })
        async function setUserData() {
            const data = await getUser()
            dispatch({
                type: "SET_USER_DATA",
                payload: data
            })
            localStorage.setItem("userPhone", data.ws)
            localStorage.setItem("userCuil", data.cuit)
            console.log(data)
            dispatch({
                type: "SET_LOADING"
            })
        }
        setUserData()
    }, [])


    return (
        <>
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <Header rol={user.rol}>{user.firstname}</Header>
                        <Menu user={user} />
                    </>
            }
        </>
    )

}

export default withRouter(Home)
