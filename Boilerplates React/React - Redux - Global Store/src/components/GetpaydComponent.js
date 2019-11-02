
import React from "react";

import "../styles/components/GetPaydProccess.scss";

class SuccessPost extends React.PureComponent {

    constructor(props) {
		super(props);
		this.state = {
            stepValue: 1
		}
    }
    
    goToPage(page) {
        this.setState({
            stepValue : page
        })
    }

    render() {

        return (
            <div className="getPaydProccessWrapper">

                <div className="pagesContainer d-flex justify-content-center">
                    <div className={this.state.stepValue === 1 ? "firstPage active" : "firstPage"}>1</div>
                    <div className={this.state.stepValue === 2 ? "secondPage active" : "secondPage"}>2</div>
                </div>

                {this.state.stepValue === 1 ? 
                    <div className="uploadBill">
                        <div className="m-auto d-block text-center titleBill">
                            Subir Factura
                        </div>
                        <div className="uploadInputContainer">
                            <label htmlFor="upload-photo-cv" className="btn btn-active uploadButton" >+</label>
                            <input type="file" className="btn btn-active d-none" id="upload-photo-cv"/>
                        </div>
                        <div className="imagePreviewWrapper">

                        </div>
                        <div className="buttonNext">
                            <button className="btn btn-active" onClick={() => this.goToPage(2)}>Siguiente</button>
                        </div>
                    </div>
                : <div className="addAmountWrapper">
                    <input type="number" placeholder="Ingrese el monto a cobrar" className="form-control"/>
                    <button className="btn btn-active">Cobrar</button>
                    <div className="buttonBack">
                        <button className="btn btn-active" onClick={() => this.goToPage(1)}>&lt; Volver</button>
                    </div>
                </div> }
            </div>
        )
    }
}

export default SuccessPost;
