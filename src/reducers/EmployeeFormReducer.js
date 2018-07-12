import {
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATE,
    EMPLOYEE_SAVE_SUCCESS,
    EMPLOYEE_DELETE_SUCCESS,
    FIRE_EMPLOYEE
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    phone: '',
    shift: '',
    showFireAlert: false
};

export default (state = INITIAL_STATE, action) => {    
    switch (action.type) {
        case EMPLOYEE_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value }
        case EMPLOYEE_CREATE:
            return INITIAL_STATE;
        case EMPLOYEE_SAVE_SUCCESS:
            return INITIAL_STATE;
        case EMPLOYEE_DELETE_SUCCESS:
            return INITIAL_STATE;
        case FIRE_EMPLOYEE:
            return { ...state, showFireAlert: action.payload.value };
        default:
            return state;
    }
};
