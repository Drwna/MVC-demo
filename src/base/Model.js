import EventBus from "./EventBus";

class Model extends EventBus{
    constructor(options) {
        super()
        const keys = ['data', 'update', 'create', 'delete', 'get']
        keys.forEach((key) => {
            if (key in options) {
                this[key] = options[key]
            }
        })
        // this.data = options.data
        // this.create = options.create
        // this.delete = options.delete
        // this.update = options.update
        // this.get = options.get
    }

    create() {
        //console?.error?.('还没有实现 create') // 可选链
        console && console.error && console.error('还没有实现 create')
    }

    delete() {
        // console?.error?.('还没有实现 delete')
        console && console.error && console.error('还没有实现 delete')

    }

    update() {
        // console?.error?.('还没有实现 updata')
        console && console.error && console.error('还没有实现 update')

    }

    get() {
        // console?.error?.('还没有实现 get')
        console && console.error && console.error('还没有实现 get')

    }
}

export default Model