export default function manageState(action, state, setState, callback) {
    switch (action) {
        case "add":
            setState([...state, callback])
            break
        case "edit":
            setState(callback)
            break
        case "update":
            const item = state.findIndex(item => item?.id === callback?.id)
            state[item] = callback
            setState([...state])
            break
        case "delete":
            const index = state.findIndex(item => item?.id === callback?.id)
            state.splice(index, 1)
            setState([...state])
            break
        default:
            break
    }
}