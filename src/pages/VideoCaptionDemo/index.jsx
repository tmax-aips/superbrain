import React from 'react';
import styled from 'styled-components';
import { ReactComponent as TextEdit } from 'src/assets/VideoCaption/textEditIcon.svg';
import { ReactComponent as TextUpload } from 'src/assets/VideoCaption/textUploadIcon.svg';
import { Header } from 'src/components/header/header';
import { TechHeader } from 'src/components/header/techHeader';
import { Features } from 'src/components/feature/features';
import { Footer } from 'src/components/footer/footer';
import { BusinessFooter } from 'src/components/footer/businessFooter';
import demoHeaderSvg from 'src/assets/VideoCaption/demoHeader.svg';
import { VideoCaptionComp } from './videoCaption/videoCaption';
import { ReactComponent as SoundModel } from 'src/assets/STT/soundModel.svg';
import { ReactComponent as PerformanceIcon1 } from 'src/assets/STT/performanceIcon.svg';
import { ReactComponent as PerformanceIcon2 } from 'src/assets/STT/performanceIcon2.svg';
import bgPattern from 'src/assets/VideoCaption/Video_bg_pattern.png';

const FeaturesList = [
	{
		id: 2349,
		ishorizontal: true,
		cardWidth: '480px',
		list: [
			{
				title: '업로드만으로 빠른 자막생성',
				description: ['영상 업로드 만으로 음성인식 결과를', '문장단위로 나누어 빠르게 자막을 생성해드립니다.'],
				svg: <TextUpload />,
			},
			{
				title: '쉽고 빠른 자막 편집',
				description: ['영상 내용을 한 눈에 보면서', '자막 편집을 쉽고 빠르게 진행할 수 있습니다.'],
				svg: <TextEdit />,
			},
		],
	},
	{
		id: 2350,
		ishorizontal: false,
		cardWidth: '310px',
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

const VideoCaptionDemo = () => {
	return (
		<div>
			<Header />
			<TechHeader
				title={'영상 자막 생성'}
				description={[
					'영상을 업로드하면 자동으로 자막을 만들고 사용자가',
					'편집가능하며 자막 텍스트를 다운받을 수 있습니다.',
				]}
				demoHeaderSvg={demoHeaderSvg}
				product={'/'}
			/>
			<BGWrap>
				<CaptionDemoSection>
					<VideoCaptionComp />
				</CaptionDemoSection>
				<Features height={'970px'} title={'영상 자막 생성'} featureList={FeaturesList} />
			</BGWrap>
			<BusinessFooter />
			<Footer />
		</div>
	);
};
export default VideoCaptionDemo;

const CaptionDemoSection = styled.section`
	height: 770px;
	padding: 90px 0;
	margin: 0 auto;
`;

const BGWrap = styled.div`
	background: url(${bgPattern}) center center no-repeat, linear-gradient(#121d31 770px, #10273d 770px, #10273d 1740px);
`;
