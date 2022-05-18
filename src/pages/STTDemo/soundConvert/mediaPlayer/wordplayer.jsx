import React from 'react';
import styled from 'styled-components';
import { WordBox } from './wordBox';

// 문장 출력 컨테이너 컴포넌트
export const WordPlayer = ({ wordData, onClick, currentTime }) => {
	return (
		<ContentsBox>
			{wordData?.map((word) => (
				<WordBox
					key={word.start}
					onClick={onClick}
					wordObj={word}
					current={currentTime > word.start && currentTime < word.end}
				/>
			))}
		</ContentsBox>
	);
};

const ContentsBox = styled.div`
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	overflow-x: hidden;
	height: 100%;
	::-webkit-scrollbar {
		width: 10px;
		background-color: white;
	}
	::-webkit-scrollbar-thumb {
		background-color: #cccccc;
		border-radius: 1rem;
	}
	padding: 1rem;
`;
