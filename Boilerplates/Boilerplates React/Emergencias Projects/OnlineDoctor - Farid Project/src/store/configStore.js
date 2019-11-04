import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore(initialState, browserHistory) {
    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools (
            applyMiddleware(thunk)
            ) 
    );
}
