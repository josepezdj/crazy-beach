import { localstorageService } from './localstorage-service';
import { generateRandomId } from '../utils/generate-random-id';

export const playerService = (() => {
	const services = {};
	services.createNewPlayer = (name) => {
		return {
			id: generateRandomId(),
			name,
			maxPoints: 0,
			currentPoints: 0,
			avatar: '',
			collectedObjects: [],
		};
	};
	services.setCurrentPlayer = (player) => {
		let state = localstorageService.getStateFromLocalStorage();
		if (state !== -1) {
			state.currentPlayer = player;
			localstorageService.saveStateToLocalStorage(state);
		}
	};
	services.getCurrentPlayer = () => {
		const state = localstorageService.getStateFromLocalStorage();
		if (state !== -1 && state.currentPlayer !== '')
			return state.currentPlayer;
		return -1;
	};
	services.getAllPlayers = () => {
		const state = localstorageService.getStateFromLocalStorage();
		if (state !== -1 && state.players.length > 0) {
			return state.players.sort((a, b) => b.maxPoints - a.maxPoints);
		}
		return -1;
	};
	services.updateCurrentPlayer = (prop, value) => {
		let state = localstorageService.getStateFromLocalStorage();
		if (state !== -1 && state.currentPlayer !== '') {
			// Update currentPlayer
			state.currentPlayer[prop] = value;
			// Update player in players list
			const foundPlayer = localstorageService.findPlayerInStatePlayers(
				state.currentPlayer.name
			);
			foundPlayer[prop] = value;
			const playerIndex = state.players
				.map((player) => player.name)
				.indexOf(foundPlayer.name);
			state.players.splice(playerIndex, 1, foundPlayer);
			// Save new state
			localstorageService.saveStateToLocalStorage(state);
			// Return player modified
			return state.currentPlayer;
		}
		return -1;
	};
	services.deleteCurrentPlayer = () => {
		let state = localstorageService.getStateFromLocalStorage();
		if (state !== -1 && state.currentPlayer !== '') {
			// Delete player from players list
			state = state.players.filter(
				(player) => player.name !== state.currentPlayer.name
			);
			// Unset currentPlayer
			state.curentPlayer = '';
			// Save state
			localstorageService.saveStateToLocalStorage(state);
		}
	};

	return services;
})();
