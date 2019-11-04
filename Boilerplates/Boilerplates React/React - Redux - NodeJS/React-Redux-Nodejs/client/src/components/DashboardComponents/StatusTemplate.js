import React, { Component } from 'react';
import _ from 'lodash';

class StatusTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataValues: [],
      heightTr: 24,
      moreContentAvailable: false,
    }
  }

  componentWillReceiveProps() {
    if (this.props.dataValues !== null) {
        this.reduceUserAmount();
    }
  }

  reduceUserAmount() {
    var self = this,
    moreContent = false,
    multiplyDotHeight = 0,
    getDataValues = this.props.dataValues,
    getDotHeight = this.state.heightTr,
    chunk = _.chunk(getDataValues, this.props.dotDisplayNumber),
    reverseColumns = _.reverse(chunk),
    adjustContent = [];

    reverseColumns.map(function(item) {
      var increaseLength = adjustContent.length + 2;
      multiplyDotHeight = increaseLength * getDotHeight;
      let page = false;
      if(!self.props.page) {
         page = false
      } else {  page = true }
      if (multiplyDotHeight < self.props.flexHeight || page === true) {
        return adjustContent.push(item);
      } else {
        return moreContent = true;
      }
    })
    
    this.setState({
      dataValues: adjustContent,
      moreContentAvailable: moreContent
    })
  }

  // Para testear, hace console log de datos del dot al pasar por hover
  handlerOverDot(num, date, e) {
    let t = new Date(date)
    t.setSeconds(t.getSeconds() + 120);
    console.log("Whatsapp:", num, "Start date:", t);
  }

  openConversation(dataValue) {
    this.props.openModalHandler(dataValue);
  }

  render() {
    var self = this;
    
    return (
      <div>
        {this.state.moreContentAvailable ? <div className="more-values"><strong>...</strong></div> : <div></div> }
        <table className="w-100 inner-table">
          <tbody>
            {
              this.state.dataValues.map((row, index) => (
              <tr style={{"height" : this.state.heightTr + "px"}} key={index}>
                { row.map((col, index) => ( 
                col !== [] ?
                <td className="circle-client-container" key={index}>
                  <div className={[col.ws === "5491154541542" ? 'circle-client-me ' + this.props.dotStyle : 'circle-client ' + this.props.dotStyle]}
                    onClick={() => self.openConversation(col.dni)} /* onPointerEnter={this.handlerOverDot.bind(this, col.ws, col.dt_start)} */>
                  </div>
                </td>
                : <div className="circle-client-empty"></div>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default StatusTemplate;
