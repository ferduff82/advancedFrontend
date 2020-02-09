
import React, { useEffect, useState } from "react";
import Axios from "axios";

const PokemonHome = (props) => {

    const [dataPokemonFeatures, dataSet] = useState(false);

    useEffect(() => {
        getDataFromService();
    }, [])

    const getDataFromService = () => {
        Axios({
            url: props.features.url,
            method: 'get'
        }).then(function(response) {
            dataSet(response.data);
            console.log(response.data.sprites)
        })
    }

    return (
        <div className="featuresWrapper">
            <div className="weight"><strong>Peso: </strong>{dataPokemonFeatures.weight} kilos.</div>
            <div className="experience"><strong>Experiencia: </strong>{dataPokemonFeatures.base_experience}</div>
            <div className="look">{dataPokemonFeatures.sprites ? 
                <img src={dataPokemonFeatures.sprites.front_default} alt="pokemon preview"/> : ''}
            </div>
        </div>
    )
}

export default PokemonHome;
