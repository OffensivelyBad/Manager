import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import firebaseconfig from './config/firebaseconfig'
import Router from './Router';

class App extends Component {
    state = {
        loading: true,
        user: null
    }

    componentWillMount() {
        firebase.initializeApp({
            apiKey: firebaseconfig.apiKey,
            authDomain: firebaseconfig.authDomain,
            databaseURL: firebaseconfig.databaseURL,
            projectId: firebaseconfig.projectId,
            storageBucket: firebaseconfig.storageBucket,
            messagingSenderId: firebaseconfig.messagingSenderId
        });
    }

    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            this.setState({
                loading: false,
                user
            });
        });
    }

    renderInitialView() {
        if (this.state.loading) {
            return (
                <View>
                    <Text>
                    loading
                    </Text>
                </View>
            );
        }
        else {
            const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
            return (                
                <Provider store={store}>
                    <Router />
                </Provider>
            );
        }
    }

    render() {
        return (
            this.renderInitialView()
        );
    }
}

export default App;
