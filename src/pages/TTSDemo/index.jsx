import React from 'react';
import styled from 'styled-components';
import { ReactComponent as VoiceSVG } from 'src/assets/TTS/voice.svg';
import { ReactComponent as HeadsetSVG } from 'src/assets/TTS/headset.svg';
import Service1 from 'src/assets/TTS/serviceImg/service_1.png';
import Service2 from 'src/assets/TTS/serviceImg/service_2.png';
import Service3 from 'src/assets/TTS/serviceImg/service_3.png';
import Service4 from 'src/assets/TTS/serviceImg/service_4.png';
import Service5 from 'src/assets/TTS/serviceImg/service_5.png';
import Service6 from 'src/assets/TTS/serviceImg/service_6.png';
import { Header } from 'src/components/header/header';
import { TechHeader } from 'src/components/header/techHeader';
import { Features } from 'src/components/feature/features';
import { Footer } from 'src/components/footer/footer';
import { BusinessFooter } from 'src/components/footer/businessFooter';
import { TTS } from './tts/tts';
import { ServiceOffers } from 'src/components/serviceOffer/serviceOffers';
import demoHeaderSvg from 'src/assets/TTS/TTSHeader.svg';
import bgPattern from 'src/assets/TTS/TTS_bg_pattern.png';

const TTSFeatures = [
	{
		ishorizontal: true,
		cardWidth: '480px',
		id: 7439,
		list: [
			{
				title: '고품질 합성된 음성',
				description: ['람의 음성에 가까운 자연스러운', '음성 변환을 사용할 수 있습니다'],
				svg: <VoiceSVG />,
			},
			{
				title: '디테일한 오디오 설정',
				description: [
					'속도, 성우 설정, 일시 중지 등 손쉽게 조절하여',
					'원하는 스타일의 음성 서비스를 제공받을 수 있습니다.',
				],
				svg: <HeadsetSVG />,
			},
		],
	},
];

const TTSServiceOffers = [
	{
		title: '교육&게임',
		description: ['AI튜터, 게임 아바타 음성등의', '컨텐츠 음성합성에 적용'],
		img: <img src={Service1} alt="교육 및 게임" />,
	},
	{
		title: '말하는 ARS',
		description: ['상품 및 서비스 안내,', '고객이 요청하는 정보 안내 등을', '다양한 음성으로 들려주는 서비스'],
		img: <img src={Service2} alt="말하는 ARS" />,
	},
	{
		title: '하이패스&네비게이션',
		description: ['경로안내, 교통정보 안내 등', '다양한 운행관련', '메시지 전달에 음성합성 적용'],
		img: <img src={Service3} alt="하이패스 및 네비게이션" />,
	},
	{
		title: '다큐멘터리',
		description: ['제작하고 있는 방송영상에', '내레이션이 필요할 때 녹음 없이', '영상에 내레이션 적용'],
		img: <img src={Service4} alt="다큐멘터리" />,
	},
	{
		title: '오디오북',
		description: ['다양한 목소리를 기반으로', '더욱더 흥미 있고 몰입감 있는', '오디오북 제작'],
		img: <img src={Service5} alt="오디오북" />,
	},
	{
		title: '뉴스',
		description: [
			'목소리를 내기 어려울 때 많은',
			'사람들에게 정보를 전달하고 싶을 때',
			'AI 성우를 통해 정보 전달 가능',
		],
		img: <img src={Service6} alt="뉴스" />,
	},
];

const TTSDemo = () => {
	return (
		<div>
			<Header />
			<TechHeader
				title={'TTS(Text to Speech)'}
				description={[
					'TTS(Text-to-Speech)는 문자 데이터를 사람이 더욱',
					'쉽게 이해할 수 있도록 음성으로 변환하는 음성 합성 기술입니다.',
				]}
				demoHeaderSvg={demoHeaderSvg}
				product={'/'}
			/>
			<BGWrap>
				<TTSsection>
					<TTS />
				</TTSsection>
				<Features height={'570px'} title={'TTS'} featureList={TTSFeatures} />
				<ServiceOffers serviceOfferList={TTSServiceOffers} />
			</BGWrap>
			<BusinessFooter />
			<Footer />
		</div>
	);
};

export default TTSDemo;
const TTSsection = styled.section`
	padding: 90px 0;
	height: 670px;
	margin: 0 auto;
`;

const BGWrap = styled.div`
	background: url(${bgPattern}) center center no-repeat,
		linear-gradient(#121d31 670px, #10273d 670px, #10273d 1260px, #f0f2f4 1260px);
`;
