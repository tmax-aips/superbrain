import React from 'react';
import styled from 'styled-components';

export const ServiceOfferCard = ({ title, description, img, idx }) => {
	return (
		<ServiceOfferArticle className="column">
			{img}
			<ServiceNumber>CASE.{idx}</ServiceNumber>
			<Title>{title}</Title>
			<Description>
				{description.map((text) => {
					return <div key={text}>{text}</div>;
				})}
			</Description>
		</ServiceOfferArticle>
	);
};

const ServiceOfferArticle = styled.article`
	width: 300px;
	background: #ffffff;
	box-shadow: 0px 4px 10px rgba(26, 39, 52, 0.04);
	border-radius: 10px;
`;
const ServiceNumber = styled.div`
	font-weight: bold;
	font-size: 14px;
	line-height: 20px;
	text-align: center;
	margin-top: 38px;
	color: #2979ff;
`;
const Title = styled.div`
	font-weight: 700;
	font-size: 22px;
	line-height: 20px;
	margin: 22px auto 22px auto;
	letter-spacing: -0.01em;
	color: #0c0e1c;
`;

const Description = styled.div`
	font-size: 16px;
	line-height: 30px;
	color: #65687a;
	text-align: center;
	margin-bottom: 60px;
`;
