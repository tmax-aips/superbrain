import React, { useRef, useEffect } from 'react';
import { sec2min } from 'src/utils/time';
import styled from 'styled-components';

// 문장 단위 컴포넌트
export const WordBox = ({ wordObj, onClick, current }) => {
	const ref = useRef();

	//현재 문장으로 스크롤
	// useEffect(() => {
	// 	if (current) ref.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
	// }, [current]);

	return (
		<Box ref={ref} current={current} onClick={() => onClick(wordObj.start, wordObj.end)}>
			<Time>{sec2min(wordObj.start)}</Time>
			<Text>{wordObj.word}</Text>
		</Box>
	);
};

const Box = styled.div`
	cursor: pointer;
	display: flex;
	justify-content: flex-start;
	margin-top: 20px;
	font-weight: ${(props) => (props.current ? '700' : '400')};
	color: ${(props) => (props.current ? '#2979ff' : '')};
`;

const Time = styled.div`
	width: 4rem;
	font-weight: normal;
`;

const Text = styled.span`
	width: 90%;
`;
