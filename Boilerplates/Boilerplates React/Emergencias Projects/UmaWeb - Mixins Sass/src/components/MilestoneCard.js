import React from 'react';
import Modal from 'react-responsive-modal';
import style from '../style.scss';

class MilestoneCard extends React.Component {
    state = {
        open: false,
    };
    
    onOpenModal = () => {
        this.setState({ open: true });
    };
    
    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
    const { open } = this.state;
    const { image, content, title} = this.props;

    return(
    <div className="main col s12 m4">
        <div className="center">
            <div className="milestone-card">
            <img className="milestone-card-bg" src={image} alt="Milestone" />
            <h5 className="milestone-card-title">{title}</h5>
            <div className="milestone-card-bg-mask" onClick={this.onOpenModal}></div>
                <div className="milestone-card-content">
                    <div className="milestone-hover">
                        <p><span className="milestone-card-text">{content}</span></p>
                    </div>
                </div>
            </div>
            <Modal open={open} 
                onClose={this.onCloseModal} 
                center
                classNames={style.modal}
                >
            <h3>{title}</h3>
            <p>{content}</p>
            </Modal>
        </div>
    </div>
    )
    }
}

export default MilestoneCard;