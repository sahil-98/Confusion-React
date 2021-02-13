import * as ActionTypes from './ActionTypes'

export const Dishes = (state = {
    isLoading: true,
    errMess: null,
    dishes: []
} , action) => {
    switch(action.type) {
        case ActionTypes.ADD_DISHES: 
            return {...state , isLoading: false ,errMess : null , dishes: action.payload }
        
        case ActionTypes.DISHES_LOADING: 
            return {...state , isLoading: true ,errMess : null , dishes: [] } //this is where I'm going to use this sprint operator from ES6. So, that means that this state, that whatever the state is, I'm just going to take the same state and then I can add, and so this is the sprint operator that I'm going to load in here. So, it will take the current value of the state and then whatever else that I passing in after this will be applied as modifications to the state.
            //So again, the state itself will not be mutated, instead, I take the state, I create a new object from the original state and then make some changes to that object and then return that object. So that's why I am returning an immutable from here. So, the state itself is not going to be mutated here.
        
        case ActionTypes.DISHES_FAILED: 
            return {...state , isLoading: false ,errMess : action.payload , dishes: [] }
        
        default: 
            return state;
    }
}