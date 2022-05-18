import { request } from 'src/utils/axios';

//stt 파일 전송 함수
export const getWordData = async (extension, data) => {
	const res = await request(
		'POST',
		'/v1/asr/recognize',
		JSON.stringify({
			lang: 'kor',
			domain: 'transcribe',
			codec: extension,
			signal: data,
		}),
	);
	let text = '';
	if (res.result) {
		res.result?.forEach((obj) => (text += ` ${obj.word}`));
	}

	return { res, text };
};
