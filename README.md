# PDF Image Extractor

A Node.js project for extracting images from PDF files while displaying a real-time progress bar.

## Features

- Extracts all images embedded in a PDF file.
- Saves images in the `images/` directory with descriptive filenames (e.g., `image_<width>x<height>_<id>.jpg`).
- Displays a progress bar to indicate the extraction progress.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pdf-image-extractor.git
   cd pdf-image-extractor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Place your PDF file in the project directory (e.g., `example.pdf`).
2. Run the script:
   ```bash
   node extract-images.js
   ```
3. Extracted images will be saved in the `images/` directory.

### Example Output

- **Progress Bar**:  
  A real-time visual indicator during the extraction process.  
  Example: `[██████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒] 40%`

- **Saved Images**:  
  Files are saved with names based on their dimensions and ID, e.g., `image_800x600_1.jpg`.

## Dependencies

- [pdf-lib](https://github.com/Hopding/pdf-lib) - A library for working with PDF files in JavaScript.
- Node.js (v14 or higher recommended).
- Filesystem (fs/promises) for saving extracted images.

## Progress Bar Module

The progress bar is implemented in the `progress-bar.mjs` module. It dynamically updates in the terminal to reflect the percentage of images processed.

### How It Works

```javascript
export default function showProgressBar(position, barLength) {
    const filledWidth = Math.floor(position / barLength * 30);
    const emptyWidth = 30 - filledWidth;
    const progressBar = '█'.repeat(filledWidth) + '▒'.repeat(emptyWidth);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`[${progressBar}] ${position}%`);
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributions

Contributions are welcome! Feel free to submit issues or pull requests to improve the functionality or add features.

---

Feel free to adapt the `README.md` to match your specific project details or preferences!
