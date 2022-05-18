import React from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

export const MainSectionCard = ({ card }) => {
	const navigate = useNavigate();
	return (
		<Frame>
			<Category>{card.category}</Category>
			<Title>{card.title}</Title>
			<Desc>
				{card.desc.split('\n').map((txt) => (
					<span key={txt}>
						{txt}
						<br />
					</span>
				))}
			</Desc>
			<LinkButton type={card.type} onClick={() => navigate(`${card.path}`)}>
				{card.type}
			</LinkButton>
			<Img>{card.img}</Img>
		</Frame>
	);
};

const Frame = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 400px;
	height: 538px;
	background-color: #1a2734;
	color: white;
	position: relative;
	margin: 20px;
`;

const Category = styled.div`
	margin-top: 50px;
	font-size: 14px;
	line-height: 14px;
`;

const Title = styled.div`
	font-size: 26px;
	font-weight: 700;
	margin: 18px 0px 24px;
	line-height: 20px;
`;

const Desc = styled.div`
	font-size: 14px;
	line-height: 23px;
	opacity: 60%;
	text-align: center;
`;

const LinkButton = styled.button`
	margin-top: 40px;
	line-height: 14.63px;
	border-radius: 4px;
	color: white;
	z-index: 1;
	${(props) =>
		props.type === '체험하기' &&
		css`
			font-size: 13px;
			width: 110px;
			height: 42px;
			padding: 13px 30px 14px;
			background-color: transparent;
			box-sizing: border-box;
			border: 1px solid white;
			cursor: pointer;
			&:hover {
				background-color: rgb(255, 255, 255, 0.1);
			}
		`};

	${(props) =>
		props.type === 'COMING SOON' &&
		css`
			font-size: 12px;
			width: 164px;
			height: 42px;
			padding: 13px 35px 14px;
			background-color: rgba(255, 255, 255, 0.1);
			border: none;
		`};
`;

const Img = styled.div`
	position: absolute;
	bottom: 0;
`;
