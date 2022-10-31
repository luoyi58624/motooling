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
  Image,
  Popover,
  Tabs,
  TabPane
} from 'element-ui'
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
  }
}

export default element
