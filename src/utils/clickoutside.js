export default {
  bind (el, binding, vnode) {
    el.handle = e => {
      if (el.contains(e.target)) {
        let method = binding.expression
        vnode.context[method]()
      }
    }
    document.addEventListener('click', el.handle)
  },
  unbind (el) {
    document.removeEventListener('click', el.handle)
  }
}
