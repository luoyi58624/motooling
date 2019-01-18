export function encryption (str) {
  /* global mtRsaJs */
  /* eslint no-undef: "error" */
  return mtRsaJs.rsaEncryption(str)
}

export function decrypt (str) {
  /* global mtRsaJs */
  /* eslint no-undef: "error" */
  return mtRsaJs.rsaDecryption(str)
}
