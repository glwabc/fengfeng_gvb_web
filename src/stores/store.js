import {defineStore} from 'pinia'
import {message} from 'ant-design-vue';

export const useStore = defineStore('gvb', {
    state: () => {
        return {
            theme: true,  // true 白天  false 黑夜
            userInfo: {
                token: "",
                nick_name: '',
                role: 0,
                user_id: 0,
                avatar: '',
                exp: 1677902977.84318
            },
            tabList: [],
            bread_crumb_list: []
        }
    },
    actions: {
        // 切换主题
        setTheme() {
            this.theme = !this.theme
            if (this.theme) {
                document.documentElement.classList.remove("dark")
                localStorage.setItem("theme", "light")
            } else {
                document.documentElement.classList.add("dark")
                localStorage.setItem("theme", "dark")
            }
        },

        // 加载主题
        loadTheme() {
            const theme = localStorage.getItem("theme")
            if (theme === "dark") {
                this.theme = false
                document.documentElement.classList.add("dark")
                return
            }
            this.theme = true

        },

        // 修改userInfo
        setUserInfo(info) {
            this.$patch({
                userInfo: info
            })
            // 持久化
            localStorage.setItem("userInfo", JSON.stringify(info))
        },
        loadUserInfo() {
            let info = localStorage.getItem("userInfo")
            if (info === null) {
                return
            }
            // 先json解析
            let userInfo = JSON.parse(info)
            let exp = userInfo.exp
            let nowTime = new Date().getTime()
            if (((exp * 1000) - nowTime) < 0) {
                // 过期了
                message.warn("当前登录已失效")
                return;
            }
            this.setUserInfo(userInfo)
        },

        // 添加tab
        addTab(tab) {
            if (this.tabList.findIndex((item) => item.name === tab.name) === -1) {
                this.tabList.push({name: tab.name, title: tab.title, params: tab.params, query: tab.query})
            }

        },
        // tabs的持久化存储
        saveTabs() {
            localStorage.setItem("tabs", JSON.stringify(this.tabList))
        },
        // 加载组件
        loadTabs() {
            let tabs = localStorage.getItem("tabs")
            if (tabs === null) {
                this.tabList = [{title: "首页", name: "home"}]
                return
            }
            this.tabList = JSON.parse(tabs)
        },
        // 移除tab
        removeTab(tab) {
            let index = this.tabList.findIndex((item) => item.name === tab.name)
            this.tabList.splice(index, 1)
            return index
        },
        removeIndexTab(index) {
            this.tabList.splice(index, 1)
        },
        // 移除全部tab
        removeTabAll() {
            this.tabList = [{title: "首页", name: "home"}]
        },

        setCrumb(list){
            this.bread_crumb_list = list
        }
    }
})
