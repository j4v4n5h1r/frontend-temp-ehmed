const fs = require('fs');
const path = require('path');

const CLEAN_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

function cleanContent(content) {
  return content
    .replace(/```[\s\S]*?```/g, '')               // tüm ```...``` kod bloklarını kaldır
    .replace(/Here is an example.*(?:\r?\n)+/gi, '') // "Here is an example..." satırlarını kaldır
    .replace(/Here is how you.*(?:\r?\n)+/gi, '')    // "Here is how you..." satırlarını kaldır
    .replace(/\/\/ --- Codex Output.*---/g, '')       // Codex çıktı başlıklarını kaldır
    .replace(/^\s*[\r\n]/gm, '')                      // boş satırları temizle
    .trim();
}

function cleanFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  const cleaned = cleanContent(original);

  if (original !== cleaned) {
    fs.writeFileSync(filePath, cleaned, 'utf8');
    console.log(`✅ Cleaned: ${filePath}`);
  }
}

function walkDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDirectory(fullPath);
    } else if (CLEAN_EXTENSIONS.includes(path.extname(entry.name))) {
      cleanFile(fullPath);
    }
  }
}

const targetRoot = './app'; // Tüm frontend dosyalarını taramak için './app' veya '.' yazabilirsin
walkDirectory(targetRoot);
