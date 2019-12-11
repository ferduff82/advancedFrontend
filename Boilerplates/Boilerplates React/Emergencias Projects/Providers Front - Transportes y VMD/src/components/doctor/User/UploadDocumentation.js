
import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { buildUploadImages } from '../../../store/actions/buildImagesPostObject';
import { expireEvent } from '../../../store/actions/uploadActions';
import { displayModal } from '../../../store/actions/frontActions';
import Modal from './Utils/Modal';
import "../../../styles/doctor/user/UploadDocumentation.scss";

const HolidaysData = (props) => {
    // const [filePreview, setFilePreview] = useState()
    // const [file, setFile] = useState()
    // const dni = useSelector(state => state.buildImages.dni.data)
    const expireDni = useSelector(state => state.upload)
    const expireSeguro = useSelector(state => state.upload)
    const expireAfip = useSelector(state => state.upload)
    const [imagePreviewUrl, setImagePreviewUrl] = useState({ path_dni: '' })
    const cv = useSelector(state => state.buildImages.cv.data.filePreview)
    const titulo = useSelector(state => state.buildImages.titulo.data.filePreview)
    const seguro = useSelector(state => state.buildImages.seguro.data.filePreview)
    const afip = useSelector(state => state.buildImages.afip.data.filePreview)
    const matricula = useSelector(state => state.buildImages.matricula.data.filePreview)
    const especialidad = useSelector(state => state.buildImages.especialidad.data.filePreview)
    const certificado = useSelector(state => state.buildImages.certificado.data.filePreview)
    const displayModalVal = useSelector(state => state.front.modalAction)
    const dispatch = useDispatch()
    const { dataInfo } = props

    useEffect(() => {
        const { path_dni } = dataInfo.provider;
        !(dataInfo === undefined) && setImagePreviewUrl({ imagePreviewUrl: { path_dni: path_dni } })
    }, [dataInfo])

    if (dataInfo.provider) {
        return (
            <div className="uploadDocumentationWrapperUser">
                {displayModalVal === 'open' ?
                    <Modal title="Cargar documentación adicional"
                        overideStyles={{ top: '50px', left: '15px', right: '15px' }}>
                        <div className="d-flex">
                            <div className="columnUpload">
                                <div className="title">Matricula</div>
                                <label htmlFor="upload-photo-matricula" className="btn btn-active inputfile" >
                                    <div className="imgPreview">
                                        {matricula === undefined ?
                                            <i className="fas fa-folder-open"></i>
                                            : <img src={matricula} alt="matricula" />}
                                    </div>
                                    <i className="fas fa-plus-circle"></i>
                                </label>
                                <input type="file"
                                    name="Cargar Matricula"
                                    id="upload-photo-matricula"
                                    onChange={(e) => dispatch(buildUploadImages(e.target.files[0], 'matricula'))} />
                            </div>
                            <div className="columnUpload">
                                <div className="title">Especialidad</div>
                                <label htmlFor="upload-photo-especialidad" className="btn btn-active inputfile" >
                                    <div className="imgPreview">
                                        {especialidad === undefined ?
                                            <i className="fas fa-folder-open"></i>
                                            : <img src={especialidad} alt="especialidad" />}
                                    </div>
                                    <i className="fas fa-plus-circle"></i>
                                </label>
                                <input type="file"
                                    name="Cargar Especialidad"
                                    id="upload-photo-especialidad"
                                    onChange={(e) => dispatch(buildUploadImages(e.target.files[0], 'especialidad'))} />
                            </div>
                            <div className="columnUpload">
                                <div className="title">Certificado Laboral</div>
                                <label htmlFor="upload-photo-certificado" className="btn btn-active inputfile" >
                                    <div className="imgPreview">
                                        {certificado === undefined ?
                                            <i className="fas fa-folder-open"></i>
                                            : <img src={certificado} alt="certificado" />}
                                    </div>
                                    <i className="fas fa-plus-circle"></i>
                                </label>
                                <input type="file"
                                    name="Cargar Certificado"
                                    id="upload-photo-certificado"
                                    onChange={(e) => dispatch(buildUploadImages(e.target.files[0], 'certificado'))} />
                            </div>
                        </div>
                        <div className="buttonContainer">
                            <button className="btn btn-active" onClick={() => dispatch(displayModal('close'))}>Cargar y volver</button>
                        </div>
                    </Modal>
                    : ''}
                <div className="d-flex">
                    <div className="columnUpload dniTag">
                        <div className="expireDate">
                            <div className="idInput">Vencimiento DNI</div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="00/00/0000"
                                onChange={(e) => dispatch(expireEvent(e.target.value, 'expireId'))}
                            />
                        </div>
                        <div className="title">DNI</div>
                        <label htmlFor="upload-photo-dni" className="btn btn-active inputfile">
                            <div className="imgPreview">
                                {imagePreviewUrl.path_dni ? <img src={imagePreviewUrl.path_dni} alt="dni" /> : ''}
                            </div>
                        </label>
                    </div>
                    <div className="columnUpload">
                        <div className="expireDate">
                            <div className="idInput">Vencimiento Seguro</div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="00/00/0000"
                                onChange={(e) => dispatch(expireEvent(e.target.value, 'expireInsurance'))}
                            />
                        </div>
                        <div className="title">
                            Seguro {!seguro ? <span className="mandatory">&nbsp;*</span> : <i className="fas fa-check"></i>}
                        </div>
                        <label htmlFor="upload-photo-seguro" className="btn btn-active inputfile" >
                            <div className="imgPreview">
                                {!seguro ? <i className="fas fa-folder-open"></i> : <img src={seguro} alt="seguro" />}
                            </div>
                            <i className="fas fa-plus-circle"></i>
                        </label>
                        <input type="file"
                            name="Cargar Seguro"
                            id="upload-photo-seguro"
                            onChange={(e) => dispatch(buildUploadImages(e.target.files[0], 'insurance'))} />
                    </div>
                    <div className="columnUpload">
                        <div className="expireDate">
                            <div className="idInput">Vencimiento AFIP</div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="00/00/0000"
                                onChange={(e) => dispatch(expireEvent(e.target.value, 'expireAfip'))}
                            />
                        </div>
                        <div className="title">
                            AFIP {!afip ? <span className="mandatory">&nbsp;*</span> : <i className="fas fa-check"></i>}
                        </div>
                        <label htmlFor="upload-photo-afip" className="btn btn-active inputfile" >
                            <div className="imgPreview">
                                {!afip ? <i className="fas fa-folder-open"></i> : <img src={afip} alt="afip" />}
                            </div>
                            <i className="fas fa-plus-circle"></i>
                        </label>
                        <input type="file"
                            name="Cargar AFIP"
                            id="upload-photo-afip"
                            onChange={(e) => dispatch(buildUploadImages(e.target.files[0], 'afip'))} />
                    </div>
                </div>
                <div className="d-flex">
                    <div className="columnUpload">
                        <div className="title">
                            CV {!cv ? <span className="mandatory">&nbsp;*</span> : <i className="fas fa-check"></i>}
                        </div>
                        <label htmlFor="upload-photo-cv" className="btn btn-active inputfile">
                            <div className="imgPreview">
                                {!cv ? <i className="fas fa-folder-open"></i> : <img src={cv} alt="cv" />}
                            </div>
                            <i className="fas fa-plus-circle"></i>
                        </label>
                        <input type="file"
                            name="Cargar CV"
                            id="upload-photo-cv"
                            onChange={(e) => dispatch(buildUploadImages(e.target.files[0], 'cv'))} />
                    </div>
                    <div className="columnUpload">
                        <div className="title">
                            Título {!titulo ? <span className="mandatory">&nbsp;*</span> : <i className="fas fa-check"></i>}
                        </div>
                        <label htmlFor="upload-photo-titulo" className="btn btn-active inputfile">
                            <div className="imgPreview">
                                {!titulo ? <i className="fas fa-folder-open"></i> : <img src={titulo} alt="titulo" />}
                            </div>
                            <i className="fas fa-plus-circle"></i>
                        </label>
                        <input type="file"
                            name="Cargar Título"
                            id="upload-photo-titulo"
                            onChange={(e) => dispatch(buildUploadImages(e.target.files[0], 'title'))} />
                    </div>
                    <div className="columnUpload">
                        <div className="title">Otros</div>
                        <label className="btn btn-active inputfile">
                            <div className="imgPreview">
                                <i className="fas fa-plus-circle others" onClick={() => dispatch(displayModal('open'))}></i>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        )
    } else {
        return <div className="uploadDocumentationWrapper"></div>
    }

}


export default HolidaysData;
