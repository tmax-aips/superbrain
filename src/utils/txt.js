// 텍스트 다운로드
export const downloadTxt = (val) => {
	if (!val) {
		alert('파일을 먼저 업로드해주세요');
		return;
	}
	const el = document.createElement('a');
	const file = new Blob([val], { type: 'text/plain' });
	el.href = URL.createObjectURL(file);
	el.download = 'sample.txt';
	document.body.appendChild(el);
	el.click();
};

//텍스트 복사
export const copyTxt = (val) => {
	if (!val) {
		alert('파일을 먼저 업로드해주세요');
		return;
	}
	navigator.clipboard.writeText(val).then(alert('복사되었습니다.'));
};
