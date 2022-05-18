import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { throttle } from 'lodash';
import { ReactComponent as Speaker } from 'src/assets/menuBar/speaker.svg';
import { ReactComponent as Language } from 'src/assets/menuBar/language.svg';
import { useObserver } from 'mobx-react';
import { useLocation, useNavigate } from 'react-router-dom';
import useStore from 'src/stores/rootStore';

const MenuList = [
	{
		title: '음성언어처리',
		page: [
			{ title: 'STT', link: '/stt' },
			{ title: '영상 자막 생성', link: '/videoCaption' },
			{ title: 'TTS', link: '/tts' },
		],
		svg: <Speaker />,
	},
	{
		title: '자연어처리',
		svg: <Language />,
		page: [{ title: '감성 분석' }, { title: '개체명 인식' }, { title: '문서 분류' }],
	},
];

export const MenuBar = () => {
	const [isVisible, setIsVisible] = useState(true);
	const { pathname } = useLocation();
	const { menuStore } = useStore();
	const navigate = useNavigate();

	const onChangeLink = ({ link }) => {
		navigate(`${link}`);
	};

	const scrollEvent = throttle((e) => {
		let scrollLocation = document.documentElement.scrollTop;

		if (scrollLocation > 228 && e.deltaY > 0 && isVisible) {
			setIsVisible(false);
		} else if (e.deltaY < 0 && !isVisible) {
			setIsVisible(true);
		} else {
			return;
		}
	}, 300);

	useEffect(() => {
		window.addEventListener('mousewheel', scrollEvent);

		return () => window.removeEventListener('mousewheel', scrollEvent);
	}, [isVisible]);

	return useObserver(() => (
		<VisibleWrapper isVisible={isVisible}>
			<MenuSection className="flex">
				{MenuList.map((menu, idx) => {
					return (
						<div key={menu.title}>
							<input
								key={menu.title}
								name="menu"
								type="radio"
								id={menu.title}
								defaultChecked={idx === menuStore.currentId}
								onClick={() => menuStore.changeMenu({ id: idx })}
							/>
							<label htmlFor={menu.title} className="flex center">
								<Title checked={idx === menuStore.currentId} className="center gap-8">
									{menu.svg}
									{menu.title}
								</Title>
							</label>
						</div>
					);
				})}
			</MenuSection>
			<MenuPageSection>
				<MenuPage className="flex gap-8">
					{MenuList[menuStore.currentId]?.page.map((page) => {
						return (
							<PageTitle
								key={page.title}
								className="center"
								current={pathname === page.link}
								onClick={() => {
									if (page.link) onChangeLink({ link: page.link });
									else alert('준비 중입니다.');
								}}
							>
								{page.title}
							</PageTitle>
						);
					})}
				</MenuPage>
			</MenuPageSection>
		</VisibleWrapper>
	));
};

const VisibleWrapper = styled.div`
	transition-duration: 0.5s;
	height: ${(props) => (props.isVisible ? `108px` : `0px`)};
	overflow-y: hidden;
`;

const MenuSection = styled.section`
	max-width: 1600px;
	height: 68px;
	margin: 0 auto;
	padding: 0 5rem;
	display: flex;
	align-items: center;
	font-weight: 700;
	font-size: 16px;
	line-height: 20px;
	text-align: center;
	gap: 50px;
	input {
		display: none;
		&:checked + label {
			transition: all 0.2s;
			svg {
				fill: #2979ff;
			}
			color: #2979ff;
		}
	}
	label {
		height: 68px;
		cursor: pointer;
	}
`;

const Title = styled.div`
	height: 68px;
	transition: all 0.1s;
	border-bottom: ${(props) => (props.checked ? '4px solid #2979ff' : '4px solid #fff')};
`;

const MenuPageSection = styled.section`
	border-top: 1px solid #e6e6e6;
	border-bottom: 1px solid #e6e6e6;
`;
const MenuPage = styled.div`
	max-width: 1600px;
	height: 40px;
	margin: 0 auto;
	padding: 0 5rem;
	font-size: 14px;
	line-height: 20px;
`;

const PageTitle = styled.div`
	height: 100%;
	margin-right: 50px;
	color: ${(props) => (props.current ? '#0C0E1C' : '#8c8c8c')};
	font-weight: ${(props) => (props.current ? 'bold' : 'normal')};
	cursor: pointer;
	&:hover {
		transition: all 0.2s;
		text-decoration: underline;
		text-underline-position: under;
		/* background: #f5f5ff; */
	}
`;
