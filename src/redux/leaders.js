import * as ActionTypes from './ActionTypes'

export const Leaders = (state = {
    isLoading: true,
    errMess: null,
    leaders: []  
 } , action) => {
    switch(action.type) {
        case ActionTypes.ADD_LEADS: 
            return {...state , isLoading: false ,errMess : null , leaders: action.payload }
            
        case ActionTypes.LEADS_LOADING: 
            return {...state , isLoading: true ,errMess : null , leaders: [] } //this is where I'm going to use this sprint operator from ES6. So, that means that this state, that whatever the state is, I'm just going to take the same state and then I can add, and so this is the sprint operator that I'm going to load in here. So, it will take the current value of the state and then whatever else that I passing in after this will be applied as modifications to the state.
        //So again, the state itself will not be mutated, instead, I take the state, I create a new object from the original state and then make some changes to that object and then return that object. So that's why I am returning an immutable from here. So, the state itself is not going to be mutated here.
    
        case ActionTypes.LEADS_FAILED: 
            return {...state , isLoading: false ,errMess : action.payload , leaders: [] }

        default: 
            return state;
    }
}
