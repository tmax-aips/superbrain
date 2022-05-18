import { useObserver } from 'mobx-react';
import React, { useState } from 'react';
import useStore from 'src/stores/rootStore';
import { ReactComponent as DownSVG } from 'src/assets/down.svg';
import styled from 'styled-components';

// TTS select component
export const Select = ({ value, options, setting }) => {
	const [open, setOpen] = useState(false);
	const { ttsStore } = useStore();

	// when the selection value changes, change that after checking the option
	const selectedChange = (option) => {
		switch (setting) {
			case 'lang':
				ttsStore.langChange(option);
				return;
			case 'spk':
				ttsStore.spkChange(option);
				return;
			default:
				return;
		}
	};

	return useObserver(() => (
		<>
			<SelectDiv open={open} className="justify-between" onClick={() => setOpen(!open)}>
				{value}
				<div className="center">
					<DownSVG />
				</div>
			</SelectDiv>
			{open && (
				<SelectOptionDiv>
					<SelectOptionUl>
						{options?.map((option, idx) => {
							return (
								<SelectOptionLi
									key={idx}
									current={value === option.value}
									onClick={() => {
										selectedChange(option);
										setOpen(!open);
									}}
								>
									{option.value}
								</SelectOptionLi>
							);
						})}
					</SelectOptionUl>
				</SelectOptionDiv>
			)}
		</>
	));
};

const SelectDiv = styled.div`
	padding: 8px 14px;
	width: 100%;
	position: relative;
	cursor: pointer;
	background: white;
	color: #4c4c51;
	font-size: 14px;
	line-height: 18px;
	background: #ffffff;
	border: 1px solid #d9d9d9;
	box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016);
	border-radius: 4px;
	&:focus {
		outline: none;
	}
	option {
		color: black;
	}
	svg {
		transform: ${(props) => (props.open ? `rotate(-180deg)` : 'none')};
	}
`;

const SelectOptionDiv = styled.div`
	position: relative;
	top: 5px;
`;
const SelectOptionUl = styled.ul`
	position: absolute;
	z-index: 1;
	width: 100%;
	border: 1px solid #d9d9d9;
`;

const SelectOptionLi = styled.li`
	background: ${(props) => (props.current ? '#EFF5FF' : 'white')};
	padding: 8px 14px;
	font-size: 0.85rem;
	cursor: pointer;
	&:hover {
		background: #e9e9e9;
	}
	&:first-child {
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
	}
	&:last-child {
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
	}
`;
