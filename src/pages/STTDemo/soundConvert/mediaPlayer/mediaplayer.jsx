import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import useInterval from 'src/hooks/useInterval';
import { ReactComponent as PlayIcon } from 'src/assets/STT/play.svg';
import { ReactComponent as StopIcon } from 'src/assets/STT/stop.svg';
import WaveSurfer from 'wavesurfer.js'; // https://wavesurfer-js.org/docs/methods.html 참조
import { WordPlayer } from './wordplayer';
import { sec2min } from 'src/utils/time';

//오디오 파일 변환 완료 후 미디어 플레이어, 텍스트 출력 컴포넌트
export const MediaPlayer = ({ file, setFile, textData, wordData, setIsUploaded }) => {
	const [currentTime, setCurrentTime] = useState(0);
	const [currentTimeSec, setCurrentTimeSec] = useState(0);
	const [isPlay, setIsPlay] = useState(false);
	const [audioTime, setAudioTime] = useState('');
	const surfer = useRef(null);
	const [waver, setWaver] = useState();

	// 시작/정지
	const playPause = () => {
	    console.log(isPlay);
		if (!waver.isPlaying()) {
			waver.play();
			getAudioDuration();
			setIsPlay(true);
		} else {
			setIsPlay(false);
			waver.pause();
		}
	};

	//현재 시간
	const getCurrentTime = () => {
		setCurrentTime(sec2min(waver.getCurrentTime()));
	};

	// 단어 재생 (시작 초, 종료 초)
	const wordPlay = (start) => {
		waver.play(start);
		getAudioDuration();
		setIsPlay(true);
	};

	// audio 길이
	const getAudioDuration = () => {
		setAudioTime(sec2min(waver.getDuration()));
	};

	//현재 문장 위치 추적을 위한 시간 업데이트
	useInterval(() => {
		setCurrentTimeSec(waver.getCurrentTime());
        if(currentTime === audioTime)
        {
            setIsPlay(false);
            waver.stop();
        }
	}, 100);

	useEffect(() => {
		// wavesurfer 생성
		let wave = WaveSurfer.create({
			barWidth: 1,
			barHeight: 1,
			cursorWidth: 1,
			container: surfer.current,
			backend: 'WebAudio',
			height: 60,
			progressColor: '#a5c6ff',
			responsive: true,
			waveColor: '#cccccc',
			cursorColor: '#2979FF',
			closeAudioContext: true,
		});

		if (file) {
			wave.loadBlob(file);
		}
		setWaver(wave);
	}, [surfer]);

	useEffect(() => {
		//0.2초마다 현재시간 호출
		let timer;
		if (waver) {
			getAudioDuration();
			timer = setInterval(getCurrentTime, 200);
		}
		return () => {
			if (waver) waver.destroy();
			clearInterval(timer);
		};
	}, [waver]);

	return (
		<Wrapper>
			<MediaPos>
				<div className="center" onClick={playPause} style={{ width: '5%', padding: '10px', cursor: 'pointer' }}>
					{isPlay ? <StopIcon /> : <PlayIcon />}
				</div>
				<WaveArea ref={surfer}></WaveArea>
				<TimeStampPos>
					<span>{currentTime}</span>/<span>{audioTime}</span>
				</TimeStampPos>
			</MediaPos>
			<Divider />
			<TextPos>
				{console.log(wordData)}
				<WordPlayer wordData={wordData} currentTime={currentTimeSec} onClick={wordPlay} />
			</TextPos>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`;

const MediaPos = styled.div`
	display: flex;
	margin: 10px;
	justify-content: space-evenly;
	align-items: center;
	margin: 20px 40px;
	border: 1px solid #e0e0e0;
	height: 15%;
	border-radius: 4px;
`;

const WaveArea = styled.div`
	align-self: center;
	height: 70%;
	width: 70%;
	background-color: white;
`;

const TimeStampPos = styled.div`
	width: 15%;
	padding: 0px 10px;
	height: 25px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	font-size: 0.875rem;
	span {
		padding: 0px 5px;
	}
`;

const Divider = styled.hr`
	border-top: 1px solid #e0e0e0;
	height: 1px;
	width: 100%;
`;

const TextPos = styled.div`
	margin: 10px;
	height: 70%;
	padding-bottom: 10px;
`;
