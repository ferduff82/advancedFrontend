import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { OTSession, OTPublisher, OTStreams, OTSubscriber, preloadScript } from 'opentok-react';


const StartCall = (props) => {
  const dispatch = useDispatch()
  const [callRef, setCallRef] = useState({})
  const [error, setError] = useState(null)
  const [connection, setConnection] = useState('Conectando')
  const [publishVideo, setPublishVideo] = useState(true)
  const [dni, setDni] = useState('')
  const [vid, setVid] = useState('')
  const [waitingDoctor, setWaiting] = useState('El médico está ingresando a la sala. \n Por favor aguarde un momento.')

    const sessionEventHandlers = {
      sessionConnected: () => {
        setConnection('Conectado')
      },
      sessionDisconnected: () => {
        setConnection('Desconectado')
      },
      sessionReconnected: () => {
        setConnection('Reconectado')
      },
      sessionReconnecting: () => {
        setConnection('Reconectando')
      }
    }

    const publisherEventHandlers = {
      accessDenied: () => {
        console.log('User denied access to media source');
      },
      streamCreated: (e) => {
        console.log(e)
        console.log('Publisher stream created');
        console.log(callRef)
      },
      streamDestroyed: ({ reason }) => {
        console.log(`Publisher stream destroyed because: ${reason}`);
        setWaiting("La atención finalizo")
        setTimeout(() => {
          setWaiting(false)
          props.history.push('/feedback')
        })
      /* callRef.sessionHelper.session.off() */
      }
    }

    const subscriberEventHandlers = {
      videoEnabled: () => {
        console.log('Subscriber video enabled');
      },
      videoDisabled: () => {
        console.log('Subscriber video disabled');
      },
    };

  useEffect(() => {
    let vid = document.querySelectorAll(".OTSubscriberContainer .OT_video-element")
    setVid(vid)
    setDni(dni)
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL
    let constraints = {
      audio: false,
      video: { facingMode: 'user' }
    }
    let r, e
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia(constraints).then((res) => r = res).catch((err) => e = err)
    } else if (navigator.getUserMedia) {
      navigator.getUserMedia(constraints, r, e)
    }
  }, [dni])
    
  useEffect(() => {
    if(props.sala === ""){
      setWaiting("La consulta finalizó")
      setTimeout(() => {
        setWaiting(false)
      }, 3000)
      console.log(props.sala)
      // props.history.push(`/${dni}/onlinedoctor/feedback`)
    } 
  }, [dni, props.history, props.sala])

  useEffect(() => {
    console.log(callRef)
  }, [callRef])

  const onSessionError = error => {
    setError(error)
    console.log("ERROR")
  };

  const onPublish = () => {
    console.log('Publish Success');
  };

  const onPublishError = error => {
    setError(error)
  };

  const onSubscribe = () => {
    console.log('Subscribe Success');
  };

  const onSubscribeError = error => {
    setError(error);
    // alert("No se pudo establecer la conexión. Compruebe los requisitos y permisos necesarios para la videollamada.")
  };


  useEffect(() => {
    if(!!error) {
      alert(`No se pudo realizar la videollamada: Verifique que su dispositivo tenga internet, cámara y micrófono y que los permisos estén habilitados.`)
      callRef.sessionHelper.session.off()
      // callRef.sessionHelper.disconnect()
      setWaiting(`Ocurrió un error y no se pudo ingresar a la sala. \n \n   ${error}`)
      console.log("ESTO ES CALLREF:", callRef)
    }
  }, [error])

      return (
        <>
          {/* <div id="sessionStatus">Estado de la conexión: {connection}</div> */}
          {error && 
            <div className="error">
              <strong>{console.log(error)}</strong>
            </div>
           }
          <OTSession
            apiKey={"46424032"}
            sessionId={props.sala}
            token={props.token}
            onError={onSessionError}
            eventHandlers={sessionEventHandlers}
            ref={instance => setCallRef(instance)}
            className="opentok"
          >
          {/*
          <button id="videoButton" onClick={this.toggleVideo}>
            {publishVideo ? 'Habilitar' : 'Desactivar'} Video
          </button>
          */}

          {/* patient */}
            <div className="PatientContainerMedia">
              <OTPublisher
                properties={{ publishVideo, width: '20vw', height: '20vh', audioBitrate: 16000, style: { buttonDisplayMode: 'off' } }}
                onPublish={onPublish}
                onError={onPublishError}
                eventHandlers={publisherEventHandlers}
              />
            </div>
            {/* doctor */}
            <div className="DoctorContainerMedia">
              <div className="awaiting-doctor p-3">{!!waitingDoctor ? waitingDoctor : <></>}</div>
              <OTStreams>
                <OTSubscriber
                  properties={{ width: 100, height: 100 }}
                  onSubscribe={onSubscribe}
                  onError={onSubscribeError}
                  eventHandlers={subscriberEventHandlers}
                />
              </OTStreams>
            </div>
          </OTSession>
        </>
      )
  }

export default preloadScript(withRouter(StartCall))
