
import React, { Component } from 'react';
import '../../styles/DashboardComponents/FooterDashboard.scss';

class FooterDashboard extends Component {

  render() {

    return (
      <tr className="footerTable">
        <td className="time-id">
          <table>
            <tbody>
              <tr className="time">
                <td>20s</td>
                <td>40s</td>
                <td>60s</td>
                <td>80s</td>
                <td>100s</td>
              </tr>
            </tbody>
          </table>
        </td>
        <td className="time-id">
          <table>
            <tbody>
              <tr className="time">
                <td>120s</td>
                <td>140s</td>
                <td>160s</td>
                <td>180s</td>
                <td>+2min</td>
              </tr>
            </tbody>
          </table>
        </td> 
        <td className="time-service">
          <table>
            <tbody>
              <tr className="time">
                <td>20s</td>
                <td>40s</td>
                <td>60s</td>
                <td>80s</td>
                <td>100s</td>
              </tr>
            </tbody>
          </table>
        </td>
        <td className="time-service">
          <table>
            <tbody>
              <tr className="time">
                <td>120s</td>
                <td>140s</td>
                <td>160s</td>
                <td>180s</td>
                <td>+2min</td>
              </tr>
            </tbody>
          </table>
        </td>
        <td className="time-monitoring">
          <table>
            <tbody>
              <tr className="time">
                <td>20s</td>
                <td>40s</td>
                <td>60s</td>
                <td>80s</td>
                <td>100s</td>
              </tr>
            </tbody>
          </table>
        </td> 
        <td className="time-monitoring">
          <table>
            <tbody>
              <tr className="time">
                <td>120s</td>
                <td>140s</td>
                <td>160s</td>
                <td>180s</td>
                <td>+2min</td>
              </tr>
            </tbody>
          </table>
        </td>
        <td className="time-monitoring">
          <table>
            <tbody>
              <tr className="time">
                <td>20s</td>
                <td>40s</td>
                <td>60s</td>
                <td>80s</td>
                <td>100s</td>
              </tr>
            </tbody>
          </table>
        </td>
        <td className="time-outcome">
          <table>
            <tbody>
              <tr className="time">
                <td>120s</td>
                <td>140s</td>
                <td>160s</td>
                <td>180s</td>
                <td>+2min</td>
              </tr>
            </tbody>
          </table>
        </td> 
      </tr>
    );
  }
}

export default FooterDashboard;
