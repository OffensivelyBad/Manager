import _ from 'lodash';
import React, { Component } from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { employeeUpdate, employeeCreate } from '../actions';
import { Card, CardSection, Button, Spinner } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {
    state = { loading: false };

    componentWillMount() {
        this.props.employeeUpdate({ prop: 'name', value: '' });
        this.props.employeeUpdate({ prop: 'phone', value: '' });
        this.props.employeeUpdate({ prop: 'shift', value: '' });
        this.props.employeeUpdate({ prop: 'email', value: ''});
    }

    onButtonPress() {
        this.setState({ loading: true });
        const { name, phone, shift, email } = this.props;
        this.props.employeeCreate({ name, phone, shift: shift || 'Monday', email });
    }

    renderLoading() {
        if(this.state.loading) {
            return (
                <View style={styles.loadingStyle}>
                    <Spinner size='large' />
                </View>
            );
        }
    }

    render() {
        return (
            <ScrollView>
                <Card>
                    <EmployeeForm {...this.props} />
                    <CardSection>
                        <Button onPress={this.onButtonPress.bind(this)}>
                            Create
                        </Button>
                    </CardSection>
                </Card>
                {this.renderLoading()}
            </ScrollView>
        );
    }
}

const styles = {
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

const mapStateToProps = (state) => {
    const { name, phone, shift, email } = state.employeeForm;

    return { name, phone, shift, email };
}

export default connect(mapStateToProps, { employeeUpdate, employeeCreate })(EmployeeCreate);
