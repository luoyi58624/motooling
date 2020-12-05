export default function debounce (func, wait = 0) {
  let timeout = null
  let args
  function debounced (...arg) {
    args = arg
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    return new Promise((resolve, reject) => {
      timeout = setTimeout(async () => {
        try {
          let result = await func.apply(this, args)
          resolve(result)
        } catch (err) {
          reject(err)
        }
      }, wait)
    })
  }
  return debounced
}
