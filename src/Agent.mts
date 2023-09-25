/*!
 * @license
 * Copyright (C) 2023 Michael L Haufe
 * SPDX-License-Identifier: AGPL-3.0-only
 * @see <https://spdx.org/licenses/AGPL-3.0-only.html>
 */

export abstract class Abstraction { }

export abstract class View {
    abstract accessor element: HTMLElement;
}

export abstract class Agent {
    #children: Agent[] = [];

    accessor parent: Agent | undefined;
    accessor abstraction: Abstraction | undefined;
    accessor view: View | undefined;

    constructor(options: object = {}, children: Agent[] = []) {
        children.forEach(child => this.addChild(child));
    }

    get children(): readonly Agent[] { return this.#children; }

    addChild(child: Agent): void {
        if (this.children.includes(child))
            throw new Error('Child already exists');
        if (child.parent)
            throw new Error('Child already has a parent');
        child.parent = this;
        this.#children.push(child);
        if (this.view && child.view)
            this.view.element.appendChild(child.view.element);
    }

    removeChild(child: Agent): void {
        if (!this.#children.includes(child))
            throw new Error('Child does not exist');
        child.parent = undefined;
        this.#children = this.#children.filter(c => c !== child);
        if (this.view && child.view)
            this.view.element.removeChild(child.view.element);
    }
}