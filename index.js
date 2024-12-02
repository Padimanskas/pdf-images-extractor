import { PDFName, PDFRawStream, PDFDocument } from 'pdf-lib';
import showProgressBar from './progress-bar.mjs';
import fs from 'fs/promises';

async function extractImages(pathToPdf) {
    const pdfData = await fs.readFile(pathToPdf);
    const pdfDoc = await PDFDocument.load(pdfData);
    const enumeratedIndirectObjects = pdfDoc.context.enumerateIndirectObjects();

    const pdfRAWImages = enumeratedIndirectObjects.reduce((cumul, [, pdfObject]) => {
        if (!(pdfObject instanceof PDFRawStream)) return cumul;
        const { dict } = pdfObject;
        const subtype = dict.get(PDFName.of('Subtype'));

        if (subtype === PDFName.of('Image')) {
            cumul.push(pdfObject);
        }

        return cumul;
    }, []);

    const totalImages = pdfRAWImages.length;

    for (let i = 0; i < totalImages; i++) {
        const pdfRAWImage = pdfRAWImages[i];
        const { dict, contents } = pdfRAWImage;
        const width = dict.get(PDFName.of('Width'));
        const height = dict.get(PDFName.of('Height'));
        const binaryData = Buffer.from(contents, 'hex');
        const fileName = `images/image_${width}x${height}_${i}.jpg`;
        
		await fs.writeFile(fileName, binaryData);
        showProgressBar(Math.round(((i + 1) / totalImages) * 100), 100);
    }
}

extractImages('example.pdf').then(() => {
    console.log('\nExtraction complete!');
}).catch((err) => {
    console.error(`Error during extraction: ${err}`);
});
