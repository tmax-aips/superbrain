import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { DropZone } from './dropzone';
import { MediaPlayer } from './mediaPlayer/mediaplayer';
import { ReactComponent as UploadSVG } from 'src/assets/TTS/upload.svg';
import { ReactComponent as DownloadSVG } from 'src/assets/TTS/download.svg';
import { ReactComponent as CopySVG } from 'src/assets/STT/copy.svg';
import { copyTxt, downloadTxt } from 'src/utils/txt';
import { useDropzone } from 'react-dropzone';

// 음성 파일 변환하기 컴포넌트
export const SoundConvert = () => {
	const [file, setFile] = useState();
	const [isUploaded, setIsUploaded] = useState(false); //업로드 후 변환완료 상태
	const [textData, setTextData] = useState(); //한줄 텍스트
	const [wordData, setWordData] = useState(); //단어 오브젝트

    // 2022-05-25 김재근 추가
    const [fileExtension, setFileExtension] = useState('');
    const [nowLoading, setNowLoading] = useState(false);

    const onDrop = useCallback(
        (acceptedFiles) => {
            let fname = acceptedFiles[0]['name'].split('.');
            setFileExtension(fname[fname.length - 1]);
            setFile(acceptedFiles[0]);
            setNowLoading(false);
            setIsUploaded(false);
            setTextData(null);
        },
        [setFile],
    );

    const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true,
        maxFiles: 1,
        accept: 'audio/*',
    });

	return (
		<STTSection>
			<Header className="justify-between">
				<FileUploadDiv className="flex center gap-8">
					<IconButton onClick={open} className="center">
						<UploadSVG className="mr-8" />
						파일업로드
					</IconButton>
					{file && isUploaded ? <span>파일명 : {file?.name}</span> : ''}
				</FileUploadDiv>
				<FunctionDiv className="center">
					<IconButton onClick={() => copyTxt(textData)} className="center">
						<CopySVG className="mr-8" />
						<span>텍스트 복사</span>
					</IconButton>
					<IconButton onClick={() => downloadTxt(textData)} className="center">
						<DownloadSVG className="mr-8" />
						<span>텍스트 다운로드</span>
					</IconButton>
				</FunctionDiv>
			</Header>
			<BodySection className="center">
				{!isUploaded ? (
					<DropZone
						file={file}
						setFile={setFile}
						setIsUploaded={setIsUploaded}
						setTextData={setTextData}
						setWordData={setWordData}
						fileExtension={fileExtension}
						setFileExtension={setFileExtension}
						acceptedFiles={acceptedFiles}
						nowLoading={nowLoading}
						setNowLoading={setNowLoading}
					/>
				) : (
					<MediaPlayer
						setFile={setFile}
						setIsUploaded={setIsUploaded}
						file={file}
						textData={textData}
						wordData={wordData}
					/>
				)}
			</BodySection>
		</STTSection>
	);
};

const STTSection = styled.section`
	box-shadow: 0px 4px 30px rgba(26, 39, 52, 0.1);
	border-radius: 4px;
	width: 1000px;
	background-color: white;
	margin: auto;
`;

const Header = styled.div`
	height: 70px;
	padding: 0 40px;
	background: linear-gradient(90.28deg, #006dfa 0%, #003fb9 53.12%, #003c9f 100%);
	border-radius: 4px 4px 0px 0px;
`;

const BodySection = styled.div`
	height: 520px;
`;
const FileUploadDiv = styled.div`
	font-weight: 700;
	font-size: 12px;
	line-height: 17px;
	color: #ffffff;
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
