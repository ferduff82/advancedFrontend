
import React, { Component } from 'react';
import _ from 'lodash';

class statusTemplate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataReceived: []
    };
  }

  componentWillReceiveProps() {
    if (this.props.dataValues !== null) {
      this.setState({dataReceived: this.props.dataValues})
    }
  }

  render() {
    const chunk = _.chunk(this.state.dataReceived, 5),
          reverseRows = _.reverse(chunk);
    return (
      <table className="w-100 inner-table">
        <tbody>
          { reverseRows.map((row) => (
            <tr>
              {row.map((col) => (
                <td className="circle-client-container"><div className="circle-client"></div></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default statusTemplate;
