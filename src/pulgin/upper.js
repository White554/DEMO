// 自定义插件
let upperPlugin = {}

// 安装触发事件
upperPlugin.install = function(Vue, options) {
    Vue.directive(options.name, (element, parmas) => {
        element.innerHTML = element.innerHTML.toUpperCase()
    })
}

// 向外暴露一个对象
export default upperPlugin