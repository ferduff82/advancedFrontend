
import React from "react";

import "../styles/components/UploadDocumentation.scss"

class HolidaysData extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: {
                dni: '',
                cv: '',
                titulo: '',
                loadDni: '',
                loadDni: '',
                loadDni: ''
            }
        };
    }

    componentDidMount() {
        const dataInfo = this.props.dataInfo;
        const { path_dni } = dataInfo.provider;
        const that = this;

        function initialData() {
            if (dataInfo === undefined) {
                initialData() 
            } else {
                that.setState({
                    imagePreviewUrl: {
                        path_dni: path_dni
                    }
                })
            }
        } initialData();
    }
    
    _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
        reader.readAsDataURL(file)
    }

    render() {
        if (this.props.dataInfo.provider) {
            return (
                <div className="uploadDocumentationWrapper">
                    <div className="d-flex">
                        <div className="columnUpload">
                            <label for="upload-photo-dni" className="btn btn-active inputfile" >Cargar DNI</label>
                            <input type="file" name="Cargar DNI" id="upload-photo-dni" />
                            <div className="imgPreview">
                                {this.state.imagePreviewUrl ? <img src={this.state.imagePreviewUrl.path_dni} /> : ''}
                            </div>
                        </div>
                        <div className="columnUpload">
                            <label for="upload-photo-cv" className="btn btn-active inputfile" >Cargar CV</label>
                            <input type="file" name="Cargar CV" id="upload-photo-cv" />
                            <div className="imgPreview">
                                {this.state.imagePreviewUrl ? <img src={this.state.imagePreviewUrl.cv} /> : ''}
                            </div>
                        </div>
                        <div className="columnUpload">
                            <label for="upload-photo-titulo" className="btn btn-active inputfile" >Cargar Título</label>
                            <input type="file" name="Cargar Título" id="upload-photo-titulo" />
                            <div className="imgPreview">
                                {this.state.imagePreviewUrl ? <img src={this.state.imagePreviewUrl.titulo} /> : ''}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="columnUpload">
                            <label for="upload-photo-seguro" className="btn btn-active inputfile" >Cargar Seguro</label>
                            <input type="file" name="Cargar Seguro" id="upload-photo-seguro" />
                            <div className="imgPreview">
                                {this.state.imagePreviewUrl ? <img src={this.state.imagePreviewUrl.dni} /> : ''}
                            </div>
                        </div>
                        <div className="columnUpload">
                            <label for="upload-photo-afip" className="btn btn-active inputfile" >Cargar AFIP</label>
                            <input type="file" name="Cargar AFIP" id="upload-photo-afip" />
                            <div className="imgPreview">
                                {this.state.imagePreviewUrl ? <img src={this.state.imagePreviewUrl.dni} /> : ''}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="uploadDocumentationWrapper"></div>
            )
        }
    }
}

export default HolidaysData;
