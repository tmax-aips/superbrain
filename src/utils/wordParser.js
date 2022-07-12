// parsing reference word
const test =
	/(않나요)|(했어요)|(싶어)|(돼)|(니다)|(고요)|(구요)|(세요)|(래요)|(니다)|(어요)|(에요)|(예요)|(거죠)|(잖아요)|(죠)|(데요)|(게요)|(나요)|(는요)|(든요)|(라서)|(같아)|(은요)|(하다)|(가지고)|(하면)|(는데)|(그러면)|(웠어)/;

export const sentenceMaker = (data) => {
	let arr = [];
	let tempWord = {
		word: '',
		start: data[0].start,
		end: 0,
	};
	data?.forEach((item, idx) => {
		/*if (idx !== 0 && item.start - tempWord.end > 0.5 && tempWord.word !== '') {
			arr.push(tempWord);
			tempWord = {
				word: '',
				start: item.start,
				end: item.end,
			};
		}*/
		if (tempWord.start === 0) tempWord.start = item.start;
		tempWord.word += `${item.word} `;
		tempWord.end = item.end;

		if (item.word.match(test)) {
			arr.push(tempWord);
			tempWord = {
				word: '',
				start: 0,
				end: item.end,
			};
		} else if (idx === data.length - 1) {
			arr.push(tempWord);
		}
	});
	return arr;
};

// video sentence maker
export const videoSentenceMaker = (data) => {
	let arr = [];
	let wordArr = [];
	let sentenceArrTemp = [];
	let sentenceTemp = { text: '', start: 0, end: 0 };
	let temp = {
		start: 0,
		end: 0,
		sentence: false,
	};

	data?.forEach((item, idx) => {
		if (idx === 0) {
			wordArr.push({ word: '...', start: temp.start, end: Number((item.start - 0.01).toFixed(2)) });
			sentenceArrTemp.push({ text: '', start: 0, end: Number((item.start - 0.01).toFixed(2)) });
			arr.push(wordArr);
			wordArr = [];
			temp.start = item.start;
			sentenceTemp.start = item.start;
		} else if (temp.sentence) {
			wordArr.push({ word: '...', start: Number(temp.start), end: Number((item.start - 0.01).toFixed(2)) });
			sentenceTemp.end = Number((item.start - 0.01).toFixed(2));
			sentenceArrTemp.push({ text: sentenceTemp.text, start: sentenceTemp.start, end: sentenceTemp.end });
			arr.push(wordArr);
			wordArr = [];
			sentenceTemp.text = '';
			temp.start = item.start;
			sentenceTemp.start = item.start;
			temp.sentence = false;
		}

		if ((idx !== 0 && item.start - temp.end > 0.5 && wordArr.length > 0) || sentenceTemp.text.length > 25) {
			wordArr.push({ word: '...', start: Number(temp.end), end: Number((item.start - 0.01).toFixed(2)) });
			sentenceTemp.end = Number((item.start - 0.01).toFixed(2));
			sentenceArrTemp.push({ text: sentenceTemp.text, start: sentenceTemp.start, end: sentenceTemp.end });
			arr.push(wordArr);
			wordArr = [];
			temp.start = item.start;
			sentenceTemp.text = '';
			sentenceTemp.start = item.start;
		}
		if (temp.start === 0) {
			temp.start = item.start;
		}
		sentenceTemp.text += `${item.word} `;
		temp.end = item.end;
		wordArr.push(item);

		if (item.word.match(test)) {
			temp.start = Number((item.end + 0.01).toFixed(2));
			temp.sentence = true;
		}
		if (idx === data.length - 1) {
			sentenceTemp.end = item.end;
			sentenceArrTemp.push(sentenceTemp);
			arr.push(wordArr);
		}
	});
	const sentence = [];
	sentenceArrTemp.forEach((sentenceArr, idx) => {
		sentence.push({
			id: idx,
			wordsArr: [...arr[idx]],
			text: sentenceArr.text,
			totalStart: sentenceArr.start,
			totalEnd: sentenceArr.end,
		});
	});
	return { sentence };
};
