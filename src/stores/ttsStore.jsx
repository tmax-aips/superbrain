import { observable } from 'mobx';

// tts setting value
const ttsStore = observable({
	selected: {
		lang: { key: 'ko', value: 'Korean (South Korea)' },
		spk: { key: 'lmy', value: '여자(비상업용)' },
		speed: 1,
		uid: 'test',
	},

	langChange(lang) {
		this.selected.lang = lang;
	},

	spkChange(spk) {
		this.selected.spk = spk;
	},

	speedChange(spd) {
		this.selected.speed = spd;
	},
});

export { ttsStore };
