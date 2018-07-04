import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class ListItem extends Component {

    onRowPress() {
        Actions.employeeEdit({ employee: this.props.employee });
    }

    render() {
        const { name, shift } = this.props.employee;

        return (
            <TouchableOpacity onPress={this.onRowPress.bind(this)}>
                <CardSection>
                    <Text style={styles.titleStyle}>
                        {name}
                    </Text>
                    <View style={styles.subContainerStyle}>
                        <Text>{shift}</Text>
                    </View>
                </CardSection>
            </TouchableOpacity>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    },
    subContainerStyle: {
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'column'
    }
}

export default ListItem;
