
const projects = (state=[], action) => {
    if(action.type === 'ADD_PROJECT'){
        return [...state, ...action.payload]
    }
    return state
}

export default projects