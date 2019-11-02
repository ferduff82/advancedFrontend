
import React, { Component } from 'react';
import ModalTemplate from '../ModalTemplate';
import '../../styles/Chat.scss';
import _ from 'lodash';
import DBConnection from '../DBConnection';

// Redux
import { connect } from 'react-redux';
import { getAuthThunk } from '../../store/actions/authActions';
import { hideLoaderChat, showLoaderChat } from '../../store/actions/chatLoadingActions'

class Chat extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dataChat : [],
            inputValue : ''
        }
    }

    componentDidMount() {

        const that = this,
              firestore = DBConnection.firestore(),
              query = firestore.collection('events').doc('messages');

        that.props.showLoaderChat();

        query.get().then((documentSnapshot) => {
            if (documentSnapshot.exists) {
                documentSnapshot.ref.collection(this.props.dataUser).orderBy("dt", "desc").limit(15).get().then((subSnapshot) => {
                    that.props.hideLoaderChat();
                    var tempArray = [];
                    subSnapshot.forEach((content) => {
                        tempArray.push(content);
                    });
                    that.setState({ dataChat: _.reverse(tempArray) })
                });
            } else {
                console.log('document not found');
            }
        })
    }

    setInputValue(e) {
        this.setState({inputValue: e.target.value})
    }

    postDataConversation(postValue) {
        console.log(postValue);
    }

    componentDidUpdate() {
        this.props.triggerScroll();
    }

    render() {
        return (
            <div className="chatWrapper">
                {this.state.dataChat.map((content, index) => (
                    <div key={index} className={content.data().user_id === 'uma'? 'conversationWrapper umaChat' : 'conversationWrapper userChat'}>
                        <div className="left-column"></div>
                        <div className="conversation">
                            <div>{content.data().msg}</div>
                            <div>{content.data().dt}</div>
                            <div>{content.data().user_id}</div>
                        </div>
                        <div className="right-column"></div>
                    </div>
                ))}
                <div className="postDataWrapper">
                    <input className="inputChat" placeholder="Conversar con el usuario" onChange={(e) => this.setInputValue(e)}></input>
                    <button className="sendButton btn btn-active" onClick={() => this.postDataConversation(this.state.inputValue)}>Enviar</button>
                </div>
            </div>
        );
    }
}

const ChatWrappedWithModal = ModalTemplate(Chat);

/*
export default ChatWrappedWithModal;
*/

const mapDispatchToProps = dispatch => {
    dispatch(getAuthThunk())
    return {
        showLoaderChat: () => { dispatch(showLoaderChat()) },
        hideLoaderChat: () => { dispatch(hideLoaderChat()) }
    }
}

export default connect(null, mapDispatchToProps)(ChatWrappedWithModal);
