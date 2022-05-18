import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LogoWhite } from 'src/assets/BI_SuperBrain_4_1.svg';
import { ReactComponent as Top } from 'src/assets/topIcon.svg';
import { ReactComponent as Policy } from 'src/assets/policyIcon.svg';

const IconButton = ({ text, icon, onClick }) => {
	return (
		<ButtonForm onClick={onClick} className="justify-between">
			<div>{text}</div>
			<div>{icon}</div>
		</ButtonForm>
	);
};

const ButtonForm = styled.div`
	height: 45px;
	border-radius: 5px;
	align-items: center;
	padding: 1rem;
	border: 1px solid #868c96;
	color: #868c96;
	fill: #868c96;
	cursor: pointer;
`;

const CopyRight = () => {
	return <CopyRightText>Copyright 2022 TmaxAI Co. LTD. All Rights Reserved</CopyRightText>;
};

const CopyRightText = styled.div`
	margin-top: 15px;
	color: rgba(255, 255, 255, 0.5);
	font-size: 0.875rem;
`;

export const Footer = () => {
	const gotoTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<FooterFrame className="column">
			<LogoPos>
				<LogoWhite fill="black" />
			</LogoPos>
			<Body className="justify-between">
				<InfoArea className="column">
					<div className="justify-between" style={{ width: '400px' }}>
						<TextLabel>주소</TextLabel>
						<TextContents>경기도 성남시 황새울로 258번길 29, 티맥스 수내타워</TextContents>
					</div>
					<div className="justify-between" style={{ width: '620px' }}>
						<div style={{ width: '200px' }}>
							<TextLabel>제품구입문의</TextLabel>
							<TextContents>031-8018-1111</TextContents>
						</div>
						<div style={{ width: '200px' }}>
							<TextLabel>기술서비스센터</TextLabel>
							<TextContents>1544-8629</TextContents>
						</div>
						<div style={{ width: '200px' }}>
							<TextLabel>대표번호</TextLabel>
							<TextContents>031-8018-1000</TextContents>
						</div>
					</div>
					<CopyRight />
				</InfoArea>
				<ButtonArea className="column">
					<IconButton onClick={gotoTop} text="TOP" icon={<Top />} />
				</ButtonArea>
			</Body>
		</FooterFrame>
	);
};

const LogoPos = styled.div`
	width: 100%;
	max-width: 1600px;
`;

const FooterFrame = styled.div`
	width: 100%;
	height: 340px;
	align-items: center;
	background-color: #121d31;
	padding: 5rem;
`;

const Body = styled.div`
	margin-top: 3rem;
	max-width: 1600px;
`;

const InfoArea = styled.div`
	line-height: 30px;
`;

const ButtonArea = styled.div`
	width: 190px;
	justify-content: space-around;
	align-items: center;
	height: 100px;
`;

const TextLabel = styled.span`
	font-size: 0.875rem;
	color: rgba(255, 255, 255, 0.5);
`;

const TextContents = styled.span`
	margin-left: 15px;
	font-size: 0.875rem;
	color: white;
`;
