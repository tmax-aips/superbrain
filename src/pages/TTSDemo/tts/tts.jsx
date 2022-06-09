import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useStore from 'src/stores/rootStore';
import { ReactComponent as UploadSVG } from 'src/assets/TTS/upload.svg';
import { ReactComponent as ChangeSVG } from 'src/assets/TTS/change.svg';
import { ReactComponent as DownloadSVG } from 'src/assets/TTS/download.svg';
import { ReactComponent as PlaySVG } from 'src/assets/TTS/play.svg';
import { ReactComponent as StopSVG } from 'src/assets/TTS/stop.svg';
import { text_sample } from '../staticData/staticValue';
import { Random } from 'src/utils/arrayRandom';
import { getTTS } from 'src/API/tts';
import { Setting } from './setting';

// TTS module
export const TTS = () => {
	const { ttsStore } = useStore();
	const [file, setFile] = useState({ name: '', text: Random(text_sample) });
	const audioRef = useRef();
	const [playing, setPlaying] = useState(false);

	// save file name and text when uploading file
	const handleChange = (e) => {
		let file = e.target.files[0];
		let fileReader = new FileReader();
		fileReader.onload = () => {
			setFile({ name: file.name, text: fileReader.result });
		};
		fileReader.readAsText(file);
	};

	// audio play button click
	const playAud = async () => {
		if (!playing) {
			const aud_url = await getTTS(ttsStore.selected, file.text, audioRef);
			audioRef.current.src = aud_url;
		} else {
			audioRef.current.pause();
			setPlaying(!playing);
		}
	};

	// audio download button click
	const downloadAud = async () => {
		const aud_url = await getTTS(ttsStore.selected, file.text, audioRef);
		const a = document.createElement('a');
		a.href = aud_url;

		//can change the name and format of the audio file to be downloaded
		a.download = `demo.wav`;
		a.click();
		a.remove();
		URL.revokeObjectURL(aud_url);
	};

	// handling character count errors when uploading file
	useEffect(() => {
		if (file.text.length >= 200) {
			alert('체험하기에서는 최대 200글자까지 가능합니다');
			setFile({ name: file.name, text: file.text.substr(0, 199) });
		}
		audioRef.current.src = '';
	}, [file]);

	return (
		<TTSSection className="column">
			<Header className="justify-between">
				<FileUploadDiv className="flex center gap-8">
					<label htmlFor="tts_file" className="mr-8">
						<div className="center">
							<UploadSVG className="mr-8" />
							txt 파일 업로드
						</div>
					</label>
					{file.name && <span>파일명 | {file.name}</span>}
					<input type="file" accept=".txt" id="tts_file" onChange={handleChange.bind()} />
				</FileUploadDiv>
				<DownloadBtn className="center" onClick={downloadAud}>
					<DownloadSVG className="mr-8" />
					<span>다운로드</span>
				</DownloadBtn>
			</Header>
			<TextContent className="flex">
				<TextLayout className="column">
					<TextareaLayout>
						<TextareaOption className="justify-between">
							<TextLimitDiv>글자 수(공백포함) : {file.text.length} / 200 (자음, 모음 또는 특수문자는 기입 불가)</TextLimitDiv>
							<div
								className="center pointer"
								onClick={() => {
									setPlaying(false);
									setFile({
										name: '',
										text: Random(text_sample.filter((text) => text !== file.text)),
									});
								}}
							>
								<ChangeSVG className="mr-5" />
								<span>문장 바꾸기</span>
							</div>
						</TextareaOption>
						<textarea
							disabled={playing}
							placeholder="여기에 만들고 싶은 음성의 내용을 작성하세요. (200자 이내)"
							value={file.text}
							spellCheck="false"
							onChange={(e) => setFile({ name: file.name, text: e.target.value })}
						/>
					</TextareaLayout>
					<ControlFigure>
						<TTSAudio
							ref={audioRef}
							autoPlay
							onPlay={() => setPlaying(true)}
							onEnded={() => setPlaying(false)}
						/>
					</ControlFigure>
				</TextLayout>
				<div className="column justify-between">
					<Setting playing = {playing}/>
					<BtnLayout className="center">
						<PlayBtn onClick={playAud} className="center">
							{!playing ? (
								<>
									<PlaySVG className="mr-8" />
									재생
								</>
							) : (
								<>
									<StopSVG className="mr-8" />
									정지
								</>
							)}
						</PlayBtn>
					</BtnLayout>
				</div>
			</TextContent>
		</TTSSection>
	);
};

