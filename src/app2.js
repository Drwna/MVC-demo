import './app2.css'
import $ from 'jquery'
import Model from "./base/Model.js"

const eventBus = $({})
const localKey = 'app2.index'

const m = new Model({
    localKey: 'app2.index',
    data: {
        index: parseInt(localStorage.getItem(localKey)) || 0
    },
    update(data) {
        Object.assign(m.data, data)
        eventBus.trigger('m:updated')
        localStorage.setItem('index', m.data.index)
    }
})

// const v = new View({
//     el: null,
//     html: `
//      <div>
//           <ol class="tab-bar">
//               <li class="${index === 0 ? 'selected' : ''}" data-index = "0"><span>1111111</span></li>
//               <li class="${index === 1 ? 'selected' : ''}" data-index = "1"><span>2222222</span></li>
//           </ol>
//           <ul class="tab-content">
//               <li class="${index === 0 ? 'active' : ''}">content111</li>
//               <li class="${index === 1 ? 'active' : ''}">content222</li>
//           </ul>
//       </div>
//     `,
//     render(index) {
//         if (v.el.children.length !== 0) {
//             v.el.empty()
//         }
//         $(v.html(index)).appendTo(v.el)
//     }
// })

const v = {
    el: null,
    html: (index) => {
        return `
        <div>
            <ol class="tab-bar">
                <li class="${index === 0 ? 'selected' : ''}" data-index = "0"><span>1111111</span></li>
                <li class="${index === 1 ? 'selected' : ''}" data-index = "1"><span>2222222</span></li>
            </ol>
            <ul class="tab-content">
                <li class="${index === 0 ? 'active' : ''}">content111</li>
                <li class="${index === 1 ? 'active' : ''}">content222</li>
            </ul>
        </div>`
    },
    init(el) {
        v.el = $(el)
    },
    render(index) {
        if (v.el.children.length !== 0) {
            v.el.empty()
        }
        $(v.html(index)).appendTo(v.el)
    }
}

const c = {
    init(container) {
        v.init(container)
        v.render(m.data.index) // view = render(data)
        c.autoBindEvents()
        eventBus.on('m:updated', () => {
            v.render(m.data.index)
        })
    },
    events: {
        'click .tab-bar li': 'x'
    },
    x(e) {
        const index = parseInt(e.currentTarget.dataset.index)
        m.update({index: index})
    },
    autoBindEvents() {
        // 表驱动编程
        for (let key in c.events) {
            const value = c[c.events[key]]
            const spaceIndex = key.indexOf(' ')
            const part1 = key.slice(0, spaceIndex)
            const part2 = key.slice(spaceIndex + 1)
            // console.log(part1, part2, value);
            v.el.on(part1, part2, value)
        }
    },
}

export default c

/* 原代码 2

import './app2.css'
import $ from 'jquery'

const $tabBar = $('#app2 .tab-bar')
const $tabContent = $('#app2 .tab-content')

$tabBar.on('click', 'li', (e) => {
    const $li = $(e.currentTarget)
    $li.addClass('selected')
        .siblings().removeClass('selected')
    const index = $li.index()
    $tabContent.children()
        .eq(index).addClass('active')
        .siblings().removeClass('active')
})

$tabBar.children().eq(0).trigger('click')


 */