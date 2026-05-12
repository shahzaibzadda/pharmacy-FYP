"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronRight, ArrowDown, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  const phoneNumber = "923269850071";
  const message = "Hello! I have a question about your store.";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  // CLICK OUTSIDE CLOSE
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

  return (
    <div className="fixed bottom-5 right-5 z-50 " ref={boxRef}>

      {/* POPUP CARD */}
      {open && (
        <div className="mb-4 w-60 bg-white rounded-2xl shadow-[8px_8px_0px_#14b8a6] border border-gray-200 p-4 relative transition-all duration-300">

          {/* Icon */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-teal-500 text-white flex items-center justify-center rounded-full">
              <FaWhatsapp size={16} />
            </div>
            <h3 className="font-semibold text-sm">Support Chat</h3>
          </div>

          {/* Text */}
          <p className="text-sm text-gray-600 mb-4">
            If you have any kind of question, contact us?
          </p>

          {/* Button */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all"
          >
            <span className="flex items-center gap-2">
              <Phone size={16} /> Start Chat
            </span>

            <ChevronRight size={18} />
          </a>

          {/* bubble tail (FIXED POSITION) */}
          <div className="absolute bottom-[-8px] right-6 w-4 h-4 bg-white rotate-45 border-r border-b border-gray-200"></div>

        </div>
      )}

      {/* FLOATING BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="w-11 h-11 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all"
      >
        {open ? <ArrowDown /> : <FaWhatsapp />}
      </button>

    </div>
  );
}