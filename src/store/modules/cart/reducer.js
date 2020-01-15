import produce from 'immer';

function hasProductInCart(draftProducts, product) {
  const productIndex = draftProducts.findIndex(p => p.id === product.id);

  return {
    index: productIndex,
    have: productIndex >= 0,
  };
}

export default function cart(state = [], action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return produce(state, draft => {
        const productInCart = hasProductInCart(draft, action.product);

        if (productInCart.have) {
          draft[productInCart.index].amount += 1;
        } else {
          draft.push({
            ...action.product,
            amount: 1,
          });
        }
      });

    case 'ADD_QUANTITY':
      return produce(state, draft => {
        const productInCart = hasProductInCart(draft, action.product);

        if (productInCart.have) {
          const product = draft[productInCart.index];

          product.amount += 1;
        }
      });

    case 'REMOVE_FROM_CART':
      return produce(state, draft => {
        const productInCart = hasProductInCart(draft, action.product);

        if (productInCart.have) {
          draft.splice(productInCart.index, 1);
        }
      });

    case 'REMOVE_QUANTITY':
      return produce(state, draft => {
        const productInCart = hasProductInCart(draft, action.product);

        if (productInCart.have) {
          const product = draft[productInCart.index];

          if (product.amount <= 1) {
            draft.splice(productInCart.index, 1);
          } else {
            draft.map(p => {
              if (p.id === product.id) {
                p.amount -= 1;
                return p;
              }

              return p;
            });
          }
        }
      });

    default:
      return state;
  }
}
