import './app1.css'
import Vue from "vue";


// 其他都 c
const init = (el) => {
    new Vue({
        el: el,
        data: {n: parseFloat(localStorage.getItem('n'))},
        methods: {
            add() {
                this.n += 1
            },
            minus() {
                this.n -= 1
            },
            mul() {
                this.n *= 2
            },
            divide() {
                this.n /= 2
            },
        },
        watch: {
            n() {
                localStorage.setItem('n', this.n)
            }
        },
        template: `
          <section id="app1">
          <div class="output">
            <span id="number">{{ n }}</span>
          </div>
          <div class="actions">
            <button @click="add">+1</button>
            <button @click="minus">-1</button>
            <button @click="mul">*2</button>
            <button @click="divide">÷2</button>
          </div>
          </section>`
    })
}

export default init


/* 原代码

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