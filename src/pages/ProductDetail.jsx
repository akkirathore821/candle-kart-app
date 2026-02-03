import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addToCart } from "../ features/cart/cartSlice";
import { useState } from "react";

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  const product = useAppSelector((state) =>
    state.products.items.find((item) => item.productId === productId)
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-gray-400 mb-4">Product not found</p>
          <button
            onClick={() => navigate("/")}
            className="btn-primary"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 text-gray-600 hover:text-gray-900 flex items-center space-x-2"
        >
          <span>←</span>
          <span>Back to Products</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative h-96 lg:h-full bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* {product.stock < 5 && (
                <span className="absolute top-6 right-6 bg-red-500 text-white text-sm px-4 py-2 rounded-full font-semibold">
                  Only {product.stock} left!
                </span>
              )} */}
            </div>

            {/* Product Info */}
            <div className="p-8 lg:p-12">
              <div className="mb-4">
                <span className="text-sm font-semibold text-amber-600 bg-amber-50 px-4 py-2 rounded-full">
                  {product.category}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-2xl ${
                        i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
                <span className="text-gray-600">({product.rating})</span>
              </div> */}

              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="border-t border-b border-gray-200 py-6 mb-8">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-lg">Price:</span>
                  <span className="text-4xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-gray-700 font-semibold mb-3">
                  Quantity:
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-full border-2 border-gray-300 hover:bg-gray-100 font-bold text-xl"
                  >
                    -
                  </button>
                  <span className="text-2xl font-semibold w-16 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-12 h-12 rounded-full border-2 border-gray-300 hover:bg-gray-100 font-bold text-xl"
                  >
                    +
                  </button>
                  <span className="text-gray-500 text-sm">
                    {product.stock} available
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`w-full py-4 rounded-lg font-semibold text-lg flex items-center justify-center space-x-3 ${
                  product.stock === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "btn-primary"
                }`}
              >
                <span className="text-2xl">🛒</span>
                <span>
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </span>
              </button>

              {/* Product Features */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <span className="text-xl">✓</span>
                  <span>100% Natural Soy Wax</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <span className="text-xl">✓</span>
                  <span>Hand-poured with care</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <span className="text-xl">✓</span>
                  <span>45+ hours burn time</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <span className="text-xl">✓</span>
                  <span>Eco-friendly packaging</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}