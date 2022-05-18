import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Header } from 'src/components/header/header';
import { Footer } from 'src/components/footer/footer';
import { Features } from 'src/components/feature/features';
import { ReactComponent as SoundModel } from 'src/assets/STT/soundModel.svg';
import { ReactComponent as PerformanceIcon1 } from 'src/assets/STT/performanceIcon.svg';
import { ReactComponent as PerformanceIcon2 } from 'src/assets/STT/performanceIcon2.svg';
import Service1 from 'src/assets/STT/serviceImg/service_1.png';
import Service2 from 'src/assets/STT/serviceImg/service_2.png';
import Service3 from 'src/assets/STT/serviceImg/service_3.png';
import Service4 from 'src/assets/STT/serviceImg/service_4.png';
import Service5 from 'src/assets/STT/serviceImg/service_5.png';
import Service6 from 'src/assets/STT/serviceImg/service_6.png';
import { TechHeader } from 'src/components/header/techHeader';
import { BusinessFooter } from 'src/components/footer/businessFooter';
import { ServiceOffers } from 'src/components/serviceOffer/serviceOffers';
import { SoundConvert } from './soundConvert/soundConvert';
import demoHeaderSvg from 'src/assets/STT/STTHeader.svg';
import bgPattern from 'src/assets/STT/STT_bg_pattern.png';

const featureList = [
	{
		ishorizontal: false,
		cardWidth: '310px',
		id: 7439,
		list: [
			{
				title: '고품질 음성 모델',
				description: [
					'다양한 환경에서도 정확한 음성 텍스트',
					'변환 모델로 발화 내용을',
					'정확히 기록하여 제공합니다',
				],
				svg: <SoundModel />,
			},
			{
				title: '높은 처리 속도',
				description: [
					'다양한 확장자의 녹음된 음성파일을',
					'불러와 실시간기반 텍스트로',
					'빠르게 변환이 가능합니다.',
				],
				svg: <PerformanceIcon1 />,
			},
			{
				title: '국내 최고 성능',
				description: [
					'Character Error Rate (문자오류율)',
					'CER: 7%으로 Tmax AI만의',
					'정확한 STT기술을 경험하세요',
				],
				svg: <PerformanceIcon2 />,
			},
		],
	},
];

const headerInfo = {
	title: 'STT(Speech to Text)',
	description: ['STT(Speech-to-Text)는 음성 데이터를 정확하게', '텍스트로 변환하는 자동 음성 인식 기술입니다'],
	product: '',
};

const TTSServiceOffers = [
	{
		title: '교육&학원',
		description: ['청각 장애인 교육을 위한 보조,', '어학원 컨텐츠에 대한 발음 정확도 평가'],
		img: <img src={Service1} alt="교육 및 학원" />,
	},
	{
		title: '상담&녹취',
		description: ['AI 상담센터, 콜센터 상담기록 녹취,', '회의내용 녹취에 따른', '회의록 자동생성 등에 활용'],
		img: <img src={Service2} alt="상담 및 녹취" />,
	},
	{
		title: 'AI 스피커',
		description: ['음성인식을 통한 응대', '및 기능제어'],
		img: <img src={Service3} alt="AI 스피커" />,
	},
	{
		title: '네비게이션',
		description: ['네비게이션의 목적지 검색 및,', '설정 시 음성으로 입력하는', '기본 기능에 적용 가능'],
		img: <img src={Service4} alt="네비게이션" />,
	},
	{
		title: '홈쇼핑 및 택배업체',
		description: [
			'유선 통화 자동 주문 및 상담원',
			'주문 시 물품 수령 주소에 대한',
			'음성인식 및 우편번호 자동 검색에 활용',
		],
		img: <img src={Service5} alt="홈쇼핑 및 택배업체" />,
	},
	{
		title: '증권&은행',
		description: ['보유한 음성 데이터 분석을 통한', '업무 개선 및 STT정확도 개선으로', '고객 응대 고품질화'],
		img: <img src={Service6} alt="증권 및 은행" />,
	},
];

function STTDemo() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div>
			<Header />
			<TechHeader title={headerInfo.title} description={headerInfo.description} demoHeaderSvg={demoHeaderSvg} />
			<BGWrap>
				<STTWrapper className="center">
					<SoundConvert />
				</STTWrapper>
				<Features height={'720px'} title={'STT'} featureList={featureList} />
				<ServiceOffers serviceOfferList={TTSServiceOffers} />
			</BGWrap>
			<BusinessFooter />
			<Footer />
		</div>
	);
}
export default STTDemo;

const BGWrap = styled.div`
	background: url(${bgPattern}) center center no-repeat,
		linear-gradient(#121d31 770px, #10273d 770px, #10273d 1490px, #f0f2f4 1490px);
`;

const STTWrapper = styled.div`
	height: 770px;
	margin: 0 auto;
`;
