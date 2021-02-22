import produce from 'immer'
import createReducer from './ReducerUtils'


const initialState = {
    content: {
        title: 'Log In',
        pictures: [{}]

    }
}

const contents = {
    setTitle(state, action) {
        state.content.title = action.payload
    },

}

export default produce((state, action) => createReducer(state, action, contents), initialState)