import firebase from 'firebase';
import FirebaseAuth from '../config/FirebaseAuth';
import { Actions } from 'react-native-router-flux';
import {
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATE,
    EMPLOYEE_SAVE_SUCCESS,
    FIRE_EMPLOYEE
} from './types';

export const employeeUpdate = ({ prop, value }) =>  {
    return {
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }
    };
};

export const employeeCreate = ({ name, phone, shift, email }) => {
    const { currentUser } = firebase.auth();
    const managerUID = currentUser.uid;
    const clockedIn = false;
    const date = new Date();
    const clockDate = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+" "+date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();;
    const clockDict = {'hireDate': clockDate, 'lastClockIn': clockDate, 'lastClockOut': clockDate};

    return (dispatch) => {
        FirebaseAuth.auth().createUserWithEmailAndPassword(email, 'password')
            .then(() => {
                const newUser = FirebaseAuth.auth().currentUser;
                FirebaseAuth.database().ref(`/users/${newUser.uid}`)
                .set({ name, phone, shift, email, clockedIn, 'clocks': clockDict, managerUID })
                .then(() => {
                    addEmployeeToManager({ dispatch, employeeUID: newUser.uid });
                });
            });
    };
};

export const employeeSave = ({ name, phone, shift, email, employee }) => {

    return (dispatch) => {
        firebase.database().ref(`/users/${employee.uid}`)
            .set({ ...employee, name, phone, shift, email })
            .then(() => {
                dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
                Actions.pop();
            });
    };
};

export const employeeDelete = ({ uid }) => {
    return () => {
        firebase.database().ref(`/users/${uid}`)
            .remove()
            .then(() => {
                removeEmployeeFromManager(uid);
            });
    }
}

export const fireEmployee = (shouldShowFire) => {
    return {
        type: FIRE_EMPLOYEE,
        payload: { value: shouldShowFire }
    };
}

const addEmployeeToManager = ({ dispatch, employeeUID }) => {
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .push({ employeeUID })
            .then(() => {
                dispatch({ type: EMPLOYEE_CREATE });
                Actions.pop();
            });
}

const removeEmployeeFromManager = (uid) => {
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/users/${currentUser.uid}/employees/`)
        .orderByChild('employeeUID')
        .equalTo(`${uid}`)
        .on('child_added', snapshot => {
            snapshot.ref.remove()
            .then(() => {
                Actions.pop();
            });            
        });
}
