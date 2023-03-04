import {defineStore} from 'pinia'
import {message} from 'ant-design-vue';

export const useStore = defineStore('gvb', {
    state: () => {
        return {
            theme: true,
            userInfo: {
                token: "",
                nick_name: '',
                role: 0,
                user_id: 0,
                avatar: '',
                exp: 1677902977.84318
            }
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
            if (((exp * 1000) - nowTime) < 0){
                // 过期了
                message.warn("当前登录已失效")
                return;
            }
            this.setUserInfo(userInfo)
        }
    }
})
