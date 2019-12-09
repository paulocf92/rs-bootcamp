import { call, select, put, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

import { addToCartSuccess, updateAmount } from './actions';

function* addToCart({ id }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id),
  );

  if (productExists) {
    const amount = productExists.amount + 1;

    yield put(updateAmount(id, amount));
  } else {
    // Fire a request to the api through call
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      formattedPrice: formatPrice(response.data.price),
    };

    // Deliver the results through addToCartSuccess (reducer)
    yield put(addToCartSuccess(data));
  }
}

// all runs a list of exports
export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart), // Prevents multiple api calls, firing only the latest
]);
