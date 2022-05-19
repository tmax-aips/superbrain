import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { throttle } from 'lodash';
import LogoWhiteVer2 from 'src/assets/BI_SuperBrain_white.png';
import LogoBlackVer2 from 'src/assets/BI_SuperBrain_black.png';
import { MenuBar } from './menu/menuBar';
import { useNavigate } from 'react-router-dom';

export const Header = ({ main }) => {
	const [isGNB, setIsGNB] = useState(false);
	const navigate = useNavigate();

	const gotoHome = () => navigate('/');

	const scrollEvent = throttle(() => {
		let scrollLocation = document.documentElement.scrollTop;
		if (scrollLocation > 10 && !isGNB) {
			setIsGNB(true);
		} else if (scrollLocation < 10) {
			setIsGNB(false);
		} else {
			return;
		}
	}, 300);

	useEffect(() => {
		if (main) window.addEventListener('scroll', () => scrollEvent());

		return () => window.removeEventListener('scroll', () => scrollEvent());
	}, []);

	return (
		<HeaderForm main={main} isGNB={isGNB}>
			<HeaderSection main={main}>
				<Body className="justify-between">
					<figure className="pointer" onClick={gotoHome}>
						{main ? (
							<img src={LogoWhiteVer2} alt="LogoWhite"></img>
						) : (
							<img src={LogoBlackVer2} alt="LogoBlack" />
						)}
					</figure>
					<ContectButton main={main}>도입 문의하기</ContectButton>
				</Body>
			</HeaderSection>
			{!main && <MenuBar />}
		</HeaderForm>
	);
};

const HeaderForm = styled.div`
	z-index: 1000;
	position: fixed;
	width: 100%;
	background: ${(props) => (props.main ? (props.isGNB ? `#131d30` : `none`) : 'white')};
	transition-duration: 0.5s;
`;

const HeaderSection = styled.section`
	border-bottom: ${(props) => (props.main ? '' : '1px solid #dbdbdb')};
`;

const Body = styled.div`
	padding: 1rem 5rem;
	align-items: center;
	max-width: 1600px;
	height: 68px;
	align-items: center;
	margin: 0 auto;
`;

const ContectButton = styled.button`
	background: ${(props) => (props.main ? 'none' : '#2979FF')};
	border: ${(props) => (props.main ? `1px solid rgba(255, 255, 255, 0.6)` : `none`)};
	color: white;
	width: 130px;
	border-radius: 4px;
	height: 40px;
	cursor: pointer;
	&:hover {
		background-color: #256ce7;
		border: ${(props) => props.main && `none`};
	}
`;
