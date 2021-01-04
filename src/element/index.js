import { Select, Table, Progress, Option, TableColumn, Input, Icon } from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Table)
    Vue.use(Select)
    Vue.use(Progress)
    Vue.use(Option)
    Vue.use(TableColumn)
    Vue.use(Input)
    Vue.use(Icon)
  }
}

export default element
