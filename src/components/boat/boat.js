import { LitElement, html } from 'lit';
import styles from './boat.scss';
import { CRAZY_BEACH } from '../../data/constants';
import boat from '../../assets/images/boat.png';
import waves from '../../assets/images/waves.png';
import './import';

class Boat extends LitElement {
    static get properties() {
        return {
            color: { type: String },
        };
    }

    constructor() {
        super();
        this.color = CRAZY_BEACH.MAIN_APP.COLOR.STOP;
    }

    firstUpdated() {
    }

    render() {
        return html`
            <div class="boat" id="boat">
                <div class="boat__image-container">
                    <figure class="boat__figure boat__figure--${this.color}">
                        <img class="boat__figure--img" src="${boat}" alt="dibujo de un barquito velero">
                        <span class="boat__flag boat__flag--green" alt=""></span>
                        <span class="boat__flag boat__flag--red" alt=""></span>
                    </figure>
                    <img class="boat__bg" src="${waves}" alt="dubujo de unas olas" >
                </div>
            </div>
        `;
    }

    getCurrentLevel() {
        return getLevelByPoints(this.currentPlayer.maxPoints);
    }

    static get styles() {
        return styles;
    }
}

customElements.define('crazy-beach-boat-component', Boat);