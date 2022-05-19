import React, { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import styled from 'styled-components';
import { clockTime } from 'src/utils/time';

//caption box component
export const CaptionsBox = ({ sentence, idx, playing, setPlaying, changeCaption, videoRef, captionRef }) => {
	const [text, setText] = useState('');
	const [loading, setLoading] = useState(true);

	// debounce for caption field modifications
	const textDebounce = useMemo(
		() =>
			debounce((val) => {
				if (!loading) changeCaption(val, idx);
			}, 1000),
		[changeCaption, idx, loading],
	);

	useEffect(() => {
		setText(sentence.text);
		setLoading(false);
	}, []);

	return (
		<div key={idx}>
			<SentenceLabel
				className="justify-between"
				ref={(el) => (captionRef.current[idx] = el)}
				current={
					videoRef.current.currentTime.toFixed(2) >= sentence.totalStart &&
					videoRef.current.currentTime.toFixed(2) < sentence.totalEnd
				}
				onClick={() => {
					// pause when playing
					if (playing === true) {
						videoRef.current.pause();
						setPlaying(false);
					}
					videoRef.current.currentTime = sentence.totalStart;
				}}
			>
				<div className="flex">
					<TimeDiv>
						<span>{clockTime(sentence.totalStart)}</span>
						<span>{clockTime(sentence.totalEnd)}</span>
					</TimeDiv>
					<EditSection className="column">
						<WordsLayout className="center">
							{sentence.wordsArr?.map((words, index) => {
								return (
									<WordBox
										key={words.word + index}
										current={
											videoRef.current.currentTime.toFixed(2) >= words.start &&
											videoRef.current.currentTime.toFixed(2) < words.end
										}
									>
										{words.word}
									</WordBox>
								);
							})}
							<CaptionInput
								type="text"
								value={text}
								onChange={(e) => {
									setText(e.target.value);
									textDebounce(e.target.value);
								}}
								onClick={(e) => {
									//remove bubbling
									e.stopPropagation();
									videoRef.current.currentTime = sentence.totalStart;
								}}
							/>
						</WordsLayout>
					</EditSection>
				</div>
			</SentenceLabel>
		</div>
	);
};
const SentenceLabel = styled.label`
	display: flex;
	border-left: ${(props) => (props.current ? '2px solid #2979ff' : '')};
	background-color: ${(props) => (props.current ? '#eff5ff' : '')};
	margin-bottom: 0.5rem;
	border-bottom: 1px solid #e0e0e0;
`;
const EditSection = styled.section``;

const WordsLayout = styled.div`
	padding: 0.5rem;
	display: block !important;
`;
const CaptionInput = styled.input`
	display: block !important;
	margin-top: 0.5rem;
	width: 100%;
	padding: 0.5rem;
	border-radius: 4px;
	border: 1px solid rgba(0, 0, 0, 0.05);
	&:focus {
		outline: 1px solid #2979ff;
		border: 1px solid rgba(0, 0, 0, 0.15);
	}
`;
const WordBox = styled.div`
	line-height: 18px;
	padding: 4px 11px;
	font-size: 14px;
	background-color: ${(props) => (props.current ? '#dae8ff' : '#fff')};
	color: #65687a;
	display: inline-block;
	align-items: center;
	text-align: center;
	outline: none;
	box-sizing: border-box;
	border-color: ${(props) => (props.current ? '#93bbff' : '#cccfd5')};
	border-style: solid dashed;
	border-width: 1px;
	border-radius: 6px;
	position: relative;
	border-collapse: collapse;
	margin-top: 3px;
	white-space: pre;
	margin-left: -1px;
	&:hover {
		background: #f5f5f5;
	}
`;

const TimeDiv = styled.div`
	letter-spacing: -0.01em;
	display: flex;
	flex-direction: column;
	align-self: center;
	font-weight: 400;
	color: #4c4c51;
	font-size: 0.875rem;
	gap: 0.5rem;
	margin: 0.5rem;
`;
