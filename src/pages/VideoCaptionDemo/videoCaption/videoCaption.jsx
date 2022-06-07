import React, { useState, useRef, useEffect, useCallback } from 'react';
import { request } from 'src/utils/axios';
import styled from 'styled-components';
import { Converter } from 'src/utils/converter';
import { ReactComponent as UploadSVG } from 'src/assets/TTS/upload.svg';
import { ReactComponent as DownloadSVG } from 'src/assets/TTS/download.svg';
import { CaptionsBox } from './captionsBox';
import { videoSentenceMaker } from 'src/utils/wordParser';
import { VideoPlayer } from './videoPlayer';
import { CreateSrtFile } from 'src/utils/createSrtFile';
import { UploadZone } from './uploadZone';
import { useDropzone } from 'react-dropzone';
// video component
export const VideoCaptionComp = () => {
	const videoRef = useRef();
	const progressRef = useRef();
	const captionRef = useRef([]);
	const [file, setFile] = useState();
	const [loading, setLoading] = useState(false);
	const [isVideoReady, setIsVideoReady] = useState(false);
	const [sentenceArr, setSentenceArr] = useState([]);
	const [playing, setPlaying] = useState(false);
	const [videoCaption, setVideoCaption] = useState({ text: '', id: 0 });
	const [videoDuration, setVideoDuration] = useState(0);
    const [dummyLoadingState, setDummyLoadingState] = useState(false); // 로딩 프로그래스 여부
    const [nowLoading, setNowLoading] = useState(false);

	// get audio data when uploading videos
	const videoUpload = async (file) => {
		const convertedAudioData = await Converter(file, 'wav');
		await sendData(convertedAudioData.b64Data);
		setVideoDuration(convertedAudioData.duration);
	};

	// audio to text API
	const sendData = async (data) => {
		let extension = 'linear16';
		const res = await request(
			'POST',
			'v1/asr/recognize',
			JSON.stringify({
				lang: 'kor',
				domain: 'transcribe',
				codec: extension,
				signal: data,
			}),
		);
		const caption = videoSentenceMaker(res.result);
		setSentenceArr([...caption.sentence]);
	};

	// change the current caption
	const changeCaption = (text, idx) => {
		let sentenceCaption = sentenceArr;
		sentenceArr[idx].text = text;
		setSentenceArr([...sentenceCaption]);
	};

	// video play button click
	const playVideo = () => {
		if (playing === false) videoRef.current.play();
		else videoRef.current.pause();
		setPlaying(!playing);
	};

	// change progress value
	const changeProgress = () => {
		progressRef.current.value = Math.floor((1000 / videoRef.current.duration) * videoRef.current.currentTime);

		changeVideoCaption();
	};

	// change caption on video
	const changeVideoCaption = () => {
		const sentence = sentenceArr.find(
			(sentence) =>
				sentence.totalStart <= videoRef.current.currentTime.toFixed(2) &&
				videoRef.current.currentTime < sentence.totalEnd,
		);

		// scroll if not current caption
		if (sentence.id !== videoCaption.id) {
			captionRef.current[sentence.id]?.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'nearest',
			});
		}
		setVideoCaption({ id: sentence.id, text: sentence.text });
	};

	// current caption change => video caption change
	useEffect(() => {
		if (sentenceArr.length > 0 && videoRef?.current?.currentTime) {
			if (playing) {
				videoRef.current.pause();
				setPlaying(!playing);
			}
			changeVideoCaption();
		}
	}, [sentenceArr]);

	useEffect(() => {
		if (file && loading) {
			videoRef.current.src = URL.createObjectURL(file);
			setIsVideoReady(true);
		}
	}, [loading]);

	const onDrop = useCallback(
		async (acceptedFiles) => {
		    if(loading) videoRef.current.pause();
            setIsVideoReady(false);
            setPlaying(false);
            setNowLoading(false);
            setFile(null);
			setFile(acceptedFiles[0]);
			await videoUpload(acceptedFiles[0]);
			setLoading(false);
			setDummyLoadingState(true);
		},
		[setFile],
	);
	const { getRootProps, getInputProps, acceptedFiles, open } = useDropzone({
		onDrop,
		noClick: true,
		noKeyboard: true,
		temp : false,
		maxFiles: 1,
		accept: 'video/mp4,video/mkv, video/x-m4v,video/*',
	});

	return (
		<VideoCompLayout>
			<Header className="justify-between">
				<FileUploadDiv className="flex center gap-8" >
					<IconButton onClick={open} className="center">
						<UploadSVG className="mr-8" />
						    파일업로드
					</IconButton>

					{file ? (<span>파일명 : {file.name}</span>) : <></>}
					{/*<span>파일명 : {file?.name}</span>*/}
				</FileUploadDiv>
				<FunctionDiv className="center">
					<IconButton onClick={() => CreateSrtFile(sentenceArr)} className="center">
						<DownloadSVG className="mr-8" />
						<span>자막 파일 다운</span>
					</IconButton>
				</FunctionDiv>
			</Header>

			{!loading ? (
				<BodySection className="center">
					<UploadZone
					file={file}
					setFile={setFile}
					onChange={videoUpload}
					setIsUploaded={setLoading}
					dummyLoadingState={dummyLoadingState}
					setDummyLoadingState={setDummyLoadingState}
					acceptedFiles={acceptedFiles}
					nowLoading={nowLoading}
					setNowLoading={setNowLoading}/>
				</BodySection>
			) : (
				<PlayerWrapper>
					<CaptionLayout>
						{isVideoReady &&
							sentenceArr?.map((sentence, idx) => (
								<CaptionsBox
									key={idx}
									sentence={sentence}
									idx={idx}
									playing={playing}
									videoRef={videoRef}
									captionRef={captionRef}
									setPlaying={setPlaying}
									changeCaption={changeCaption}
								/>
							))}
					</CaptionLayout>
					<VideoLayout className="center column">
						<video ref={videoRef} width={450} onTimeUpdate={changeProgress} />
						{isVideoReady && (
							<VideoPlayer
								videoRef={videoRef}
								progressRef={progressRef}
								playing={playing}
								videoDuration={videoDuration}
								videoCaption={videoCaption}
								playVideo={playVideo}
								setPlaying={setPlaying}
							/>
						)}
					</VideoLayout>
				</PlayerWrapper>
			)}
		</VideoCompLayout>
	);
};

