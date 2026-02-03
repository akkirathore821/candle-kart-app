import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../ features/cart/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <Link to={`/product/${product.productId}`}>
      <div className="card overflow-hidden group">
        {/* Product Image */}
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* {product.stock < 5 && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
              Only {product.stock} left!
            </span>
          )} */}
        </div>

        {/* Product Info */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
            {/* <div className="flex items-center space-x-1">
              <span className="text-yellow-400">⭐</span>
              <span className="text-sm text-gray-600">{product.rating}</span>
            </div> */}
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors duration-200">
            {product.name}
          </h3>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>

            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-amber-700 hover:to-orange-700 font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
            >
              <span>🛒</span>
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}