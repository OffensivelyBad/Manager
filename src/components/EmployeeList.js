import _ from 'lodash';
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { employeeFetch } from '../actions';
import ListItem from './ListItem';

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

    renderRow(employee) {
        return <ListItem employee={employee} />;
    }

    render() {
        console.log(this.props);
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
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
