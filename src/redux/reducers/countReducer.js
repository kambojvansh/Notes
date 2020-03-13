import { COUNTER_CHANGE } from '../constants';

const initialState = {
    count: 0
};

const countReducer = (state = initialState, action) => {
    console.log(action)
    // alert("hii")
    switch (action.type) {
        case COUNTER_CHANGE:
            return {
                ...state,
                count: action.payload
            };
        default:
            return state;
    }
}

export default countReducer;