const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');

// Configuration
const CONFIG = {
  inputDir: path.join(__dirname, 'images'),
  outputDir: path.join(__dirname, 'optimized_images'),
  webpQuality: 80,
  jpegQuality: 75,
  pngQuality: [0.6, 0.8],
  sizes: [
    { width: 1200, suffix: '-large' },
    { width: 800, suffix: '-medium' },
    { width: 400, suffix: '-small' }
  ]
};

// Créer le dossier de sortie s'il n'existe pas
if (!fs.existsSync(CONFIG.outputDir)) {
  fs.mkdirSync(CONFIG.outputDir, { recursive: true });
}

// Fonction pour optimiser une image
async function optimizeImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const fileName = path.basename(filePath, ext);
    const outputBase = path.join(CONFIG.outputDir, fileName);
    
    // Ignorer les fichiers non images
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      console.log(`Ignoring non-image file: ${filePath}`);
      return;
    }

    console.log(`Optimizing ${filePath}...`);
    
    // Lire l'image avec Sharp
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Générer des versions WebP
    for (const size of CONFIG.sizes) {
      if (metadata.width <= size.width) continue;
      
      const outputPath = `${outputBase}${size.suffix}.webp`;
      
      await image
        .resize({ width: size.width, withoutEnlargement: true })
        .webp({ quality: CONFIG.webpQuality })
        .toFile(outputPath);
      
      console.log(`Created: ${outputPath}`);
    }
    
    // Optimiser l'image originale
    if (['.jpg', '.jpeg'].includes(ext)) {
      await imagemin([filePath], {
        destination: CONFIG.outputDir,
        plugins: [
          imageminJpegtran({
            progressive: true,
            quality: CONFIG.jpegQuality
          })
        ]
      });
    } else if (ext === '.png') {
      await imagemin([filePath], {
        destination: CONFIG.outputDir,
        plugins: [
          imageminPngquant({
            quality: CONFIG.pngQuality
          })
        ]
      });
    }
    
    console.log(`Optimized: ${path.basename(filePath)}`);
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Fonction pour parcourir récursivement un dossier
async function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Créer le même dossier dans le répertoire de sortie
      const relativePath = path.relative(CONFIG.inputDir, fullPath);
      const outputPath = path.join(CONFIG.outputDir, relativePath);
      
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }
      
      await processDirectory(fullPath);
    } else if (stat.isFile()) {
      await optimizeImage(fullPath);
    }
  }
}

// Démarrer le traitement
(async () => {
  try {
    console.log('Starting image optimization...');
    await processDirectory(CONFIG.inputDir);
    console.log('Image optimization completed!');
  } catch (error) {
    console.error('Error during optimization:', error);
    process.exit(1);
  }
})();
