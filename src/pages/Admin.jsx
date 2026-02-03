import { useAppSelector } from "../app/hooks";

export default function Admin() {
  const products = useAppSelector((state) => state.products.items);
  const user = useAppSelector((state) => state.auth.user);

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );
  const lowStockProducts = products.filter((product) => product.stock < 10);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {user?.name}! 👋
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Total Products
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {totalProducts}
                </p>
              </div>
              <div className="text-4xl">📦</div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Total Stock
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {totalStock}
                </p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Inventory Value
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  ${totalValue.toFixed(2)}
                </p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Low Stock Items
                </p>
                <p className="text-3xl font-bold text-red-600">
                  {lowStockProducts.length}
                </p>
              </div>
              <div className="text-4xl">⚠️</div>
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        {lowStockProducts.length > 0 && (
          <div className="card p-6 mb-8 border-l-4 border-red-500">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">⚠️</span>
              Low Stock Alert
            </h2>
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between bg-red-50 p-3 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {product.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-red-600 font-bold">
                      Only {product.stock} left
                    </p>
                    <p className="text-sm text-gray-600">
                      ${product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Products Table */}
        <div className="card p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Product Inventory
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Product
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Stock
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Rating
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Value
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <span className="font-medium text-gray-900">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {product.category}
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      ${product.price}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-semibold ${
                          product.stock < 10
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-gray-600">{product.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      ${(product.price * product.stock).toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      {product.stock === 0 ? (
                        <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">
                          Out of Stock
                        </span>
                      ) : product.stock < 10 ? (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                          Low Stock
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                          In Stock
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}