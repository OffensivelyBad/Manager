import React, { Component } from 'react';
import firebase from 'firebase';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logoutUser } from './actions';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';

class RouterComponent extends Component {

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
                            component={EmployeeCreate}
                            title="Create Employee"
                        />
                        <Scene 
                            key="employeeEdit"
                            component={EmployeeEdit}
                            title="Edit Employee"
                        />
                    </Scene>
                </Scene>
            </Router>
        );
    }
};

export default connect(null, { logoutUser })(RouterComponent);
