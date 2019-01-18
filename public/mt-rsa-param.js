// 请求公钥
var reqPublicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDLKTH7I/2Domo8ZQIhvR6FXrEBEFgbvHGNVJlx91abYOlrWdo2+P68P2r16lmfy6zy8GN2i+P+C4K/JoR5L7azBLN2/sG/TvDCYDDimbfzny/U3f1XrXCwlFujpuN23tdM5oq1ZZxyY7tRDwu7JwmVmfAHiZ404CJySIEuA27LZwIDAQAB'
// 响应密钥
var resPrivateKey = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKBa+Dtt63lTThzFg6t2wXXS5EpDGuEk8PSTcX6f2KDYfsa7wanE9wnLSP8/2eeMwOq5JocjDQpO8OReFD0RXaF3Li8ImGD67MpmN9tkzv/dv4hFI7A+DVmbsw5NsIrPVBqOHzuCfWzxhDGYwX6RSbUQ5b2zAMv4GgjXWSBE8ERJAgMBAAECgYBIW+RpxNcd/1ZfK02YINV5mnmDfTZy5B2K78GmFvFE24yRlwXz2rpzA/VjoOduUhh3kqbtEgb/YNHY6w8M43ow+TPQMcAm4JirVrbd5d4jfa1yZnbAJfDBbwyQgeMA/PXsm2vXpPlOMNX7FgPOwINdJLhOro/dBpqUZyY8/9OBEQJBAPQNpHyf+CmtB54Jk7KL2s/e0rG3kMTSLTga0wUvIsj6MoUwr7iaGGVO3vyHLcSijbvIAuXUVmpjgWGa014ifoUCQQCoNHcSxF6YnzMobCbY2ByzxbeuIGGsPrgmkOdAD5mO0FB5HeNcHWNmrkFbmVT139kr/Cf4ZB2dyHCBT8W4bSP1AkBGdrHpMZ7LGaQ7YvR79plEr0cR/LgVu8FGk6gdtRBMCsEPZ5E0sXkdtvn222jBf1WAxCziAr64lOZEMhmY8kipAkBGrOzPXOVmeZYUSQU1nfDJdK1OI9sGdcAIrGAOYb+i61K04WMT5GFM1rEtnMq/GRR2T9g3nVF4Z60mGG+6o1k1AkEAow+0FAHpXUTYAbJVzlC0lBamYiatNZ66sE4CCBiE99ROf0b1X/HocrCDo0GlYl3kdEZuuclKqEHehBUj+fNyIg=='
var mtRsaJs = {
  // 给字符串加密
  rsaEncryption: function (epParam) {
    // 实例化加密对象
    var encrypt = new JSEncrypt()
    // 设置加密公钥
    encrypt.setPublicKey(reqPublicKey)
    // 加密
    // return encrypt.encrypt();
    // 分段加密
    return encrypt.encryptLong(epParam)
  },
  // 给加密字符串解密
  rsaDecryption: function (dpParam) {
    // 实例化加密对象
    var encrypt = new JSEncrypt()
    // 设置加密公钥
    encrypt.setPrivateKey(resPrivateKey)
    // 解密
    // return encrypt.decrypt(dpParam);
    // 分段解密
    return encrypt.decryptLong(dpParam)
  }
}
