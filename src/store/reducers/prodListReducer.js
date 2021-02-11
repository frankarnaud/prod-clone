

const projectListInstance = (state={}, action) => {
    let infos = action.payload
    if(action.type === 'SET_INSTANCE_INFOS'){
        return {...state, [infos.prodNumber]: {pageIndex: infos.pageIndex, isData: infos.isData}}
    }
    else {
        return state
    }
}


export default projectListInstance