import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MainSectionCard } from './MainSectionCard';
import { Header } from 'src/components/header/header';
import { Footer } from 'src/components/footer/footer';
import mainBackgroundImg from 'src/assets/Main/main_bg.svg';
import BannerImg from 'src/assets/Main/mainBanner_bg.png';
import { ReactComponent as Sttimg } from 'src/assets/Main/mainCard_STT_img.svg';
import { ReactComponent as VideoCaptionImg } from 'src/assets/Main/mainCard_VideoCaption_img.svg';
import { ReactComponent as Ttsimg } from 'src/assets/Main/mainCard_TTS_img.svg';
import { ReactComponent as EmotionalAnalysisImg } from 'src/assets/Main/mainCard_EmotionalAnalysis_img.svg';
import { ReactComponent as NameRecognitionImg } from 'src/assets/Main/mainCard_NameRecognition_img.svg';
import { ReactComponent as DocuClassificationImg } from 'src/assets/Main/mainCard_DocuClassification_img.svg';
import { ReactComponent as InfoseLogo } from 'src/assets/Main/Logo_infose.svg';
import { ReactComponent as WooriLogo } from 'src/assets/Main/Logo_woori.svg';
import profile from 'src/assets/productProfile/Tmax_product_profile.pdf';

const Home = () => {
	const navigate = useNavigate();
	const AITechCardContents = [
		{
			category: '음성 언어 처리',
			title: 'STT(Speech to Text)',
			desc: 'STT(Speech-to-Text)는 \n 음성 데이터를 정확하게 텍스트로 \n 변환하는 자동 음성 인식 기술입니다',
			type: '체험하기',
			img: <Sttimg />,
			path: '/stt',
		},
		{
			category: '음성 언어 처리',
			title: '영상 자막 추출',
			desc: '영상을 업로드하면 자동으로 \n 자막을 추출하고 사용자가 편집가능하며 \n 자막 텍스트를 다운받을 수 있습니다',
			type: '체험하기',
			img: <VideoCaptionImg />,
			path: '/videoCaption',
		},
		{
			category: '음성 언어 처리',
			title: 'TTS(Text-to-Speech)',
			desc: 'TTS(Text-to-Speech)는 \n 문자 데이터를 사람이 더욱 쉽게 이해할 수 있도록 \n 음성으로 변환하는 음성 합성 기술입니다',
			type: '체험하기',
			img: <Ttsimg />,
			path: '/tts',
		},
		{
			category: '자연어 처리',
			title: '감성 분석',
			desc: '한국어 입력 텍스트의 감성을 긍정 및 부정으로 분류 \n 긍정/부정 단계에 따라 -5 ~ +5 사이 점수 출력 \n 이진 분류 정확도 88.46%',
			type: 'COMING SOON',
			img: <EmotionalAnalysisImg />,
			path: '/',
		},
		{
			category: '자연어 처리',
			title: '개체명 인식',
			desc: '자연어 문장에서 주요한 개체 정보 \n (인물명, 기관명, 날짜 등)를 인식 및 추출 \n 주요 개체명 위치 인식 및 카테고리 별 분류',
			type: 'COMING SOON',
			img: <NameRecognitionImg />,
			path: '/',
		},
		{
			category: '자연어 처리',
			title: '문서 분류',
			desc: '문서를 입력 받아 내용을 요약하여 \n 짧은 문장으로 출력, 문서 이해를 바탕으로 \n 요약문을 생성하는 추상적 요약',
			type: 'COMING SOON',
			img: <DocuClassificationImg />,
			path: '/',
		},
	];

	const CollaboCompanyLogos = [
		{ id: 0, logo: <InfoseLogo /> },
		{ id: 1, logo: <WooriLogo /> },
	];

	return (
		<Wrapper style={{ userSelect: 'none' }}>
			<Header main={true}/>
			<Main>
				<MainWrapper/>
				<MainTitle>AI Technology Platform For Anyone</MainTitle>
				<MainSubTitle>TmaxAI 기술력으로 새로운 가치를 창출해보세요</MainSubTitle>
				<ButtonWrapper>
					<ContactButton onClick={()=>{navigate('/inquiry')}}>도입 문의하기</ContactButton>
					<a href = {profile} target = "_blank">
					    <DownloadButton>제품소개서 다운</DownloadButton>
                    </a>
				</ButtonWrapper>
			</Main>

			<TechSection>
				<TechSectionTitle>AI Technology</TechSectionTitle>
				<TechSectionDesc>음성, 대화, 문서 지능 등 다양한 분야의 AI 기술을 체험해보세요</TechSectionDesc>
				<CardWrapper>
					{AITechCardContents.map((card) => (
						<MainSectionCard key={card.title} card={card} />
					))}
				</CardWrapper>
			</TechSection>
			<CollaboSection>
				<CollaboSectionTitle>Partners & Collaborators</CollaboSectionTitle>
				<CollaboSectionDesc>다양한 기업들이 Tmax AI와 함께하고 있습니다</CollaboSectionDesc>
				<LogoWrapper>
					{CollaboCompanyLogos.map((company) => (
						<LogoBox key={company.id}>{company.logo}</LogoBox>
					))}
				</LogoWrapper>
			</CollaboSection>
			<Banner>
				<BannerTitle>Tmax AI와 함께 비즈니스 성공을 만들어보세요</BannerTitle>
				<BannerDesc>음성, 대화, 문서 지능 등 다양한 분야의 API문의와 제품메뉴얼을 확인해보세요</BannerDesc>
				<ButtonWrapper>
					<ContactButton>도입 문의하기</ContactButton>
					<a href = {profile} target = "_blank">
					    <DownloadButton>제품소개서 다운</DownloadButton>
                    </a>
				</ButtonWrapper>
			</Banner>
			<Footer />
		</Wrapper>
	);
};
export default Home;

