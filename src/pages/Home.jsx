import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { filterByCategory, searchProducts, fetchProducts } from "../ features/products/productsSlice";
import { getProducts } from "../apis/api";

import ProductCard from "../components/ProductCard";

export default function Home() {
  const dispatch = useAppDispatch();
  const { filteredItems, selectedCategory, loading, error } = useAppSelector((state) => state.products);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Aromatherapy", "Sweet", "Fresh", "Spicy", "Floral", "Woody", "Gourmet"];
  // Fetch products when component mounts
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleCategoryChange = (category) => {
    dispatch(filterByCategory(category));
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    dispatch(searchProducts(query));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Light Up Your Life 🕯️
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Discover our handcrafted candles made with premium soy wax and essential oils.
            Transform any space into a sanctuary.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search for candles..."
              disabled={loading}
              className="w-full px-6 py-4 rounded-full border-2 border-amber-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-200 outline-none text-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                disabled={loading}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 ${selectedCategory === category
                  ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-pulse">🕯️</div>
            <p className="text-xl text-gray-600">Loading products...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              ⚠️ Unable to load products from server. Showing cached products.
            </p>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {selectedCategory === "All" ? "All Candles" : selectedCategory}
          </h2>
          <p className="text-gray-600">
            {filteredItems.length} {filteredItems.length === 1 ? "product" : "products"}
          </p>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No products found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🌿</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">100% Natural</h3>
              <p className="text-gray-600">Made with premium soy wax and essential oils</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over $50</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">♻️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">Sustainable and recyclable packaging</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}