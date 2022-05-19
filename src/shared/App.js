import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from '../styles/GlobalStyle';
import * as Pages from 'src/pages';
import styled from 'styled-components';
import ScrollToTop from 'src/hooks/useScroll';

function App() {
	return (
		<FontDefault>
			<BrowserRouter>
				<GlobalStyles />
				<ScrollToTop />
				<Routes>
					<Route path="/" element={<Pages.Home />} />
					<Route path="/stt" element={<Pages.STTDemo />} />
					<Route path="/tts" element={<Pages.TTSDemo />} />
					<Route path="/videoCaption" element={<Pages.VideoCaption />} />
				</Routes>
			</BrowserRouter>
		</FontDefault>
	);
}

export default App;

const FontDefault = styled.div`
	font-family: 'Roboto', 'Noto Sans kr';
`;
