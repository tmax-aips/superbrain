// 텍스트 다운로드
export const downloadTxt = (val) => {
	if (!val) {
		alert('텍스트 복사를 위해서는 파일 업로드 후 변환 작업이 필요합니다');
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
		alert('텍스트 복사를 위해서는 파일 업로드 후 변환 작업이 필요합니다');
		return;
	}
	navigator.clipboard.writeText(val).then(alert('복사되었습니다'));
};
