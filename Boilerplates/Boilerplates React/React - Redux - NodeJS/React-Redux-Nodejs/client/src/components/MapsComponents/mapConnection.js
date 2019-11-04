import React from "react";
import { withGoogleMap, withScriptjs} from "react-google-maps";
import DBConnection from '../DBConnection';
import Map from './mapComponent';
import { setUsersAuth } from '../../store/actions/mapActions';
import { connect } from 'react-redux';

class MapWithData extends React.PureComponent {
  constructor(props) {
    super(props);
    this.auxiliar = [];
    this.unsubscribe = null;
  }

  componentDidMount = ()=> {
    const firestore = DBConnection.firestore(),
          query = firestore.collection('auth'),
          self = this;

    this.unsubscribe = query.onSnapshot((snapshot)=>{
      let changes = snapshot.docChanges();
      changes.map((change)=>{
        
        let newInfo = change.doc.data();
        newInfo.id = change.doc.ref.id;
        //Filtro el tipo de cambio pusheado por firebase.-;
        //si es nueva información agrupo todo en una variable auxiliar para mejorar la performance al renderizar todo junto.
        if(change.type =='added'){
            self.auxiliar = [...self.auxiliar, newInfo];
        }
        if(change.type =='modified'){    
          self.auxiliar.map((value,index)=>{
            if(value.id == change.doc.ref.id){
              self.auxiliar[index] = newInfo;
              
            }
          })
        }    
      });
      this.props.setUsersAuth(self.auxiliar);
    })
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <Map
        center={this.props.center}
        zoom={this.props.zoom}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUsersAuth: (places) => { dispatch(setUsersAuth(places)) },
    }
}

export default connect(null, mapDispatchToProps)(withScriptjs(withGoogleMap(MapWithData)));