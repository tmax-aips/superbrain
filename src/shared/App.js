import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from '../styles/GlobalStyle';
import * as Pages from 'src/pages';
import styled from 'styled-components';
import ScrollToTop from 'src/hooks/useScroll';
import {BrowserView, MobileView} from 'react-device-detect'
function App() {
	return (
	<div>
	    <BrowserView>
            <FontDefault>
                <BrowserRouter>
                    <GlobalStyles />
                    <ScrollToTop />
                    <Routes>
                        <Route path="/" element={<Pages.Home />} />
                        <Route path="/stt" element={<Pages.STTDemo />} />
                        <Route path="/tts" element={<Pages.TTSDemo />} />
                        <Route path="/videoCaption" element={<Pages.VideoCaption />} />
                        <Route path="/inquiry" element={<Pages.Inquiry/>} />
                    </Routes>
                </BrowserRouter>
            </FontDefault>
        </BrowserView>
        <MobileView>
                <Pages.Mobile />
        </MobileView>
    </div>
	);
}

export default App;

const FontDefault = styled.div`
	font-family: 'Roboto', 'Noto Sans kr';
`;
