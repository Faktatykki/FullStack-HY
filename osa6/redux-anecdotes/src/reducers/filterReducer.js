export const setFilter = (filter) => {
    return {
        type: 'FILTER',
        filter: filter
    }
}

const filterReducer = (state = '', action) => {

    switch (action.type) {
        case "FILTER":
            state = { filter: action.filter }
            return state
        default:
            return state
    }
}

export default filterReducer