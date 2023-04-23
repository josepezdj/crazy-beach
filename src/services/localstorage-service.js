export const localstorageService = (() => {
	const services = {};
	services.createNewEmptyState = () => {
		return {
			currentPlayer: '',
			players: [],
		};
	};
	services.saveStateToLocalStorage = (state) => {
		window.localStorage.setItem('state', JSON.stringify(state));
	};
	services.getStateFromLocalStorage = () => {
		const state = window.localStorage.getItem('state');
		if (state !== undefined && state !== null) return JSON.parse(state);
		return -1;
	};
	services.findPlayerInStatePlayers = (name) => {
		let state = window.localStorage.getItem('state');
		if (state !== undefined && state !== null) {
			state = JSON.parse(state);
			const foundUser = state.players.find(
				(player) => player.name === name
			);
			if (foundUser) return foundUser;
		}
		return -1;
	};
	return services;
})();
