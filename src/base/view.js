import $ from 'jquery'
import EventBus from "./EventBus";


class View extends EventBus{
    // constructor({el, html, render, data, eventBus, events}) {
    constructor(options) {
        super()
        /*
        this.html = html
        this.render = render
        this.data = data
        this.eventBus = eventBus
        this.events = events
         */
        Object.assign(this, options)
        this.el = $(this.el)
        this.render(this.data) // view = render(data)
        this.autoBindEvents()
        this.eventBus.on('m:updated', () => {
            this.render(this.data)
        })
    }

    autoBindEvents() {
        // 表驱动编程
        for (let key in this.events) {
            const value = this[this.events[key]]
            const spaceIndex = key.indexOf(' ')
            const part1 = key.slice(0, spaceIndex)
            const part2 = key.slice(spaceIndex + 1)
            // console.log(part1, part2, value);
            this.el.on(part1, part2, value)
        }
    }
}


export default View
