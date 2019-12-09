import { call, select, put, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

import { addToCartSuccess, updateAmount } from './actions';

function* addToCart({ id }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id),
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    console.tron.warn('ERRO');
    return;
  }

  if (productExists) {
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
