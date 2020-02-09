
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import Pagination from "react-js-pagination";
import { Animated } from "react-animated-css";
import PokemonFeatures from '../components/PokemonFeatures';
import Loading from '../components/generalComponents/Loading';

import PokemonItem from "../assets/pokemonItem.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import '../styles/Index.scss';

const PokemonHome = () => {
    const [dataPokemon, dataSet] = useState(false);
    const [activePage, setActivePage] = useState(1);
    const dispatch = useDispatch();
    const { loading, dropdown } = useSelector(state => state.front);
    const initialUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=5';

    useEffect(() => {
        getDataFromService(initialUrl);
    }, [])

    const getDataFromService = (url) => {
        dispatch({ type: 'SET_LOADING'})
        Axios({
            url: url,
            method: 'get'
        }).then(function(response) {
            dataSet(response);
            dispatch({ type: 'SET_LOADING' })
        })
    }

    const handlePageChange = (pageNumber) => {
        const newUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=' + pageNumber * 5 + '&limit=5';
        getDataFromService(newUrl);
        setActivePage(pageNumber);
    }

    const toggleDetails = (getItem) => {
        const setPayload = getItem !== dropdown ? getItem : false;
        dispatch({ type: 'OPEN_DROPDOWN', payload: setPayload })
    }

    return (
        <div className="wrapper">
            { loading ? <Loading/> : ''}
            { dataPokemon ? 
                <div>
                    <div className="pokemonHeader">Pokemon App</div>
                    <div className="pokemonList">
                        { dataPokemon.data.results.map((item) => {
                            return <div key={item.name} className="pokemonWrapper d-flex">
                                <div className="pokemonItemImage">
                                    <img src={PokemonItem} alt="pokemon item image" width="50" height="50"/>
                                </div>
                                <div className="pokemonContent">
                                    <div className="title">Nombre: {item.name}</div>
                                    <div className="details d-flex" 
                                        onClick={() => toggleDetails(item.name)}>
                                            { dropdown === item.name ? 
                                                <div className="detailTitle mr-2">Ver menos</div>
                                                : <div className="detailTitle mr-2">Ver más</div>
                                            } 
                                            { dropdown === item.name ? 
                                                <FontAwesomeIcon icon={faAngleRight} /> 
                                                : <FontAwesomeIcon icon={faAngleDown} /> 
                                            } 
                                    </div>
                                    { dropdown === item.name ?
                                        <Animated 
                                            animationIn="slideInLeft" 
                                            animationOut="slideOutUp" 
                                            animationInDuration={500} 
                                            animationOutDuration={500} 
                                            isVisible={dropdown === item.name ? true : false}>
                                                <div className="dropdownWrapper">
                                                    <PokemonFeatures features={item}/>
                                                </div>
                                        </Animated>
                                    : '' }
                                    <div></div>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className="paginationWrapper">
                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={5}
                            totalItemsCount={dataPokemon.data.count}
                            pageRangeDisplayed={5}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
            : '' }
        </div>
    )
}

export default PokemonHome;
