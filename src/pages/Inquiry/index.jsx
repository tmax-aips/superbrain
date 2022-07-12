import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import demoHeaderSvg from 'src/assets/STT/STTHeader.svg';
import { Footer } from 'src/components/footer/footer';
import { FormInquiry } from './inquiryform/inquiryForm'
import LogoBlackVer2 from "src/assets/BI_SuperNLP_black.png";
import { useNavigate } from 'react-router-dom';

function Inquiry() {
    const navigate = useNavigate();
    const gotoHome = () => navigate('/');
    return (
        <div>
            <LogoHeaderSection >
                <Body className="justify-between">
                    <figure className="pointer" onClick={gotoHome}>
                        <img src={LogoBlackVer2} alt="LogoBlack"></img>
                    </figure>
                </Body>
            </LogoHeaderSection>
            <HeaderSection demoHeaderSvg={demoHeaderSvg}>
                <HeaderLayout style={{marginTop:"15px"}}>
                    <Title>문의등록</Title>
                    <Description className="column gap-8">
                        <div>음성, 대화, 문서 지능 등 다양한 분야의 TmaxAI 기술력으로 새로운 가치를 창출하는</div>
                        <div>SuperNLP에 대해 궁금한 것을 문의해주세요.</div>
                    </Description>
                </HeaderLayout>
            </HeaderSection>
            <ContentDiv>
                <BodyLayout>
                    <FormInquiry/>
                </BodyLayout>
            </ContentDiv>
        </div>
    );
};
export default Inquiry;

const ContentDiv = styled.div`
    background: center center no-repeat;
`;
const BodyLayout = styled.div`
    height: 770px;
	margin: 0 auto;
`
const LogoHeaderSection = styled.section`
	border-bottom: '';
`;
const Body = styled.div`
	padding: 1rem 5rem;
	align-items: center;
	max-width: 1600px;
	height: 68px;
	margin: 0 auto;
`;

const HeaderSection = styled.section`
	background: #101721;
	background-image: ${(props) => `url(${props.demoHeaderSvg})`};
	background-repeat: no-repeat;
	background-position: center;
	height: 300px;
	padding-top: 68px;
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
	line-height: 20px;
	margin: 26px 0;
	letter-spacing: -0.01em;
	color: rgba(255, 255, 255, 0.8);
`;