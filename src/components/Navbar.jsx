import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../ features/auth/authSlice"
import { useState } from "react";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = useAppSelector((state) => state.auth.user);
  const cartItems = useAppSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="text-3xl transform group-hover:scale-110 transition-transform duration-200">
              🕯️
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              CandleKart
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            
            <Link 
              to="/" 
              className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200"
            >
              Home
            </Link>

            {/* Cart */}
            {user && (
              <Link 
                to="/cart" 
                className="relative group"
              >
                <div className="flex items-center space-x-1 text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200">
                  <span className="text-xl">🛒</span>
                  <span>Cart</span>
                </div>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            )}

            {/* Admin Link */}
            {user?.role === "ADMIN" && (
              <Link
                to="/admin"
                className="flex items-center space-x-1 text-red-600 hover:text-red-700 font-semibold transition-colors duration-200"
              >
                <span className="text-lg">🛡️</span>
                <span>Admin</span>
              </Link>
            )}

            {/* Auth Buttons */}
            {!user ? (
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-2.5 rounded-lg hover:from-amber-700 hover:to-orange-700 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className="text-lg">👤</span>
                <span>Login</span>
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-amber-200">
                  <span className="text-amber-600">👤</span>
                  <span className="text-sm font-medium text-gray-700">
                    {user.name || user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 border-2 border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 hover:border-gray-400 font-medium text-gray-700 transition-all duration-200"
                >
                  <span>🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-amber-100 transition-colors duration-200"
          >
            <span className="text-2xl">
              {mobileMenuOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-amber-200">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-amber-100 rounded-lg transition-colors duration-200"
            >
              Home
            </Link>

            {user && (
              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-amber-100 rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🛒</span>
                  <span>Cart</span>
                </div>
                {cartItems.length > 0 && (
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            )}

            {user?.role === "ADMIN" && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <span className="text-lg">🛡️</span>
                <span className="font-semibold">Admin</span>
              </Link>
            )}

            {!user ? (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block mx-4 text-center bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-2.5 rounded-lg hover:from-amber-700 hover:to-orange-700 font-medium shadow-md"
              >
                Login
              </Link>
            ) : (
              <div className="space-y-2 px-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-amber-200">
                  <span className="text-amber-600">👤</span>
                  <span className="text-sm font-medium text-gray-700">
                    {user.name || user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 border-2 border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 font-medium text-gray-700 transition-colors duration-200"
                >
                  <span>🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}