const TTSSection = styled.section`
	box-shadow: 0px 4px 30px rgba(26, 39, 52, 0.1);
	border-radius: 4px;
	width: 1000px;
	margin: auto;
`;

const Header = styled.div`
	height: 70px;
	padding: 0 40px;
	background: linear-gradient(90.28deg, #006dfa 0%, #003fb9 53.12%, #003c9f 100%);
	border-radius: 4px 4px 0px 0px;
`;

const FileUploadDiv = styled.div`
	span {
		font-weight: 700;
		font-size: 12px;
		line-height: 17px;
		color: #ffffff;
	}
	label {
		padding: 8px 20px;
		border: 1px solid rgba(255, 255, 255, 0.7);
		border-radius: 4px;
		font-weight: 700;
		font-size: 12px;
		line-height: 17px;
		text-align: center;
		color: #ffffff;
		cursor: pointer;
	}
	input {
		display: none;
	}
`;

const TextContent = styled.div`
	min-width: 400px;
	width: 100%;
	padding: 40px;
	gap: 30px;
	background: white;
`;
const TextLayout = styled.div`
	height: 100%;
`;
const TextareaLayout = styled.div`
	position: relative;
	width: 610px;
	height: 360px;
	textarea {
		background: #ffffff;
		border: 1px solid #e0e0e0;
		border-radius: 4px;
		width: 100%;
		height: 100%;
		resize: none;
		padding: 1rem 1rem 2rem 1rem;
		font-size: 16px;
		line-height: 26px;
		letter-spacing: -0.01em;
		color: #0c0e1c;
		&:focus {
			outline: none;
			border: 1px solid #b8b8b8;
		}
		&::-webkit-scrollbar {
			width: 12px;
		}
		&::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background: #cccccc;
			background-clip: padding-box;
			border: 4px solid transparent;
		}
	}
`;

const TextareaOption = styled.div`
	position: absolute;
	font-size: 16px;
	line-height: 18px;
	letter-spacing: -0.01em;
	bottom: 0;
	right: 0;
	padding: 1rem;
	width: 100%;
	span {
		color: #4c4c51;
	}
`;

const TextLimitDiv = styled.div`
	font-size: 13px;
	line-height: 18px;
	letter-spacing: -0.01em;
	color: #9e9e9e;
`;

const BtnLayout = styled.div`
	padding-top: 2rem;
	position: relative;
	button {
		cursor: pointer;
		border: none;
	}
`;

const PlayBtn = styled.button`
	padding: 14px 40px;
	border-radius: 5px;
	font-size: 14px;
	font-weight: 700;
	line-height: 20px;
	background-color: #2979ff;
	color: white;
	&:hover {
		background-color: #256ce7;
	}
`;
const DownloadBtn = styled.button`
	padding: 8px 36px;
	height: fit-content;
	margin: auto 0;
	border: 1px solid rgba(255, 255, 255, 0.7);
	border-radius: 4px;
	font-weight: 700;
	font-size: 12px;
	line-height: 17px;
	background: none;
	text-align: center;
	color: #ffffff;
	cursor: pointer;
`;
const ControlFigure = styled.figure`
	width: 100%;
`;

const TTSAudio = styled.audio`
	width: 100%;
	&::-webkit-media-controls-panel {
		background: white;
	}
`;
