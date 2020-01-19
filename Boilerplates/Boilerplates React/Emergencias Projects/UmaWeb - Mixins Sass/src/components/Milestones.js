import React from 'react';
import MilestoneCard from './MilestoneCard';
import ReactTypingEffect from 'react-typing-effect';

class Milestones extends React.Component {
    render() {
    return(
    <div className="milestones">
        <div className="section">
            <div className="row">
            <div className="milestones-title">
                <ReactTypingEffect text="HITOS"></ReactTypingEffect>
            </div>
            <MilestoneCard 
                title="Lanzamiento de UMA"
                content="Curabitur ligula libero, efficitur quis porttitor eget, congue id nunc.Curabitur ligula libero, efficitur quis porttitor eget, congue id nunc."
                image={require('../assets/uma_slide.jpg')}
                />
            <MilestoneCard 
                title="Equipo de UMA"
                content="Curabitur ligula libero, efficitur quis porttitor eget, congue id nunc.Curabitur ligula libero, efficitur quis porttitor eget, congue id nunc."
                image={require('../assets/team.jpeg')}
                />
            <MilestoneCard 
                title="UMA Viral"
                content="Curabitur ligula libero, efficitur quis porttitor eget, congue id nunc.Curabitur ligula libero, efficitur quis porttitor eget, congue id nunc."
                image="https://images.pexels.com/photos/1204649/pexels-photo-1204649.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                />

        </div>
        </div>
    </div>
    )
    }
}

export default Milestones;