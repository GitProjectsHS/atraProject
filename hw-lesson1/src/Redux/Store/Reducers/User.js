import produce from 'immer'
import createReducer from './ReducerUtils'


const initialState = {
    user: {
        userId: '',
    }
}

const users = {
    setId(state, action) {
        state.user.userId = action.payload
    },

}

export default produce((state, action) => createReducer(state, action, users), initialState)
