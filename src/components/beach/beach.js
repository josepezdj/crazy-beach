import { LitElement, html } from 'lit';
import styles from './beach.scss';
import { getLevelByPoints } from '../../data/levels-api';
import { playerService } from '../../services/player-service';
import gradient from '../../assets/images/gradient.png'
import { CRAZY_BEACH } from '../../data/constants';
import './import';

class Beach extends LitElement {
    static get properties() {
        return {
            currentLevel: { type: Object },
            currentPlayer: { type: Object },
        };
    }

    firstUpdated() {
        this.currentPlayer = playerService.getCurrentPlayer();
        this.currentLevel = getLevelByPoints(this.currentPlayer.maxPoints);
    }

    render() {
        return html`
            <section class="beach level-${this.currentLevel?.id}">
                <h2 class="beach__title">${this.currentLevel?.name}</h2>
                <div class="beach__background">
                    <img class="beach__background--gradient" src="${gradient}" alt="">
                    <div class="beach__background--sand-container">
                        <span class="beach__background--sand"></span>
                    </div>
                </div>
                <crazy-beach-boat-component
                    color=${CRAZY_BEACH.MAIN_APP.COLOR.START}
                >
                </crazy-beach-boat-component>
                <crazy-beach-feet-component
                    @cb-feet-click="${this.onFeetClick}"
                ></crazy-beach-feet-component>
            </section>
        `;
    }

    onFeetClick(e) {
        const side = e.detail;
        this.dispatchEvent(new CustomEvent('cb-feet-click'), {
            detail: side,
        });
    }

    static get styles() {
        return styles;
    }
}

customElements.define('crazy-beach-beach-component', Beach);
