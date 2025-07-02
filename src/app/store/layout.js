'use client';
import { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductsProvider } from "@/app/Context/ProductsContext";

export default function ArticlesLayout({ children }) {
    useEffect(() => {
        const BOT_ID = "fhrs963auksanlcc9pavot1c250pdrz1"; // Replace with actual Chatbase bot ID

        if (!window.chatbase || window.chatbase("getState") !== "initialized") {
            window.chatbase = (...args) => {
                if (!window.chatbase.q) window.chatbase.q = [];
                window.chatbase.q.push(args);
            };
            window.chatbase = new Proxy(window.chatbase, {
                get(target, prop) {
                    if (prop === "q") return target.q;
                    return (...args) => target(prop, ...args);
                }
            });
        }

        const existingScript = document.getElementById(BOT_ID);
        if (existingScript) return;

        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = BOT_ID;
        script.setAttribute("data-chatbase-id", BOT_ID); // Required for Chatbase
        script.setAttribute("domain", "www.chatbase.co");

        script.onload = () => {
            window.chatbase("boot"); // Optional: force start
        };

        document.body.appendChild(script);
    }, []);

    return (
        <div>
            <ProductsProvider>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </ProductsProvider>
        </div>
    );
}
