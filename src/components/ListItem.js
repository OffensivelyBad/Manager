import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class ListItem extends Component {

    onRowPress() {
        Actions.employeeCreate();
    }

    render() {
        const { name } = this.props.employee;

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <CardSection>
                    <Text style={styles.titleStyle}>
                        {name}
                    </Text>
                </CardSection>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
}

export default ListItem;
