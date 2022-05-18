import React from 'react';
import styled from 'styled-components';
import { ReactComponent as PlaySVG } from 'src/assets/play.svg';
import { ReactComponent as PauseSVG } from 'src/assets/pause.svg';
import { clockTime } from 'src/utils/time';

// video player component
export const VideoPlayer = ({ videoRef, progressRef, playing, playVideo, setPlaying, videoCaption, videoDuration }) => {
	// change video current time
	const changeCurrentTime = (time) => {
		let percent = time / 1000;
		videoRef.current.currentTime = percent * videoRef.current.duration;
	};

	// change the current time when you click the range
	const langeClick = (e) => {
		if (playing === true) {
			videoRef.current.pause();
			setPlaying(false);
			changeCurrentTime(e.target.value);
		}
		changeCurrentTime(e.target.value);
	};

	return (
		<VideoControl className="justify-between">
			<PlayButton className="center" onClick={playVideo}>
				{!playing ? <PlaySVG width={14} /> : <PauseSVG width={14} />}
			</PlayButton>

			<LangeInput
				ref={progressRef}
				type="range"
				className="self-center"
				val={progressRef.current?.value / 10 || 0}
				min="0"
				max="1000"
				defaultValue={0}
				onClick={(e) => langeClick(e)}
			/>
			<VideoTime className="center">
				<span>{clockTime(videoRef.current.currentTime)}</span>
				<span>/</span>
				<span>{clockTime(videoDuration)}</span>
			</VideoTime>
			<CaptionView>
				<CaptionText>{videoCaption.text}</CaptionText>
			</CaptionView>
		</VideoControl>
	);
};

const VideoControl = styled.div`
	background: #383e47;
	height: 40px;
	position: relative;
	button {
		cursor: pointer;
		border: none;
		background: none;
		width: 25px;
		height: 25px;
	}
`;

const PlayButton = styled.div`
	width: 10%;
`;

const LangeInput = styled.input`
	width: 70%;
	&[type='range'] {
		-webkit-appearance: none;
		height: 8px;
		background: ${(props) => `linear-gradient(90deg, #848b97 ${props.val}%, #4b525d ${props.val}%)`};
		/* background-color: #4b525d; */
		cursor: pointer;
		border-radius: 10px;
	}

	&[type='range']:focus {
		outline: none;
	}

	&[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 4px;
		height: 16px;
		background: #bfc4cc;
		border-radius: 8px;
		cursor: pointer;
	}

	&[type='range']::-moz-range-thumb {
		-webkit-appearance: none;
		width: 4px;
		height: 14px;
		background: #4b525d;
		border-radius: 8px;
		cursor: pointer;
	}
`;

const CaptionView = styled.div`
	width: 100%;
	position: absolute;
	top: -100%;
	text-align: center;
`;

const CaptionText = styled.span`
	border-radius: 4px;
	padding: 5px;
	color: white;
	background-color: rgba(0, 0, 0, 0.8);
	font-size: 14px;
`;

const VideoTime = styled.div`
	width: 17%;
	span {
		margin: 1px;
		font-size: 10px;
		color: rgba(255, 255, 255, 0.8);
	}
`;