/**--------------------------------------------------------- */

const BodySection = styled.div`
	height: 520px;
`;

const VideoCompLayout = styled.div`
	box-shadow: 0px 4px 30px rgba(26, 39, 52, 0.1);
	border-radius: 4px;
	width: 1000px;
	height: 590px;
	background-color: white;
	margin: auto;
`;

const Header = styled.div`
	height: 70px;
	padding: 0 40px;
	background: linear-gradient(90.28deg, #006dfa 0%, #003fb9 53.12%, #003c9f 100%);
	border-radius: 4px 4px 0px 0px;
`;

const FileUploadDiv = styled.div`
	font-weight: 700;
	font-size: 12px;
	line-height: 17px;
	color: #ffffff;
	input {
    		display: none;
    }
`;
const IconButton = styled.button`
	width: 130px;
	height: 35px;
	margin: 5px;
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

const FunctionDiv = styled.div``;

const PlayerWrapper = styled.div`
	display: flex;
	justify-content: center;
`;

const VideoLayout = styled.div`
	width: 450px;
`;

const CaptionLayout = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid #e0e0e0;
	border-radius: 2px;
	width: 470px;
	max-height: 470px;
	margin: 20px 10px;
	padding: 10px 0 10px 10px;
	overflow-y: scroll;
	input {
		display: none;
	}
	&::-webkit-scrollbar {
		width: 16px;
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background: #cccccc;
		background-clip: padding-box;
		border: 4px solid transparent;
	}
`;

/*------------------------------------------------------------------------------- */
