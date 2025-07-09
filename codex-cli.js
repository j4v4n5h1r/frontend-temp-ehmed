const fs = require('fs');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // API anahtarını .env'den ya da terminalden alabilirsin
});

const openai = new OpenAIApi(configuration);

async function runCodex(prompt) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    let outputText = response.data.choices[0].message.content;

    // Gereksiz açıklamaları ve kod bloğu işaretlerini temizle
    outputText = cleanOutput(outputText);

    // Eğer prompt sonunda '-> dosya/yolu' belirtildiyse, dosyaya yaz
    const match = prompt.match(/->\s*(.+)$/);
    if (match) {
      const filePath = match[1].trim();
      // Klasör yoksa oluştur
      const dir = require('path').dirname(filePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      fs.appendFileSync(filePath, outputText + '\n\n', 'utf8');
      console.log(`✅ Kod dosyaya eklendi: ${filePath}`);
    } else {
      console.log(outputText);
    }

  } catch (error) {
    console.error("Hata:", error.response ? error.response.data : error.message);
  }
}

function cleanOutput(text) {
  return text
    .replace(/```[\s\S]*?jsx/g, '')              // ```jsx kod bloklarını kaldır
    .replace(/```/g, '')                         // diğer ``` kaldır
    .replace(/Here is how you.*?:/gi, '')       // açıklama cümleleri
    .replace(/\/\/ --- Codex Output.*---/g, '') // Codex timestamp yorumları
    .replace(/^\s*[\r\n]/gm, '')                 // boş satırları temizle
    .trim();
}

// Terminalden prompt al
const prompt = process.argv.slice(2).join(" ");

runCodex(prompt);
