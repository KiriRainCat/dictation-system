import { createApp } from 'vue'
import { createPinia } from 'pinia'

// MarkDown 组件
import '@kangc/v-md-editor/lib/style/preview.css'
import '@kangc/v-md-editor/lib/theme/style/github.css'
// @ts-expect-error
import VMdPreview from '@kangc/v-md-editor/lib/preview'
// @ts-expect-error
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'

VMdPreview.use(githubTheme)

import App from './App.vue'
import router from './router'

import i18n from './i18n'

import './assets/base.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(VMdPreview)

app.mount('#app')
