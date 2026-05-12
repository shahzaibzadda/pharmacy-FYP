"use client";

import { useState, useEffect, useRef } from "react";
import { FaRobot } from "react-icons/fa";
import { RefreshCw } from "lucide-react";
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
    { role: "bot", text: " Welcome to Saydaliyya!", time: getTime() },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatRef = useRef();
  const boxRef = useRef(null); // ✅ added

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
    if (!input) return;

    const userMsg = {
      role: "user",
      text: input,
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
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

    setInput("");
    setLoading(false);
  };

  const addToCart = async (id) => {
    await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ productId: id }),
    });

    alert("Added to cart!");
  };

  // 🔥 UPDATED: RESET CHAT (backend + frontend sync)
  const resetChat = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ reset: true }),
    });

    const data = await res.json();

    setMessages([{ role: "bot", text: data.reply, time: getTime() }]);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed h-11 w-11 bottom-18 right-5 bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 rounded-full shadow-xl hover:scale-110 transition z-[99999]"
      >
        <FaRobot size={20} />
      </button>

      {open && (
        <div
          ref={boxRef} // ✅ added
          className="fixed bottom-20 right-4 sm:bottom-30 sm:right-15 
          w-[85vw] sm:w-80 md:w-80 
          h-[65vh] sm:h-[400px]   
          bg-white shadow-2xl rounded-2xl flex flex-col animate-fadeIn z-[99999]"
        >
          {/* HEADER */}
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-3 flex justify-between items-center rounded-t-2xl">
            <span className="font-bold">Saydaliyya Assistant</span>

            {/* 🔥 REFRESH BUTTON */}
            <button
              onClick={resetChat}
              className="text-sm bg-white text-green-700 px-2 py-1 rounded hover:bg-gray-200"
            >
              <RefreshCw size={16} />
            </button>
          </div>

          {/* CHAT AREA */}
          <div ref={chatRef} className="flex-1 p-3 overflow-y-auto bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className="my-3">
                <div
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {/* BOT ICON */}
                  {m.role === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                      <FaRobot size={20} />
                    </div>
                  )}

                  <div className="max-w-[75%]">
                    {/* NAME */}
                    <p className="text-xs text-gray-400 mb-1">
                      {m.role === "user" ? "You" : "Pharmacy Bot"}
                    </p>

                    {/* MESSAGE */}
                    <div
                      className={`p-1.5 rounded-md px-2 whitespace-pre-line shadow ${
                        m.role === "user"
                          ? "bg-green-600 text-white ml-auto"
                          : "bg-white border"
                      }`}
                    >
                      {m.text}
                    </div>

                    {/* TIME */}
                    <p className="text-[10px] text-gray-400 mt-1 text-right">
                      {m.time}
                    </p>
                  </div>

                  {/* USER ICON */}
                  {m.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center ml-2">
                      U
                    </div>
                  )}
                </div>

                {/* SINGLE PRODUCT */}
                {m.product && (
                  <button
                    onClick={() => addToCart(m.product.id)}
                    className="bg-blue-600 text-white px-3 py-1 mt-2 rounded-lg text-sm"
                  >
                    Add to Cart
                  </button>
                )}

                {/* MULTIPLE PRODUCTS */}
                {m.products &&
                  m.products.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => addToCart(p.id)}
                      className="bg-green-600 text-white px-3 py-1 mt-2 mr-1 rounded-lg text-sm"
                    >
                      Add {p.name}
                    </button>
                  ))}
              </div>
            ))}

            {/* TYPING */}
            {loading && (
              <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
                <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center">
                  <FaRobot size={20} />
                </div>
                <span className="animate-pulse">Bot is typing...</span>
              </div>
            )}
          </div>

          {/* INPUT */}
          <div className="flex border-t">
            <input
              className="flex-1 p-2 outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type message..."
            />
            <button
              onClick={sendMessage}
              className="bg-green-600 text-white px-4"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
