import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

// =========================
// 🧠 CLEAN TEXT
// =========================
const clean = (text = "") =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// =========================
// 🧠 TOKENIZER
// =========================
const tokenize = (text = "") => {
  const noiseWords = [
    "tablet", "mg", "hai", "haan", "available", "availble", "capsule",
    "plz", "please", "kya", "koi", "bhi", "medicine"
  ];

  return clean(text)
    .split(" ")
    .filter(t => t && !noiseWords.includes(t));
};

// =========================
// 🧠 INTENT DETECTION
// =========================
const detectIntent = (msg) => {
  if (/^(hi|hello|hey|salam|assalam)/.test(msg)) return "greeting";
  if (/(payment|cod|jazzcash|easypaisa)/.test(msg)) return "payment";
  if (/(order|buy|cart)/.test(msg)) return "order";
  if (/(delivery|ship)/.test(msg)) return "delivery";

  if (/(fever|pain|headache|cold|cough|allergy|acidity|sir|head)/.test(msg))
    return "symptom";

  return "product";
};

// =========================
// 🧠 SYMPTOM MAP
// =========================
const symptomMap = {
  fever: ["crocin", "dolo"],
  pain: ["volini", "zandu", "aspirin"],
  cold: ["cetrizine"],
  allergy: ["cetrizine"],
  acidity: ["digene"],
  headache: ["panadol", "crocin"],
};

// =========================
// 🧠 SMART MATCH ENGINE
// =========================
const findMatches = (msg, products) => {
  const msgTokens = tokenize(msg);

  let results = [];

  for (let p of products) {
    const name = clean(p.name);
    const desc = clean(p.description || "");

    let score = 0;

    if (msg === name) score += 300;
    if (name.includes(msg)) score += 200;

    for (let t of msgTokens) {
      if (name === t) score += 150;
      else if (name.startsWith(t)) score += 80;
      else if (name.includes(t)) score += 40;
      else if (desc.includes(t)) score += 20;
    }

    if (score > 0) {
      results.push({ product: p, score });
    }
  }

  return results.sort((a, b) => b.score - a.score);
};

// =========================
// 🚀 MEMORY FIX
// =========================
const sessionMemory = new Map();

// 🔥 FIX: normalize key
const getKey = (msg) =>
  clean(msg)
    .replace(/\b(hai|kya|haan|please|plz)\b/g, "")
    .trim();

// =========================
// 🚀 API
// =========================
export async function POST(req) {
  await dbConnect();

  // 🔥 UPDATED (reset added)
  const { message, reset } = await req.json();

  // 🔥 RESET HANDLER
  if (reset) {
    sessionMemory.clear();
    return Response.json({
      reply: "🔄 Chat reset ho gayi hai. Aap dobara search kar sakte hain."
    });
  }

  const msg = clean(message || "");

  const products = await Product.find();

  const intent = detectIntent(msg);

  // ================= GREETING
  if (intent === "greeting") {
    return Response.json({
      reply: "👋 Welcome to Saydaliyya Pharmacy! How can I assist you today?"
    });
  }

  // ================= PAYMENT
  if (intent === "payment") {
    return Response.json({
      reply: "💳 We accept Cash on Delivery, JazzCash & Easypaisa."
    });
  }

  // ================= ORDER
  if (intent === "order") {
    return Response.json({
      reply: "🛒 Select product → Add to Cart → Checkout."
    });
  }

  // ================= DELIVERY
  if (intent === "delivery") {
    return Response.json({
      reply: "🚚 Delivery usually takes 2–3 days."
    });
  }

  // ================= SYMPTOM
  if (intent === "symptom") {
    for (let key in symptomMap) {
      if (msg.includes(key)) {
        const matches = products.filter(p =>
          symptomMap[key].some(k =>
            clean(p.name).includes(k) ||
            clean(p.description || "").includes(key)
          )
        );

        if (matches.length > 0) {
          const top = matches.slice(0, 2);

          return Response.json({
            reply:
              `💊 Based on your symptoms I recommend:\n\n` +
              top
                .map(p => `• ${p.name} - ${p.description} (Rs ${p.price})`)
                .join("\n\n"),
            products: top.map(p => ({
              id: p._id,
              name: p.name
            }))
          });
        }
      }
    }
  }

  // ================= PRODUCT SEARCH
  const matches = findMatches(msg, products);

  if (matches.length === 0) {
    return Response.json({
      reply: "❌ Product nahi mila."
    });
  }

  const best = matches[0];
  const exactMatch = clean(best.product.name) === msg;

  // ================= SESSION
  const key = getKey(msg);
  const last = sessionMemory.get(key);
  const isRepeat = last === key;
  sessionMemory.set(key, key);

  // ================= 🔥 ALTERNATIVE LOGIC (UNCHANGED)
  const baseName = clean(best.product.name).split(" ")[0];

  const realAlternatives = matches.filter(m => {
    const n = clean(m.product.name).split(" ")[0];
    return n === baseName && m.product._id.toString() !== best.product._id.toString();
  });

  const hasAlternatives = realAlternatives.length > 0;

  // ================= SECOND TIME
  if (isRepeat && (exactMatch || matches.length >= 1)) {
    return Response.json({
      reply:
        `💊 ${best.product.name}\n` +
        `📌 ${best.product.description}\n` +
        `💰 Rs ${best.product.price}\n\n🛒 Add to Cart`,
      product: {
        id: best.product._id,
        name: best.product.name
      }
    });
  }

  // ================= FIRST TIME DIRECT
  if (!hasAlternatives) {
    return Response.json({
      reply:
        `💊 ${best.product.name}\n` +
        `📌 ${best.product.description}\n` +
        `💰 Rs ${best.product.price}\n\n🛒 Add to Cart`,
      product: {
        id: best.product._id,
        name: best.product.name
      }
    });
  }

  // ================= LIST
  const top = matches.slice(0, 3);

  return Response.json({
    reply:
      `🔎 Multiple products found:\n\n` +
      top
        .map((r) =>
          `• ${r.product.name}\n  💰 Rs ${r.product.price}`
        )
        .join("\n\n") +
      `\n\n👉 Please type again exact product name for Add to Cart.`,
    products: top.map(r => ({
      id: r.product._id,
      name: r.product.name
    }))
  });
}