import React from 'react';
import HowWorksCard from './HowWorksCard';

const HowWorks = () => {
    return(
        <div className="howWorks-container">
          <HowWorksCard 
            textFirst="UMA envía médicos a domicilio."
            textSecond="En cualquier momento, cualquier día del año"
            image="https://images.pexels.com/photos/905874/pexels-photo-905874.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            align="left" 
            />   
          <HowWorksCard 
            textSecond="El chat interactivo hará algunas preguntas simples" 
            image="https://images.pexels.com/photos/46924/pexels-photo-46924.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            align="right"
            className="remove-space"
            />
           <HowWorksCard 
            textFirst="El médico llegará al domicilio."
            textSecond="UMA se encarga del resto."
            image={require('../assets/44388832_l.jpg')}
            align="right"
            />
        </div>
    )
}


export default HowWorks;


