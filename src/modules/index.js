import { takeEvery } from "redux-saga";
import { call, fork, put, select } from "redux-saga/effects";

const defaultData = {
  token: "",
  login: "",
  name: "",
  email: ""
};

// Reducer
export const reducer = (state = defaultData, action) => {
  switch (action.type) {
    case "SUBMIT_TOKEN":
    case "UPDATE_TOKEN":
      return {
        ...state,
        token: action.payload
      };
    case "UPDATE_ACCOUNT_INFO":
      return {
        ...state,
        login: action.payload.login,
        name: action.payload.name,
        email: action.payload.email
      };
    default:
      return state;
  }
};

// Action Creator
export const submitToken = token => ({
  type: "SUBMIT_TOKEN",
  payload: token
});

export const updateToken = event => ({
  type: "UPDATE_TOKEN",
  payload: event && event.target && event.target.value
});

export const updateAccountInfo = data => ({
  type: "UPDATE_ACCOUNT_INFO",
  payload: data
});

// Redux-Saga
const getToken = state => state.token;

const getGitHubAccount = token => {
  const url = "https://api.github.com/graphql";
  const body = `
    {
      "query": "query { viewer { login, name, email } }"
    }
  `;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `bearer ${token}`
  };
  const init = {
    method: "POST",
    headers,
    body
  };
  return fetch(url, init)
    .then(response => {
      if (response.ok) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    })
    .then(okResponse => okResponse.json())
    .catch(error => error)
    .then(responseObj => {
      if (responseObj.data) {
        return responseObj;
      } else {
        // return error object...
        return {
          data: {
            viewer: {
              login: "error",
              name: "error",
              email: "error"
            }
          }
        };
      }
    });
};

export function* getGitHubAccountInfoSaga() {
  const token = yield select(getToken);
  const { data: { viewer } } = yield call(getGitHubAccount, token);
  yield put(updateAccountInfo(viewer));
}

export function* requestSaga() {
  yield* takeEvery("SUBMIT_TOKEN", getGitHubAccountInfoSaga);
}

export function* rootSaga() {
  yield [fork(requestSaga)];
}
