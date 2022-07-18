import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import {ReactComponent as ArrowSVG} from "src/assets/Inquiry/arrow.svg";
import {ReactComponent as ReddotSVG} from "src/assets/Inquiry/red_dot.svg";
import {ReactComponent as DownSVG} from "src/assets/down.svg";


export const FormInquiry = () => {
    const [open, setOpen] = useState(false);
    const options = ['음성 언어 기술', '영상 처리 기술']
    return (
        <ContentSection>
            <Header className="justify-between">
                <Headerfirst className="flex center gap-8">
                    <span>문의 분류</span>
                </Headerfirst>
            </Header>
            <BodySection>
                <ContentBox>
                    <TextBox className="flex left gap-8">
                        <Select_Ment>문의 분류선택</Select_Ment>
                        <SelectBox>
                            <SelectDiv className="justify-between">
                                {"text"}
                                <div className='center'>
                                    <DownSVG />
                                </div>
                            </SelectDiv>
                            { open && (
                                <SelectOptionDiv>
                                    <SelectOptionUl>
                                        {options?.map((option, idx) => {
                                            return (
                                                <SelectOptionLi>
                                                </SelectOptionLi>
                                            );
                                        })}
                                    </SelectOptionUl>
                                </SelectOptionDiv>
                            )}
                            <Ment >※ 기술문의는 기술서비스센터(1544-8629) 또는 테크넷(technet.tmaxsoft.com)를 이용해주시기 바랍니다.</Ment>
                            <IconButton onClick={null} className="center">
                                <span className="mr-8">테크넷 바로가기</span>
                                <ArrowSVG style={{marginTop: "1px"}}/>
                            </IconButton>
                        </SelectBox>
                    </TextBox>
                </ContentBox>
            </BodySection>
            <Header className="justify-between">
                <Headerfirst className="flex center gap-8">
                    <span>e-mail 문의</span>
                </Headerfirst>
            </Header>
            <EmailSection>
                <EmailContentBox>
                    <div className="flex left gap-8">
                        <ReddotSVG style={{marginRight: "8px", marginTop:"14px"}}/>
                        <Select_Ment className="center">제품명</Select_Ment>
                        <BoxDiv>
                            <SelectDiv className="justify-between">
                                {"문의하실 제품을 선택하세요"}
                                <div className='center'>
                                    <DownSVG />
                                </div>
                            </SelectDiv>
                            { open && (
                                <SelectOptionDiv>
                                    <SelectOptionUl>
                                        {options?.map((option, idx) => {
                                            return (
                                                <SelectOptionLi>
                                                </SelectOptionLi>
                                            );
                                        })}
                                    </SelectOptionUl>
                                </SelectOptionDiv>
                            )}
                        </BoxDiv>
                    </div>
                    <div className="flex left gap-8" style={{marginTop:"32px", hegiht: "42px"}}>
                        <ReddotSVG style={{marginRight: "8px", marginTop:"14px"}}/>
                        <Select_Ment className="center">문의 제목</Select_Ment>
                        <div style={{width: "986px", height:"42px", marginLeft : "100px"}}>
                            <InputDiv className="justify-between" style={{height:"36.9px"}}>
                                {" "}
                            </InputDiv>
                        </div>
                    </div>
                    <div className="flex left gap-8" style={{marginTop:"32px", hegiht: "400px"}}>
                        <Select_Ment className="center" style={{marginLeft: "20px"}}>내용</Select_Ment>
                        <div style={{width: "986px", height:"400px", marginLeft : "129px"}}>
                            <InputDiv className="justify-between" style={{height:"400px"}}>
                                {" "}
                            </InputDiv>
                        </div>
                    </div>
                </EmailContentBox>
            </EmailSection>
            <Header className="justify-between">
                <Headerfirst className="flex center gap-8">
                    <span>질문자 작성</span>
                </Headerfirst>
            </Header>
            <QuestionSection>
                <PersonalInfo>
                    <div className="flex left gap-8">
                        <ReddotSVG style={{marginRight: "8px", marginTop:"14px"}}/>
                        <Select_Ment className="center">답변 받을 메일 주소</Select_Ment>
                        <div style={{width: "471px", height:"42px", marginLeft : "40px"}}>
                            <InputDiv className="justify-between" style={{height:"36.9px"}}>
                                {" "}
                            </InputDiv>
                        </div>
                        <p className="center">@</p>
                        <div style={{width: "471px", height:"42px"}}>
                            <SelectDiv className="justify-between">
                                {"선택"}
                                <div className='center'>
                                    <DownSVG />
                                </div>
                            </SelectDiv>
                            { open && (
                                <SelectOptionDiv>
                                    <SelectOptionUl>
                                        {options?.map((option, idx) => {
                                            return (
                                                <SelectOptionLi>
                                                </SelectOptionLi>
                                            );
                                        })}
                                    </SelectOptionUl>
                                </SelectOptionDiv>
                            )}
                        </div>
                    </div>
                    <div className="flex left gap-8">
                        <ReddotSVG style={{marginRight: "8px", marginTop:"14px"}}/>
                        <Select_Ment className="center">성명</Select_Ment>
                        <div style={{width: "471px", height:"42px", marginLeft : "129px"}}>
                            <InputDiv className="justify-between" style={{height:"36.9px"}}>
                                {" "}
                            </InputDiv>
                        </div>
                    </div>
                    <div className="flex left gap-8">
                        <ReddotSVG style={{marginRight: "8px", marginTop:"14px"}}/>
                        <Select_Ment className="center">휴대폰</Select_Ment>
                        <div style={{width: "221px", height:"42px", marginLeft : "117px"}}>
                            <SelectDiv className="justify-between">
                                {"선택"}
                                <div className='center'>
                                    <DownSVG />
                                </div>
                            </SelectDiv>
                            { open && (
                                <SelectOptionDiv>
                                    <SelectOptionUl>
                                        {options?.map((option, idx) => {
                                            return (
                                                <SelectOptionLi>
                                                </SelectOptionLi>
                                            );
                                        })}
                                    </SelectOptionUl>
                                </SelectOptionDiv>
                            )}
                        </div>
                        <p className="center" style={{width:"13px"}}>-</p>
                        <div style={{width: "221px", height:"42px"}}>
                            <InputDiv className="justify-between" style={{height:"36.9px"}}>
                                {" "}
                            </InputDiv>
                        </div>
                        <p className="center" style={{width:"13px"}}>-</p>
                        <div style={{width: "221px", height:"42px"}}>
                            <InputDiv className="justify-between" style={{height:"36.9px"}}>
                                {" "}
                            </InputDiv>
                        </div>
                    </div>
                    <div className="flex left gap-8">
                        <Select_Ment className="center" style={{marginLeft: "20px"}}>회사명</Select_Ment>
                        <div style={{width: "471px", height:"42px", marginLeft : "117px"}}>
                            <InputDiv className="justify-between" style={{height:"36.9px"}}>
                                {" "}
                            </InputDiv>
                        </div>
                    </div>
                    <div className="flex left gap-8">
                        <Select_Ment className="center" style={{marginLeft: "20px"}}>부서명</Select_Ment>
                        <div style={{width: "471px", height:"42px", marginLeft : "117px"}}>
                            <InputDiv className="justify-between" style={{height:"36.9px"}}>
                                {" "}
                            </InputDiv>
                        </div>
                    </div>
                    <div className="flex left gap-8">
                        <Select_Ment className="center" style={{marginLeft: "20px"}}>직위/직책</Select_Ment>
                        <div style={{width: "471px", height:"42px", marginLeft : "98px"}}>
                            <SelectDiv className="justify-between">
                                {"직위"}
                                <div className='center'>
                                    <DownSVG />
                                </div>
                            </SelectDiv>
                            { open && (
                                <SelectOptionDiv>
                                    <SelectOptionUl>
                                        {options?.map((option, idx) => {
                                            return (
                                                <SelectOptionLi>
                                                </SelectOptionLi>
                                            );
                                        })}
                                    </SelectOptionUl>
                                </SelectOptionDiv>
                            )}
                        </div>
                        <div style={{width: "471px", height:"42px", marginLeft : "21px"}}>
                            <SelectDiv className="justify-between">
                                {"직책"}
                                <div className='center'>
                                    <DownSVG />
                                </div>
                            </SelectDiv>
                            { open && (
                                <SelectOptionDiv>
                                    <SelectOptionUl>
                                        {options?.map((option, idx) => {
                                            return (
                                                <SelectOptionLi>
                                                </SelectOptionLi>
                                            );
                                        })}
                                    </SelectOptionUl>
                                </SelectOptionDiv>
                            )}
                        </div>
                    </div>
                </PersonalInfo>
            </QuestionSection>

        </ContentSection>
    );
};
const PersonalInfo = styled.div`
    hegint : 292px;
    padding-top: 37px;
    padding-left: 49px;
`
const QuestionSection = styled.div`
    height : 864px;
    
`
const InputDiv = styled.div`
	padding: 8px 14px;
	position: relative;
	background: white;
	color: #4c4c51;
	font-size: 14px;
	line-height: 18px;
	background: #ffffff;
	border: 1px solid #d9d9d9;
	box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016);
	border-radius: 4px;
	margin-bottom: 12px;
	&:focus {
		outline: none;
	}
	option {
		color: black;
	}
`
const BoxDiv = styled.div`
    width: 550px;
    height: 42px;
    margin-left : 118px;
`
const EmailContentBox= styled.div`
    padding-top: 37px;
    padding-left: 49px;
    width: 1203px;
    height: 500px;
`;
const EmailSection = styled.div`
    height: 537px;
    margin-bottom : 75px;
`;
const Select_Ment = styled.span`
    white-space: nowrap;
    width = 100px;
    font-size = 14px;
`;
const Ment = styled.span`
    font-size: 12px;
    line-height: 12px;
`;
const SelectBox = styled.div`
    width: 550px;
    height: 110px;
    margin-left : 100px;
`;
const ContentBox = styled.div`
    width: 820px;
    height: 110px;
`;
const SelectDiv = styled.div`
	padding: 8px 14px;
	position: relative;
	cursor: pointer;
	background: white;
	color: #4c4c51;
	font-size: 14px;
	line-height: 18px;
	background: #ffffff;
	border: 1px solid #d9d9d9;
	box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016);
	border-radius: 4px;
	margin-bottom: 12px;
	&:focus {
		outline: none;
	}
	option {
		color: black;
	}
	svg {
		transform: ${(props) => (props.open ? `rotate(-180deg)` : 'none')};
	}
`;
const SelectOptionDiv = styled.div`
	position: relative;
	top: 5px;
`;
const SelectOptionUl = styled.ul`
	position: absolute;
	z-index: 1;
	width: 100%;
	border: 1px solid #d9d9d9;
`;

