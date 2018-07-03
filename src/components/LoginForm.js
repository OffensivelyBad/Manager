import React, { Component } from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
    state = { loading: true };

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }
    
    onButtonPress() {
        const { email, password } = this.props;

        this.props.loginUser({ email, password });
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }
        else {
            return (
                <Button onPress={this.onButtonPress.bind(this)}>
                    Login
                </Button>
            );
        }
    }

    componentDidMount() {
        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                Actions.main();
            }
            else {
                this.setState({ loading: false });
            }
        });
    }

    renderLoading() {
        if (this.state.loading) {
            return (
                <View style={styles.loadingStyle}>
                    <Spinner size="large" />
                </View>
            );
        }
    }

    render () {
        return (
            <View style={styles.containerStyle}>
                <Card>
                    <CardSection>
                        <Image
                            source={require('../images/B4SLogo.png')}
                            size={{ width: 400, height: 200 }}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                            label="Email"
                            placeholder="email@gmail.com"
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                        />
                    </CardSection>
                    
                    <CardSection>
                        <Input
                            secureTextEntry
                            label="Password"
                            placeholder="password"
                            autoCapitalize={"none"}
                            onChangeText={this.onPasswordChange.bind(this)}
                            onSubmitEditing={this.onButtonPress.bind(this)}
                            value={this.props.password}
                        />
                    </CardSection>

                    {this.renderError()}

                    <CardSection>
                        {this.renderButton()}
                    </CardSection>
                </Card>
                {this.renderLoading()}
            </View>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    containerStyle: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#468ede'
    },
    loadingStyle: {
        position: 'absolute',
        flex: 1,
        left: 0,
        top: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading
    };
};

export default connect(mapStateToProps, { 
    emailChanged, passwordChanged, loginUser 
})(LoginForm);
