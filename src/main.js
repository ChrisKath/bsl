// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import lodash from 'lodash'
import moment from 'vue-moment'
import clipboard from 'vue-clipboard2'

import App from '~/App'
import i18n from '~/i18n'
import store from '~/store'
import router from '~/router'

// Call Style.
import '~/assets/style/iView/index.less'
import '~/assets/core.less'

// Call Component.
import InputGroup from '~/components/UIComponent/Other/input-group'
import Languages  from '~/components/UIComponent/Other/language'
import RowHead    from '~/components/layout/row-head'
import {
  Alert,
  Avatar,
  BackTop,
  Badge,
  Button,
  Checkbox,
  Col,
  Content,
  DatePicker,
  Dropdown,
  Form,
  Header,
  Icon,
  Input,
  Layout,
  LoadingBar,
  Message,
  Modal,
  Notice,
  Option,
  Radio,
  Scroll,
  Select,
  Slider,
  Spin,
  Switch,
  Tag,
  Timeline,
  Row
} from 'iview'

const components = {
  Alert,
  Avatar,
  BackTop,
  Badge,
  Button,
  ButtonGroup: Button.Group,
  Checkbox,
  Col,
  Content,
  DatePicker,
  Dropdown,
  DropdownItem: Dropdown.Item,
  DropdownMenu: Dropdown.Menu,
  Form,
  FormItem: Form.Item,
  Header: Header,
  Icon,
  Input,
  Layout: Layout,
  LoadingBar,
  Message,
  Modal,
  Notice,
  Option,
  Radio,
  RadioGroup: Radio.Group,
  Row,
  Spin,
  Select,
  Scroll,
  Slider,
  Tag,
  Timeline,
  TimelineItem: Timeline.Item,
  RowHead,
  Languages,
  InputGroup,
  iSwitch: Switch
}

// install components.
Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})

Vue.use(moment)
Vue.use(clipboard)
Vue.prototype.$lodash   = lodash
Vue.prototype.$loading  = LoadingBar
Vue.prototype.$message  = Message
Vue.prototype.$modal    = Modal
Vue.prototype.$notice   = Notice
Vue.prototype.$uri      = process.env.NODE_ENV === 'production'
  ? 'de1.us/'
  : 'tap.co/'

Vue.config.devtools = true
Vue.config.productionTip = false

window.app = new Vue({
  el: '#app',
  i18n,
  store,
  router,
  render: h => h(App)
})
