import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {

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
                            autoFocus
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
