import firebase from 'firebase';
import { EMPLOYEE_FETCH_SUCCESS } from './types';

export const employeeFetch = () => {
    const { currentUser } = firebase.auth();
    console.log(currentUser.uid);

    return (dispatch) => {
        firebase.database().ref('/users')
            .orderByChild('managerUID')
            .equalTo(`${currentUser.uid}`)
            .on('value', snapshot => {
                dispatch({ type: EMPLOYEE_FETCH_SUCCESS, payload: snapshot.val() });
            });
    }
};
