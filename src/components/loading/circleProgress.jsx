import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProgressBar from 'react-customizable-progressbar';
import useInterval from 'src/hooks/useInterval';

export const CircleProgress = ({ isComplete, completeCallback }) => {
	const [dummyProgress, setDummyProgress] = useState(0);

	useInterval(() => {
		if ((dummyProgress < 50 && !isComplete) || (dummyProgress < 100 && isComplete)) {
			setDummyProgress(dummyProgress + 1);
		} else return;
	}, 20);

	useEffect(() => {
		if (dummyProgress === 100) {
			setTimeout(() => {
				completeCallback(true);
			}, 1000);
		}
	}, [dummyProgress, completeCallback]);

	return (
		<ProgressBar
			radius={50}
			progress={dummyProgress}
			strokeWidth={9}
			strokeColor="#2979ff"
			strokeLinecap="round"
			trackStrokeWidth={9}
		>
			<Indicator className="indicator">
				<div>{dummyProgress}%</div>
			</Indicator>
		</ProgressBar>
	);
};

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
	font-weight: 400;
	color: rgba(0, 0, 0, 0.85);
	user-select: none;
`;
