import React from 'react';
import styled from 'styled-components';
import profile from 'src/assets/productProfile/Tmax_product_profile.pdf';

export const BusinessFooter = () => {
	return (
		<FooterWrap className="flex">
			<Contents className="justify-between">
				<TextWrap>
					<div>Tmax AI와 함께</div>
					<div>비즈니스 성공을 만들어보세요</div>
				</TextWrap>
				<div className="center">
					<ButtonBlue>도입 문의하기</ButtonBlue>
					<a href = {profile} target = "_blank">
					    <ButtonDefault>제품소개서 다운</ButtonDefault>
                    </a>
				</div>
			</Contents>
		</FooterWrap>
	);
};

const FooterWrap = styled.div`
	width: 100%;
	height: 300px;
	align-items: center;
	background: linear-gradient(70deg, #00afbe, 20%, #0e2951);
`;

const Contents = styled.div`
	width: 90%;
	max-width: 1600px;
	padding: 0 5rem;
	margin: 0 auto;
	display: flex;
`;

const TextWrap = styled.div`
	line-height: 3rem;
	font-size: 2rem;
	font-weight: 700;
	color: white;
`;

const ButtonBlue = styled.button`
	margin: 0 5px;
	width: 180px;
	height: 50px;
	color: white;
	background: #2979ff;
	border: none;
	font-size: 1.1rem;
	font-weight: 700;
	border-radius: 4px;
	cursor: pointer;
	&:hover {
		background-color: #256ce7;
	}
`;

const ButtonDefault = styled.button`
	margin: 0 5px;
	border: 1px solid white;
	width: 180px;
	height: 50px;
	color: white;
	background: none;
	font-size: 1.1rem;
	font-weight: 700;
	border-radius: 4px;
	cursor: pointer;
`;
