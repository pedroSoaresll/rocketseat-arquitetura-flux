export function addToCartRequest(id) {
  return {
    type: '@cart/ADD_REQUEST',
    id,
  };
}

export function addToCartSuccess(product) {
  return {
    type: '@cart/ADD_SUCCESS',
    product,
  };
}

export function addQuantityRequest(product) {
  return {
    type: '@cart/ADD_QUANTITY_REQUEST',
    product,
  };
}

export function addQuantitySuccess(product) {
  return {
    type: '@cart/ADD_QUANTITY_SUCCESS',
    product,
  };
}

export function removeFromCart(product) {
  return {
    type: '@cart/REMOVE',
    product,
  };
}

export function removeQuantity(product) {
  return {
    type: '@cart/REMOVE_QUANTITY',
    product,
  };
}
