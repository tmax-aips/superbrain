import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import useInterval from 'src/hooks/useInterval';
import { sentenceMaker } from 'src/utils/wordParser';
import { ReactComponent as UploadIcon } from 'src/assets/STT/uploadCloud.svg';
import { ReactComponent as LoadedIcon } from 'src/assets/STT/loaded.svg';
import ProgressBar from 'react-customizable-progressbar';

import { getWordData } from 'src/API/stt';
import { CircleProgress } from 'src/components/loading/circleProgress';

// 파일 업로드 컴포넌트
export const DropZone = ({ file, setFile, setIsUploaded, setTextData, setWordData, fileExtension, setFileExtension, acceptedFiles, nowLoading, setNowLoading }) => {
	 // 변환중 로딩 상태
	const [dummyLoadingState, setDummyLoadingState] = useState(false); // 로딩 프로그래스 여부
	const [loadingText, setLoadingText] = useState('변환중'); // 로딩 텍스트

	/*-------------------------------------dropzone ----------------------------------------- */
	const onDrop = useCallback(
		(acceptedFiles) => {
			let fname = acceptedFiles[0]['name'].split('.');
			setFileExtension(fname[fname.length - 1]);
			setFile(acceptedFiles[0]);
		},
		[setFile],
	);

	const { getRootProps, getInputProps, open } = useDropzone({
		onDrop,
		noClick: true,
		noKeyboard: true,
		maxFiles: 1,
		accept: 'audio/*',
	});

	const files = acceptedFiles.map((file) => <div key={file.path}>{file.name}</div>);

	const removeFile = () => {
		const noFile = null;
		setFile(noFile);
	};

	/*----------------------------------------------------------------------------------------- */

	// 변환하기
	const submitFile = () => {
		setNowLoading(true);
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (e) => {
			let data = e.target.result;
			sendData(data.split(',')[1]);
		};
	};

	const sendData = async (data) => {
		let extension = fileExtension;
		if (extension === 'wav') extension = 'linear16';
		const { res, text } = await getWordData(extension, data);
		setWordData(sentenceMaker(res.result)); //문장단위 배열
		setTextData(text); //한줄 텍스트
		setDummyLoadingState(true);
	};

	//변환중일 때 로딩 텍스트 변경
	useInterval(() => {
		if (loadingText.includes('...')) {
			setLoadingText('변환중');
		} else {
			setLoadingText(loadingText + '.');
		}
	}, 500);

	return (
		<>
			{file ? (
				<Frame>
					{!nowLoading ? (
						<>
							<UploadBtn style={{ cursor: 'default' }} type="button">
								<LoadedIcon width={88} height={88} />
							</UploadBtn>
							<MainDesc>{files}</MainDesc>
							<BtnBox nowLoading={nowLoading}>
								<ConvertBtn onClick={() => submitFile()}>변환하기</ConvertBtn>
								<CancelBtn onClick={removeFile}>업로드 취소</CancelBtn>
							</BtnBox>
						</>
					) : (
						<>
							<CircleProgress completeCallback={setIsUploaded} isComplete={dummyLoadingState} />
							<MainDesc>{files}</MainDesc>
							<BtnBox nowLoading={nowLoading}>
								<LoadingFont>{loadingText}</LoadingFont>
							</BtnBox>
						</>
					)}
				</Frame>
			) : (
				<Frame {...getRootProps({ className: 'dropzone' })}>
					<input {...getInputProps()} />
					<UploadBtn type="button" onClick={open}>
						<UploadIcon width={88} height={88} />
					</UploadBtn>
					<MainDesc>음성 파일을 마우스로 드래그하거나, 아이콘을 눌러 음성 파일을 업로드해주세요</MainDesc>
					<SubDesc>음성 파일 크기에 비례하여 시간이 걸립니다.</SubDesc>
					<SubDesc>지원 파일: wav, aac, m4a, cgg, flac, ac3, opus, mp3</SubDesc>
					{/* <UploadBtn >
						파일 선택
					</UploadBtn> */}
				</Frame>
			)}
		</>
	);
};

const Frame = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #444444;
`;

const MainDesc = styled.div`
	font-size: 1.1rem;
	font-weight: 700;
	padding: 1rem 0;
`;

const SubDesc = styled.div`
	color: #9c9c9c;
	line-height: 1.5;
	font-size: 15px;
`;

const UploadBtn = styled.button`
	border: none;
	cursor: pointer;
	width: 120px;
	height: 120px;
	background-color: #eff5ff;
	border-radius: 50%;
`;

const Indicator = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	margin: 0 auto;
	font-size: 1.5rem;
	font-weight: 100;
	color: #555;
	user-select: none;
`;

const BtnBox = styled.div`
	display: flex;
	width: 230px;
	height: 50px;
	justify-content: ${(props) => (props.nowLoading ? 'center' : 'space-between')};
	align-items: center;
	text-align: center;
`;

const ConvertBtn = styled.button`
	width: 110px;
	height: 35px;
	font-size: 0.75rem;
	font-weight: 700;
	background: #2979ff;
	border-radius: 4px;
	border: none;
	color: white;
	cursor: pointer;
`;

const CancelBtn = styled.button`
	width: 110px;
	height: 35px;
	font-size: 0.75rem;
	font-weight: 700;
	background: white;
	border: 1px solid #2979ff;
	border-radius: 4px;
	color: #2979ff;
	cursor: pointer;
`;

const LoadingFont = styled.div`
	height: fit-content;
	color: #2979ff;
	font-weight: 700;
	line-height: 18;
`;
