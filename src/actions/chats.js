import * as types from '../constants/chats';
import callApi from '../utils/call-api';
import { redirect } from './services';
import * as paths from '../constants/api-paths';

export function fetchMyChats() {
    return (dispatch, getState) => {
        const { token } = getState().auth;

        dispatch({
            type: types.FETCH_MY_CHATS_REQUEST,
        });

        return callApi(paths.MY_CHATS, token)
            .then(data => dispatch({
                type: types.FETCH_MY_CHATS_SUCCESS,
                payload: data,
            }))
            .catch(reason => dispatch({
                type: types.FETCH_MY_CHATS_FAILURE,
                payload: reason,
            }))
    };
}

export function fetchAllChats() {
    return (dispatch, getState) => {
        const { token } = getState().auth;

        dispatch({
            type: types.FETCH_ALL_CHATS_REQUEST,
        });

        return callApi(paths.CHATS, token)
            .then(data => dispatch({
                type: types.FETCH_ALL_CHATS_SUCCESS,
                payload: data,
            }))
            .catch(reason => dispatch({
                type: types.FETCH_ALL_CHATS_FAILURE,
                payload: reason,
            }))
    };
};


export function fetchChat(chatId) {
    return (dispatch, getState) => {
        const { token } = getState().auth;

        dispatch({
            type: types.FETCH_CHAT_REQUEST,
        })

        return callApi(`${paths.CHAT}/${chatId}`, token)
            .then(data => {
                dispatch({
                    type: types.FETCH_CHAT_SUCCESS,
                    payload: data,
                });

                return data;
            })
            .catch(reason => dispatch({
                type: types.FETCH_CHAT_FAILURE,
                payload: reason,
            }))
    };
};


export function setActiveChat(chatId) {
    return (dispatch) => {
        return dispatch(fetchChat(chatId))
            .then(data => {
                if (!data) {
                    dispatch(redirect(paths.CHAT));

                    return dispatch({
                        type: types.UNSET_ACTIVE_CHAT,
                    });
                }

                dispatch({
                    type: types.SET_ACTIVE_CHAT,
                    payload: data,
                });
            })
    };
}
