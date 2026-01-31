const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../public/faculty');

if (!fs.existsSync(directoryPath)) {
    console.error('Directory not found:', directoryPath);
    process.exit(1);
}

fs.readdir(directoryPath, async (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    console.log(`Found ${files.length} files. Processing...`);

    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
            const filePath = path.join(directoryPath, file);
            const tempPath = path.join(directoryPath, `temp_${file}`);

            try {
                // Read metadata to check orientation
                const metadata = await sharp(filePath).metadata();

                if (metadata.orientation) {
                    console.log(`Rotating ${file} (Orientation: ${metadata.orientation})...`);

                    // Auto-orient and save to temp file
                    await sharp(filePath)
                        .rotate()
                        .toFile(tempPath);

                    // Replace original file
                    fs.unlinkSync(filePath);
                    fs.renameSync(tempPath, filePath);
                    console.log(`✅ Fixed: ${file}`);
                } else {
                    console.log(`Skipped (No orientation data): ${file}`);
                }
            } catch (error) {
                console.error(`❌ Error processing ${file}:`, error);
                // Clean up temp file if it exists
                if (fs.existsSync(tempPath)) {
                    fs.unlinkSync(tempPath);
                }
            }
        }
    }
    console.log('Done.');
});
