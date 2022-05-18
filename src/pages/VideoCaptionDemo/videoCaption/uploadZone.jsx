import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import useInterval from 'src/hooks/useInterval';
import { ReactComponent as UploadIcon } from 'src/assets/VideoCaption/uploadIcon.svg';
import { CircleProgress } from 'src/components/loading/circleProgress';

// 파일 업로드 컴포넌트
export const UploadZone = ({ file, onChange, setFile, setIsUploaded }) => {
	const [dummyLoadingState, setDummyLoadingState] = useState(false); // 로딩 프로그래스 여부
	const [loadingText, setLoadingText] = useState('영상 자막으로 변환중.'); // 로딩 텍스트

	/*-------------------------------------dropzone ----------------------------------------- */
	const onDrop = useCallback(
		async (acceptedFiles) => {
			setFile(acceptedFiles[0]);
			await onChange(acceptedFiles[0]);
			setDummyLoadingState(true);
		},
		[setFile],
	);

	const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
		onDrop,
		noClick: true,
		noKeyboard: true,
		maxFiles: 1,
		accept: 'video/mp4,video/mkv, video/x-m4v,video/*',
	});

	const files = acceptedFiles.map((file) => <div key={file.path}>{file.name}</div>);

	//변환중일 때 로딩 텍스트 변경
	useInterval(() => {
		if (loadingText.includes('...')) {
			setLoadingText('영상 자막으로 변환중.');
		} else {
			setLoadingText(loadingText + '.');
		}
	}, 700);

	return (
		<>
			{file ? (
				<Frame>
					<CircleProgress completeCallback={setIsUploaded} isComplete={dummyLoadingState} />
					<MainDesc>{files}</MainDesc>
					<BtnBox>
						<LoadingFont>{loadingText}</LoadingFont>
					</BtnBox>
				</Frame>
			) : (
				<Frame {...getRootProps({ className: 'dropzone' })}>
					<input {...getInputProps()} />
					<UploadBtn onClick={open} type="button">
						<UploadIcon width={88} height={88} />
					</UploadBtn>
					<MainDesc>선택된 파일이 없습니다. 파일을 업로드 해주세요. 확장자는 mp4를 지원합니다.</MainDesc>
					<SelectButton onClick={open}>파일 선택</SelectButton>
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

const UploadBtn = styled.button`
	border: none;
	cursor: pointer;
	width: 120px;
	height: 120px;
	background-color: #eff5ff;
	border-radius: 50%;
`;

const SelectButton = styled.button`
	background: #2979ff;
	width: 110px;
	height: 34px;
	font-weight: 700;
	border-radius: 4px;
	border: none;
	font-size: 0.75rem;
	color: white;
	cursor: pointer;
	&:hover {
		background: #498cff;
	}
`;

const BtnBox = styled.div`
	display: flex;
	width: 230px;
	height: 50px;
	justify-content: center;
	align-items: center;
`;

const LoadingFont = styled.div`
	height: fit-content;
	color: #2979ff;
	font-weight: 700;
	line-height: 18;
`;
