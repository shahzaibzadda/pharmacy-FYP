"use client";

import { useState, useEffect, useRef } from "react";
import { FaRobot } from "react-icons/fa";
import { RefreshCw, Send } from "lucide-react";

// ================= TIME FUNCTION
const getTime = () => {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Welcome to Saydaliyya!", time: getTime() },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatRef = useRef();
  const boxRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  // ✅ CLICK OUTSIDE CLOSE
  useEffect(() => {
    function handleClickOutside(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;
    const userMsg = {
      role: "user",
      text: userText,
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const lowerInput = userText.toLowerCase();

    // 🔥 1. CUSTOM RESPONSES FOR RETURN & REFUND
    if (lowerInput.includes("return") || lowerInput.includes("refund") || lowerInput.includes("policy")) {
      setTimeout(() => {
        const botMsg = {
          role: "bot",
          text: "You can view our complete Return and Refund Policy by visiting this page:\n\n🔗 http://192.168.18.21:3000/return-policy",
          time: getTime(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setLoading(false);
      }, 1000); 
      return; 
    }

    // 🔥 2. CUSTOM RESPONSES FOR GREETINGS / CASUAL QUESTIONS (e.g., "kaise ho")
    const greetings = ["kaise ho", "kaise h", "how are you", "how r u", "hi", "hello", "hey", "aaj kaisa h", "kise ho"];
    if (greetings.some(greet => lowerInput.includes(greet))) {
      setTimeout(() => {
        const botMsg = {
          role: "bot",
          text: "I am doing well, thank you! I am an automated pharmacy assistant. I can only help you with the specific items mentioned in our list, such as checking medicine availability, delivery timings, return policies, or payment methods. Please let me know how I can help you with these!",
          time: getTime(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setLoading(false);
      }, 800);
      return;
    }

    // Backend Call for normal messages
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();

      const botMsg = {
        role: "bot",
        text: data.reply,
        product: data.product,
        products: data.products,
        time: getTime(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, I am having trouble connecting right now.", time: getTime() }
      ]);
    }

    setLoading(false);
  };

  const addToCart = async (id) => {
    await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ productId: id }),
    });

    alert("Added to cart!");
  };

  // 🔥 UPDATED: RESET CHAT
  const resetChat = async () => {
    await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ reset: true }),
    });

    setMessages([{ role: "bot", text: "Welcome to Saydaliyya!", time: getTime() }]);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed h-11 w-11 bottom-18 right-5 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-[99999] flex items-center justify-center border border-white/10"
      >
        <FaRobot size={20} />
      </button>

      {open && (
        <div
          ref={boxRef}
          className="fixed bottom-20 right-4 sm:bottom-30 sm:right-15 
          w-[85vw] sm:w-80 md:w-80 
          h-[65vh] sm:h-[430px]   
          bg-white shadow-2xl shadow-slate-300/50 rounded-2xl flex flex-col animate-fadeIn z-[99999] border border-slate-100 overflow-hidden"
        >
          {/* HEADER */}
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-3.5 flex justify-between items-center shadow-md z-10">
            <div className="flex items-center gap-2.5">
              <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                <FaRobot size={16} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-xs tracking-wide">Saydaliyya Assistant</h3>
                <p className="text-[9px] text-green-100 opacity-90">Online & ready to help</p>
              </div>
            </div>

            {/* REFRESH BUTTON */}
            <button
              onClick={resetChat}
              title="Reset Chat"
              className="text-green-700 bg-white p-1.5 rounded-full hover:bg-gray-100 transition-all duration-200 shadow-sm"
            >
              <RefreshCw size={14} />
            </button>
          </div>

          {/* CHAT AREA */}
          <div ref={chatRef} className="flex-1 p-3.5 overflow-y-auto bg-slate-50/50 scroll-smooth">
            {messages.map((m, i) => (
              <div key={i} className="mb-4 last:mb-1">
                <div
                  className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {/* BOT ICON */}
                  {m.role === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 mb-4 shadow-sm border border-gray-200">
                      <FaRobot size={14} className="text-gray-600" />
                    </div>
                  )}

                  <div className={`max-w-[78%] flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                    {/* NAME */}
                    <span className="text-[10px] font-medium text-slate-400 mb-1 px-1">
                      {m.role === "user" ? "You" : "Pharmacy Bot"}
                    </span>

                    {/* MESSAGE BUBBLE */}
                    <div
                      className={`px-3.5 py-2 text-[12.5px] leading-relaxed whitespace-pre-line shadow-sm ${
                        m.role === "user"
                          ? "bg-green-600 text-white rounded-2xl rounded-tr-sm"
                          : "bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-tl-sm"
                      }`}
                    >
                      {m.text.includes("http") ? (
                        <span>
                          {m.text.split("🔗")[0]}
                          <br />
                          🔗 <a href={m.text.split("🔗")[1]?.trim()} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">
                            Click here for Policy
                          </a>
                        </span>
                      ) : (
                        m.text
                      )}
                    </div>

                    {/* TIME */}
                    <span className="text-[9px] text-slate-400 mt-1 px-1">
                      {m.time}
                    </span>
                  </div>

                  {/* USER ICON */}
                  {m.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-[10px] flex-shrink-0 mb-4 shadow-sm">
                      U
                    </div>
                  )}
                </div>

                {/* SINGLE PRODUCT */}
                {m.product && (
                  <div className="ml-9 mt-1">
                    <button
                      onClick={() => addToCart(m.product.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-full text-[11px] font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md"
                    >
                      + Add to Cart
                    </button>
                  </div>
                )}

                {/* MULTIPLE PRODUCTS */}
                {m.products && (
                  <div className="ml-9 mt-1 flex flex-wrap gap-1.5">
                    {m.products.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => addToCart(p.id)}
                        className="bg-green-600 text-white px-2.5 py-1 rounded-full text-[11px] font-medium hover:bg-green-700 transition-colors duration-300 shadow-md"
                      >
                        + {p.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* 🔥 INFO SECTION */}
            {messages.length === 1 && (
              <div className="mt-4 mx-1 p-3 bg-white border border-slate-200 rounded-xl shadow-sm animate-fadeIn">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-amber-500 text-base">💡</span>
                  <p className="font-semibold text-slate-700 text-xs">You can ask me about:</p>
                </div>
                <ul className="list-disc pl-7 space-y-0.5 text-slate-500 text-[11px] marker:text-green-600">
                  <li>Medicines & product availability</li>
                  <li>Delivery timing</li>
                  <li>Return policies</li>
                  <li>Payment methods</li>
                </ul>
              </div>
            )}

            {/* TYPING INDICATOR */}
            {loading && (
              <div className="flex items-center gap-2 mt-2 ml-1 animate-pulse">
                <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center">
                  <FaRobot size={12} className="text-slate-400" />
                </div>
                <div className="flex gap-1 bg-white p-2 rounded-2xl rounded-tl-sm border border-slate-100 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            )}
          </div>

          {/* INPUT AREA */}
          <div className="p-2.5 bg-white border-t border-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full p-1 pl-3.5 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-all">
              <input
                className="flex-1 bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className={`p-1.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                  input.trim() 
                  ? "bg-green-600 text-white shadow-md hover:bg-green-700 scale-100" 
                  : "bg-slate-200 text-slate-400 scale-95 cursor-not-allowed"
                }`}
              >
                <Send size={14} className={input.trim() ? "ml-0.5" : ""} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}