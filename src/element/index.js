import {
  Button,
  Tree,
  Select,
  Table,
  Progress,
  Option,
  TableColumn,
  Input,
  Icon,
  Dialog,
  Pagination,
  Popover,
  Tabs,
  TabPane,
  CheckboxGroup,
  Checkbox
} from 'element-ui'

// 重写element-ui源码，el-image预览禁止无限循环
import { Image } from 'luoyi-element-ui'

const element = {
  install: function (Vue) {
    Vue.use(Button)
    Vue.use(Tree)
    Vue.use(Table)
    Vue.use(Select)
    Vue.use(Progress)
    Vue.use(Option)
    Vue.use(TableColumn)
    Vue.use(Input)
    Vue.use(Icon)
    Vue.use(Dialog)
    Vue.use(Pagination)
    Vue.use(Image)
    Vue.use(Popover)
    Vue.use(Tabs)
    Vue.use(TabPane)
    Vue.use(CheckboxGroup)
    Vue.use(Checkbox)
  }
}

export default element
