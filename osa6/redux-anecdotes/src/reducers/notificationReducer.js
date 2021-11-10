let timer;

export const setNotification = (content, sec) => {
    clearTimeout(timer)

    const milliseconds = sec * 1000

    return async dispatch => {
        await dispatch(show(content))
        timer = setTimeout(
                async () => await dispatch(hide()), milliseconds
            )
    }
}

export const show = (content) => {
    return {
        type: 'SET',
        data: content,
    }
}

export const hide = () => {
    return {
        type: 'HIDE'
    }
}

const notificationReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET':
            const notification = action.data
            state = notification
            return state
        case 'HIDE':
            state = ''
            return state
        
        default: return state
    }
}

export default notificationReducer