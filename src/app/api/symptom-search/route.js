import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  const { symptomText } = body;

  if (!symptomText) {
    return new Response(
      JSON.stringify({ error: "Symptom text is required" }),
      { status: 400 }
    );
  }

  try {
    // Database se medicines lao
    const medicines = await Product.find({})
      .select("name description price")
      .lean();

    const medicineList = medicines
      .map(
        (m) =>
          `${m.name} - ${m.description || "No description"} - Rs ${m.price}`
      )
      .join("\n");

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful pharmacy assistant. Suggest medicines only from the medicines list provided by the store. Maximum 4-5 lines. Do not use bold formatting. At the end write:Caution:Always consult a doctor before taking any medicine. Do not suggest any medicine if symptoms are not clear or if they require a doctor's consultation.",
            },
            {
              role: "user",
              content: `
User symptoms:
${symptomText}

Available medicines in Saydaliyya Store:

${medicineList}

Rules:
1. Suggest medicines only from the above list.
2. Do not invent medicine names.
3. If no medicine matches, reply:
"No suitable medicine found in Saydaliyya Store."
              `,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    return new Response(
      JSON.stringify({
        result: data.choices?.[0]?.message?.content || "No response generated",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
