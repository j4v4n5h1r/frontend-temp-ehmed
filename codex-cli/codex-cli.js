import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const prompt = process.argv.slice(2).join(" ");
  if (!prompt) {
    console.log("Lütfen bir komut ver (örnek: create Next.js login form)");
    return;
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  console.log("\n=== CODING OUTPUT ===\n");
  console.log(response.choices[0].message.content);
  console.log("\n====================\n");
}

main();
