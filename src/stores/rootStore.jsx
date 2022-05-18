import { optionStore } from './optionStore';
import { ttsStore } from './ttsStore';
import { menuStore } from './menuStore';

const rootStore = () => ({ optionStore, ttsStore, menuStore });

export default rootStore;
