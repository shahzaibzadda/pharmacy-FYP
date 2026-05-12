'use client';
import { useState, useRef, useEffect } from 'react';
import Tesseract from "tesseract.js";
import axios from 'axios';
import { useProducts } from "@/app/Context/ProductsContext";

export default function OCRPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rawText, setRawText] = useState('');
  const [cartMsg, setCartMsg] = useState('');
  const [showPopover, setShowPopover] = useState(false);
  const [success, setSuccess] = useState(false);
  const cardRef = useRef(null);
  const popoverRef = useRef(null);
  const { products } = useProducts();

  // ✅ Improved product matching function
  const findProductByName = (medicineName) => {
    if (!products.length) return null;
    
    const searchTerm = medicineName.toLowerCase().trim();
    
    // First try: Exact match
    let found = products.find(p => p.name.toLowerCase() === searchTerm);
    if (found) return found;
    
    // Second try: Partial match
    found = products.find(p => 
      p.name.toLowerCase().includes(searchTerm) || 
      searchTerm.includes(p.name.toLowerCase())
    );
    if (found) return found;
    
    // Third try: Remove common words
    const cleanSearch = searchTerm.replace(/tablet|capsule|syrup|injection|cream|ointment|drop|sirup/gi, '').trim();
    if (cleanSearch !== searchTerm) {
      found = products.find(p => p.name.toLowerCase().includes(cleanSearch));
      if (found) return found;
    }
    
    return null;
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    setResult(null);
    setRawText('');
    setCartMsg('');
    setShowPopover(false);

    try {
      const { data: { text: ocrText } } = await Tesseract.recognize(file, "eng");
      setRawText(ocrText);

      const res = await fetch("/api/ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ocrText }),
      });
      const data = await res.json();
      
      if (res.ok) {
        const medicinesWithStatus = data.medicines.map(med => {
          const existingProduct = findProductByName(med.name);
          return {
            ...med,
            exists: !!existingProduct,
            product: existingProduct
          };
        });
        setResult(medicinesWithStatus);
        setShowPopover(true);
      } else {
        setError(data.error || "Failed to extract medicines.");
      }
    } catch (err) {
      setError("Network error.");
      console.error(err);
    }
    setLoading(false);
  };

  const handleAddToCart = async (e, med) => {
    e.stopPropagation();
    setCartMsg('');
    setError(null);
    setSuccess(false);
    
    const existingProduct = med.product || findProductByName(med.name);
    
    if (!existingProduct) {
      setCartMsg(`❌ "${med.name}" not available in store.`);
      return;
    }
    
    try {
      await axios.post("/api/cart", {
        productId: existingProduct.id || existingProduct._id,
        quantity: med.quantity || 1,
      });
      setSuccess(true);
      setCartMsg(`✅ ${existingProduct.name} added to cart!`);
      setTimeout(() => setSuccess(false), 1200);
      window.dispatchEvent(new Event('cart-updated'));
    } catch (err) {
      console.error("Cart error:", err);
      setCartMsg(`❌ Failed to add ${med.name} to cart.`);
    }
  };

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target) && 
          cardRef.current && !cardRef.current.contains(event.target)) {
        setShowPopover(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto bg-white/90 rounded-2xl shadow-2xl p-6 mt-4 mb-8 border border-gray-100 backdrop-blur-lg" ref={cardRef}>
      <h2 className="text-2xl font-extrabold text-[#48A111] mb-6 text-center tracking-tight">AI Prescription Reader</h2>
      <div className="flex flex-col items-center gap-4">
        <label className="w-full flex flex-col items-center px-4 py-6 bg-[#48A111] text-white rounded-lg shadow-md tracking-wide uppercase border border-[#25490f] cursor-pointer hover:bg-[#3e8d0e] transition">
          <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-5 4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <span className="text-base leading-normal mb-1">Select a prescription image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
          {file && <span className="mt-2 text-sm text-teal-600">{file.name}</span>}
        </label>
        <button
          onClick={handleUpload}
          className="w-full px-6 py-2 mt-2 bg-gradient-to-r from-[#1e4207] to-[#3e8d0e] text-white font-semibold rounded-lg shadow hover:from-[#3e8d0e] hover:to-[#2f6f0a] transition disabled:opacity-50"
          disabled={loading || !file}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Processing...
            </span>
          ) : 'Extract Medicines'}
        </button>
      </div>

      {error && (
        <div className="mt-6 bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg text-center">
          {error}
        </div>
      )}

      {/* ✅ FIXED: Popover with better positioning - CENTERED ON SCREEN */}
      {showPopover && (
        <>
          {/* Full screen overlay */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setShowPopover(false)}
          />
          
          {/* Centered popover */}
          <div 
            ref={popoverRef}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[95%] max-w-md max-h-[85vh] overflow-y-auto shadow-2xl rounded-xl bg-white border border-teal-200 p-6 animate-fade-in"
          >
            <button
              className="absolute top-2 right-2 text-teal-700 hover:text-red-500 transition z-10 bg-white rounded-full p-1"
              onClick={() => setShowPopover(false)}
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="font-bold text-lg text-teal-800 mb-3 flex items-center gap-2 sticky top-0 bg-white py-2">
              <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h3m-7 6v2a4 4 0 004 4h3m-7-6H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-2" />
              </svg>
              Extracted Medicines
            </h3>
            
            {result && result.length > 0 ? (
              <>
                <ul className="mb-4 space-y-2">
                  {result.map((med, idx) => (
                    <li key={idx} className={`flex items-center gap-2 p-2 rounded-lg ${med.exists ? 'bg-green-50' : 'bg-red-50'}`}>
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-teal-100 rounded-full shadow text-teal-600 font-bold text-sm">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <span className={`font-semibold ${med.exists ? 'text-green-700' : 'text-red-600'}`}>
                          {med.name}
                        </span>
                        {!med.exists && (
                          <span className="text-xs ml-2 text-red-400">(Not in store)</span>
                        )}
                        <span className="text-xs text-gray-500 ml-2">Qty: {med.quantity || 1}</span>
                      </div>
                      <button
                        className={`ml-2 p-1.5 rounded-full transition ${med.exists ? 'hover:bg-teal-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                        title={med.exists ? "Add to Cart" : "Not available"}
                        onClick={e => med.exists && handleAddToCart(e, med)}
                        disabled={!med.exists}
                      >
                        <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v7" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
                
                {cartMsg && (
                  <div className="mt-3 text-center text-base font-medium rounded-lg px-3 py-2"
                    style={{
                      background: cartMsg.startsWith("✅") ? "linear-gradient(90deg,#d1fae5,#bbf7d0)" : "#fee2e2",
                      color: cartMsg.startsWith("✅") ? "#065f46" : "#b91c1c"
                    }}>
                    {cartMsg}
                  </div>
                )}
                
                {/* Add All to Cart button */}
                <button
                  onClick={() => {
                    result.filter(m => m.exists).forEach(med => {
                      handleAddToCart({ stopPropagation: () => {} }, med);
                    });
                  }}
                  className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-green-700 transition"
                >
                  Add All Available to Cart
                </button>
              </>
            ) : (
              <p className="text-gray-500">No medicines detected.</p>
            )}
            
            {rawText && (
              <details className="mt-4">
                <summary className="cursor-pointer text-teal-700 font-semibold">Show Raw OCR Text</summary>
                <pre className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600 max-h-32 overflow-auto">{rawText}</pre>
              </details>
            )}
          </div>
        </>
      )}
    </div>
  );
}