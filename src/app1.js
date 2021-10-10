import './app1.css'
import $ from 'jquery'
import Model from "./base/Model.js"
import View from "./base/view";

const eventBus = $({})
// console.log(eventBus.on);
// console.log(eventBus.trigger);
// 视图相关 都放到 m

const m = new Model({
    data: {
        n: parseInt(localStorage.getItem('n'))
    },
    update(data) {
        Object.assign(m.data, data)
        eventBus.trigger('m:updated')
        localStorage.setItem('n', m.data.n)
    }
})

console.dir(m);

// 数据相关 都放到 v
// const v = new View({
//     el: null,
//     html: `
//       <div>
//             <div class="output">
//                 <span id="number">{{n}}</span>
//             </div>
//             <div class="actions">
//                 <button id="add1">+1</button>
//                 <button id="minus1">-1</button>
//                 <button id="mul2">*2</button>
//                 <button id="divide2">÷2</button>
//             </div>
//       </div>`,
//     render(n) {
//         if (v.el.children.length !== 0) {
//             v.el.empty()
//         }
//         $(v.html.replace('{{n}}', n))
//             .appendTo(v.el)
//     }
// })

// 其他都 c
const c = {
    v: null,
    initV() {
        this.v = new View({
            el: c.container,
            html: `
              <div>
                    <div class="output">
                        <span id="number">{{n}}</span>
                    </div>
                    <div class="actions">
                        <button id="add1">+1</button>
                        <button id="minus1">-1</button>
                        <button id="mul2">*2</button>
                        <button id="divide2">÷2</button>
                    </div>
              </div>`,
            render(n) {
                if (c.v.el.children.length !== 0) {
                    c.v.el.empty()
                }
                $(c.v.html.replace('{{n}}', n))
                    .appendTo(c.v.el)
            }
        })
    },
    init(container) {
        c.container = container
        c.initV()
        c.autoBindEvents()
        eventBus.on('m:updated', () => {
            c.v.render(m.data.n)
        })
        c.v.render(m.data.n) // view = render(data)
    },
    events: {
        'click #add1': 'add',
        'click #minus1': 'minus',
        'click #mul2': 'mul',
        'click #divide2': 'divide'
    },
    add() {
        m.update({n: m.data.n + 1})
    },
    minus() {
        m.update({n: m.data.n - 1})
    },
    mul() {
        m.update({n: m.data.n * 2})
    },
    divide() {
        m.update({n: m.data.n / 2})
    },
    autoBindEvents() {
        for (let key in c.events) {
            const value = c[c.events[key]]
            const spaceIndex = key.indexOf(' ')
            const part1 = key.slice(0, spaceIndex)
            const part2 = key.slice(spaceIndex + 1)
            // console.log(part1, part2, value);
            c.v.el.on(part1, part2, value)
        }
    },
}


export default c


/* 原代码 1

import './app1.css'
import $ from 'jquery'

const $button1 = $('#add1')
const $button2 = $('#minus1')
const $button3 = $('#mul2')
const $button4 = $('#divide2')
const $number = $('#number')
const n = localStorage.getItem('n')
$number.text(n || 100)

$button1.on('click', () => {
    let n = parseInt($number.text())
    n += 1
    localStorage.setItem('n', n)
    $number.text(n)
})
$button2.on('click', () => {
    let n = parseInt($number.text())
    n -= 1
    localStorage.setItem('n', n)
    $number.text(n)
})
$button3.on('click', () => {
    let n = parseInt($number.text())
    n *= 2
    localStorage.setItem('n', n)
    $number.text(n)
})
$button4.on('click', () => {
    let n = parseInt($number.text())
    n /= 2
    localStorage.setItem('n', n)
    $number.text(n)
})


 */