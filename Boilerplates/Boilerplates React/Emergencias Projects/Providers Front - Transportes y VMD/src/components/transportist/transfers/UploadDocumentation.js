
import React from "react";
import Axios from "axios";

import { connect } from "react-redux";
import { buildUploadImages } from '../../../store/actions/transport/buildImagesPostObject';

import "../../../styles/transport/UploadDocumentation.scss";

class HolidaysData extends React.PureComponent {

    constructor(props) {
		super(props);
		this.state = {
            imagePreviewUrl: {
                path_dni: ''
            },
            filePreview: '',
            file: '',
            loadNotMandatoryFields: false
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
                    if (documents.registro) {
                        that.props._buildUploadImages(documents.registro, 'BUILD_POST_REGISTRO')
                    }
                    if (documents.cv) {
                        that.props._buildUploadImages(documents.cv, 'BUILD_POST_CV')
                    }
                    if (documents.seguro) {
                        that.props._buildUploadImages(documents.seguro, 'BUILD_POST_SEGURO')
                    }
                    if (documents.cedula) {
                        that.props._buildUploadImages(documents.cedula, 'BUILD_POST_CEDULA')
                    }
                    if (documents.vtv) {
                        that.props._buildUploadImages(documents.vtv, 'BUILD_POST_VTV')
                    }
                    if (documents.tituloPropiedad) {
                        that.props._buildUploadImages(documents.tituloPropiedad, 'BUILD_POST_TITULO_PROPIEDAD')
                    }
                    if (documents.cesionDeUso) {
                        that.props._buildUploadImages(documents.cesionDeUso, 'BUILD_POST_CESION_USO')
                    }
                    if (documents.constanciaAfip) {
                        that.props._buildUploadImages(documents.constanciaAfip, 'BUILD_POST_CONSTANCIA_AFIP')
                    }
                    if (documents.ingresosBrutos) {
                        that.props._buildUploadImages(documents.ingresosBrutos, 'BUILD_POST_INGRESOS_BRUTOS')
                    }
                    if (documents.pagoIngresosBrutos) {
                        that.props._buildUploadImages(documents.pagoIngresosBrutos, 'BUILD_POST_PAGO_INGRESOS_BRUTOS')
                    }
                }
            }
        } initialData();
    }

    render() {
        if (this.props.dataInfo.provider) {
            const { dni, registro, cv, seguro, cedula, vtv, tituloPropiedad, cesionDeUso, constanciaAfip, ingBrutos, pagoIngBrutos } = this.props;

            return (
                <div className="uploadDocumentationWrapper">
                    <div className="uploadEachItem">
                        <div className="d-flex columnUpload dniTag">
                            <div className="title">DNI</div>
                            <label htmlFor="upload-photo-dni" className="btn btn-active inputfile">
                                <div className="imgPreview">
                                    { dni ? <img src={ this.state.imagePreviewUrl.path_dni } alt="dni"/> : '' }
                                </div>
                            </label>
                        </div>
                        <label className="d-flex columnUpload" htmlFor="upload-photo-registro">
                            <div className="title">Registro</div>
                            <div>{ !registro ? 
                                    <span className="mandatory"><i className="fas fa-times-circle"></i></span> : 
                                    <span><i className="fas fa-check"></i></span> }
                                </div>
                                <div className="btn btn-active inputfile" >
                                    <div className="imgPreview">
                                        { !registro ? <i className="fas fa-folder-open"></i> : <img src={ registro } alt="registro"/> }
                                    </div>
                                </div>
                                <i className="fas fa-plus-circle"></i>
                                <input type="file" 
                                    name="Cargar Seguro" 
                                    id="upload-photo-registro" 
                                    onChange={(e) => this.props._buildUploadImages(e.target.files[0], 'BUILD_POST_REGISTRO')} />
                        </label>
                        <label className="d-flex columnUpload" htmlFor="upload-photo-cv">
                            <div className="title">CV</div>
                            <div>{ !cv ? 
                                    <span className="mandatory"><i className="fas fa-times-circle"></i></span> : 
                                    <span><i className="fas fa-check"></i></span> }
                                </div>
                                <div className="btn btn-active inputfile" >
                                    <div className="imgPreview">
                                        { !cv ? <i className="fas fa-folder-open"></i> : <img src={ cv } alt="cv"/> }
                                    </div>
                                </div>
                                <i className="fas fa-plus-circle"></i>
                                <input type="file" 
                                    name="Cargar CV" 
                                    id="upload-photo-cv" 
                                    onChange={(e) => this.props._buildUploadImages(e.target.files[0], 'BUILD_POST_CV')} />
                        </label>
                        <label className="d-flex columnUpload" htmlFor="upload-photo-seguro">
                            <div className="title">Seguro</div>
                            <div>{ !seguro ? 
                                    <span className="mandatory"><i className="fas fa-times-circle"></i></span> : 
                                    <span><i className="fas fa-check"></i></span> }
                                </div>
                                <div className="btn btn-active inputfile" >
                                    <div className="imgPreview">
                                        { !seguro ? <i className="fas fa-folder-open"></i> : <img src={ seguro } alt="seguro"/> }
                                    </div>
                                </div>
                                <i className="fas fa-plus-circle"></i>
                                <input type="file" 
                                    name="Cargar Seguro" 
                                    id="upload-photo-seguro" 
                                    onChange={(e) => this.props._buildUploadImages(e.target.files[0], 'BUILD_POST_SEGURO')} />
                        </label>
                        <label className="d-flex columnUpload" htmlFor="upload-photo-cedula">
                            <div className="title">Cédula</div>
                            <div>{ !cedula ? 
                                    <span className="mandatory"><i className="fas fa-times-circle"></i></span> : 
                                    <span><i className="fas fa-check"></i></span> }
                                </div>
                                <div className="btn btn-active inputfile" >
                                    <div className="imgPreview">
                                        { !cedula ? <i className="fas fa-folder-open"></i> : <img src={ cedula } alt="cedula"/> }
                                    </div>
                                </div>
                                <i className="fas fa-plus-circle"></i>
                                <input type="file" 
                                    name="Cargar Cedula" 
                                    id="upload-photo-cedula" 
                                    onChange={(e) => this.props._buildUploadImages(e.target.files[0], 'BUILD_POST_CEDULA')} />
                        </label>
                        <label className="d-flex columnUpload" htmlFor="upload-photo-vtv">
                            <div className="title">Vtv</div>
                            <div>{ !vtv ? 
                                    <span className="mandatory"><i className="fas fa-times-circle"></i></span> : 
                                    <span><i className="fas fa-check"></i></span> }
                                </div>
                                <div className="btn btn-active inputfile" >
                                    <div className="imgPreview">
                                        { !vtv ? <i className="fas fa-folder-open"></i> : <img src={ vtv } alt="vtv"/> }
                                    </div>
                                </div>
                                <i className="fas fa-plus-circle"></i>
                                <input type="file" 
                                    name="Cargar Vtv" 
                                    id="upload-photo-vtv" 
                                    onChange={(e) => this.props._buildUploadImages(e.target.files[0], 'BUILD_POST_VTV')} />
                        </label>
                        {this.state.loadNotMandatoryFields ? <div>
                            <label className="d-flex columnUpload" htmlFor="upload-photo-titulo-propiedad">
                                <div className="title">Título de Propiedad</div>
                                <div>{ !tituloPropiedad ? 
                                        <span className="mandatory"><i className="fas fa-times-circle"></i></span> : 
                                        <span><i className="fas fa-check"></i></span> }
                                    </div>
                                    <div className="btn btn-active inputfile" >
                                        <div className="imgPreview">
                                            { !tituloPropiedad ? <i className="fas fa-folder-open"></i> : <img src={ tituloPropiedad } alt="titulo de propiedad"/> }
                                        </div>
                                    </div>
                                    <i className="fas fa-plus-circle"></i>
                                    <input type="file" 
                                        name="Cargar Título de propiedad" 
                                        id="upload-photo-titulo-propiedad" 
                                        onChange={(e) => this.props._buildUploadImages(e.target.files[0], 'BUILD_POST_TITULO_PROPIEDAD')} />
                            </label>
                            <label className="d-flex columnUpload" htmlFor="upload-photo-cesion-uso">
                                <div className="title">Cesión de uso</div>
                                <div>{ !cesionDeUso ? 
                                        <span className="mandatory"><i className="fas fa-times-circle"></i></span> : 
                                        <span><i className="fas fa-check"></i></span> }
                                    </div>
                                    <div className="btn btn-active inputfile" >
                                        <div className="imgPreview">
                                            { !cesionDeUso ? <i className="fas fa-folder-open"></i> : <img src={ cesionDeUso } alt="Cesión de uso"/> }
                                        </div>
                                    </div>
                                    <i className="fas fa-plus-circle"></i>
                                    <input type="file" 
                                        name="Cargar Cesión de uso" 
                                        id="upload-photo-cesion-uso" 
                                        onChange={(e) => this.props._buildUploadImages(e.target.files[0], 'BUILD_POST_CESION_USO')} />
                            </label>
                            <label className="d-flex columnUpload" htmlFor="upload-photo-constancia-afip">
                                <div className="title">Constancia de Afip</div>
                                <div>{ !constanciaAfip ? 
                                        <span className="mandatory"><i className="fas fa-times-circle"></i></span> : 
                                        <span><i className="fas fa-check"></i></span> }
                                    </div>
                                    <div className="btn btn-active inputfile" >
                                        <div className="imgPreview">
                                            { !constanciaAfip ? <i className="fas fa-folder-open"></i> : <img src={ constanciaAfip } alt="Constancia afip"/> }
                                        </div>
                                    </div>
                                    <i className="fas fa-plus-circle"></i>
                                    <input type="file" 
                                        name="Cargar Constancia de AFIP" 
                                        id="upload-photo-constancia-afip" 
                                        onChange={(e) => this.props._buildUploadImages(e.target.files[0], 'BUILD_POST_CONSTANCIA_AFIP')} />
                            </label>
                            <label className="d-flex columnUpload" htmlFor="upload-photo-ingresos-brutos">
                                <div className="title">Ingresos brutos</div>
                                <div>{ !ingBrutos ? 
                                        <span className="mandatory"><i className="fas fa-times-circle"></i></span> : 
                                        <span><i className="fas fa-check"></i></span> }
                                    </div>
                                    <div className="btn btn-active inputfile" >
                                        <div className="imgPreview">
                                            { !ingBrutos ? <i className="fas fa-folder-open"></i> : <img src={ ingBrutos } alt="Ingresos Brutos"/> }
                                        </div>
                                    </div>
                                    <i className="fas fa-plus-circle"></i>
                                    <input type="file" 
                                        name="Cargar ingresos brutos" 
                                        id="upload-photo-ingresos-brutos" 
                                        onChange={(e) => this.props._buildUploadImages(e.target.files[0], 'BUILD_POST_INGRESOS_BRUTOS')} />
                            </label>
                            <label className="d-flex columnUpload" htmlFor="upload-photo-pago-ingresos-brutos">
                                <div className="title">Pago ingresos brutos</div>
                                <div>{ !pagoIngBrutos ? 
                                        <span className="mandatory"><i className="fas fa-times-circle"></i></span> : 
                                        <span><i className="fas fa-check"></i></span> }
                                    </div>
                                    <div className="btn btn-active inputfile" >
                                        <div className="imgPreview">
                                            { !pagoIngBrutos ? <i className="fas fa-folder-open"></i> : <img src={ pagoIngBrutos } alt="Pago ingresos brutos"/> }
                                        </div>
                                    </div>
                                    <i className="fas fa-plus-circle"></i>
                                    <input type="file" 
                                        name="Cargar Pago de ingresos brutos" 
                                        id="upload-photo-pago-ingresos-brutos" 
                                        onChange={(e) => this.props._buildUploadImages(e.target.files[0], 'BUILD_POST_PAGO_INGRESOS_BRUTOS')} />
                            </label>
                        </div> : ''}
                        <div className="loadNotMandatoryFields">
                            <button className="btn btn-active loadNotMandatoryFields" 
                                onClick={() => this.setState({loadNotMandatoryFields : !this.state.loadNotMandatoryFields})}>
                                    {!this.state.loadNotMandatoryFields ? 'Cargar documentación adicional' : 'Ocultar documentación adicional'}
                            </button>
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

const mapStateToProps = (state) => {
    return {
        dni: state.buildImages.dni.data,
        registro: state.buildImages.registro.data.filePreview,
        cv: state.buildImages.cv.data.filePreview,
        seguro: state.buildImages.seguro.data.filePreview,
        cedula: state.buildImages.cedula.data.filePreview,
        vtv: state.buildImages.vtv.data.filePreview,
        tituloPropiedad: state.buildImages.tituloPropiedad.data.filePreview,
        cesionDeUso: state.buildImages.cesionDeUso.data.filePreview,
        constanciaAfip: state.buildImages.constanciaAfip.data.filePreview,
        ingBrutos: state.buildImages.ingBrutos.data.filePreview,
        pagoIngBrutos: state.buildImages.pagoIngBrutos.data.filePreview
    }
}

const mapDispatchToProps = dispatch => {
    return {
        _buildUploadImages: (value, type) => { dispatch(buildUploadImages(value, type)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HolidaysData);
