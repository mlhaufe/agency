/*!
 * @license
 * Copyright (C) 2023 Michael L Haufe
 * SPDX-License-Identifier: AGPL-3.0-only
 * @see <https://spdx.org/licenses/AGPL-3.0-only.html>
 */

import { fromEvent } from 'rxjs';
import { Agent, View } from '../Agent.mjs';

export class ButtonView extends View {
    override accessor element = document.createElement('button')

    clicks = fromEvent(this.element, 'click');

    get text() { return this.element.textContent ?? ''; }
    set text(text: string) { this.element.textContent = text; }
}

export class Button extends Agent {
    override accessor view: ButtonView = new ButtonView()

    constructor(options: { text: string }) {
        super(options);
        this.text = options.text;
    }

    get text() { return this.view.text; }
    set text(text: string) { this.view.text = text; }
}