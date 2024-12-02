export default function showProgressBar(position, barLength) {
    const filledWidth = Math.floor(position / barLength * 30);
    const emptyWidth = 30 - filledWidth;
    const progressBar = '█'.repeat(filledWidth) + '▒'.repeat(emptyWidth);

	process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`[${progressBar}] ${position}%`);
}