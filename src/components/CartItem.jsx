import { useAppDispatch } from "../app/hooks";
import { removeFromCart, updateQuantity } from "../ features/cart/cartSlice";

export default function CartItem({ item }) {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > item.stock) {
      alert("Not enough stock available");
      return;
    }
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="card p-4 flex flex-col sm:flex-row items-center gap-4">
      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg"
      />

      {/* Product Info */}
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-600">{item.category}</p>
        <p className="text-amber-600 font-semibold mt-1">${item.price}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 rounded-full border-2 border-gray-300 hover:bg-gray-100 font-bold text-gray-700"
        >
          -
        </button>
        <span className="text-lg font-semibold w-12 text-center">
          {item.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 rounded-full border-2 border-gray-300 hover:bg-gray-100 font-bold text-gray-700"
        >
          +
        </button>
      </div>

      {/* Subtotal & Remove */}
      <div className="flex flex-col items-center sm:items-end gap-2">
        <p className="text-xl font-bold text-gray-900">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={handleRemove}
          className="text-red-600 hover:text-red-700 font-medium text-sm"
        >
          🗑️ Remove
        </button>
      </div>
    </div>
  );
}