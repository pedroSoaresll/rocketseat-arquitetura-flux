import produce from 'immer';
import { formatPrice } from '../../../utils/format';

function hasProductInCart(draftProducts, product) {
  const productIndex = draftProducts.findIndex(p => p.id === product.id);

  return {
    index: productIndex,
    have: productIndex >= 0,
  };
}

function calcSubtotal(product) {
  return product.amount * product.price;
}

function updateSubtotal(product) {
  product.subtotal = calcSubtotal(product);
  product.subtotalFormatted = formatPrice(product.subtotal);

  return product;
}

export default function cart(state = [], action) {
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        const { product } = action;
        draft.push(product);
      });

    case '@cart/ADD_QUANTITY_SUCCESS':
      return produce(state, draft => {
        const productInCart = hasProductInCart(draft, action.product);

        if (productInCart.have) {
          let product = draft[productInCart.index];

          product.amount += 1;
          product = updateSubtotal(product);
        }
      });

    case '@cart/REMOVE':
      return produce(state, draft => {
        const productInCart = hasProductInCart(draft, action.product);

        if (productInCart.have) {
          draft.splice(productInCart.index, 1);
        }
      });

    case '@cart/REMOVE_QUANTITY':
      return produce(state, draft => {
        const productInCart = hasProductInCart(draft, action.product);

        if (productInCart.have) {
          const product = draft[productInCart.index];

          if (product.amount <= 1) return;

          draft.map(p => {
            if (p.id === product.id) {
              p.amount -= 1;

              return updateSubtotal(p);
            }

            return p;
          });
        }
      });

    default:
      return state;
  }
}
