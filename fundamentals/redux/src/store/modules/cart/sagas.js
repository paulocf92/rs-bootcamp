import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';

import { addToCartSuccess } from './actions';

function* addToCart({ id }) {
  // Fire a request to the api through call
  const response = yield call(api.get, `/products/${id}`);

  // Deliver the results through addToCartSuccess (reducer)
  yield put(addToCartSuccess(response.data));
}

// all runs a list of exports
export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart), // Prevents multiple api calls, firing only the latest
]);
