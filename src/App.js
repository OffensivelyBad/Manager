import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import firebaseconfig from './config/firebaseconfig'
import LoginForm from './components/LoginForm';

class App extends Component {
    componentDidMount() {
        firebase.initializeApp({
            apiKey: firebaseconfig.apiKey,
            authDomain: firebaseconfig.authDomain,
            databaseURL: firebaseconfig.databaseURL,
            projectId: firebaseconfig.projectId,
            storageBucket: firebaseconfig.storageBucket,
            messagingSenderId: firebaseconfig.messagingSenderId
        });
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <LoginForm />
            </Provider>
        );
    }
}

export default App;
