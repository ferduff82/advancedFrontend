import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {
    loadModels,
    getFullFaceDescription,
    createMatcher,
    isFaceDetectionModelLoaded
} from './api-faceRecog'
// import DrawBox from './DrawBox'
// import ShowDescriptors from './ShowDescriptors'
import { JSON_PROFILE } from '../common/profile'
import Loading from "../../../global/Utilities/Loading"


const INIT_STATE = {
    url: null,
    imageURL: null,
    fullDesc: null,
    imageDimension: null,
    error: null,
    loading: false,
    descriptor: null
}
const FaceRecognition = () => {
    // const [showDescriptors, setShowDescriptors] = useState(false)
    // const [isModelLoaded, setIsModelLoaded] = useState(!!isFaceDetectionModelLoaded())
    const [initialState, setInitialState] = useState({ ...INIT_STATE })
    const [faceMatcher, setFaceMatcher] = useState(null)
    const [WIDTH, setWIDTH] = useState(null)
    const dispatch = useDispatch()
    useEffect(() => {
        setWIDTH("100%")
        mounting()
    }, [])

    const mounting = async () => {
        await loadModels()
        await matcher()
    }

    const matcher = async () => {
        const faceMatcher = await createMatcher(JSON_PROFILE)
        setFaceMatcher(faceMatcher)
    }

    const handleFileChange = event => {
        setInitialState({ ...INIT_STATE })
        console.log(event.target.files[0])
        setInitialState({
            ...initialState,
            imageURL: URL.createObjectURL(event.target.files[0]),
            loading: true
        });
    };
    useEffect(() => {
        if (initialState.imageURL) {
            getFullFaceDescription(initialState.imageURL).then(fullDesc => {
                setInitialState({
                    ...initialState,
                    descriptor: fullDesc.map(fd => fd.descriptor.toString()),
                    fullDesc: fullDesc,
                    loading: false
                })
            });
        }
    }, [initialState.imageURL])

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: "center",
                textAlign: "center",
                alignItems: 'center',
                position: "relative"
            }}
        >
            <div
                style={{
                    width: WIDTH
                }}
            >
                {!!initialState.imageURL ? (
                    <div>
                        <div style={{ marginBottom: "50px" }}>
                            <img style={{ width: WIDTH }} src={initialState.imageURL} alt="imageURL" />
                        </div>
                        {/* {!!initialState.fullDesc ? (
                            <DrawBox
                                fullDesc={initialState.fullDesc}
                                faceMatcher={faceMatcher}
                                imageWidth={WIDTH}
                                boxColor={boxColor}
                            />
                        ) : null} */}
                    </div>
                ) : null}
            </div>

            <div
                style={{
                    width: WIDTH,
                    padding: 10,
                    border: '2px solid #42a5f5',
                    borderRadius: "8px",
                    marginTop: 10
                }}
            >
                {initialState.loading ?
                    <Loading />
                    :
                    <>
                        <p>Presione el botón y por favor, tómese una selfie.</p>
                        <input
                            id="myFileUpload"
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="w-100"
                            style={{ borderRadius: "5px" }}
                            capture={"camera"}
                        />
                        {initialState.descriptor &&
                            <div className="d-flex mt-2">
                                {console.log(initialState.descriptor)}
                                <button className="btn btn-danger w-100" onClick={() => setInitialState({ ...INIT_STATE })}>Eliminar imagen</button>
                                <button className="btn btn-success w-100" onClick={() => dispatch({
                                    type: "SET_EMBEDINGS",
                                    payload: initialState.descriptor
                                })}>Subir imagen</button>
                            </div>
                        }
                    </>
                }
            </div>
        </div>
    );

}

export default FaceRecognition
