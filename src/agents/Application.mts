/*!
 * @license
 * Copyright (C) 2023 Michael L Haufe
 * SPDX-License-Identifier: AGPL-3.0-only
 * @see <https://spdx.org/licenses/AGPL-3.0-only.html>
 */

import { fromEvent } from 'rxjs';
import { Agent, View } from '../index.mjs';

export class ApplicationView extends View {
    override accessor element = document.body

    get title() { return document.title; }
    set title(value: string) { document.title = value; }

    ready = fromEvent(document, 'DOMContentLoaded');
}

export class Application extends Agent {
    override accessor view = new ApplicationView()

    constructor(options: { title: string }, children?: Agent[]) {
        super(options, children);
        this.title = options.title;
        this.view.ready.subscribe(() => this.start());
    }

    get title() { return this.view.title; }
    set title(value: string) { this.view.title = value; }

    start() { }
}