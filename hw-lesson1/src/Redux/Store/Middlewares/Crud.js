import { actions } from '../Actions'



export const delayFunc = ({ dispatch, getState }) => next => action => {
    if (action.type === 'SET_COMPANY_CITY1') {
        setTimeout(() => {
            dispatch(actions.setCompanyCity(action.payload))
        }, action.meta.delay)


    }

    return next(action)
}


