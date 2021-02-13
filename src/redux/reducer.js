/*

THIS WAS A REDUCER FUNCTION , BUT NOW WE HAVE SPLITTED THE REDUCER FUNCTION INTO DIFFERENT 4 REDUCERS :- comments.js , promotion.js , leaders.js , dishes.js
SPLITTED REDUCER FUNCTION MANAGES PARTS/SLICES OF THE GLOBAL STATE
WE WILL COMBINE ALL THE REDUCERS TO GENERATE A OVERALL STATE


export const initialState = {
    dishes : DISHES , 
    comments: COMMENTS ,
    promotions: PROMOTIONS,
    leaders : LEADERS
};


export const Reducer = (state = initialState ,action) => {
    return state;
};

*/