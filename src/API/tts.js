import { request } from 'src/utils/axios';

export const getTTS = async (data, text, audioRef) => {
	let params = JSON.stringify({ uid: data.uid, text: text, spk: data.spk.key, speed: data.speed });
	const res = await request('POST', `v1/tts/synthesize`, params);

	const b64toBlob = (b64Data, contentType, sliceSize) => {
		contentType = contentType || 'audio/wav';
		sliceSize = sliceSize || 512;

		let byteCharacters = atob(b64Data);
		let byteArrays = [];

		for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			let slice = byteCharacters.slice(offset, offset + sliceSize);

			let byteNumbers = new Array(slice.length);
			for (let i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			let byteArray = new Uint8Array(byteNumbers);

			byteArrays.push(byteArray);
		}

		let blob = new Blob(byteArrays, { type: contentType });
		return blob;
	};

	if (res.code === 0) {
		let aud = res['result'];
		return URL.createObjectURL(b64toBlob(aud));
	}
};
