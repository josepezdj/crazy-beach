import { LitElement, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './foot.scss';
import left from '../../assets/images/left.png';
import right from '../../assets/images/right.png';

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
                </button>
            </div>
        `;
    }

    onButtonClick() {
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
