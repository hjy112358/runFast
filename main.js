import Vue from 'vue'
import App from './App'

import judgeCards from '@/util/judgeCards.js'
import hintCards from './util/hintCards.js'
// import analyzeCards from '@/util/analyzeCards.js'
import follow from './util/follow.js'

Vue.config.productionTip = false
Vue.prototype.judgeCards = judgeCards
// Vue.prototype.analyzeCards = analyzeCards
Vue.prototype.hintCards = hintCards
Vue.prototype.follow = follow


App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