const SelectOptionLi = styled.li`
	background: ${(props) => (props.current ? '#EFF5FF' : 'white')};
	padding: 8px 14px;
	font-size: 0.85rem;
	cursor: pointer;
	&:hover {
		background: #e9e9e9;
	}
	&:first-child {
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
	}
	&:last-child {
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
	}
`;

const TextBox = styled.div`
    font-weight: 500;
	
	color: black;
	padding-top: 37px;
	padding-left: 49px;
	width: 850px;
`
const Headerfirst = styled.div`
	font-weight: 700;
	font-size: 26px;
	line-height: 20px;
	color: black;
	padding-top: 15px;
`;
const ContentSection = styled.section`
	border-radius: 4px;
	width: 1242px;
	background-color: white;
	margin: auto;
    margin-top: 61px;
    line-height: 12px;
    font-size: 14px;
    height: 2040px;
`;

const Header = styled.div`
	height: 90px;
	padding: 0 40px;
	border-bottom:  solid 3px black;
`;

const BodySection = styled.div`
	height: 210px;
`;

const IconButton = styled.button`
	width: 123px;
	height: 32px;
	margin-top: 12px;
	border: 1px solid #2979FF;
	border-radius: 4px;
	font-weight: 700;
	font-size: 12px;
	line-height: 17px;
	background: #ffffff;
	text-align: center;
	color: #2979FF;
	cursor: pointer;
`;

const FunctionDiv = styled.div``;


