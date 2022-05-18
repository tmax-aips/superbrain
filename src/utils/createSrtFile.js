import { clockTime } from './time';

// function for generating srt caption file
export const CreateSrtFile = (captionsArr) => {
	if (captionsArr.length < 1) {
		alert('파일을 먼저 업로드해주세요');
		return;
	}
	let textData = '';
	captionsArr.forEach((captionArr, idx) => {
		textData += `${idx + 1}\n`;
		textData += `${clockTime(captionArr.totalStart, true)} --> ${clockTime(captionArr.totalEnd, true)}\n`;
		textData += `${captionArr.text}\n\n`;
	});

	const element = document.createElement('a');
	const file = new Blob([textData], { type: 'srt/plain' });
	element.href = URL.createObjectURL(file);

	// Only the name of the file to be downloaded can be modified.
	// caption files in different formats require a generation function that matches the file format.
	element.download = 'myFile.srt';
	document.body.appendChild(element);
	element.click();
};
