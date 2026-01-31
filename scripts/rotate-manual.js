const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../public/faculty');
const imagesToRotate = [
    'esmita-gupta.jpg',
    'ashwini-kulkarni.jpg',
    'kajal-jaisinghani.jpg',
    'vandana-maurya.jpg',
    'rohini-patil.jpg',
    'pritam-kamble.jpg'
];

async function rotateImages() {
    for (const file of imagesToRotate) {
        const filePath = path.join(directoryPath, file);
        const tempPath = path.join(directoryPath, `temp_${file}`);

        if (fs.existsSync(filePath)) {
            try {
                console.log(`Rotating ${file} 90 degrees...`);
                await sharp(filePath)
                    .rotate(90)
                    .toFile(tempPath);

                fs.unlinkSync(filePath);
                fs.renameSync(tempPath, filePath);
                console.log(`✅ Success: ${file}`);
            } catch (error) {
                console.error(`❌ Error rotating ${file}:`, error);
                if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
            }
        } else {
            console.log(`⚠️ File not found: ${file}`);
        }
    }
}

rotateImages();
