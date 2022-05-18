import React from 'react';
import styled from 'styled-components';

export const FeatureCard = ({ horozontal, title, description, svg, cardWidth }) => {
	return (
		<FeatureArticle className="column" horozontal={horozontal} cardWidth={cardWidth}>
			{horozontal ? (
				<Title className="gab-16">
					{svg}
					<span className="ml-16">{title}</span>
				</Title>
			) : (
				<>
					{svg}
					<Title>
						<span className="mt-32">{title}</span>
					</Title>
				</>
			)}
			<Description horozontal={horozontal}>
				{description.map((text) => {
					return <div key={text}>{text}</div>;
				})}
			</Description>
		</FeatureArticle>
	);
};

const FeatureArticle = styled.article`
	background: #1e3448;
	padding: ${(props) => (props.horozontal ? '50px' : '50px 0 50px 0')};
	border-radius: 4px;
	width: ${(props) => props.cardWidth};
	align-items: ${(props) => (props.horozontal ? 'none' : 'center')};
	text-align: ${(props) => (props.horozontal ? 'start' : 'center')};
`;

const Title = styled.div`
	display: flex;
	align-items: center;
	font-weight: 700;
	font-size: 22px;
	line-height: 20px;
	margin: 0 0 25px 0;
	letter-spacing: -0.01em;
	color: white;
`;

const Description = styled.div`
	font-size: 16px;
	line-height: 30px;
	color: #a3a7ad;
`;
