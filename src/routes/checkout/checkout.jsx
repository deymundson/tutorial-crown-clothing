import { useContext } from "react";
import { CheckoutItem } from "../../components";
import { CartContext } from "../../contexts";
import "./checkout.scss";

export const Checkout = () => {
  const { cartItems, addItemToCart, removeItemFromCart } =
    useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="checkout">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((item) => (
        <CheckoutItem key={item.id} item={item} />
        // <div key={item.id}>
        //   <span>{item.name}</span>
        //   <button type="button" onClick={() => removeItemFromCart(item)}>
        //     -
        //   </button>
        //   <span>{item.quantity}</span>
        //   <button type="button" onClick={() => addItemToCart(item)}>
        //     +
        //   </button>
        //   <span>{item.price}</span>
        //   <button type="button" onClick={() => removeItemFromCart(item)}>
        //     x
        //   </button>
        // </div>
      ))}
      <span className="total">Total: ${totalPrice}</span>
    </div>
  );
};
