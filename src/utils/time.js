// 초를 00:00 포맷으로 변경, ex) time : 232.124356
export const sec2min = (time) => {
	let min = Math.floor(time / 60);
	let sec = Math.floor(time - min * 60);
	if (sec < 10) {
		sec = `0${sec}`;
	}
	return `${min}:${sec}`;
};

export const clockTime = (num, captionFile) => {
	let time = parseInt(num, 10);
	let hours = Math.floor(time / 3600);
	let minutes = Math.floor((time - hours * 3600) / 60);
	let seconds = time - hours * 3600 - minutes * 60;
	if (hours < 10) {
		hours = '0' + hours;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	if (seconds < 10) {
		seconds = '0' + seconds;
	}
	if (captionFile === true) {
		return `${hours}:${minutes}:${seconds},${((num - time) * 1000).toFixed(0)}`;
	}
	return hours > 0 ? hours + ':' + minutes + ':' + seconds : minutes + ':' + seconds;
};
