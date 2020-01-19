
import React from "react"
import "../../../styles/doctor/user/Success.scss"



const SuccessPost = (props) => {
    if (props.dataSuccess === 'loading') {
        return (
            <div>
                <div className="loading spinner-border text-primary" role="initial">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    } else if (props.dataSuccess === 'success') {
        return (
            <div className="successPage">
                <div className="m-4 pt-4 pr-4 pb-4 pl-4 text-center rounded">
                    <h3>Listo!</h3>
                    <p>Ya estás dado de alta!</p>
                    <div className="success">
                        <i className="fas fa-check-circle w-100"></i>
                    </div>
                </div>
            </div>
        )
    } else if (props.dataSuccess === 'failed') {
        return (
            <div className="failedPage">
                <div className="m-4 pt-4 pr-4 pb-4 pl-4 text-center rounded">
                    <h3>Algo salió mal!</h3>
                    <p>Hubo un fallo en el envío de datos.</p>
                    <div className="failed">
                        <i className="fas fa-times-circle w-100"></i>
                    </div>
                </div>
            </div>
        )
    }

}


export default SuccessPost
