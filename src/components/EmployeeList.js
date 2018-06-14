import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import { employeeFetch } from '../actions';

class EmployeeList extends Component {

    componentWillMount() {
        this.props.employeeFetch();

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ employeeList }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(employeeList);
    }

    render() {
        console.log(this.props);
        return (
            <View>
                <Text>Employee list</Text>
                <Text>Employee list</Text>
                <Text>Employee list</Text>
                <Text>Employee list</Text>
                <Text>Employee list</Text>
                <Text>Employee list</Text>
                <Text>Employee list</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const employeeList = _.map(state.employeeList, (val, uid) => {
        return { ...val, uid };
    });

    return { employeeList };
};

export default connect(mapStateToProps, { employeeFetch })(EmployeeList);
