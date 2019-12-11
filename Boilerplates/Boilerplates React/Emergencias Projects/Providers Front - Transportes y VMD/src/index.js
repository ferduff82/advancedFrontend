import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { store } from './store/configStore';
import App from './App';
import serviceWorker from './serviceWorker';
import AuthProvider from './components/global/User/Auth';

const PatientApp = () => {
    return (
        <>
            <Provider store={store}>
                <Router history={createBrowserHistory({ basename: process.env.PUBLIC_URL })}>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </Router>
            </Provider>
        </>
    )
}

ReactDOM.render(<PatientApp />, document.getElementById('root'))
serviceWorker()

