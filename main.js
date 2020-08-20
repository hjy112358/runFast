import Vue from 'vue'
import App from './App'

import judgeCards from '@/util/judgeCards.js'

Vue.config.productionTip = false
Vue.prototype.judgeCards = judgeCards


App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
