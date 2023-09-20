import { Agent, View } from "../Agent.mjs";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export class HeadingView extends View {
    #level

    constructor({ level }: { level: HeadingLevel }) {
        super()
        this.#level = level
        this.element = document.createElement(`h${level}`)
    }

    get level() { return this.#level }

    override accessor element: HTMLHeadingElement
}


export class Heading extends Agent {
    override accessor view: HeadingView

    constructor({ text, level }: { text: string, level: HeadingLevel }) {
        super({})
        this.view = new HeadingView({ level })
        this.text = text
    }

    get level(): HeadingLevel { return this.view.level }

    get text() { return this.view.element.textContent ?? '' }
    set text(text: string) { this.view.element.textContent = text }
}
