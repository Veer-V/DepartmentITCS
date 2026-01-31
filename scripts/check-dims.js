const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../public/faculty');

fs.readdir(directoryPath, async (err, files) => {
    if (err) return console.log('Error: ' + err);

    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
            const filePath = path.join(directoryPath, file);
            const metadata = await sharp(filePath).metadata();
            console.log(`${file}: ${metadata.width}x${metadata.height} (Orientation: ${metadata.orientation})`);
        }
    }
});
