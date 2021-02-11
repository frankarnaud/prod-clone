

const commentCounter = (state={}, action) => {
    const comment = action.payload
    if(action.type === 'UPDATE_COMMENT_COUNTER'){
        return {...state, [comment.id]: comment.replyCounter}
    }
    return state
}

export default commentCounter