//styled components 예제
const Wrapper = styled.div`
	width: 100vw;
	max-width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: 'Noto Sans KR';
`;

const scaleBackground = keyframes`
  0% {
    transform:scale(1.4);
  }
  
  100% {
    transform:scale(1.0);
  }
`;

const Main = styled.div`
	display: flex;
	width: 100%;
	max-width: 100vw;
	position: relative;
	overflow: hidden;
	height: 100vh;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const MainWrapper = styled.div`
	z-index: -1;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-image: url('${mainBackgroundImg}');
	background-color: #000000;
	background-size: cover;
	animation: ${scaleBackground} both ease-in-out 3.2s;
`;

const MainTitle = styled.div`
	width: 740px;
	font-size: 62px;
	font-weight: 700;
	color: white;
	text-align: center;
	line-height: 75.58px;
`;

const MainSubTitle = styled.div`
	font-size: 20px;
	color: white;
	margin: 36px 0px 68px;
	line-height: 22px;
`;

const ButtonWrapper = styled.div``;

const ContactButton = styled.button`
	height: 58px;
	width: 184px;
	padding: 15px, 42px, 16px, 42px;
	margin-right: 20px;
	border: transparent;
	border-radius: 4px;
	background-color: #2979ff;
	font-size: 18px;
	font-weight: 700;
	line-height: 26.06px;
	color: white;
	cursor: pointer;
	&:hover {
		background-color: #256ce7;
	}
`;

const DownloadButton = styled.button`
	height: 58px;
	width: 204px;
	padding: 15px, 42px, 16px, 42px;
	background: rgb(255, 255, 255, 0.08);
	border: 1px solid white;
	box-sizing: border-box;
	border-radius: 4px;
	font-size: 18px;
	font-weight: 700;
	line-height: 26.06px;
	color: white;
	cursor: pointer;
`;

const TechSection = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-width: 100%;
	height: 1558px;
	background-color: #101721; ;
`;

const TechSectionTitle = styled.div`
	font-size: 40px;
	font-weight: 700;
	color: white;
	margin: 140px 0px 12px;
	line-height: 48.76px;
`;

const TechSectionDesc = styled.div`
	font-size: 16px;
	color: white;
	opacity: 60%;
	margin-bottom: 60px;
	line-height: 22px;
`;

const CardWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 1320px;
`;

const CollaboSection = styled.section`
	min-width: 100%;
	padding: 140px 0px 192px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #13416d;
	color: white;
`;

const CollaboSectionTitle = styled.div`
	font-weight: 700;
	font-size: 40px;
	line-height: 48.76px;
`;

const CollaboSectionDesc = styled.div`
	margin: 12px 0px 60px;
	line-height: 22px;
`;

const LogoWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	width: 1150px;
`;

const LogoBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 333px;
	height: 140px;
	background-color: white;
	border-radius: 10px;
	margin: 21px;
`;

const Banner = styled.div`
	display: flex;
	width: 100%;
	height: 566px;
	padding: 170px 0px;
	flex-direction: column;
	align-items: center;
	color: white;
	background-color: #00274d;
	background-image: url('${BannerImg}');
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
`;

const BannerTitle = styled.div`
	font-size: 40px;
	font-weight: 700;
	line-height: 48.76px;
`;

const BannerDesc = styled.div`
	font-size: 20px;
	opacity: 60%;
	margin: 22px 0px 66px;
	line-height: 22px;
`;
