import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#4a90e2',
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        height: 50,
        justifyContent: 'center'
    },
    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 24,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
};

export { Button };
