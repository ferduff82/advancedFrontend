
import React from "react";
import Axios from "axios";

import { connect } from "react-redux";
import { buildPostCv, buildPostTitulo, buildPostSeguro, buildPostAfip, buildPostCelador } from '../store/actions/buildImagesPostObject';

import "../styles/components/UploadDocumentation.scss"

class HolidaysData extends React.PureComponent {

    constructor(props) {
		super(props);
		this.state = {
            imagePreviewUrl: {
                path_dni: ''
            },
            filePreview: '',
            file: ''
		}
	}

    componentDidMount() {
        const dataInfo = this.props.dataInfo;
        const { path_dni } = dataInfo.provider;
        const { documents } = dataInfo.provider;
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
                console.log(documents);
                if (documents) {
                    if (documents.cv) {that.props._buildPostCv(documents.cv)}
                    if (documents.dni) { that.props._buildPostCv(documents.dni)}
                    if (documents.titulo) {that.props._buildPostCv(documents.titulo)}
                    if (documents.seguro) {that.props._buildPostCv(documents.seguro)}
                    if (documents.afip) {that.props._buildPostCv(documents.afip)}
                }
            }
        } initialData();
    }

    render() {
        if (this.props.dataInfo.provider) {
            const { dni, cv, titulo, seguro, celador, celadorActive } = this.props;
            return (
                <div className="uploadDocumentationWrapper">
                    <div className="d-flex">
                        <div className="columnUpload">
                            <label htmlFor="upload-photo-dni" className="btn btn-active inputfile" >DNI</label>
                            <div className="imgPreview">
                                { dni ? <img src={ this.state.imagePreviewUrl.path_dni } alt="dni"/> : '' }
                            </div>
                        </div>
                        <div className="columnUpload">
                            <label htmlFor="upload-photo-cv" className="btn btn-active inputfile" >Licencia <i className="fas fa-plus-circle"></i></label>
                            <input type="file" name="Cargar CV" id="upload-photo-cv" onChange={(e) => this.props._buildPostCv(e.target.files[0])} />
                            <div className="imgPreview">
                                { cv === undefined ? '' : <img src={ cv } alt="cv"/> }
                            </div>
                        </div>
                        <div className="columnUpload">
                            <label htmlFor="upload-photo-titulo" className="btn btn-active inputfile" >Habilitación <i className="fas fa-plus-circle"></i></label>
                            <input type="file" name="Cargar Título" id="upload-photo-titulo" onChange={(e) => this.props._buildPostTitulo(e.target.files[0])} />
                            <div className="imgPreview">
                                { titulo === undefined ? '' : <img src={ titulo } alt="titulo"/> }
                            </div>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="columnUpload">
                            <label htmlFor="upload-photo-seguro" className="btn btn-active inputfile" >Seguro <i className="fas fa-plus-circle"></i></label>
                            <input type="file" name="Cargar Seguro" id="upload-photo-seguro" onChange={(e) => this.props._buildPostSeguro(e.target.files[0])} />
                            <div className="imgPreview">
                                { seguro === undefined ? '' : <img src={ seguro } alt="seguro"/> }
                            </div>
                        </div>
                        { celadorActive ? 
                            <div className="columnUpload">
                                <label htmlFor="upload-photo-celador" className="btn btn-active inputfile" >Celador <i className="fas fa-plus-circle"></i></label>
                                <input type="file" name="Cargar Celador" id="upload-photo-celador" onChange={(e) => this.props._buildPostCelador(e.target.files[0])} />
                                <div className="imgPreview">
                                    { celador === undefined ? '' : <img src={ celador } alt="celador"/> }
                                </div>
                            </div>
                        : '' }
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

const mapStateToProps = (state) => {
    return {
        dni: state.buildImages.dni.data,
        cv: state.buildImages.cv.data.filePreview,
        titulo: state.buildImages.titulo.data.filePreview,
        seguro: state.buildImages.seguro.data.filePreview,
        afip: state.buildImages.afip.data.filePreview,
        celador: state.buildImages.celador.data.filePreview,
        celadorActive: state.front.celador.activate
    }
}

const mapDispatchToProps = dispatch => {
    return {
        _buildPostCv: (value) => { dispatch(buildPostCv(value)) },
        _buildPostTitulo: (value) => { dispatch(buildPostTitulo(value)) },
        _buildPostSeguro: (value) => { dispatch(buildPostSeguro(value)) },
        _buildPostAfip: (value) => { dispatch(buildPostAfip(value)) },
        _buildPostCelador: (value) => { dispatch(buildPostCelador(value)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HolidaysData);
