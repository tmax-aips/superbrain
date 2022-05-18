/************************************************************/
// importing audio data from a video file
// Use data in WAV file format while minimizing data loss
// This function does not need to be understood or modified.
/************************************************************/
export const Converter = (videoFileData, format) => {
	try {
		format = format.toLowerCase();
		let reader = new FileReader();
		return new Promise((resolve) => {
			reader.onload = () => {
				let audioContext = new (window.AudioContext || window.webkitAudioContext)();
				let myBuffer;
				const sampleRate = 16000;
				const numberOfChannels = 1;
				let videoFileAsBuffer = reader.result;
				audioContext.decodeAudioData(videoFileAsBuffer).then(function (decodedAudioData) {
					let duration = decodedAudioData.duration;
					let offlineAudioContext = new OfflineAudioContext(
						numberOfChannels,
						sampleRate * duration,
						sampleRate,
					);
					let soundSource = offlineAudioContext.createBufferSource();
					myBuffer = decodedAudioData;
					soundSource.buffer = myBuffer;
					soundSource.connect(offlineAudioContext.destination);
					soundSource.start();
					offlineAudioContext
						.startRendering()
						.then(function (renderedBuffer) {
							let UintWave = createWaveFileData(renderedBuffer);
							let b64Data = btoa(uint8ToString(UintWave));

							resolve({ b64Data, duration });
						})
						.catch(function (err) {
							console.log(err);
						});
				});
			};
			reader.readAsArrayBuffer(videoFileData);
		});
	} catch (e) {
		console.log(e);
	}
};

const createWaveFileData = (audioBuffer) => {
	let frameLength = audioBuffer.length;
	let numberOfChannels = audioBuffer.numberOfChannels;
	let sampleRate = audioBuffer.sampleRate;
	let bitsPerSample = 16;
	let byteRate = (sampleRate * numberOfChannels * bitsPerSample) / 8;
	let blockAlign = (numberOfChannels * bitsPerSample) / 8;
	let wavDataByteLength = frameLength * numberOfChannels * 2;
	let headerByteLength = 44;
	let totalLength = headerByteLength + wavDataByteLength;

	let waveFileData = new Uint8Array(totalLength);

	let subChunk1Size = 16;
	let subChunk2Size = wavDataByteLength;
	let chunkSize = 4 + (8 + subChunk1Size) + (8 + subChunk2Size);

	writeString('RIFF', waveFileData, 0);
	writeInt32(chunkSize, waveFileData, 4);
	writeString('WAVE', waveFileData, 8);
	writeString('fmt ', waveFileData, 12);

	writeInt32(subChunk1Size, waveFileData, 16);
	writeInt16(1, waveFileData, 20);
	writeInt16(numberOfChannels, waveFileData, 22);
	writeInt32(sampleRate, waveFileData, 24);
	writeInt32(byteRate, waveFileData, 28);
	writeInt16(blockAlign, waveFileData, 32);
	writeInt32(bitsPerSample, waveFileData, 34);

	writeString('data', waveFileData, 36);
	writeInt32(subChunk2Size, waveFileData, 40);

	writeAudioBuffer(audioBuffer, waveFileData, 44);

	return waveFileData;
};

const writeString = (string, a, offset) => {
	for (let i = 0; i < string.length; ++i) {
		a[offset + i] = string.charCodeAt(i);
	}
};

const writeInt16 = (num, a, offset) => {
	num = Math.floor(num);

	let b1 = num & 255;
	let b2 = (num >> 8) & 255;

	a[offset + 0] = b1;
	a[offset + 1] = b2;
};

const writeInt32 = (num, a, offset) => {
	num = Math.floor(num);
	let b1 = num & 255;
	let b2 = (num >> 8) & 255;
	let b3 = (num >> 16) & 255;
	let b4 = (num >> 24) & 255;

	a[offset + 0] = b1;
	a[offset + 1] = b2;
	a[offset + 2] = b3;
	a[offset + 3] = b4;
};

const writeAudioBuffer = (audioBuffer, a, offset) => {
	let num = audioBuffer.length;
	let channels = audioBuffer.numberOfChannels;

	for (let i = 0; i < num; ++i) {
		for (let k = 0; k < channels; ++k) {
			let buffer = audioBuffer.getChannelData(k);
			let sample = buffer[i] * 32768.0;

			if (sample < -32768) sample = -32768;
			if (sample > 32767) sample = 32767;

			writeInt16(sample, a, offset);
			offset += 2;
		}
	}
};

const uint8ToString = (buf) => {
	let i,
		length,
		out = '';
	for (i = 0, length = buf.length; i < length; i += 1) {
		out += String.fromCharCode(buf[i]);
	}
	return out;
};
