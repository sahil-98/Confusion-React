import {createStore , combineReducers , applyMiddleware} from 'redux';
import {createForms} from 'react-redux-form'
import {Dishes} from './dishes';
import {Comments} from './comments';
import {Promotions} from './promotions';
import {Leaders} from './leaders';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { InitialFeedback } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes : Dishes ,
            comments : Comments ,
            promotions :Promotions ,
            leaders : Leaders , 
            ...createForms ({
                feedback : InitialFeedback //once we import the initial feedback and so if we initialize it like this, this we'll add in the necessary reducer functions and also the state information into my create store. So as you recall I mentioned that the React-Redux-Form brings in its own set of support for all these on our behalf, so we don't need to write our own reducers or our action creators and so on, React-Redux-Form fills in all the details by itself.
            })
        }),
        applyMiddleware(thunk , logger)
    );

    return store;
}

