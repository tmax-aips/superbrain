import { observable } from 'mobx';

const menuStore = observable({
	currentId: 0,

	changeMenu({ id }) {
		this.currentId = id;
	},
});

export { menuStore };
