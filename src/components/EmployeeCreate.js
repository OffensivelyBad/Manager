import _ from 'lodash';
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { employeeUpdate, employeeCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {

    componentWillMount() {
        this.props.employeeUpdate({ prop: 'name', value: '' });
        this.props.employeeUpdate({ prop: 'phone', value: '' });
        this.props.employeeUpdate({ prop: 'shift', value: '' });
        this.props.employeeUpdate({ prop: 'email', value: ''});
    }

    onButtonPress() {
        const { name, phone, shift, email } = this.props;

        this.props.employeeCreate({ name, phone, shift: shift || 'Monday', email });
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
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift, email } = state.employeeForm;

    return { name, phone, shift, email };
}

export default connect(mapStateToProps, { employeeUpdate, employeeCreate })(EmployeeCreate);
