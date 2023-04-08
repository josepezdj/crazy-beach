import { LitElement, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './foot.scss';
import left from '../../../assets/images/left.png';
import right from '../../../assets/images/right.png';

class Foot extends LitElement {
    static get properties() {
        return {
            side: { type: String },
            isDisabled: { type: Boolean },
        };
    }

    constructor() {
        super();
        this.isDisabled = false;
        this.firstTime = true;
        this.leftSoundPath = '../../../assets/sounds/step1.mp3';
        this.rightSoundPath = '../../../assets/sounds/step2.mp3';
    }

    render() {
        return html`
            <div class="foot">
                <button
                    class="foot__button"
                    type="button"
                    ?disabled="${ifDefined(this.isDisabled)}"
                    @click="${this.onButtonClick}"
                >
                    <figure class="foot__figure">
                        <img
                            class="foot__figure--img"
                            src="${this.side === 'left' ? left : right}"
                            alt="dibujo de un pie"
                        />
                    </figure>
                    <audio
                        style="display: none;"
                        src="${this.side === 'left'
                            ? this.leftSoundPath
                            : this.rightSoundPath}"
                        type="audio/mp3"
                    ></audio>
                </button>
            </div>
        `;
    }

    onButtonClick() {
        if (this.firstTime) {
            this.soundElement = this.shadowRoot.querySelector('audio');
            this.soundElement.play();
            this.soundElement.pause();
        }
        this.soundElement.play();

        this.dispatchEvent(
            new CustomEvent('cb-foot-click', {
                detail: this.side,
            })
        );
    }

    static get styles() {
        return styles;
    }
}

customElements.define('crazy-beach-foot-component', Foot);
