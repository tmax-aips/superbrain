import React from 'react';
import styled from 'styled-components';
import { Select } from 'src/pages/TTSDemo/tts/select';
import useStore from 'src/stores/rootStore';
import { useObserver } from 'mobx-react';
import { languageOption, spkOptions } from '../staticData/staticValue';

//tts setting component
export const Setting = ({playing}) => {
	const { ttsStore } = useStore();

	return useObserver(() => (
		<SettingArticle className="column">
			{/* 언어 선택 기능 향후 추가 시 */}
			{/* <BasicSetting className="column">
				<OptionLayout>
					<SettingSubTitle>언어 선택</SettingSubTitle>
					<Select value={ttsStore.selected.lang.value} options={languageOption} setting="lang" />
				</OptionLayout>
			</BasicSetting> */}
			<VoiceSetting className="column gap-48">
				<OptionLayout>
					<SettingSubTitle>성우 선택</SettingSubTitle>
					<Select value={ttsStore.selected.spk.value} options={spkOptions} setting="spk" playing={playing}/>
				</OptionLayout>
				<OptionLayout>
					<SettingSubTitle>말 빠르기 설정</SettingSubTitle>
					<Lange
					    disabled={playing?true : false}
						data-range-id="range"
						type="range"
						min="0"
						max="4"
						defaultValue={2}
						onChange={(e) => ttsStore.speedChange(1.5 - (e.target.value * 1) / 4)}
					/>
					<LangeText className="justify-between">
						<div>느림</div>
						<div>보통</div>
						<div>빠름</div>
					</LangeText>
				</OptionLayout>
			</VoiceSetting>
		</SettingArticle>
	));
};

const SettingArticle = styled.article`
	width: 280px;
`;

/* 언어 선택 기능 향후 추가 시 */
// const BasicSetting = styled.div`
// 	color: white;
// 	padding-top: 1.5rem;
// `;

const VoiceSetting = styled.div`
	padding: 1rem 0 1.5rem 0;
`;

const SettingSubTitle = styled.p`
	font-weight: 700;
	font-size: 16px;
	line-height: 18px;
	letter-spacing: -0.01em;
	color: #4c4c51;
	margin-bottom: 14px;
`;

const OptionLayout = styled.div`
	overflow-x: visible;
`;
const Lange = styled.input`
	min-width: 250px;
	width: 100%;
	disabled : ${(props) => (props.playing ? 'true' : 'false')};
	&[type='range'] {
		-webkit-appearance: none;
		width: 100%;
		height: 6px;
		background: #e0e0e0;
		cursor: pointer;
		border-radius: 10px;
		transition: background 450ms ease-in;
	}

	&[type='range']:focus {
		outline: none;
	}

	&[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 16px;
		height: 16px;
		border: 2px solid #2979ff;
		background: white;
		border-radius: 50%;
		cursor: pointer;
	}
	&[type='range']::-moz-range-thumb {
		-webkit-appearance: none;
		width: 16px;
		height: 16px;
		background: #555555;
		border-radius: 50%;
		cursor: pointer;
	}
`;
const LangeText = styled.div`
	width: 100%;
	font-family: 'Roboto';
	font-size: 14px;
	line-height: 22px;
	margin-top: 0.5rem;
`;
