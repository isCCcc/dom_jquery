window.$ = window.jQuery = function (selector) {
    let elements
    if (typeof selector === 'string') {
        elements = document.querySelectorAll(selector)
    } else if (selector instanceof Array) {
        elements = selector
    }

    // 指定jQuery的prototype
    const api = Object.create(jQuery.prototype)
    Object.assign(api, {
        elements: elements,
        oldApi: selector.oldApi,
    })
    // 返回一个可以操作 elements 的对象的 api
    return api
}

jQuery.prototype = {
    constructor: jQuery,
    // 闭包，访问外界变量 elements
    addClass(className) {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].classList.add(className)
        }
        // 链式操作，返回对象本身
        return this
    },
    // 2.查找 #xxx 里的 #yyy 元素
    find(selector) {
        let array = []
        for (let i = 0; i < this.elements.length; i++) {
            const el = Array.from(this.elements[i].querySelectorAll(selector))
            array = array.concat(el)
        }
        array.oldApi = this   // 将现阶段的 this 存储下来(旧api)
        return jQuery(array)  // 返回新的 api
    },
    // 3.回退到上一个操作的 api
    end() {
        return this.oldApi
    },
    // 4.遍历元素
    each(fn) {
        for (let i = 0; i < this.elements.length; i++) {
            fn.call(null, this.elements[i], i)
        }
        return this
    },
    // 5.获取父节点
    parent() {
        const array = []
        this.each((node) => {
            if (array.indexOf(node.parentNode) === -1) {
                array.push(node.parentNode)
            }
        })
        return jQuery(array);
    },
    // 6.获取子节点
    children() {
        const array = []
        this.each((node) => {
            array.push(...node.children)
        })
        return jQuery(array);
    },
    // 7.获取兄弟节点
    siblings() {
        const array = []
        this.each((node) => {
            array.push(...Array.from(node.parentNode.children).filter(n => n != node))
        })
        return jQuery(array);
    },
    // 8.获取上一个节点
    prev() {
        const array = []
        this.each((node) => {
            let flag = node.previousSibling
            while (flag && flag.nodeType === 3) {
                flag = flag.previousSibling
            }
            array.push(flag)
        })
        return jQuery(array)
    },
    // 9.获取下一个节点
    next() {
        const array = []
        this.each((node) => {
            let flag = node.nextSibling
            while (flag && flag.nodeType === 3) {
                flag = flag.nextSibling
            }
            array.push(flag)
        })
        return jQuery(array)
    }
}