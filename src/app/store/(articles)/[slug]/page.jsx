'use client';
import React, { useState } from "react";
import { useProducts } from "@/app/Context/ProductsContext";
import axios from "axios";

const ProductCard = ({ product, onClick }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleIncrease = (e) => {
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await axios.post("/api/cart", {
        productId: product.id || product._id,
        quantity,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1200);
      window.dispatchEvent(new Event('cart-updated'));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="w-72 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 p-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="h-56 bg-gray-100 flex items-center justify-center">
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="pt-4">
        <p className="text-sm text-blue-600 font-medium">{product.category}</p>
        <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
        <p className="text-sm text-gray-600 mt-1">{product.type}</p>
        <p className="mt-2 text-sm h-14 text-gray-700 line-clamp-2">{product.description}</p>
        <div className="flex items-center mt-3 space-x-3">
          <button onClick={handleDecrease} className="px-3 py-1 bg-gray-200 rounded text-xl font-bold text-gray-700" disabled={quantity <= 1 || loading}>-</button>
          <span className="text-xl font-semibold text-red-600">{quantity}</span>
          <button onClick={handleIncrease} className="px-3 py-1 bg-gray-200 rounded text-xl font-bold text-gray-700" disabled={loading}>+</button>
        </div>
        <div>
          {product.stock > 0 ? (
            <p className="text-green-600 font-bold text-lg mt-2">In Stock</p>
          ) : (
            <p className="text-red-600 font-bold text-lg mt-2">Out of Stock</p>
          )}
        </div>
        <div className="flex mt-4 items-center justify-between">
          <p className="text-green-600 font-bold text-lg">Rs. {(product.price * quantity).toFixed(2)}</p>
          <button 
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            onClick={handleAddToCart}
            disabled={product.stock === 0 || loading}
          >
            {loading ? (
              <span className="loader border-2 border-t-2 border-green-200 border-t-green-600 rounded-full w-5 h-5 animate-spin"></span>
            ) : success ? (
              <span>✓</span>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
        {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
        <style jsx>{`.loader { display: inline-block; vertical-align: middle; }`}</style>
      </div>
    </div>
  );
};

const ProductDetailPage = ({ product, onBack }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleAddToCart = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await axios.post("/api/cart", {
        productId: product.id || product._id,
        quantity,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <button onClick={onBack} className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition flex items-center font-semibold text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Products
        </button>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
            <img src={product.img} alt={product.name} className="max-h-96 object-contain rounded-xl shadow" />
          </div>
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-lg text-blue-600 font-medium mb-2">{product.category}</p>
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mr-2">{product.type}</span>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-1">Description:</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
            <div className="flex items-center justify-between md:m-6 m-2">
              <div className="flex items-center md:gap-4 gap-2">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1 bg-gray-200 rounded text-xl font-bold text-gray-700" disabled={loading}>-</button>
                <span className="text-xl font-semibold text-red-600">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1 bg-gray-200 rounded text-xl font-bold text-gray-700" disabled={loading}>+</button>
              </div>
              <div className="text-lg font-semibold text-gray-800">{product.stock} available</div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-green-600">Rs. {(product.price * quantity).toFixed(2)}</p>
              <button className="font-semibold shadow px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={product.stock === 0 || loading}
                onClick={handleAddToCart}
              >
                {loading ? (
                  <span className="loader border-2 border-t-2 border-green-200 border-t-green-600 rounded-full w-5 h-5 animate-spin"></span>
                ) : success ? (
                  <span>✓</span>
                ) : (
                  "Add to Cart"
                )}
              </button>
            </div>
            {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
            <style jsx>{`.loader { display: inline-block; vertical-align: middle; }`}</style>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArticleDetailCard = ({ params }) => {
  const { products, loading } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const [typeFilter, setTypeFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [search, setSearch] = useState("");

  const unwrappedParams = React.use(params);
  const slug = unwrappedParams?.slug || "";

  // ✅ Single source of truth for category mapping
  const getCategoryFromSlug = (slug) => {
    const categoryMap = {
      "medicines": "Medicines",
      "baby-child": "Baby & Child",
      "electronics": "Electronics",
      "vitamins-supplements": "Vitamins & Supplements",
      "skin-care": "Skin Care",
      "medicated-cosmetics": "Medicated Cosmetics",
      "personal-care": "Personal Care",
      "surgical-support-braces": "Surgical Support Braces",
      "medical-devices": "Medical Devices",
    };
    return categoryMap[slug] || slug.replace(/-/g, ' ');
  };

  const categoryName = getCategoryFromSlug(slug);
  
  // Filter products by category
  const categoryProducts = products.filter(p => 
    p.category && p.category.toLowerCase() === categoryName.toLowerCase()
  );

  const allTypes = [...new Set(categoryProducts.map(item => item.type).filter(Boolean))];

  const filteredProducts = categoryProducts.filter(item => {
    const typeMatch = typeFilter ? item.type === typeFilter : true;
    const priceMatch = priceFilter ? item.price <= parseInt(priceFilter) : true;
    const stockMatch = stockFilter ? (stockFilter === 'in' ? item.stock > 0 : item.stock === 0) : true;
    const searchMatch = search ? item.name.toLowerCase().includes(search.toLowerCase()) : true;
    return typeMatch && priceMatch && stockMatch && searchMatch;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-xl font-semibold text-blue-700 animate-pulse">Loading products...</div>
      </div>
    );
  }

  if (selectedProduct) {
    return <ProductDetailPage product={selectedProduct} onBack={() => setSelectedProduct(null)} />;
  }

  // Display category name properly
  const getDisplayCategoryName = () => {
    const displayMap = {
      "medicines": "Medicines",
      "baby-child": "Baby & Child",
      "electronics": "Electronics",
      "vitamins-supplements": "Vitamins & Supplements",
      "skin-care": "Skin Care",
      "medicated-cosmetics": "Medicated Cosmetics",
      "personal-care": "Personal Care",
      "surgical-support-braces": "Surgical Support Braces",
      "medical-devices": "Medical Devices",
    };
    return displayMap[slug] || slug.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800 uppercase tracking-wide drop-shadow">
          {getDisplayCategoryName()}
        </h1>
        
        {categoryProducts.length === 0 && !loading && (
          <div className="text-center py-10 bg-yellow-50 rounded-lg mx-4">
            <p className="text-yellow-800 font-semibold">No products found in this category: "{getDisplayCategoryName()}"</p>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4">
            <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-4">
              <h2 className="font-bold mb-4 text-lg text-blue-700">Filters</h2>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full mb-4 px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-200 outline-none"
              />
              <div className="space-y-4">
                {allTypes.length > 0 && (
                  <div>
                    <label className="block font-medium mb-1">Type</label>
                    <select value={typeFilter} onChange={e => { setTypeFilter(e.target.value); setCurrentPage(1); }} className="w-full px-3 py-2 rounded border border-gray-300">
                      <option value="">All Types</option>
                      {allTypes.map((type) => (<option key={type} value={type}>{type}</option>))}
                    </select>
                  </div>
                )}
                <div>
                  <label className="block font-medium mb-1">Price</label>
                  <select value={priceFilter} onChange={e => { setPriceFilter(e.target.value); setCurrentPage(1); }} className="w-full px-3 py-2 rounded border border-gray-300">
                    <option value="">All Prices</option>
                    <option value="50">Under Rs. 50</option>
                    <option value="100">Under Rs. 100</option>
                    <option value="200">Under Rs. 200</option>
                    <option value="500">Under Rs. 500</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Stock</label>
                  <select value={stockFilter} onChange={e => { setStockFilter(e.target.value); setCurrentPage(1); }} className="w-full px-3 py-2 rounded border border-gray-300">
                    <option value="">All</option>
                    <option value="in">In Stock</option>
                    <option value="out">Out of Stock</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>
          
          <section className="w-full md:w-3/4">
            <div className="flex flex-wrap gap-6 justify-center">
              {currentProducts.length > 0 ? (
                currentProducts.map(product => (
                  <div key={product._id} className="hover:scale-105 transition-transform duration-300">
                    <ProductCard product={product} onClick={() => setSelectedProduct(product)} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-red-500 bg-white rounded-lg shadow">
                  No products match selected filters.
                </div>
              )}
            </div>
            
            {filteredProducts.length > productsPerPage && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-1">
                  <button onClick={() => paginate(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50">Previous</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button key={number} onClick={() => paginate(number)} className={`px-3 py-1 rounded border ${currentPage === number ? 'bg-blue-500 text-white' : 'border-gray-300'}`}>{number}</button>
                  ))}
                  <button onClick={() => paginate(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50">Next</button>
                </nav>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailCard;