import React, { Component } from 'react';
import firebase from 'firebase';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logoutUser, fireEmployee } from './actions';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';

class RouterComponent extends Component {

    componentDidMount() {
        if (firebase.auth().currentUser) {
            Actions.main();
        }
    }

    fireTapped() {
        this.props.fireEmployee(true);
    }

    render() {
        return (
            <Router>
                <Scene key="root" hideNavBar>
                    <Scene key="auth">
                        <Scene key="loginForm" component={LoginForm} title="Please Login" initial hideNavBar />
                    </Scene>
                    <Scene key="main">
                        <Scene 
                            back
                            backTitle="Logout"
                            onBack={this.props.logoutUser.bind(this)}
                            rightTitle="Add"
                            onRight={() => Actions.employeeCreate() }
                            key="employeeList" 
                            component={EmployeeList} 
                            title="Employees" 
                            initial
                        />
                        <Scene
                            key="employeeCreate"
                            backTitle="Employees"
                            component={EmployeeCreate}
                            title="Add Employee"
                            
                        />
                        <Scene 
                            key="employeeEdit"
                            backTitle="Employees"
                            component={EmployeeEdit}
                            rightTitle="Fire"
                            onRight={this.props.fireEmployee.bind(this)}
                            title="Edit Employee"
                        />
                    </Scene>
                </Scene>
            </Router>
        );
    }
};

export default connect(null, { logoutUser, fireEmployee })(RouterComponent);
