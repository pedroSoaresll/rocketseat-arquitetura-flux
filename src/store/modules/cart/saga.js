import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import history from '../../../services/history';

import { addToCartSuccess, addQuantitySuccess } from './actions';
import { formatPrice } from '../../../utils/format';

function* addToCart({ id }) {
  const stateProduct = yield select(state => state.cart.find(p => p.id === id));

  const stock = yield call(api.get, `stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = stateProduct ? stateProduct.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  if (stateProduct) {
    yield put(addQuantitySuccess(stateProduct));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
      subtotal: response.data.price,
    };

    yield put(addToCartSuccess(data));

    history.push('/cart');
  }
}

function* updateAmount({ product }) {
  if (product.amount <= 0) {
    return;
  }

  const stock = yield call(api.get, `stock/${product.id}`);
  const stockAmount = stock.data.amount;

  if (product.amount >= stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  yield put(addQuantitySuccess(product));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/ADD_QUANTITY_REQUEST', updateAmount),
]);
