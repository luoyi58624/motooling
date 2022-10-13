import {
  Select,
  Table,
  Progress,
  Option,
  TableColumn,
  Input,
  Icon,
  Dialog,
  Pagination,
  Image
} from 'element-ui'
const element = {
  install: function (Vue) {
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
  }
}

export default element
