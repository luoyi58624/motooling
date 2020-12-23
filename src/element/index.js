import { Select, Table, Progress, Option, TableColumn } from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Table)
    Vue.use(Select)
    Vue.use(Progress)
    Vue.use(Option)
    Vue.use(TableColumn)
  }
}

export default element
