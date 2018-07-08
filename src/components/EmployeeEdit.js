import _ from 'lodash';
import React, { Component } from 'react';
import { ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave, employeeDelete, fireEmployee } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class EmployeeEdit extends Component {

    componentWillMount() {
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate({ prop, value });
        });
    }

    onButtonPress() {
        const { name, phone, shift } = this.props;
        this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid })
    }

    onTextPress() {
        const { phone, shift } = this.props;
        Communications.text(phone, `Your upcoming shift is on ${shift}`);
    }

    renderAlert() {
        if (this.props.showFireAlert) {
            Alert.alert(
                'Fire?',
                'Are you sure you want to fire this employee?',
                [
                    {text: 'Cancel', style: 'cancel', onPress: this.onCancel.bind(this)},
                    {text: 'Fire', onPress: this.onAccept.bind(this)}
                ]
            )
        }
    }

    onAccept() {
        const { uid } = this.props.employee;
        this.props.employeeDelete({ uid });
    }

    onCancel() {
        this.props.fireEmployee(false);
    }

    render() {

        return (
            <ScrollView>
                <Card>
                    <EmployeeForm />

                    <CardSection>
                        <Button onPress={this.onTextPress.bind(this)}>
                            Text Schedule
                        </Button>
                    </CardSection>

                    <CardSection>
                        <Button onPress={this.onButtonPress.bind(this)}>
                            Save Changes
                        </Button>
                    </CardSection>

                </Card>
                {this.renderAlert()}
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;
    const { showFireAlert } = state.employeeForm;
    
    return { name, phone, shift, showFireAlert };
};

export default connect(mapStateToProps, { employeeUpdate, employeeSave, employeeDelete, fireEmployee })(EmployeeEdit);
