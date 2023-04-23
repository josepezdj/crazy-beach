export const CRAZY_BEACH = {
	MAIN_APP: {
		TITLE1: 'Crazy',
		TITLE2: 'Beach',
		INSTRUCTIONS: ' Instrucciones',
		RANKING: {
			TITLE: 'Ranking',
			COL_NAME: 'Nombre',
			COL_POINTS: 'Puntos',
			COL_MAX_POINTS: 'Max. puntos',
		},
		ACCOUNT: 'Cuenta',
		ABOUT: 'Sobre Crazy Beach',
	},
	LOGIN: {
		TITLE: 'Crear jugador',
		ENTER_BTN_TEXT: 'Jugar',
		INPUT_LEGEND: 'Nombre',
		INPUT_MAX_LENGTH: 8,
		INPUT_MIN_LENGTH: 4,
		ERR_MESSAGES: {
			TOO_SHORT_NAME: 'El nombre debe tener al menos 4 carateres',
			INVALID_CHARACTERS:
                'Sólo se permite el uso de números y letras (mayúsculas y minúsculas)',
		},
		WARN_MESSAGES: {
			NAME_ALREADY_REGISTERED: 'Este jugador ya existe',
			GAME_CONTINUE: 'Continuar partida?',
		},
	},
	GAME: {
		BTN_START: {
			START: 'Empezar',
			STOP: 'Parar',
			RESTART: 'Reanudar',
		},
		FLASH_MESSAGES: {
			COUNTDOWN: {
				THREE: '3',
				TWO: '2',
				ONE: '1',
			},
			RANKING: {
				THREE: '¡Número 3 del Ranking!',
				TWO: '¡Número 2 del Ranking!',
				ONE: '¡¡Eres el número 1!!',
			},
			LEVEL_UP: 'NIVEL ##LEVEL##!!',
			GAME_OVER: 'Juego terminado',
		},
	},
	ABOUT: {
		DESCRIPTION: 'Descripción',
		VERSION: 'Versión',
		AUTHOR: 'Autor',
		LICENSE: 'Licencia',
	},
	ACCOUNT: {
		ID: 'Número de jugador',
		STATS: 'Estadísticas',
	},
	INSTRUCTIONS: {
		P1: 'El juego consiste en andar mientras hay <strong><i>"bandera verde"</i></strong>',
		P2: 'Para ello, debes pulsar los pies alternativamente, y cada paso summará 1 punto',
		P3: 'Si pulsas el mismo pie consecutivamente, pierdes 1 punto',
		P4: 'Si pulsas cualquier pie mientras hay bandera roja, el juego termina',
		P5: 'Dale al botón <strong><i>"Empezar"</i></strong> y consigue tantos puntos como puedas!',
	},
};

//levelup / gameover / ranking3 / ranking2 / ranking1 / countdown
