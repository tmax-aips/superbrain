import React from 'react';
import styled from 'styled-components';

export const TechHeader = ({ title, description, demoHeaderSvg, product }) => {
	return (
		<div>
			<HeaderSection demoHeaderSvg={demoHeaderSvg} className="column">
				<HeaderLayout>
					<Title>{title}</Title>
					<Description className="column gap-8">
						{description.map((text) => {
							return <div key={text}>{text}</div>;
						})}
					</Description>
					<BtnSection className="flex gap-16">
						<InquiryBtn>도입 문의하기</InquiryBtn>
						<DownloadBtn>제품소개서 다운</DownloadBtn>
					</BtnSection>
				</HeaderLayout>
			</HeaderSection>
		</div>
	);
};

const HeaderSection = styled.section`
	background: #101721;
	background-image: ${(props) => `url(${props.demoHeaderSvg})`};
	background-repeat: no-repeat;
	background-position: center 170px;
	height: 680px;
	padding-top: 170px;
`;

const HeaderLayout = styled.section`
	margin: auto;
	padding: 0 180px;
	max-width: 1600px;
	width: 100%;
`;

const Title = styled.div`
	font-weight: 700;
	font-size: 38px;
	line-height: 46px;
	color: #ffffff;
`;

const Description = styled.div`
	font-family: 'Noto Sans KR';
	line-height: 20px;
	margin: 26px 0;
	letter-spacing: -0.01em;
	color: rgba(255, 255, 255, 0.8);
`;

const BtnSection = styled.section`
	display: flex;
	button {
		padding: 15px;
		min-width: 170px;
		height: 57px;
		border-radius: 4px;
		color: white;
		cursor: pointer;
		font-size: 18px;
		line-height: 26px;
		text-align: center;
	}
`;

const InquiryBtn = styled.button`
	background: #2979ff;
	border: none;
	&:hover {
		background-color: #256ce7;
	}
`;
const DownloadBtn = styled.button`
	background: transparent;
	border: 1px solid white;
`;
