/*!
 * Tiny PowerPaste plugin
 *
 * Copyright (c) 2022 Ephox Corporation DBA Tiny Technologies, Inc.
 * Licensed under the Tiny commercial license. See https://www.tiny.cloud/legal/
 *
 * Version: 6.1.1-579
 */

!(function () {
  'use strict'
  const e = e => parseInt(e, 10)
  const t = (e, t) => {
    const n = e - t
    return n === 0 ? 0 : n > 0 ? 1 : -1
  }
  const n = (e, t, n) => ({
    major: e,
    minor: t,
    patch: n
  })
  const r = t => {
    const r = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(t)
    return r ? n(e(r[1]), e(r[2]), e(r[3])) : n(0, 0, 0)
  }
  const o = e => t => (e => {
    const t = typeof e
    return e === null ? 'null' : t === 'object' && Array.isArray(e) ? 'array' : t === 'object' && ((e, t, n) => {
      var r, o
      return o = e,
      !!t.prototype.isPrototypeOf(o) || ((r = e.constructor) === null || void 0 === r ? void 0 : r.name) === t.name
    }
    )(e, String) ? 'string' : t
  }
  )(t) === e
  const s = e => t => typeof t === e
  const a = o('string')
  const i = o('object')
  const l = o('array')
  const c = s('boolean')
  const m = (void 0,
  e => undefined === e)
  const d = e => e == null
  const u = e => !d(e)
  const p = s('function')
  const g = s('number')
  const f = () => {}
  const h = (e, t) => (...n) => e(t.apply(null, n))
  const v = e => () => e
  const y = e => e
  const b = (e, t) => e === t
  function x (e, ...t) {
    return (...n) => {
      const r = t.concat(n)
      return e.apply(null, r)
    }
  }
  const w = e => () => {
    throw new Error(e)
  }
  const T = e => e()
  const I = v(!1)
  const S = v(!0)
  class O {
    constructor (e, t) {
      this.tag = e,
      this.value = t
    }
    static some (e) {
      return new O(!0, e)
    }
    static none () {
      return O.singletonNone
    }
    fold (e, t) {
      return this.tag ? t(this.value) : e()
    }
    isSome () {
      return this.tag
    }
    isNone () {
      return !this.tag
    }
    map (e) {
      return this.tag ? O.some(e(this.value)) : O.none()
    }
    bind (e) {
      return this.tag ? e(this.value) : O.none()
    }
    exists (e) {
      return this.tag && e(this.value)
    }
    forall (e) {
      return !this.tag || e(this.value)
    }
    filter (e) {
      return !this.tag || e(this.value) ? this : O.none()
    }
    getOr (e) {
      return this.tag ? this.value : e
    }
    or (e) {
      return this.tag ? this : e
    }
    getOrThunk (e) {
      return this.tag ? this.value : e()
    }
    orThunk (e) {
      return this.tag ? this : e()
    }
    getOrDie (e) {
      if (this.tag) { return this.value }
      throw new Error(e != null ? e : 'Called getOrDie on None')
    }
    static from (e) {
      return u(e) ? O.some(e) : O.none()
    }
    getOrNull () {
      return this.tag ? this.value : null
    }
    getOrUndefined () {
      return this.value
    }
    each (e) {
      this.tag && e(this.value)
    }
    toArray () {
      return this.tag ? [this.value] : []
    }
    toString () {
      return this.tag ? `some(${this.value})` : 'none()'
    }
  }
  O.singletonNone = new O(!1)
  const E = Array.prototype.slice
  const k = Array.prototype.indexOf
  const N = Array.prototype.push
  const D = (e, t) => ((e, t) => k.call(e, t))(e, t) > -1
  const A = (e, t) => {
    for (let n = 0, r = e.length; n < r; n++) {
      if (t(e[n], n)) { return !0 }
    }
    return !1
  }
  const C = (e, t) => {
    const n = e.length
    const r = new Array(n)
    for (let o = 0; o < n; o++) {
      const n = e[o]
      r[o] = t(n, o)
    }
    return r
  }
  const _ = (e, t) => {
    for (let n = 0, r = e.length; n < r; n++) { t(e[n], n) }
  }
  const L = (e, t) => {
    const n = []
    const r = []
    for (let o = 0, s = e.length; o < s; o++) {
      const s = e[o];
      (t(s, o) ? n : r).push(s)
    }
    return {
      pass: n,
      fail: r
    }
  }
  const P = (e, t) => {
    const n = []
    for (let r = 0, o = e.length; r < o; r++) {
      const o = e[r]
      t(o, r) && n.push(o)
    }
    return n
  }
  const R = (e, t, n) => (_(e, (e, r) => {
    n = t(n, e, r)
  }
  ),
  n)
  const M = (e, t) => ((e, t, n) => {
    for (let r = 0, o = e.length; r < o; r++) {
      const o = e[r]
      if (t(o, r)) { return O.some(o) }
      if (n(o, r)) { break }
    }
    return O.none()
  }
  )(e, t, I)
  const F = (e, t) => {
    for (let n = 0, r = e.length; n < r; n++) {
      if (t(e[n], n)) { return O.some(n) }
    }
    return O.none()
  }
  const j = e => {
    const t = []
    for (let n = 0, r = e.length; n < r; ++n) {
      if (!l(e[n])) { throw new Error('Arr.flatten item ' + n + ' was not an array, input: ' + e) }
      N.apply(t, e[n])
    }
    return t
  }
  const U = (e, t) => j(C(e, t))
  const H = (e, t) => {
    for (let n = 0, r = e.length; n < r; ++n) {
      if (!0 !== t(e[n], n)) { return !1 }
    }
    return !0
  }
  const z = (e, t) => {
    const n = {}
    for (let r = 0, o = e.length; r < o; r++) {
      const o = e[r]
      n[String(o)] = t(o, r)
    }
    return n
  }
  const W = e => ((e, t) => e.length > 0 ? O.some(e[0]) : O.none())(e)
  const B = (e, t) => {
    for (let n = 0; n < e.length; n++) {
      const r = t(e[n], n)
      if (r.isSome()) { return r }
    }
    return O.none()
  }
  const $ = e => t => t.options.get(e)
  const G = $('paste_as_text')
  const V = $('paste_merge_formats')
  const q = $('paste_tab_spaces')
  const K = $('smart_paste')
  const Y = $('cache_suffix')
  const X = $('automatic_uploads')
  const Z = $('indent_use_margin')
  const J = $('powerpaste_block_drop')
  const Q = $('powerpaste_keep_unsupported_src')
  const ee = $('powerpaste_allow_local_images')
  const te = $('powerpaste_word_import')
  const ne = $('powerpaste_googledocs_import')
  const re = $('powerpaste_html_import')
  const oe = $('powerpaste_clean_filtered_inline_elements')
  const se = $('link_default_protocol')
  const ae = e => {
    var t
    return tinymce.explode((t = e.options.get('images_file_types')) !== null && void 0 !== t ? t : '')
  }
  const ie = e => {
    let t = e
    return {
      get: () => t,
      set: e => {
        t = e
      }
    }
  }
  const le = () => {
    const e = (e => {
      const t = ie(O.none())
      const n = () => t.get().each(e)
      return {
        clear: () => {
          n(),
          t.set(O.none())
        },
        isSet: () => t.get().isSome(),
        get: () => t.get(),
        set: e => {
          n(),
          t.set(O.some(e))
        }
      }
    }
    )(f)
    return {
      ...e,
      on: t => e.get().each(t)
    }
  }
  const ce = (e, t, n) => t === '' || e.length >= t.length && e.substr(n, n + t.length) === t
  const me = (e, t) => ue(e, t) ? ((e, t) => e.substring(t))(e, t.length) : e
  const de = (e, t) => e.indexOf(t) !== -1
  const ue = (e, t) => ce(e, t, 0)
  const pe = (e, t) => ce(e, t, e.length - t.length)
  const ge = (fe = /^\s+|\s+$/g,
  e => e.replace(fe, ''))
  var fe
  const he = (e, t) => {
    const n = t => e(t) ? O.from(t.dom.nodeValue) : O.none()
    return {
      get: r => {
        if (!e(r)) { throw new Error('Can only get ' + t + ' value of a ' + t + ' node') }
        return n(r).getOr('')
      },
      getOption: n,
      set: (n, r) => {
        if (!e(n)) { throw new Error('Can only set raw ' + t + ' value of a ' + t + ' node') }
        n.dom.nodeValue = r
      }
    }
  }
  const ve = typeof window != 'undefined' ? window : Function('return this;')()
  const ye = (e, t) => (void 0 !== e[t] && e[t] !== null || (e[t] = {}),
  e[t])
  const be = (e, t) => ((e, t) => {
    let n = void 0 !== t ? t : ve
    for (let t = 0; t < e.length; ++t) { n = ye(n, e[t]) }
    return n
  }
  )(e.split('.'), t)
  const xe = e => e.dom.nodeName.toLowerCase()
  const we = e => e.dom.nodeType
  const Te = e => t => we(t) === e
  const Ie = e => we(e) === 8 || xe(e) === '#comment'
  const Se = Te(1)
  const Oe = Te(3)
  const Ee = Te(9)
  const ke = Te(11)
  const Ne = e => t => Se(t) && xe(t) === e
  const De = he(Ie, 'comment')
  const Ae = e => De.get(e)
  const Ce = e => {
    if (e == null) { throw new Error('Node cannot be null or undefined') }
    return {
      dom: e
    }
  }
  const _e = {
    fromHtml: (e, t) => {
      const n = (t || document).createElement('div')
      if (n.innerHTML = e,
      !n.hasChildNodes() || n.childNodes.length > 1) {
        const t = 'HTML does not have a single root node'
        throw console.error(t, e),
        new Error(t)
      }
      return Ce(n.childNodes[0])
    },
    fromTag: (e, t) => {
      const n = (t || document).createElement(e)
      return Ce(n)
    },
    fromText: (e, t) => {
      const n = (t || document).createTextNode(e)
      return Ce(n)
    },
    fromDom: Ce,
    fromPoint: (e, t, n) => O.from(e.dom.elementFromPoint(t, n)).map(Ce)
  }
  const Le = Object.keys
  const Pe = Object.hasOwnProperty
  const Re = (e, t) => {
    const n = Le(e)
    for (let r = 0, o = n.length; r < o; r++) {
      const o = n[r]
      t(e[o], o)
    }
  }
  const Me = (e, t) => Fe(e, (e, n) => ({
    k: n,
    v: t(e, n)
  }))
  const Fe = (e, t) => {
    const n = {}
    return Re(e, (e, r) => {
      const o = t(e, r)
      n[o.k] = o.v
    }
    ),
    n
  }
  const je = (e, t) => {
    const n = {}
    return ((e, t, n, r) => {
      Re(e, (e, o) => {
        (t(e, o) ? n : r)(e, o)
      }
      )
    }
    )(e, t, (e => (t, n) => {
      e[n] = t
    }
    )(n), f),
    n
  }
  const Ue = e => Le(e).length
  const He = (e, t) => Pe.call(e, t)
  const ze = e => {
    let t; let n = !1
    return (...r) => (n || (n = !0,
    t = e.apply(null, r)),
    t)
  }
  const We = () => Be(0, 0)
  const Be = (e, t) => ({
    major: e,
    minor: t
  })
  const $e = {
    nu: Be,
    detect: (e, t) => {
      const n = String(t).toLowerCase()
      return e.length === 0 ? We() : ((e, t) => {
        const n = ((e, t) => {
          for (let n = 0; n < e.length; n++) {
            const r = e[n]
            if (r.test(t)) { return r }
          }
        }
        )(e, t)
        if (!n) {
          return {
            major: 0,
            minor: 0
          }
        }
        const r = e => Number(t.replace(n, '$' + e))
        return Be(r(1), r(2))
      }
      )(e, n)
    },
    unknown: We
  }
  const Ge = (e, t) => {
    const n = String(t).toLowerCase()
    return M(e, e => e.search(n))
  }
  const Ve = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/
  const qe = e => t => de(t, e)
  const Ke = [{
    name: 'Edge',
    versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
    search: e => de(e, 'edge/') && de(e, 'chrome') && de(e, 'safari') && de(e, 'applewebkit')
  }, {
    name: 'Chromium',
    brand: 'Chromium',
    versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/, Ve],
    search: e => de(e, 'chrome') && !de(e, 'chromeframe')
  }, {
    name: 'IE',
    versionRegexes: [/.*?msie\ ?([0-9]+)\.([0-9]+).*/, /.*?rv:([0-9]+)\.([0-9]+).*/],
    search: e => de(e, 'msie') || de(e, 'trident')
  }, {
    name: 'Opera',
    versionRegexes: [Ve, /.*?opera\/([0-9]+)\.([0-9]+).*/],
    search: qe('opera')
  }, {
    name: 'Firefox',
    versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
    search: qe('firefox')
  }, {
    name: 'Safari',
    versionRegexes: [Ve, /.*?cpu os ([0-9]+)_([0-9]+).*/],
    search: e => (de(e, 'safari') || de(e, 'mobile/')) && de(e, 'applewebkit')
  }]
  const Ye = [{
    name: 'Windows',
    search: qe('win'),
    versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
  }, {
    name: 'iOS',
    search: e => de(e, 'iphone') || de(e, 'ipad'),
    versionRegexes: [/.*?version\/\ ?([0-9]+)\.([0-9]+).*/, /.*cpu os ([0-9]+)_([0-9]+).*/, /.*cpu iphone os ([0-9]+)_([0-9]+).*/]
  }, {
    name: 'Android',
    search: qe('android'),
    versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
  }, {
    name: 'macOS',
    search: qe('mac os x'),
    versionRegexes: [/.*?mac\ os\ x\ ?([0-9]+)_([0-9]+).*/]
  }, {
    name: 'Linux',
    search: qe('linux'),
    versionRegexes: []
  }, {
    name: 'Solaris',
    search: qe('sunos'),
    versionRegexes: []
  }, {
    name: 'FreeBSD',
    search: qe('freebsd'),
    versionRegexes: []
  }, {
    name: 'ChromeOS',
    search: qe('cros'),
    versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/]
  }]
  const Xe = {
    browsers: v(Ke),
    oses: v(Ye)
  }
  const Ze = 'Edge'
  const Je = 'Chromium'
  const Qe = 'Opera'
  const et = 'Firefox'
  const tt = 'Safari'
  const nt = e => {
    const t = e.current
    const n = e.version
    const r = e => () => t === e
    return {
      current: t,
      version: n,
      isEdge: r(Ze),
      isChromium: r(Je),
      isIE: r('IE'),
      isOpera: r(Qe),
      isFirefox: r(et),
      isSafari: r(tt)
    }
  }
  const rt = () => nt({
    current: void 0,
    version: $e.unknown()
  })
  const ot = nt
  const st = (v(Ze),
  v(Je),
  v('IE'),
  v(Qe),
  v(et),
  v(tt),
  'Windows')
  const at = 'Android'
  const it = 'Linux'
  const lt = 'macOS'
  const ct = 'Solaris'
  const mt = 'FreeBSD'
  const dt = 'ChromeOS'
  const ut = e => {
    const t = e.current
    const n = e.version
    const r = e => () => t === e
    return {
      current: t,
      version: n,
      isWindows: r(st),
      isiOS: r('iOS'),
      isAndroid: r(at),
      isMacOS: r(lt),
      isLinux: r(it),
      isSolaris: r(ct),
      isFreeBSD: r(mt),
      isChromeOS: r(dt)
    }
  }
  const pt = () => ut({
    current: void 0,
    version: $e.unknown()
  })
  const gt = ut
  const ft = (v(st),
  v('iOS'),
  v(at),
  v(it),
  v(lt),
  v(ct),
  v(mt),
  v(dt),
  e => window.matchMedia(e).matches)
  let ht = ze(() => ((e, t, n) => {
    const r = Xe.browsers()
    const o = Xe.oses()
    const s = t.bind(e => ((e, t) => B(t.brands, t => {
      const n = t.brand.toLowerCase()
      return M(e, e => {
        var t
        return n === ((t = e.brand) === null || void 0 === t ? void 0 : t.toLowerCase())
      }
      ).map(e => ({
        current: e.name,
        version: $e.nu(parseInt(t.version, 10), 0)
      }))
    }
    ))(r, e)).orThunk(() => ((e, t) => Ge(e, t).map(e => {
      const n = $e.detect(e.versionRegexes, t)
      return {
        current: e.name,
        version: n
      }
    }
    ))(r, e)).fold(rt, ot)
    const a = ((e, t) => Ge(e, t).map(e => {
      const n = $e.detect(e.versionRegexes, t)
      return {
        current: e.name,
        version: n
      }
    }
    ))(o, e).fold(pt, gt)
    const i = ((e, t, n, r) => {
      const o = e.isiOS() && !0 === /ipad/i.test(n)
      const s = e.isiOS() && !o
      const a = e.isiOS() || e.isAndroid()
      const i = a || r('(pointer:coarse)')
      const l = o || !s && a && r('(min-device-width:768px)')
      const c = s || a && !l
      const m = t.isSafari() && e.isiOS() && !1 === /safari/i.test(n)
      const d = !c && !l && !m
      return {
        isiPad: v(o),
        isiPhone: v(s),
        isTablet: v(l),
        isPhone: v(c),
        isTouch: v(i),
        isAndroid: e.isAndroid,
        isiOS: e.isiOS,
        isWebView: v(m),
        isDesktop: v(d)
      }
    }
    )(a, s, e, n)
    return {
      browser: s,
      os: a,
      deviceType: i
    }
  }
  )(navigator.userAgent, O.from(navigator.userAgentData), ft))
  const vt = () => ht()
  const yt = vt()
  const bt = yt.deviceType.isiOS() || yt.deviceType.isAndroid()
  const xt = v({
    isSupported: !1,
    cleanDocument: () => Promise.reject('not supported')
  })
  var wt = bt ? xt : (e, t, n) => {
    const r = t + '/wordimport.js' + (e => O.from(e).filter(e => e.length !== 0).map(e => (e.indexOf('?') === -1 ? '?' : '') + e).getOr(''))(n || 'v=9.1.1')
    const o = e.loadScript('ephox.wimp', r)
    return o.catch(e => {
      console.error('Unable to load word import: ', e)
    }
    ),
    {
      isSupported: !0,
      cleanDocument: (e, t, n) => o.then(r => r.cleanDocument(e, t, n.cleanFilteredInlineElements))
    }
  }

  const Tt = e => {
    let t = []
    return {
      bind: e => {
        if (void 0 === e) { throw new Error('Event bind error: undefined handler') }
        t.push(e)
      },
      unbind: e => {
        t = P(t, t => t !== e)
      },
      trigger: (...n) => {
        const r = {}
        _(e, (e, t) => {
          r[e] = n[t]
        }
        ),
        _(t, e => {
          e(r)
        }
        )
      }
    }
  }
  const It = e => {
    const t = Me(e, e => ({
      bind: e.bind,
      unbind: e.unbind
    }))
    const n = Me(e, e => e.trigger)
    return {
      registry: t,
      trigger: n
    }
  }
  const St = (e, t) => {
    const n = e.dom
    if (n.nodeType !== 1) { return !1 }
    {
      const e = n
      if (void 0 !== e.matches) { return e.matches(t) }
      if (void 0 !== e.msMatchesSelector) { return e.msMatchesSelector(t) }
      if (void 0 !== e.webkitMatchesSelector) { return e.webkitMatchesSelector(t) }
      if (void 0 !== e.mozMatchesSelector) { return e.mozMatchesSelector(t) }
      throw new Error('Browser lacks native selectors')
    }
  }
  const Ot = e => e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 || e.childElementCount === 0
  const Et = (e, t) => {
    const n = void 0 === t ? document : t.dom
    return Ot(n) ? [] : C(n.querySelectorAll(e), _e.fromDom)
  }
  const kt = (e, t) => e.dom === t.dom
  const Nt = St
  const Dt = (e, t, n) => {
    const r = e.document.createRange()
    var o
    return o = r,
    t.fold(e => {
      o.setStartBefore(e.dom)
    }
    , (e, t) => {
      o.setStart(e.dom, t)
    }
    , e => {
      o.setStartAfter(e.dom)
    }
    ),
    ((e, t) => {
      t.fold(t => {
        e.setEndBefore(t.dom)
      }
      , (t, n) => {
        e.setEnd(t.dom, n)
      }
      , t => {
        e.setEndAfter(t.dom)
      }
      )
    }
    )(r, n),
    r
  }
  const At = (e, t, n, r, o) => {
    const s = e.document.createRange()
    return s.setStart(t.dom, n),
    s.setEnd(r.dom, o),
    s
  }
  const Ct = e => {
    if (!l(e)) { throw new Error('cases must be an array') }
    if (e.length === 0) { throw new Error('there must be at least one case') }
    const t = []
    const n = {}
    return _(e, (r, o) => {
      const s = Le(r)
      if (s.length !== 1) { throw new Error('one and only one name per case') }
      const a = s[0]
      const i = r[a]
      if (void 0 !== n[a]) { throw new Error('duplicate key detected:' + a) }
      if (a === 'cata') { throw new Error('cannot have a case named cata (sorry)') }
      if (!l(i)) { throw new Error('case arguments must be an array') }
      t.push(a),
      n[a] = (...n) => {
        const r = n.length
        if (r !== i.length) { throw new Error('Wrong number of arguments to case ' + a + '. Expected ' + i.length + ' (' + i + '), got ' + r) }
        return {
          fold: (...t) => {
            if (t.length !== e.length) { throw new Error('Wrong number of arguments to fold. Expected ' + e.length + ', got ' + t.length) }
            return t[o].apply(null, n)
          },
          match: e => {
            const r = Le(e)
            if (t.length !== r.length) { throw new Error('Wrong number of arguments to match. Expected: ' + t.join(',') + '\nActual: ' + r.join(',')) }
            if (!H(t, e => D(r, e))) { throw new Error('Not all branches were specified when using match. Specified: ' + r.join(', ') + '\nRequired: ' + t.join(', ')) }
            return e[a].apply(null, n)
          },
          log: e => {
            console.log(e, {
              constructors: t,
              constructor: a,
              params: n
            })
          }
        }
      }
    }
    ),
    n
  }
  const _t = Ct([{
    ltr: ['start', 'soffset', 'finish', 'foffset']
  }, {
    rtl: ['start', 'soffset', 'finish', 'foffset']
  }])
  const Lt = (e, t, n) => t(_e.fromDom(n.startContainer), n.startOffset, _e.fromDom(n.endContainer), n.endOffset)
  _t.ltr,
  _t.rtl
  const Pt = (e, t, n, r) => ({
    start: e,
    soffset: t,
    finish: n,
    foffset: r
  })
  const Rt = e => _e.fromDom(e.dom.ownerDocument)
  const Mt = e => Ee(e) ? e : Rt(e)
  const Ft = e => _e.fromDom(Mt(e).dom.defaultView)
  const jt = e => O.from(e.dom.parentNode).map(_e.fromDom)
  const Ut = e => O.from(e.dom.previousSibling).map(_e.fromDom)
  const Ht = e => O.from(e.dom.nextSibling).map(_e.fromDom)
  const zt = e => (e => {
    const t = E.call(e, 0)
    return t.reverse(),
    t
  }
  )(((e, t) => {
    const n = []
    const r = e => (n.push(e),
    t(e))
    let o = t(e)
    do {
      o = o.bind(r)
    } while (o.isSome())
    return n
  }
  )(e, Ut))
  const Wt = e => C(e.dom.childNodes, _e.fromDom)
  const Bt = p(Element.prototype.attachShadow) && p(Node.prototype.getRootNode)
  const $t = v(Bt)
  const Gt = Bt ? e => _e.fromDom(e.dom.getRootNode()) : Mt
  const Vt = e => _e.fromDom(e.dom.host)
  const qt = e => {
    const t = Oe(e) ? e.dom.parentNode : e.dom
    if (t == null || t.ownerDocument === null) { return !1 }
    const n = t.ownerDocument
    return (e => {
      const t = Gt(e)
      return ke(n = t) && u(n.dom.host) ? O.some(t) : O.none()
      var n
    }
    )(_e.fromDom(t)).fold(() => n.body.contains(t), (r = qt,
    o = Vt,
    e => r(o(e))))
    var r, o
  }
  const Kt = (e, t) => {
    let n = []
    return _(Wt(e), e => {
      t(e) && (n = n.concat([e])),
      n = n.concat(Kt(e, t))
    }
    ),
    n
  }
  const Yt = (e, t) => Et(t, e)
  const Xt = Ct([{
    before: ['element']
  }, {
    on: ['element', 'offset']
  }, {
    after: ['element']
  }])
  const Zt = {
    before: Xt.before,
    on: Xt.on,
    after: Xt.after,
    cata: (e, t, n, r) => e.fold(t, n, r),
    getStart: e => e.fold(y, y, y)
  }
  const Jt = Ct([{
    domRange: ['rng']
  }, {
    relative: ['startSitu', 'finishSitu']
  }, {
    exact: ['start', 'soffset', 'finish', 'foffset']
  }])
  const Qt = {
    domRange: Jt.domRange,
    relative: Jt.relative,
    exact: Jt.exact,
    exactFromRange: e => Jt.exact(e.start, e.soffset, e.finish, e.foffset),
    getWin: e => {
      const t = (e => e.match({
        domRange: e => _e.fromDom(e.startContainer),
        relative: (e, t) => Zt.getStart(e),
        exact: (e, t, n, r) => e
      }))(e)
      return Ft(t)
    },
    range: Pt
  }
  const en = (e, t) => {
    const n = xe(e)
    return n === 'input' ? Zt.after(e) : D(['br', 'img'], n) ? t === 0 ? Zt.before(e) : Zt.after(e) : Zt.on(e, t)
  }
  const tn = (e, t, n, r) => {
    const o = Rt(e).dom.createRange()
    return o.setStart(e.dom, t),
    o.setEnd(n.dom, r),
    o
  }
  const nn = e => O.from(e.getSelection())
  const rn = (e, t, n, r, o) => {
    ((e, t) => {
      nn(e).each(e => {
        e.removeAllRanges(),
        e.addRange(t)
      }
      )
    }
    )(e, At(e, t, n, r, o))
  }
  const on = (e, t, n, r, o) => {
    const s = ((e, t, n, r) => {
      const o = en(e, t)
      const s = en(n, r)
      return Qt.relative(o, s)
    }
    )(t, n, r, o);
    ((e, t) => {
      ((e, t) => {
        const n = ((e, t) => t.match({
          domRange: e => ({
            ltr: v(e),
            rtl: O.none
          }),
          relative: (t, n) => ({
            ltr: ze(() => Dt(e, t, n)),
            rtl: ze(() => O.some(Dt(e, n, t)))
          }),
          exact: (t, n, r, o) => ({
            ltr: ze(() => At(e, t, n, r, o)),
            rtl: ze(() => O.some(At(e, r, o, t, n)))
          })
        }))(e, t)
        return ((e, t) => {
          const n = t.ltr()
          return n.collapsed ? t.rtl().filter(e => !1 === e.collapsed).map(e => _t.rtl(_e.fromDom(e.endContainer), e.endOffset, _e.fromDom(e.startContainer), e.startOffset)).getOrThunk(() => Lt(0, _t.ltr, n)) : Lt(0, _t.ltr, n)
        }
        )(0, n)
      }
      )(e, t).match({
        ltr: (t, n, r, o) => {
          rn(e, t, n, r, o)
        },
        rtl: (t, n, r, o) => {
          nn(e).each(s => {
            if (s.setBaseAndExtent) { s.setBaseAndExtent(t.dom, n, r.dom, o) } else if (s.extend) {
              try {
                ((e, t, n, r, o, s) => {
                  t.collapse(n.dom, r),
                  t.extend(o.dom, s)
                }
                )(0, s, t, n, r, o)
              } catch (s) {
                rn(e, r, o, t, n)
              }
            } else { rn(e, r, o, t, n) }
          }
          )
        }
      })
    }
    )(e, s)
  }
  const sn = e => {
    if (e.rangeCount > 0) {
      const t = e.getRangeAt(0)
      const n = e.getRangeAt(e.rangeCount - 1)
      return O.some(Pt(_e.fromDom(t.startContainer), t.startOffset, _e.fromDom(n.endContainer), n.endOffset))
    }
    return O.none()
  }
  const an = e => {
    if (e.anchorNode === null || e.focusNode === null) { return sn(e) }
    {
      const t = _e.fromDom(e.anchorNode)
      const n = _e.fromDom(e.focusNode)
      return ((e, t, n, r) => {
        const o = tn(e, t, n, r)
        const s = kt(e, n) && t === r
        return o.collapsed && !s
      }
      )(t, e.anchorOffset, n, e.focusOffset) ? O.some(Pt(t, e.anchorOffset, n, e.focusOffset)) : sn(e)
    }
  }
  const ln = e => nn(e).filter(e => e.rangeCount > 0).bind(an)
  const cn = (e, t) => {
    jt(e).each(n => {
      n.dom.insertBefore(t.dom, e.dom)
    }
    )
  }
  const mn = (e, t) => {
    Ht(e).fold(() => {
      jt(e).each(e => {
        un(e, t)
      }
      )
    }
    , e => {
      cn(e, t)
    }
    )
  }
  const dn = (e, t) => {
    (e => ((e, t) => {
      const n = e.dom.childNodes
      return O.from(n[0]).map(_e.fromDom)
    }
    )(e))(e).fold(() => {
      un(e, t)
    }
    , n => {
      e.dom.insertBefore(t.dom, n.dom)
    }
    )
  }
  const un = (e, t) => {
    e.dom.appendChild(t.dom)
  }
  const pn = (e, t) => {
    cn(e, t),
    un(t, e)
  }
  const gn = (e, t) => {
    _(t, (n, r) => {
      const o = r === 0 ? e : t[r - 1]
      mn(o, n)
    }
    )
  }
  const fn = (e, t) => {
    _(t, t => {
      un(e, t)
    }
    )
  }
  const hn = e => {
    e.dom.textContent = '',
    _(Wt(e), e => {
      vn(e)
    }
    )
  }
  const vn = e => {
    const t = e.dom
    t.parentNode !== null && t.parentNode.removeChild(t)
  }
  const yn = e => {
    const t = Wt(e)
    t.length > 0 && gn(e, t),
    vn(e)
  }
  const bn = (e, t, n, r) => {
    const o = kt(e, n) && t === r
    return {
      startContainer: v(e),
      startOffset: v(t),
      endContainer: v(n),
      endOffset: v(r),
      collapsed: v(o)
    }
  }

  let xn = 0
  const wn = e => {
    const t = (new Date()).getTime()
    const n = Math.floor(1e9 * Math.random())
    return xn++,
    e + '_' + n + xn + String(t)
  }
  const Tn = (e, t, n) => {
    if (!(a(n) || c(n) || g(n))) {
      throw console.error('Invalid call to Attribute.set. Key ', t, ':: Value ', n, ':: Element ', e),
      new Error('Attribute value was not simple')
    }
    e.setAttribute(t, n + '')
  }
  const In = (e, t, n) => {
    Tn(e.dom, t, n)
  }
  const Sn = (e, t) => {
    const n = e.dom
    Re(t, (e, t) => {
      Tn(n, t, e)
    }
    )
  }
  const On = (e, t) => {
    const n = e.dom.getAttribute(t)
    return n === null ? void 0 : n
  }
  const En = (e, t) => O.from(On(e, t))
  const kn = (e, t) => {
    const n = e.dom
    return !(!n || !n.hasAttribute) && n.hasAttribute(t)
  }
  const Nn = (e, t) => {
    e.dom.removeAttribute(t)
  }
  const Dn = (e, t) => {
    const n = On(e, t)
    return void 0 === n || n === '' ? [] : n.split(' ')
  }
  const An = e => void 0 !== e.dom.classList
  const Cn = e => Dn(e, 'class')
  const _n = (e, t) => {
    An(e) ? e.dom.classList.add(t) : ((e, t) => {
      ((e, t, n) => {
        const r = Dn(e, t).concat([n])
        In(e, t, r.join(' '))
      }
      )(e, 'class', t)
    }
    )(e, t)
  }
  const Ln = (e, t) => {
    An(e) ? e.dom.classList.remove(t) : ((e, t) => {
      ((e, t, n) => {
        const r = P(Dn(e, t), e => e !== n)
        r.length > 0 ? In(e, t, r.join(' ')) : Nn(e, t)
      }
      )(e, 'class', t)
    }
    )(e, t),
    (e => {
      (An(e) ? e.dom.classList : Cn(e)).length === 0 && Nn(e, 'class')
    }
    )(e)
  }
  const Pn = (e, t) => An(e) && e.dom.classList.contains(t)
  const Rn = (e, t, n = b) => e.exists(e => n(e, t))
  const Mn = (e, t) => e ? O.some(t) : O.none()
  const Fn = e => void 0 !== e.style && p(e.style.getPropertyValue)
  const jn = (e, t, n) => {
    if (!a(n)) {
      throw console.error('Invalid call to CSS.set. Property ', t, ':: Value ', n, ':: Element ', e),
      new Error('CSS value must be a string: ' + n)
    }
    Fn(e) && e.style.setProperty(t, n)
  }
  const Un = (e, t) => {
    Fn(e) && e.style.removeProperty(t)
  }
  const Hn = (e, t, n) => {
    const r = e.dom
    jn(r, t, n)
  }
  const zn = (e, t) => {
    const n = e.dom
    Re(t, (e, t) => {
      jn(n, t, e)
    }
    )
  }
  const Wn = (e, t) => {
    const n = e.dom
    const r = window.getComputedStyle(n).getPropertyValue(t)
    return r !== '' || qt(e) ? r : Bn(n, t)
  }
  const Bn = (e, t) => Fn(e) ? e.style.getPropertyValue(t) : ''
  const $n = (e, t) => {
    const n = e.dom
    const r = Bn(n, t)
    return O.from(r).filter(e => e.length > 0)
  }
  const Gn = e => {
    const t = {}
    const n = e.dom
    if (Fn(n)) {
      for (let e = 0; e < n.style.length; e++) {
        const r = n.style.item(e)
        t[r] = n.style[r]
      }
    }
    return t
  }
  const Vn = (e, t) => {
    const n = e.dom
    Un(n, t),
    Rn(En(e, 'style').map(ge), '') && Nn(e, 'style')
  }
  const qn = e => Wn(e, 'direction') === 'rtl' ? 'rtl' : 'ltr'
  const Kn = (e, t) => {
    const n = (t || document).createElement('div')
    return n.innerHTML = e,
    Wt(_e.fromDom(n))
  }
  const Yn = e => e.dom.innerHTML
  const Xn = (e, t, n) => {
    let r = e.dom
    const o = p(n) ? n : I
    for (; r.parentNode;) {
      r = r.parentNode
      const e = _e.fromDom(r)
      if (t(e)) { return O.some(e) }
      if (o(e)) { break }
    }
    return O.none()
  }
  const Zn = (e, t) => M(e.dom.childNodes, e => t(_e.fromDom(e))).map(_e.fromDom)
  const Jn = (e, t) => {
    const n = e => {
      for (let r = 0; r < e.childNodes.length; r++) {
        const o = _e.fromDom(e.childNodes[r])
        if (t(o)) { return O.some(o) }
        const s = n(e.childNodes[r])
        if (s.isSome()) { return s }
      }
      return O.none()
    }

    return n(e.dom)
  }
  const Qn = (e, t, n) => Xn(e, e => St(e, t), n)
  const er = (e, t, n) => ((e, t, n, r, o) => ((e, t) => St(e, t))(n, r) ? O.some(n) : p(o) && o(n) ? O.none() : t(n, r, o))(0, Qn, e, t, n)
  const tr = e => {
    const t = nr(e)
    return {
      resolve: e => {
        const n = e.split(' ')
        return C(n, e => rr(t, e)).join(' ')
      }
    }
  }
  const nr = e => e.replace(/\./g, '-')
  const rr = (e, t) => e + '-' + t
  const or = tr('ephox-sloth').resolve
  const sr = v(or('bin'))
  const ar = ['b', 'i', 'u', 'sub', 'sup', 'strike']
  const ir = sr()
  const lr = ir + wn('')
  const cr = ('-100000px',
  '100000px',
  e => qn(e) === 'rtl' ? '100000px' : '-100000px')
  const mr = (e, t) => {
    const n = _e.fromTag('div')
    var r
    Sn(n, t),
    Sn(n, {
      contenteditable: 'true',
      'aria-hidden': 'true'
    }),
    zn(n, {
      position: 'fixed',
      top: '0px',
      width: '100px',
      height: '100px',
      overflow: 'hidden',
      opacity: '0'
    }),
    r = n,
    _([ir, lr], e => {
      _n(r, e)
    }
    )
    const o = e => Pn(e, lr)
    return {
      attach: e => {
        hn(n),
        Hn(n, 'left', cr(e)),
        un(e, n)
      },
      focus: () => {
        Qn(n, 'body').each(t => {
          e.toOff(t, n)
        }
        )
      },
      contents: () => (((e, t) => {
        Ht(e).filter(t).each(t => {
          const n = Wt(t)
          fn(e, n),
          vn(t)
        }
        ),
        ((e, t) => {
          const n = Wt(e)
          _(n, e => {
            t(e) && ((e, t) => {
              const n = Wt(e)
              const r = _e.fromTag('div', Rt(e).dom)
              fn(r, n),
              cn(e, r),
              vn(e)
            }
            )(e)
          }
          )
        }
        )(e, t),
        _(Wt(e), e => {
          (e => Se(e) && !e.dom.hasChildNodes() && D(ar, xe(e)))(e) && vn(e)
        }
        )
      }
      )(n, o),
      {
        elements: Wt(n),
        html: Yn(n),
        offscreen: n
      }),
      container: v(n),
      detach: () => {
        vn(n)
      }
    }
  }
  const dr = e => {
    const t = kt(e.start, e.finish) && e.soffset === e.foffset
    return {
      startContainer: v(e.start),
      startOffset: v(e.soffset),
      endContainer: v(e.finish),
      endOffset: v(e.foffset),
      collapsed: v(t)
    }
  }
  const ur = {
    set: (e, t) => {
      on(e, t.startContainer(), t.startOffset(), t.endContainer(), t.endOffset())
    },
    get: e => ln(e).map(dr)
  }
  var pr = e => t => {
    const n = It({
      after: Tt(['container'])
    })
    const r = (e => {
      const t = _e.fromTag('br')
      let n = O.none()
      const r = e => Ft(e).dom
      return {
        cleanup: () => {
          vn(t)
        },
        toOn: (t, o) => {
          const s = r(o)
          n.each(n => {
            const r = (e => e.dom.childNodes.length)(t)
            const o = kt(t, n.startContainer()) && r < n.startOffset() ? r : n.startOffset()
            const a = kt(t, n.endContainer()) && r < n.endOffset() ? r : n.endOffset()
            const i = bn(n.startContainer(), o, n.endContainer(), a)
            e.set(s, i)
          }
          )
        },
        toOff: (o, s) => {
          const a = r(s)
          un(s, t),
          n = e.get(a),
          e.set(a, bn(t, 0, t, 0))
        }
      }
    }
    )(ur)
    const o = ((e, t, n) => {
      const r = mr(e, n)
      const o = () => {
        e.cleanup()
        const t = r.contents()
        r.detach(),
        s.trigger.after(t.elements, t.html, r.container())
      }
      const s = It({
        before: Tt([]),
        after: Tt(['elements', 'html', 'container'])
      })
      const a = f
      return {
        instance: v(() => {
          s.trigger.before(),
          r.attach(t),
          r.focus(),
          ((e, t) => {
            ((e, t) => {
              setTimeout(t, 1)
            }
            )(0, t)
          }
          )(Rt(t), o)
        }
        ),
        destroy: a,
        events: s.registry
      }
    }
    )(r, t, e)
    return o.events.after.bind(e => {
      r.toOn(t, e.container),
      n.trigger.after(e.container)
    }
    ),
    {
      run: () => {
        o.instance()()
      },
      events: n.registry
    }
  }

  const gr = tr('ephox-cement').resolve
  const fr = {
    cacheSuffix: '',
    pasteBinAttrs: {},
    keepSrc: !1,
    sanitizer: {
      sanitizeHtml: v(''),
      sanitizeText: v('')
    },
    tabSpaces: 4,
    cleanFilteredInlineElements: [],
    indentUseMargin: !1,
    defaultProtocol: 'https'
  }
  const hr = v(gr('smartpaste-eph-bin'))
  const vr = e => {
    let t = O.none()
    let n = []
    const r = e => {
      o() ? s(e) : n.push(e)
    }
    const o = () => t.isSome()
    const s = e => {
      t.each(t => {
        setTimeout(() => {
          e(t)
        }
        , 0)
      }
      )
    }

    return e(e => {
      o() || (t = O.some(e),
      _(n, s),
      n = [])
    }
    ),
    {
      get: r,
      map: e => vr(t => {
        r(n => {
          t(e(n))
        }
        )
      }
      ),
      isReady: o
    }
  }
  const yr = {
    nu: vr,
    pure: e => vr(t => {
      t(e)
    }
    )
  }
  const br = e => {
    setTimeout(() => {
      throw e
    }
    , 0)
  }
  const xr = e => {
    const t = t => {
      e().then(t, br)
    }

    return {
      map: t => xr(() => e().then(t)),
      bind: t => xr(() => e().then(e => t(e).toPromise())),
      anonBind: t => xr(() => e().then(() => t.toPromise())),
      toLazy: () => yr.nu(t),
      toCached: () => {
        let t = null
        return xr(() => (t === null && (t = e()),
        t))
      },
      toPromise: e,
      get: t
    }
  }
  const wr = e => xr(() => new Promise(e))
  const Tr = e => ((e, t) => t(t => {
    const n = []
    let r = 0
    e.length === 0 ? t([]) : _(e, (o, s) => {
      o.get((o => s => {
        n[o] = s,
        r++,
        r >= e.length && t(n)
      }
      )(s))
    }
    )
  }
  ))(e, wr)
  const Ir = () => {
    const e = {}
    return {
      getOrSetIndexed: (t, n) => (t => void 0 !== e[t])(t) ? e[t] : ((t, n) => (e[t] = n,
      n))(t, n()),
      waitForLoad: () => {
        const t = ((e, t) => {
          const n = []
          return Re(e, (e, r) => {
            n.push(t(e, r))
          }
          ),
          n
        }
        )(e, y)
        return Tr(t)
      }
    }
  }
  const Sr = e => {
    const t = t => t(e)
    const n = v(e)
    const r = () => o
    const o = {
      tag: !0,
      inner: e,
      fold: (t, n) => n(e),
      isValue: S,
      isError: I,
      map: t => Er.value(t(e)),
      mapError: r,
      bind: t,
      exists: t,
      forall: t,
      getOr: n,
      or: r,
      getOrThunk: n,
      orThunk: r,
      getOrDie: n,
      each: t => {
        t(e)
      },
      toOptional: () => O.some(e)
    }
    return o
  }
  const Or = e => {
    const t = () => n
    const n = {
      tag: !1,
      inner: e,
      fold: (t, n) => t(e),
      isValue: I,
      isError: S,
      map: t,
      mapError: t => Er.error(t(e)),
      bind: t,
      exists: I,
      forall: S,
      getOr: y,
      or: y,
      getOrThunk: T,
      orThunk: T,
      getOrDie: w(String(e)),
      each: f,
      toOptional: O.none
    }
    return n
  }
  const Er = {
    value: Sr,
    error: Or,
    fromOption: (e, t) => e.fold(() => Or(t), Sr)
  }
  const kr = e => {
    const t = _e.fromDom((e => {
      if ($t() && u(e.target)) {
        const t = _e.fromDom(e.target)
        if (Se(t) && u(t.dom.shadowRoot) && e.composed && e.composedPath) {
          const t = e.composedPath()
          if (t) { return W(t) }
        }
      }
      return O.from(e.target)
    }
    )(e).getOr(e.target))
    const n = () => e.stopPropagation()
    const r = () => e.preventDefault()
    const o = h(r, n)
    return ((e, t, n, r, o, s, a) => ({
      target: e,
      x: t,
      y: n,
      stop: r,
      prevent: o,
      kill: s,
      raw: a
    }))(t, e.clientX, e.clientY, n, r, o, e)
  }
  const Nr = (e, t, n, r) => {
    e.dom.removeEventListener(t, n, r)
  }
  const Dr = S
  const Ar = (e, t, n) => ((e, t, n, r) => ((e, t, n, r, o) => {
    const s = ((e, t) => n => {
      e(n) && t(kr(n))
    }
    )(n, r)
    return e.dom.addEventListener(t, s, o),
    {
      unbind: x(Nr, e, t, s, o)
    }
  }
  )(e, t, n, r, !1))(e, t, Dr, n)
  const Cr = (e => {
    const t = x(be, e)
    be('callbacks', t())
    const n = (n, o) => {
      const s = t()
      const a = (e => {
        const t = void 0 === e.count ? 0 : e.count
        const n = 'callback_' + t
        return e.count = t + 1,
        n
      }
      )(s)
      return s.callbacks[a] = (...e) => {
        o || r(a),
        n(...e)
      }
      ,
      (t => e + '.callbacks.' + t)(a)
    }
    const r = e => {
      const n = e.substring(e.lastIndexOf('.') + 1)
      const r = t()
      void 0 !== r.callbacks[n] && delete r.callbacks[n]
    }

    return {
      ephemeral: e => n(e, !1),
      permanent: e => n(e, !0),
      unregister: r
    }
  }
  )('ephox.henchman.features')
  const _r = (e, t) => yr.nu(n => {
    const r = t => {
      _(s, e => {
        e.unbind()
      }
      ),
      n(t.fold(t => Er.error(t + 'Unable to download editor stylesheets from "' + e + '"'), Er.value))
    }
    const o = ((e, t) => {
      const n = _e.fromDom(document)
      const r = _e.fromTag('link', n.dom)
      return Sn(r, {
        rel: 'stylesheet',
        type: 'text/css',
        href: e
      }),
      ((e, t) => {
        const n = (e => {
          const t = e.dom.head
          if (t == null) { throw new Error('Head is not available yet') }
          return _e.fromDom(t)
        }
        )(e)
        un(n, t)
      }
      )(n, r),
      r
    }
    )(e)
    const s = [Ar(o, 'load', e => {
      (e => {
        var t
        try {
          const n = (t = e.target.dom.sheet) === null || void 0 === t ? void 0 : t.cssRules
          return i(n) && n.length === 0
        } catch (e) {}
        return !1
      }
      )(e) ? r(Er.error('')) : t(r)
    }
    ), Ar(o, 'error', x(r, Er.error('')))]
  }
  )
  const Lr = (() => {
    const e = Ir()
    const t = () => e.waitForLoad()
    return {
      preload: () => {
        t().get(y)
      },
      addStylesheet: (t, n) => e.getOrSetIndexed(t, () => _r(t, n)),
      addScript: (t, n) => e.getOrSetIndexed(t, () => (e => yr.nu(t => {
        const n = () => {
          o.unbind(),
          s.unbind()
        }
        const r = _e.fromTag('script')
        In(r, 'src', e),
        In(r, 'type', 'text/javascript'),
        In(r, 'async', 'async'),
        In(r, 'data-main', Cr.ephemeral(e => {
          t(Er.value(e))
        }
        ))
        const o = Ar(r, 'error', () => {
          n(),
          t(Er.error('Error loading external script tag ' + e))
        }
        )
        const s = Ar(r, 'load', n)
        un(_e.fromDom(document.head), r)
      }
      ))(t).map(n)),
      waitForLoad: t
    }
  }
  )()
  const Pr = {
    loadScript: (e, t) => new Promise((e, n) => {
      ((e, t) => Lr.addScript(e, t))(t, y).get(t => {
        t.fold(n, e)
      }
      )
    }
    )
  }
  const Rr = Ct([{
    error: ['message']
  }, {
    paste: ['elements', 'correlated']
  }, {
    cancel: []
  }, {
    incomplete: ['elements', 'correlated', 'message']
  }])
  const Mr = (e, t, n, r, o) => e.fold(t, n, r, o)
  const Fr = Rr.error
  const jr = Rr.paste
  const Ur = Rr.cancel
  const Hr = Rr.incomplete
  const zr = ['officeStyles', 'htmlStyles', 'gdocsStyles', 'isWord', 'isGoogleDocs', 'proxyBin', 'isInternal']
  const Wr = (e, t) => {
    const n = {}
    return _(zr, r => {
      t[r].or(e[r]).each(e => {
        n[r] = e
      }
      )
    }
    ),
    Br(n)
  }
  const Br = e => z(zr, t => O.from(e[t]))
  const $r = e => ({
    response: Fr(e),
    bundle: Br({})
  })
  const Gr = e => Promise.resolve($r(e))
  const Vr = {
    response: Ur(),
    bundle: Br({})
  }
  const qr = e => u(e.then)
  const Kr = (e, t, n, r) => ({
    steps: e,
    input: t,
    label: n,
    capture: r
  })
  const Yr = (e, t) => {
    const n = Wr(e.bundle, t.bundle)
    const r = ((e, t) => Mr(e, O.none, O.none, O.none, (e, n, r) => Mr(t, O.none, (e, t) => O.some(Rr.incomplete(e, t, r)), O.none, O.none)).getOr(t))(e.response, t.response)
    return {
      response: r,
      bundle: n
    }
  }
  const Xr = (e, t, n) => {
    const r = () => e
    const o = () => {
      const r = n(t, e)
      return qr(r) ? r.then(t => Yr(e, t)) : Yr(e, r)
    }

    return Mr(e.response, r, o, r, o)
  }
  const Zr = (Jr = (e, t) => t,
  (...e) => {
    if (e.length === 0) { throw new Error("Can't merge zero objects") }
    const t = {}
    for (let n = 0; n < e.length; n++) {
      const r = e[n]
      for (const e in r) { He(r, e) && (t[e] = Jr(t[e], r[e])) }
    }
    return t
  }
  )
  var Jr
  const Qr = Ct([{
    starts: ['value', 'f']
  }, {
    pattern: ['regex', 'f']
  }, {
    contains: ['value', 'f']
  }, {
    exact: ['value', 'f']
  }, {
    all: []
  }, {
    not: ['stringMatch']
  }])
  const eo = y
  const to = (e, t) => e.fold((e, n) => n(t).indexOf(n(e)) === 0, (e, n) => e.test(n(t)), (e, n) => n(t).indexOf(n(e)) >= 0, (e, n) => n(t) === n(e), S, e => !to(e, t))
  const no = {
    starts: Qr.starts,
    pattern: Qr.pattern,
    contains: Qr.contains,
    exact: Qr.exact,
    all: Qr.all,
    not: Qr.not,
    cata: (e, t, n, r, o, s, a) => e.fold(t, n, r, o, s, a),
    matches: to,
    caseSensitive: eo,
    caseInsensitive: e => e.toLowerCase()
  }
  const ro = (e, t) => {
    const n = xe(e)
    const r = t.name
    const o = void 0 !== t.condition ? t.condition : S
    return no.matches(r, n) && o(e)
  }
  const oo = (e, t, n) => {
    const r = (e => {
      const t = {}
      const n = u(e) ? e.split(';') : []
      return _(n, e => {
        const n = e.split(':')
        n.length === 2 && (t[ge(n[0])] = ge(n[1]))
      }
      ),
      t
    }
    )(e.dom.getAttribute('style'))
    const o = {}
    return _(t, e => {
      const t = r[e]
      void 0 === t || n(t, e) || (o[e] = t)
    }
    ),
    o
  }
  const so = e => {
    const t = Le(e)
    return C(t, t => t + ': ' + e[t]).join('; ')
  }
  const ao = ['mso-list']
  const io = (e, t) => {
    const n = oo(e, ao, t)
    const r = ((e, t) => {
      const n = e.dom.style
      const r = d(n) ? [] : n
      const o = {}
      return _(r, n => {
        $n(e, n).each(e => {
          t(e, n) || (o[n] = e)
        }
        )
      }
      ),
      o
    }
    )(e, t);
    ((e, t, n) => {
      In(e, 'style', '')
      const r = Ue(t)
      const o = Ue(n)
      if (r === 0 && o === 0) { Nn(e, 'style') } else if (r === 0) { In(e, 'style', so(n)) } else {
        Re(t, (t, n) => {
          Hn(e, n, t)
        }
        )
        const r = On(e, 'style')
        const s = o > 0 ? so(n) + '; ' : ''
        In(e, 'style', s + r)
      }
    }
    )(e, r, n)
  }
  const lo = (e, t) => {
    const n = ((e, t) => {
      const n = {}
      return _(e.dom.attributes, e => {
        t(e.value, e.name) || (n[e.name] = e.value)
      }
      ),
      n
    }
    )(e, t);
    ((e, t) => {
      const n = C(e.dom.attributes, e => e.name)
      Ue(t) !== n.length && ((e, t, n) => {
        _(t, t => {
          Nn(e, t)
        }
        ),
        Re(n, (t, n) => {
          In(e, n, t)
        }
        )
      }
      )(e, n, t)
    }
    )(e, n)
  }
  const co = (e, t) => {
    io(_e.fromDom(e), t)
  }
  const mo = (e, t, n) => {
    e(n, (e, r) => A(t, t => ((e, t, n, r) => {
      const o = r.name
      const s = void 0 !== r.condition ? r.condition : S
      const a = void 0 !== r.value ? r.value : no.all()
      return no.matches(o, n) && no.matches(a, t) && s(e)
    }
    )(n, e, r, t)))
  }
  const uo = 'startElement'
  const po = 'endElement'
  const go = 'text'
  const fo = 'comment'
  const ho = (e, t, n) => {
    let r, o, s
    const a = _e.fromDom(e)
    switch (e.nodeType) {
      case 1:
        t ? r = po : (r = uo,
        zn(a, n || {}))
        const i = e
        o = i.scopeName !== 'HTML' && i.scopeName && i.tagName && i.tagName.indexOf(':') <= 0 ? (i.scopeName + ':' + i.tagName).toLowerCase() : i.tagName.toLowerCase()
        break
      case 3:
        r = go,
        s = e.nodeValue
        break
      case 8:
        r = fo,
        s = e.nodeValue
        break
      default:
        console.log('WARNING: Unsupported node type encountered: ' + e.nodeType)
    }
    return {
      getNode: v(e),
      tag: () => o,
      type: () => r,
      text: () => s
    }
  }
  const vo = (e, t, n, r) => {
    const o = r.createElement(e)
    return Re(t, (e, t) => {
      o.setAttribute(t, e + '')
    }
    ),
    ho(o, !1, n)
  }
  const yo = (e, t) => ho(t.createElement(e), !0)
  const bo = yo('html', window.document)
  const xo = e => {
    const t = e.createDocumentFragment()
    let n = t
    const r = e => {
      n.appendChild(e)
    }

    return {
      dom: t,
      receive: o => {
        switch (o.type()) {
          case uo:
            s = o.getNode().cloneNode(!1),
            r(s),
            n = s
            break
          case go:
            (t => {
              const n = e.createTextNode(t.text())
              r(n)
            }
            )(o)
            break
          case po:
            (() => {
              const e = n.parentNode
              n = e === null ? t : e
            }
            )()
            break
          case fo:
            break
          default:
            throw new Error('Unsupported token type: ' + o.type())
        }
        var s
      },
      label: 'SERIALISER'
    }
  }
  const wo = e => t => {
    ((e, t) => {
      const n = Zr({
        styles: [],
        attributes: [],
        classes: [],
        tags: []
      }, t)
      const r = Yt(e, '*')
      _(r, e => {
        mo(io, n.styles, e),
        mo(lo, n.attributes, e),
        _(n.classes, t => {
          const n = kn(e, 'class') ? (e => An(e) ? (e => {
            const t = e.dom.classList
            const n = new Array(t.length)
            for (let e = 0; e < t.length; e++) {
              const r = t.item(e)
              r !== null && (n[e] = r)
            }
            return n
          }
          )(e) : Cn(e))(e) : []
          _(n, n => {
            no.matches(t.name, n) && Ln(e, n)
          }
          )
        }
        )
      }
      )
      const o = Yt(e, '*')
      _(o, e => {
        A(n.tags, x(ro, e)) && vn(e)
      }
      )
    }
    )(t, e)
  }
  const To = e => t => {
    ((e, t) => {
      const n = Zr({
        tags: []
      }, t)
      const r = Yt(e, '*')
      _(r, e => {
        A(n.tags, x(ro, e)) && yn(e)
      }
      )
    }
    )(t, e)
  }
  const Io = e => t => {
    ((e, t) => {
      const n = Zr({
        tags: []
      }, t)
      const r = Yt(e, '*')
      _(r, e => {
        M(n.tags, x(ro, e)).each(t => {
          t.mutate(e)
        }
        )
      }
      )
    }
    )(t, e)
  }
  const So = e => t => {
    const n = Yn(t)
    const r = ((e, t, n) => {
      const r = xo(e)
      const o = ((e, t = window.document) => {
        const n = t.createElement('div')
        t.body.appendChild(n),
        n.style.position = 'absolute',
        n.style.left = '-10000px',
        n.innerHTML = e
        let r = n.firstChild || bo
        const o = []
        let s = !1
        return {
          hasNext: () => void 0 !== r,
          next: () => {
            const e = r
            const a = r
            const i = s
            return !s && e.firstChild ? (o.push(e),
            r = e.firstChild) : s || e.nodeType !== 1 ? e.nextSibling ? (r = e.nextSibling,
            s = !1) : (r = o.pop(),
            s = !0) : s = !0,
            a === bo || r || (t.body.removeChild(n),
            r = bo),
            (l = a) === bo ? l : l ? ho(l, i) : void 0
            var l
          }
        }
      }
      )(t, e)
      const s = ((e, t, n) => {
        let r = n
        for (let n = t.length - 1; n >= 0; n--) { r = t[n](r, {}, e) }
        return r
      }
      )(e, n, r)
      for (; o.hasNext();) {
        const e = o.next()
        s.receive(e)
      }
      return r.dom
    }
    )(Rt(t).dom, n, e)
    hn(t),
    t.dom.appendChild(r)
  }
  const Oo = (e, t, n) => {
    const r = _e.fromTag('div', e.dom)
    zn(r, {
      position: 'fixed',
      left: '-100000px',
      top: '0px'
    }),
    un((e => {
      const t = e.dom.body
      if (t == null) { throw new Error('Body is not available yet') }
      return _e.fromDom(t)
    }
    )(e), r),
    r.dom.innerHTML = t,
    _(n, e => {
      e(r)
    }
    )
    const o = Yn(r)
    return vn(r),
    o
  }
  const Eo = (e, t) => n => {
    const r = e => {
      n.receive(e)
    }
    const o = (e, t, n) => (n = void 0 !== n ? n : e.type() === po,
    ho(t, n, {}))
    const s = {
      emit: r,
      emitTokens: e => {
        _(e, r)
      },
      receive: t => {
        e(s, t, o)
      },
      document: window.document
    }
    return t(s),
    s
  }
  const ko = (e, t) => {
    if (void 0 === e || void 0 === t) {
      throw console.trace(),
      new Error('brick')
    }
    e.nextFilter.set(t)
  }
  const No = (e, t, n = !1) => e === t || u(e) && u(t) && e.tag === t.tag && e.type === t.type && (n || e.variant === t.variant)
  const Do = (e, t) => kn(_e.fromDom(t.getNode()), 'data-list-level')
  const Ao = (e, t, n, r) => {
    const o = n.getCurrentListType()
    const s = n.getCurrentLevel() == r.level() ? o : null
    return (a = r.emblems(),
    i = s,
    M(a, e => e.tag === 'ul' || u(i) && No(e, i, !0)).orThunk(() => W(a))).filter(e => !(e.tag === 'ol' && (e => {
      if (D(['p'], e.tag())) {
        const t = ((e, t) => {
          const n = _e.fromDom(e.getNode())
          return On(n, 'class')
        }
        )(e)
        return u(t) && /^MsoHeading/.test(t)
      }
      return !0
    }
    )(t)))
    var a, i
  }
  const Co = e => (t, n, r) => {
    const o = r
    const s = (e => {
      const t = parseInt(On(e, 'data-list-level'), 10)
      const n = On(e, 'data-list-emblems')
      const r = u(n) ? JSON.parse(n) : []
      return Nn(e, 'data-list-level'),
      Nn(e, 'data-list-emblems'),
      {
        level: v(t),
        emblems: v(r)
      }
    }
    )(_e.fromDom(o.getNode()))
    n.originalToken.set(o)
    const a = ((e, t, n) => (Ao(n.listType.get(), e, n.emitter, t).each(n.listType.set),
    ((e, t, n) => ({
      level: v(e),
      token: v(t),
      type: v(n)
    }))(t.level(), n.originalToken.get(), n.listType.get())))(o, s, n)
    n.emitter.openItem(a.level(), a.token(), a.type()),
    ko(n, e.inside())
  }
  const _o = (e, t, n) => ({
    pred: e,
    action: t,
    label: v(n)
  })
  var Lo = (e, t, n) => {
    const r = (e, r, o) => {
      M(t, e => e.pred(r, o)).fold(v(n), e => e.action)(e, r, o)
    }

    return r.toString = () => 'Handlers for ' + e,
    r
  }

  const Po = (e, t) => ({
    state: v(e),
    result: v(t)
  })
  const Ro = (e, t) => ({
    state: v(e),
    value: v(t)
  })
  const Mo = (e, t, n, r) => ({
    level: v(e),
    type: v(t),
    types: v(n),
    items: v(r)
  })
  const Fo = e => {
    const t = e.items().slice(0)
    if (t.length > 0 && t[t.length - 1] !== 'p') {
      const n = t[t.length - 1]
      t[t.length - 1] = 'p'
      const r = Mo(e.level(), e.type(), e.types(), t)
      return Ro(r, O.some(n))
    }
    return Ro(e, O.none())
  }
  const jo = (e, t, n) => {
    let r = []
    let o = e
    for (; t(o);) {
      const e = n(o)
      o = e.state(),
      r = r.concat(e.result())
    }
    return Po(o, r)
  }
  const Uo = (e, t, n) => {
    const r = t.start && t.start > 1 ? {
      start: t.start
    } : {}
    const o = e.level() + 1
    const s = t
    const a = e.types().concat([t])
    const i = [x(vo, t.tag, r, n)]
    const l = Mo(o, s, a, e.items())
    return Po(l, i)
  }
  const Ho = e => {
    const t = e.types().slice(0)
    const n = [x(yo, t.pop().tag)]
    const r = e.level() - 1
    const o = t[t.length - 1]
    const s = Mo(r, o, t, e.items())
    return Po(s, n)
  }
  const zo = (e, t, n) => {
    const r = (l = t) ? (e => {
      const t = ((e, t) => {
        const n = _e.fromDom(e.getNode())
        return Wn(n, 'margin-left')
      }
      )(e)
      return u(t) && t !== '0px' ? {
        'margin-left': t
      } : {}
    }
    )(l) : {
      'list-style-type': 'none'
    }
    const o = e.type() && !No(e.type(), n) ? ((e, t) => {
      const n = Ho(e)
      const r = Uo(n.state(), t, t.type ? {
        'list-style-type': t.type
      } : {})
      return Po(r.state(), n.result().concat(r.result()))
    }
    )(e, n) : Po(e, [])
    const s = [x(vo, 'li', {}, r)]
    const a = ((e, t) => {
      const n = e.items().slice(0)
      const r = void 0 !== t && t !== 'p' ? O.some(t) : O.none()
      r.fold(() => {
        n.push('p')
      }
      , e => {
        n.push(e)
      }
      )
      const o = Mo(e.level(), e.type(), e.types(), n)
      return Ro(o, r)
    }
    )(o.state(), t && t.tag())
    const i = a.value().map(e => {
      const n = t
      return co(n.getNode(), S),
      [v(n)]
    }
    ).getOr([])
    var l
    return Po(a.state(), o.result().concat(s).concat(i))
  }
  const Wo = e => {
    const t = x(yo, 'li')
    const n = Fo(e)
    const r = n.value().fold(() => [t], e => [x(yo, e), t])
    return Po(n.state(), r)
  }
  const Bo = e => {
    if (e.length === 0) { throw new Error('Compose must have at least one element in the list') }
    const t = e[e.length - 1]
    const n = U(e, e => e.result())
    return Po(t.state(), n)
  }
  const $o = e => {
    const t = Wo(e)
    const n = Ho(t.state())
    return Bo([t, n])
  }
  const Go = (e, t) => ((e, t, n) => jo(e, e => e.level() > t, n))(e, t, $o)
  const Vo = (e, t, n, r) => {
    const o = e.level() > t ? Go(e, t) : Po(e, [])
    const s = o.state().level() === t ? ((e, t, n) => {
      const r = e.level() > 0 ? Wo(e) : Po(e, [])
      const o = zo(r.state(), n, t)
      return Bo([r, o])
    }
    )(o.state(), r, n) : ((e, t, n, r) => {
      const o = n > 1 ? Fo(e) : Ro(e, O.none())
      const s = o.value().map(e => [x(yo, e)]).getOr([])
      const a = ((e, t, n, r) => ((e, t, n) => jo(e, e => e.level() < t, n))(e, n, e => ((e, t, n, r) => {
        const o = e.level() === n - 1 && t.type ? {
          'list-style-type': t.type
        } : {}
        const s = Uo(e, t, o)
        const a = zo(s.state(), s.state().level() == n ? r : void 0, t)
        return Bo([s, a])
      }
      )(e, t, n, r)))(o.state(), t, n, r)
      return Po(a.state(), s.concat(a.result()))
    }
    )(o.state(), r, t, n)
    return Bo([o, s])
  }
  const qo = Go
  const Ko = ['disc', 'circle', 'square']
  const Yo = {
    getCurrentListType: () => Xo().getCurrentListType(),
    getCurrentLevel: () => Xo().getCurrentLevel(),
    closeAllLists: () => Xo().closeAllLists(),
    openItem: (e, t, n) => Xo().openItem(e, t, n)
  }
  let Xo = () => ({
    getCurrentListType: v({}),
    getCurrentLevel: v(1),
    closeAllLists: f,
    openItem: y
  })
  const Zo = {
    inside: () => Qo,
    outside: () => es
  }
  const Jo = (() => {
    let e = !1
    return {
      check: t => !(!e || t.type() !== go) || (t.type() === uo && t.tag() === 'style' ? (e = !0,
      !0) : t.type() === po && t.tag() === 'style' && (e = !1,
      !0))
    }
  }
  )()
  const Qo = (e => Lo('Inside.List.Item', [_o((e, t) => {
    const n = e.originalToken.get()
    return t.type() === po && n !== null && t.tag() === n.tag()
  }
  , (t, n) => {
    ko(n, e.outside())
  }
  , 'Closing open tag')], (e, t, n) => {
    e.emit(n)
  }
  ))(Zo)
  const es = (e => Lo('Outside.List.Item', [_o(Do, Co(e), 'Data List ****'), _o((e, t) => t.type() === go && (e => e.type() === go && /^[\s\u00A0]*$/.test(e.text()))(t), (e, t, n) => {
    e.emit(n)
  }
  , 'Whitespace')], (t, n, r) => {
    n.emitter.closeAllLists(),
    t.emit(r),
    ko(n, e.outside())
  }
  ))(Zo)
  const ts = (e => {
    const t = ie(e)
    const n = ie(null)
    const r = ie(null)
    return {
      reset: o => {
        t.set(e),
        n.set(null),
        r.set(null),
        Xo = v(((e, t) => {
          let n = Mo(0, void 0, [], [])
          const r = n => {
            _(n.result(), n => {
              const r = n(t)
              e.emit(r)
            }
            )
          }

          return {
            closeAllLists: () => {
              const e = qo(n, 0)
              n = e.state(),
              r(e)
            },
            openItem: (e, t, o) => {
              if (!o) { return }
              const s = ((e, t) => e.tag === 'ul' && Ko[t - 1] === e.type ? {
                tag: 'ul'
              } : e)(o, e)
              const a = Vo(n, e, t, s)
              n = a.state(),
              r(a)
            },
            getCurrentListType: () => n.type(),
            getCurrentLevel: () => n.level()
          }
        }
        )(o, o.document))
      },
      nextFilter: t,
      originalToken: n,
      listType: r,
      emitter: Yo
    }
  }
  )(es)
  var ns = Eo((e, t, n) => {
    Jo.check(t) || ((e, t, n) => {
      t.nextFilter.get()(e, t, n)
    }
    )(e, ts, t)
  }
  , ts.reset)
  const rs = e => e.dom.textContent
  const os = [{
    regex: /^\(?[dc][\.\)]$/,
    type: {
      tag: 'ol',
      type: 'lower-alpha'
    }
  }, {
    regex: /^\(?[DC][\.\)]$/,
    type: {
      tag: 'ol',
      type: 'upper-alpha'
    }
  }, {
    regex: /^\(?M*(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})[\.\)]$/,
    type: {
      tag: 'ol',
      type: 'upper-roman'
    }
  }, {
    regex: /^\(?m*(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})[\.\)]$/,
    type: {
      tag: 'ol',
      type: 'lower-roman'
    }
  }, {
    regex: /^\(?[0-9]+[\.\)]$/,
    type: {
      tag: 'ol'
    }
  }, {
    regex: /^([0-9]+\.)*[0-9]+\.?$/,
    type: {
      tag: 'ol',
      variant: 'outline'
    }
  }, {
    regex: /^\(?[a-z]+[\.\)]$/,
    type: {
      tag: 'ol',
      type: 'lower-alpha'
    }
  }, {
    regex: /^\(?[A-Z]+[\.\)]$/,
    type: {
      tag: 'ol',
      type: 'upper-alpha'
    }
  }]
  const ss = {
    '\u2022': {
      tag: 'ul',
      type: 'disc'
    },
    '\xb7': {
      tag: 'ul',
      type: 'disc'
    },
    '\xa7': {
      tag: 'ul',
      type: 'square'
    }
  }
  const as = {
    o: {
      tag: 'ul',
      type: 'circle'
    },
    '-': {
      tag: 'ul',
      type: 'disc'
    },
    '\u25cf': {
      tag: 'ul',
      type: 'disc'
    },
    '\ufffd': {
      tag: 'ul',
      type: 'circle'
    }
  }
  const is = (e, t) => m(e.variant) ? t.charAt(0) === '(' ? '()' : t.charAt(t.length - 1) === ')' ? ')' : '.' : e.variant
  const ls = e => {
    const t = e.split('.')
    const n = (() => {
      if (t.length === 0) { return e }
      const n = t[t.length - 1]
      return n.length === 0 && t.length > 1 ? t[t.length - 2] : n
    }
    )()
    const r = parseInt(n, 10)
    return isNaN(r) ? {} : {
      start: r
    }
  }
  const cs = e => {
    const t = (e => oo(e, ['mso-list'], I)['mso-list'])(e)
    const n = u(t) && / level([0-9]+)/.exec(t)
    return n && n[1] ? O.some(parseInt(n[1], 10)) : O.none()
  }
  const ms = (e, t) => {
    const n = ((e, t) => {
      const n = as[e] ? [as[e]] : []
      const r = ((e, t) => t && ss[e] ? [ss[e]] : t ? [{
        tag: 'ul',
        variant: e
      }] : [])(e, t)
      const o = U(os, t => t.regex.test(e) ? [Zr(t.type, ls(e), {
        variant: is(t.type, e)
      })] : [])
      const s = n.concat(r).concat(o)
      return C(s, t => void 0 !== t.variant ? t : Zr(t, {
        variant: e
      }))
    }
    )(rs(e).trim(), t)
    return n.length > 0 ? O.some(n) : O.none()
  }
  const ds = e => Zn(e, Ie).bind(Ht).filter(Ne('span'))
  const us = e => Jn(e, e => !!(Se(e) ? oo(e, ['mso-list'], I) : {})['mso-list'])
  const ps = e => Se(e) && $n(e, 'font-family').exists(e => D(['wingdings', 'symbol'], e.toLowerCase()))
  const gs = (e, t, n, r) => {
    ((e, t, n) => {
      In(e, 'data-list-level', t)
      const r = JSON.stringify(n)
      In(e, 'data-list-emblems', r)
    }
    )(e, t, n),
    (e => {
      const t = ((e, t) => {
        const n = t.getOr(S)
        return (e => {
          const t = []
          for (; e.nextNode() !== null;) { t.push(_e.fromDom(e.currentNode)) }
          return t
        }
        )(document.createTreeWalker(e.dom, NodeFilter.SHOW_COMMENT, {
          acceptNode: e => n(e.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
        }))
      }
      )(e, O.none())
      _(t, vn)
    }
    )(e),
    _(r, vn),
    Nn(e, 'style'),
    Nn(e, 'class')
  }
  const fs = e => (e => cs(e).bind(t => (e => Zn(e, ps))(e).bind(n => ms(n, !0).map(r => ({
    mutate: () => {
      gs(e, t, r, [n])
    }
  })))))(e).orThunk(() => (e => cs(e).bind(t => ds(e).bind(n => ms(n, ps(n)).map(r => ({
    mutate: () => {
      gs(e, t, r, [n])
    }
  })))))(e)).orThunk(() => (e => cs(e).bind(t => ds(e).bind(n => ms(n, ps(n)).map(r => ({
    mutate: () => {
      gs(e, t, r, [n])
    }
  })))))(e)).orThunk(() => (e => xe(e) !== 'p' ? O.none() : cs(e).bind(t => us(e).bind(n => ms(n, !1).map(r => ({
    mutate: () => {
      gs(e, t, r, [jt(n).getOr(n)])
    }
  })))))(e)).orThunk(() => (e => xe(e) !== 'p' ? O.none() : us(e).bind(t => {
    const n = jt(t).getOr(t)
    const r = ps(n)
    return ms(t, r).bind(t => (e => $n(e, 'margin-left').bind(e => {
      const t = parseInt(e, 10)
      return isNaN(t) ? O.none() : O.some(Math.max(1, Math.ceil(t / 18)))
    }
    ))(e).map(r => ({
      mutate: () => {
        gs(e, r, t, [n])
      }
    })))
  }
  ))(e))
  const hs = Io({
    tags: [{
      name: no.pattern(/^(p|h\d+)$/, no.caseInsensitive),
      mutate: e => {
        fs(e).each(e => {
          e.mutate()
        }
        )
      }
    }]
  })
  const vs = ns
  const ys = e => {
    return (o = e,
    Ie(o) ? (t = o,
    n = 'v:shape',
    O.from((r = t,
    r.dom.nodeValue)).bind(e => {
      const t = e.indexOf(']>')
      const r = (e => {
        try {
          return (new DOMParser()).parseFromString(e, 'text/html').body
        } catch (t) {
          const n = document.implementation.createHTMLDocument('').body
          return n.innerHTML = e,
          n
        }
      }
      )(`<div>${e.slice(t + ']>'.length, e.lastIndexOf('<!['))}</div>`)
      return Jn(_e.fromDom(r), e => xe(e) === n)
    }
    )) : O.none()).map(e => {
      const t = On(e, 'o:spid')
      const n = void 0 === t ? En(e, 'id').getOr('') : t
      const r = _e.fromTag('img')
      return _n(r, 'rtf-data-image'),
      In(r, 'data-image-id', n.substr('_x0000_'.length)),
      In(r, 'data-image-type', 'code'),
      ((e, t) => {
        const n = e.dom
        Re(t, (e, t) => {
          e.fold(() => {
            Un(n, t)
          }
          , e => {
            jn(n, t, e)
          }
          )
        }
        )
      }
      )(r, {
        width: $n(e, 'width'),
        height: $n(e, 'height')
      }),
      r
    }
    )
    var t, n, r, o
  }
  const bs = e => {
    if (Ne('img')(e)) {
      const t = On(e, 'src')
      if (t != null && ue(t, 'file://')) {
        const n = (e => ((e, t) => _e.fromDom(e.dom.cloneNode(!1)))(e))(e)
        const r = t.split(/[\/\\]/)
        const o = r[r.length - 1]
        return In(n, 'data-image-id', o),
        Nn(n, 'src'),
        In(n, 'data-image-type', 'local'),
        _n(n, 'rtf-data-image'),
        O.some(n)
      }
      return O.none()
    }
    return O.none()
  }

  var xs
  !(function (e) {
    e[e.Word = 0] = 'Word',
    e[e.GoogleDocs = 1] = 'GoogleDocs',
    e[e.Html = 2] = 'Html'
  }(xs || (xs = {})))
  const ws = e => t => {
    En(t, e.attrName).each(n => {
      const r = u(e.styleName) ? e.styleName : e.attrName
      if ($n(t, r).isNone()) {
        const o = e.mapValue(n)
        Hn(t, r, o)
      }
      Nn(t, e.attrName)
    }
    )
  }
  const Ts = e => {
    const t = xe(e)
    return t === 'td' || t === 'tr' || t === 'col' || t === 'th'
  }
  const Is = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  const Ss = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
  const Os = e => me(e, '#').toUpperCase()
  const Es = e => {
    const t = e.toString(16)
    return (t.length === 1 ? '0' + t : t).toUpperCase()
  }
  const ks = e => (e => ({
    value: e
  }))(Es(e.red) + Es(e.green) + Es(e.blue))
  const Ns = /^\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/i
  const Ds = /^\s*rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d?(?:\.\d+)?)\s*\)\s*$/i
  const As = (e, t, n, r) => ({
    red: e,
    green: t,
    blue: n,
    alpha: r
  })
  const Cs = (e, t, n, r) => {
    const o = parseInt(e, 10)
    const s = parseInt(t, 10)
    const a = parseInt(n, 10)
    const i = parseFloat(r)
    return As(o, s, a, i)
  }
  const _s = ['background-repeat-x', 'background-repeat-y']
  const Ls = e => {
    return e === 'currentcolor' || e === 'transparent' ? e : '#' + (t = me(e, '#').toUpperCase(),
    (e => Is.test(e) || Ss.test(e))(t) ? O.some({
      value: Os(t)
    }) : O.none()).orThunk(() => (e => {
      if (e === 'transparent') { return O.some(As(0, 0, 0, 0)) }
      const t = Ns.exec(e)
      if (t !== null) { return O.some(Cs(t[1], t[2], t[3], '1')) }
      const n = Ds.exec(e)
      return n !== null ? O.some(Cs(n[1], n[2], n[3], n[4])) : O.none()
    }
    )(e).map(ks)).getOrThunk(() => {
      const t = document.createElement('canvas')
      t.height = 1,
      t.width = 1
      const n = t.getContext('2d')
      n.clearRect(0, 0, t.width, t.height),
      n.fillStyle = '#FFFFFF',
      n.fillStyle = e,
      n.fillRect(0, 0, 1, 1)
      const r = n.getImageData(0, 0, 1, 1).data
      const o = r[0]
      const s = r[1]
      const a = r[2]
      const i = r[3]
      return ks(As(o, s, a, i))
    }
    ).value
    var t
  }
  const Ps = (e, t) => {
    if (m(e)) { return '' }
    switch (t) {
      case 'color':
        return Ls(e)
      case 'font-family':
        return e.replace(/['"]/g, '')
      case 'font-weight':
        return (e => {
          switch (e) {
            case 'bold':
              return '700'
            case 'normal':
              return '400'
            default:
              return e
          }
        }
        )(e)
      default:
        return pe(t, '-color') ? Ls(e) : (e => e.replace(/^0(pt|px|pc|in|cm|mm|Q|cap|ch|ic|em|ex|lh|rlh|rem|vw|vh|vb|vi|vmax|vmin|%)$/, '0'))(e)
    }
  }
  const Rs = Io({
    tags: [{
      name: no.pattern(/^(p|div)$/, no.caseInsensitive),
      mutate: e => {
        const t = qn(e) === 'ltr'
        const n = t ? 'margin-left' : 'margin-right'
        const r = t ? 'padding-left' : 'padding-right'
        $n(e, n).each(() => {
          const t = Wn(e, n)
          Hn(e, r, t),
          Vn(e, n)
        }
        )
      }
    }]
  })
  const Ms = To({
    tags: [{
      name: no.exact('b', no.caseInsensitive),
      condition: e => En(e, 'id').exists(e => ue(e, 'docs-internal-guid'))
    }]
  })
  const Fs = wo({
    attributes: [{
      name: no.exact('id', no.caseInsensitive),
      value: no.starts('docs-internal-guid', no.caseInsensitive)
    }]
  })
  const js = [Io({
    tags: [{
      name: no.exact('col', no.caseInsensitive),
      mutate: ws({
        attrName: 'width',
        mapValue: e => e.replace(/^(\d+)$/, '$1px')
      })
    }]
  })]
  const Us = e => Io({
    tags: [{
      name: no.exact(e.matchTag, no.caseInsensitive),
      mutate: t => {
        var n, r;
        (n = Gn(t),
        r = e.key,
        He(n, r) ? O.from(n[r]) : O.none()).exists(t => D(e.values, t)) && (pn(t, _e.fromTag(e.newTag)),
        Vn(t, e.key),
        l(e.removeExtra) && _(e.removeExtra, e => Vn(t, e)))
      }
    }]
  })
  const Hs = [Us({
    matchTag: 'span',
    key: 'font-weight',
    values: ['700', 'bold'],
    newTag: 'strong'
  }), Us({
    matchTag: 'span',
    key: 'font-style',
    values: ['italic'],
    newTag: 'em'
  }), Us({
    matchTag: 'span',
    key: 'vertical-align',
    values: ['sub'],
    newTag: 'sub',
    removeExtra: ['font-size']
  }), Us({
    matchTag: 'span',
    key: 'vertical-align',
    values: ['super'],
    newTag: 'sup',
    removeExtra: ['font-size']
  })]
  const zs = e => t => {
    const n = []
    const r = {
      border: e.browser.isFirefox() ? 'medium none' : 'none',
      'text-decoration': 'none'
    }
    const o = (e, t) => {
      if (!m(t)) {
        const r = _e.fromTag(xe(e))
        un(t, r),
        n.push({
          me: e,
          fake: r
        })
      }
      const r = P(Wt(e), Se)
      _(r, t => o(t, e))
    }

    o(t)
    const s = C(n, e => {
      const { fake: t, me: n } = e
      const o = Gn(n)
      const s = je(o, (e, r) => {
        const o = ((e, t) => D(_s, t) ? $n(e, 'background-repeat') : O.none())(n, r).getOr(e)
        const s = ((e, t) => D(_s, t) ? Wn(e, 'background-repeat') : Wn(e, t))(t, r)
        return Ps(o, r) === Ps(s, r)
      }
      )
      const a = je(r, (e, t) => Rn($n(n, t), e))
      return {
        fake: t,
        me: n,
        toRemove: s,
        toPreserve: a
      }
    }
    )
    _(s, e => {
      const { me: t, toRemove: n, toPreserve: r, fake: o } = e
      Re(n, (e, n) => {
        Vn(t, n)
      }
      ),
      Re(r, (e, n) => {
        Hn(t, n, e)
      }
      ),
      vn(o)
    }
    )
  }
  const Ws = ['p', 'div', 'article', 'aside', 'details', 'dt', 'figcaption', 'footer', 'form', 'fieldset', 'header', 'hgroup', 'html', 'main', 'nav', 'section', 'summary', 'body', 'dl', 'multicol', 'dd', 'figure', 'address', 'center', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'listing', 'xmp', 'pre', 'plaintext', 'menu', 'dir', 'ul', 'ol', 'li', 'hr', 'table', 'tbody', 'thead', 'tfoot', 'th', 'tr', 'td', 'caption']
  const Bs = wo({
    styles: [{
      name: no.exact('background-color', no.caseInsensitive),
      value: no.exact('transparent', no.caseInsensitive)
    }, {
      name: no.exact('white-space', no.caseInsensitive),
      value: no.starts('pre', no.caseInsensitive)
    }, {
      name: no.pattern(/^overflow(-[xy])?$/, no.caseInsensitive),
      condition: e => Ts(e) && Rn($n(e, 'overflow'), 'hidden')
    }, {
      name: no.exact('overflow-wrap', no.caseInsensitive),
      condition: Ts
    }, {
      name: no.exact('table-layout', no.caseInsensitive),
      value: no.exact('fixed', no.caseInsensitive),
      condition: Ne('table')
    }, {
      name: no.exact('line-height', no.caseInsensitive),
      value: no.exact('1.38', no.caseInsensitive)
    }, {
      name: no.exact('vertical-align', no.caseInsensitive),
      value: no.exact('baseline', no.caseInsensitive)
    }, {
      name: no.exact('font-style', no.caseInsensitive),
      value: no.exact('normal', no.caseInsensitive)
    }, {
      name: no.exact('font-variant', no.caseInsensitive),
      value: no.exact('normal', no.caseInsensitive)
    }, {
      name: no.exact('background-color', no.caseInsensitive),
      value: no.exact('transparent', no.caseInsensitive)
    }, {
      name: no.starts('padding', no.caseInsensitive),
      condition: Ts
    }, {
      name: no.pattern(/^text-decoration(-(line|thickness|style|color))?$/, no.caseInsensitive),
      condition: e => !Ne('a')(e) && Rn($n(e, 'text-decoration'), 'none')
    }],
    attributes: [{
      name: no.exact('aria-level', no.caseInsensitive),
      condition: Ne('li')
    }, {
      name: no.exact('dir', no.caseInsensitive),
      value: no.exact('ltr', no.caseInsensitive),
      condition: e => D(Ws, xe(e))
    }, {
      name: no.exact('role', no.caseInsensitive),
      value: no.exact('presentation', no.caseInsensitive),
      condition: e => Ne('p')(e) && jt(e).exists(Ne('li'))
    }]
  })
  const $s = wo({
    styles: [{
      name: no.exact('text-align', no.caseInsensitive),
      value: no.exact('right', no.caseInsensitive),
      condition: e => qn(e) === 'rtl'
    }]
  })
  const Gs = Io({
    tags: [{
      name: no.exact('p', no.caseInsensitive),
      condition: e => {
        const t = t => $n(e, t).map(e => parseInt(e, 10)).filter(e => !isNaN(e)).getOr(0)
        const n = qn(e)
        return t('text-indent') + t(n === 'rtl' ? 'padding-right' : 'padding-left') === 0
      },
      mutate: e => {
        const t = qn(e)
        Vn(e, 'text-indent'),
        Vn(e, t === 'rtl' ? 'padding-right' : 'padding-left')
      }
    }]
  })
  const Vs = e => t => Pn(t, e)
  const qs = he(Oe, 'text')
  const Ks = e => qs.get(e)
  const Ys = e => {
    const t = e.dom.attributes
    return t == null || t.length === 0 || t.length === 1 && t[0].name === 'style'
  }
  const Xs = (e, t) => {
    const n = _e.fromTag(e)
    cn(t, n)
    const r = t.dom.attributes
    _(r, e => {
      n.dom.setAttribute(e.name, e.value)
    }
    )
    const o = Wt(t)
    return fn(n, o),
    vn(t),
    n
  }
  const Zs = Ne('li')
  const Js = e => Ut(e).bind(e => Oe(e) && Ks(e).trim().length === 0 ? Js(e) : Zs(e) ? O.some(e) : O.none())
  const Qs = e => {
    const t = Xs('span', e)
    const n = {
      'font-size': {
        1: '8pt',
        2: '10pt',
        3: '12pt',
        4: '14pt',
        5: '18pt',
        6: '24pt',
        7: '36pt'
      }
    }
    Re({
      face: 'font-family',
      size: 'font-size',
      color: 'color'
    }, (e, r) => {
      En(t, r).each(o => {
        const s = n[e]
        const a = void 0 !== s && void 0 !== s[o] ? s[o] : o
        Hn(t, e, a),
        Nn(t, r)
      }
      )
    }
    )
  }
  const ea = wo({
    tags: [{
      name: no.exact('script', no.caseInsensitive)
    }, {
      name: no.exact('link', no.caseInsensitive)
    }, {
      name: no.exact('style', no.caseInsensitive),
      condition: e => Yn(e).length === 0
    }],
    attributes: [{
      name: no.starts('on', no.caseInsensitive)
    }, {
      name: no.exact('"', no.caseInsensitive)
    }, {
      name: no.exact('lang', no.caseInsensitive)
    }, {
      name: no.exact('language', no.caseInsensitive)
    }],
    styles: [{
      name: no.all(),
      value: no.pattern(/OLE_LINK/i, no.caseInsensitive)
    }]
  })
  const ta = wo({
    tags: [{
      name: no.exact('meta', no.caseInsensitive)
    }]
  })
  const na = wo({
    tags: [{
      name: no.exact('style', no.caseInsensitive)
    }]
  })
  const ra = wo({
    styles: [{
      name: no.not(no.pattern(/^(width|height|list-style-type)$/, no.caseInsensitive)),
      condition: e => !Pn(e, 'ephox-limbo-transform')
    }, {
      name: no.pattern(/^(width|height)$/, no.caseInsensitive),
      condition: e => {
        return (e => xe(e) !== 'img')(e) && !(xe(t = e) === 'table' || Ts(t))
        var t
      }
    }]
  })
  const oa = (e = []) => {
    const t = C(e, e => ({
      name: no.exact(e, no.caseInsensitive)
    }))
    return To({
      tags: t
    })
  }
  const sa = wo({
    classes: [{
      name: no.not(no.exact('rtf-data-image', no.caseInsensitive))
    }]
  })
  const aa = wo({
    styles: [{
      name: no.pattern(/^(mso-.*|tab-stops|tab-interval|language|text-underline|text-effect|text-line-through|font-color|horiz-align|list-image-[0-9]+|separator-image|table-border-color-(dark|light)|vert-align|vnd\..*)$/, no.caseInsensitive)
    }]
  })
  const ia = wo({
    classes: [{
      name: no.pattern(/mso/i, no.caseInsensitive)
    }]
  })
  const la = To({
    tags: [{
      name: no.exact('img', no.caseInsensitive),
      condition: e => {
        const t = On(e, 'src')
        return a(t) && /^file:/.test(t)
      }
    }]
  })
  const ca = To({
    tags: [{
      name: no.exact('a', no.caseInsensitive),
      condition: Ys
    }]
  })
  const ma = wo({
    attributes: [{
      name: no.exact('style', no.caseInsensitive),
      value: no.exact('', no.caseInsensitive)
    }]
  })
  const da = wo({
    attributes: [{
      name: no.exact('class', no.caseInsensitive),
      value: no.exact('', no.caseInsensitive)
    }]
  })
  const ua = To({
    tags: [{
      name: no.pattern(/^(font|em|strong|samp|acronym|cite|code|dfn|kbd|tt|b|i|u|s|sub|sup|ins|del|var|span)$/, no.caseInsensitive),
      condition: (pa = e => !Ys(e) || (e => {
        const t = e.dom.attributes
        const n = t != null && t.length > 0
        return xe(e) !== 'span' || n
      }
      )(e) && Jn(e, e => {
        const t = !Ys(e)
        const n = !D(['font', 'em', 'strong', 'samp', 'acronym', 'cite', 'code', 'dfn', 'kbd', 'tt', 'b', 'i', 'u', 's', 'sub', 'sup', 'ins', 'del', 'var', 'span'], xe(e))
        return Oe(e) || t || n
      }
      ).isSome(),
      e => !pa(e))
    }]
  })
  var pa
  const ga = Io({
    tags: [{
      name: no.exact('p', no.caseInsensitive),
      mutate: e => {
        Yn(e).length === 0 && un(e, _e.fromTag('br'))
      }
    }]
  })
  const fa = e => {
    const t = Xs('span', e)
    _n(t, 'ephox-limbo-transform'),
    Hn(t, 'text-decoration', 'underline')
  }
  const ha = Io({
    tags: [{
      name: no.pattern(/ol|ul/, no.caseInsensitive),
      mutate: e => {
        jt(e).each(t => {
          const n = xe(t)
          D(['ol', 'ul'], n) && Js(e).fold(() => {
            const t = _e.fromTag('li')
            Hn(t, 'list-style-type', 'none'),
            pn(e, t)
          }
          , t => {
            un(t, e)
          }
          )
        }
        )
      }
    }]
  })
  const va = e => {
    const t = [{
      name: 'b',
      transform: {
        mutate: x(Xs, 'strong')
      }
    }, {
      name: 'i',
      transform: {
        mutate: x(Xs, 'em')
      }
    }, {
      name: 'u',
      transform: {
        mutate: fa
      }
    }, {
      name: 's',
      transform: {
        mutate: x(Xs, 'strike')
      }
    }, {
      name: 'font',
      transform: {
        mutate: Qs,
        debug: !0
      }
    }]
    const n = P(t, t => !D(e, t.name)).map(e => ({
      name: no.exact(e.name, no.caseInsensitive),
      ...e.transform
    }))
    return Io({
      tags: n
    })
  }
  const ya = wo({
    classes: [{
      name: no.exact('ephox-limbo-transform', no.caseInsensitive)
    }]
  })
  const ba = wo({
    tags: [{
      name: no.exact('br', no.caseInsensitive),
      condition: Vs('Apple-interchange-newline')
    }]
  })
  const xa = wo({
    styles: [{
      name: no.pattern(/^-/, no.caseInsensitive)
    }, {
      name: no.all(),
      value: no.exact('initial', no.caseInsensitive)
    }, {
      name: no.exact('background-color', no.caseInsensitive),
      value: no.exact('transparent', no.caseInsensitive)
    }, {
      name: no.exact('font-style', no.caseInsensitive),
      value: no.exact('normal', no.caseInsensitive)
    }, {
      name: no.pattern(/font-variant.*/, no.caseInsensitive)
    }, {
      name: no.exact('letter-spacing', no.caseInsensitive)
    }, {
      name: no.exact('font-weight', no.caseInsensitive),
      value: no.pattern(/400|normal/, no.caseInsensitive)
    }, {
      name: no.exact('orphans', no.caseInsensitive)
    }, {
      name: no.exact('text-decoration', no.caseInsensitive),
      value: no.exact('none', no.caseInsensitive)
    }, {
      name: no.exact('text-size-adjust', no.caseInsensitive)
    }, {
      name: no.exact('text-indent', no.caseInsensitive),
      value: no.exact('0px', no.caseInsensitive)
    }, {
      name: no.exact('text-transform', no.caseInsensitive),
      value: no.exact('none', no.caseInsensitive)
    }, {
      name: no.exact('white-space', no.caseInsensitive),
      value: no.exact('normal', no.caseInsensitive)
    }, {
      name: no.exact('widows', no.caseInsensitive)
    }, {
      name: no.exact('word-spacing', no.caseInsensitive),
      value: no.exact('0px', no.caseInsensitive)
    }, {
      name: no.exact('text-align', no.caseInsensitive),
      value: no.pattern(/start|end/, no.caseInsensitive)
    }, {
      name: no.exact('font-weight', no.caseInsensitive),
      value: no.pattern(/700|bold/, no.caseInsensitive),
      condition: e => /^h\d$/.test(xe(e))
    }]
  })
  const wa = (() => {
    const e = (e, t) => n => e(n).filter(e => Oe(n) && t(rs(e) || '', ' ')).isSome()
    const t = e(Ut, pe)
    const n = e(Ht, ue)
    return Io({
      tags: [{
        name: no.exact('span', no.caseInsensitive),
        condition: Vs('Apple-converted-space'),
        mutate: e => {
          rs(e) === '\xa0' && (t(e) || n(e) ? yn(e) : (cn(e, _e.fromText(' ')),
          vn(e)))
        }
      }]
    })
  }
  )()
  const Ta = (() => {
    const e = /^file:\/\/\/[^#]+(#[^#]+)$/
    return Io({
      tags: [{
        name: no.exact('a', no.caseInsensitive),
        condition: t => {
          const n = On(t, 'href')
          return !!n && e.test(n)
        },
        mutate: t => {
          En(t, 'href').each(n => {
            In(t, 'href', n.replace(e, '$1'))
          }
          )
        }
      }]
    })
  }
  )()
  const Ia = wo({
    attributes: [{
      name: no.exact('href', no.caseInsensitive),
      value: no.starts('file:///', no.caseInsensitive)
    }]
  })
  const Sa = (() => {
    const e = (e, t, n) => ({
      name: no.exact(e, no.caseInsensitive),
      condition: e => kn(e, t),
      mutate: e => {
        En(e, t).each(r => {
          In(e, n, r),
          Nn(e, t)
        }
        )
      }
    })
    return Io({
      tags: [e('a', 'data-ephox-href', 'href'), e('img', 'data-ephox-src', 'src')]
    })
  }
  )()
  const Oa = e => {
    const t = ['table', 'thead', 'tbody', 'tfoot', 'th', 'tr', 'td', 'ul', 'ol', 'li']
    const n = Kt(e, Ie)
    const r = M(n, e => de(Ae(e), 'StartFragment'))
    const o = M(n, e => de(Ae(e), 'EndFragment'))
    r.each(n => {
      o.each(r => {
        let o = n
        const s = []
        let a = ((e, t, n, r) => {
          const o = tn(e, 0, n, 0)
          return _e.fromDom(o.commonAncestorContainer)
        }
        )(n, 0, r)
        for (; void 0 !== a && !kt(a, e);) {
          D(t, xe(a)) ? o = a : s.push(a),
          a = jt(a).getOrUndefined()
        }
        _(s, yn),
        _(zt(o), vn)
      }
      ),
      vn(n)
    }
    ),
    o.each(vn)
  }
  const Ea = Io({
    tags: [{
      name: no.pattern(/^(img|table)$/, no.caseInsensitive),
      mutate: e => {
        $n(e, 'margin-left').exists(e => ue(e, '-')) && Vn(e, 'margin-left'),
        ue(Wn(e, 'margin-left'), '-') && (Hn(e, 'margin-top', Wn(e, 'margin-top')),
        Hn(e, 'margin-bottom', Wn(e, 'margin-bottom')),
        Hn(e, 'margin-right', Wn(e, 'margin-right')),
        Vn(e, 'margin'))
      }
    }]
  })
  const ka = Io({
    tags: [{
      name: no.exact('p', no.caseInsensitive),
      mutate: ws({
        attrName: 'align',
        styleName: 'text-align',
        mapValue: y
      })
    }]
  })
  const Na = (e, t) => {
    return (n = e,
    qs.getOption(n)).exists(e => t(e).length === 0)
    var n
  }
  const Da = wo({
    tags: [{
      name: no.exact('font', no.caseInsensitive),
      condition: e => {
        const t = Wt(e)
        const n = e => e.replace(/[ \r\n\uFEFF]+/g, '')
        return t.length === 0 || H(t, e => Na(e, n))
      }
    }]
  })
  const Aa = e => _(Wt(e), e => {
    Na(e, ge) && vn(e)
  }
  )
  const Ca = Io({
    tags: [{
      name: no.exact('ol', no.caseInsensitive),
      mutate: Aa
    }, {
      name: no.exact('ul', no.caseInsensitive),
      mutate: Aa
    }]
  })
  const _a = To({
    tags: [{
      name: no.pattern(/^([OVWXP]|U[0-9]+|ST[0-9]+):/i, no.caseInsensitive)
    }]
  })
  const La = [So([vs])]
  const Pa = wo({
    attributes: [{
      name: no.exact('height', no.caseInsensitive),
      condition: Ne('table')
    }]
  })
  const Ra = wo({
    attributes: [{
      name: no.pattern(/^(width|height)$/, no.caseInsensitive),
      condition: Ts
    }]
  })
  const Ma = Io({
    tags: [{
      name: no.exact('table', no.caseInsensitive),
      mutate: ws({
        attrName: 'width',
        mapValue: e => e.replace(/^(\d+)$/, '$1px')
      })
    }]
  })
  const Fa = wo({
    styles: [{
      name: no.exact('height', no.caseInsensitive),
      condition: Ne('td')
    }, {
      name: no.exact('width', no.caseInsensitive),
      condition: Ne('tr')
    }, {
      name: no.exact('height', no.caseInsensitive),
      condition: Ne('col')
    }]
  })
  const ja = wo({
    attributes: [{
      name: no.pattern(/^v:/, no.caseInsensitive)
    }, {
      name: no.exact('href', no.caseInsensitive),
      value: no.contains('#_toc', no.caseInsensitive)
    }, {
      name: no.exact('href', no.caseInsensitive),
      value: no.contains('#_mso', no.caseInsensitive)
    }, {
      name: no.pattern(/^xmlns(:|$)/, no.caseInsensitive)
    }, {
      name: no.exact('type', no.caseInsensitive),
      condition: e => xe(e) === 'ol' || xe(e) === 'ul'
    }]
  })
  To({
    tags: [{
      name: no.exact('p', no.caseInsensitive),
      condition: ('li',
      e => jt(e).exists(e => xe(e) === 'li' && Wt(e).length === 1))
    }]
  }),
  Io({
    tags: [{
      name: no.pattern(/^(img|table)$/, no.caseInsensitive),
      mutate: e => {
        $n(e, 'margin-left').exists(e => ue(e, '-')) && Vn(e, 'margin-left'),
        ue(Wn(e, 'margin-left'), '-') && (Hn(e, 'margin-top', Wn(e, 'margin-top')),
        Hn(e, 'margin-bottom', Wn(e, 'margin-bottom')),
        Hn(e, 'margin-right', Wn(e, 'margin-right')),
        Vn(e, 'margin'))
      }
    }]
  })
  const Ua = e => {
    const t = [ka, aa, ia]
    const n = [ka, ra, oa(e.cleanFilteredInlineElements), sa]
    return e.merge ? t : n
  }
  const Ha = e => e.type === xs.Word ? [hs] : []
  const za = e => e.type === xs.Word ? [_a, ...La, ja] : []
  const Wa = e => e.type === xs.GoogleDocs ? [Ms] : []
  const Ba = e => e.type !== xs.GoogleDocs || e.indentUseMargin ? [] : [Rs]
  const $a = (e, t) => e.type === xs.GoogleDocs ? [Bs, ...Hs, ...js, zs(t), $s, Gs, ...Ba(e)] : []
  const Ga = e => e.type === xs.Html && e.merge ? [xa] : []
  const Va = e => e.type === xs.Word ? [Fa, Ma, Ra, Pa] : []
  Ct([{
    bothErrors: ['error1', 'error2']
  }, {
    firstError: ['error1', 'value2']
  }, {
    secondError: ['value1', 'error2']
  }, {
    bothValues: ['value1', 'value2']
  }])
  const qa = (e, t) => Xa(document.createElement('canvas'), e, t)
  const Ka = e => {
    const t = qa(e.width, e.height)
    return Ya(t).drawImage(e, 0, 0),
    t
  }
  const Ya = e => e.getContext('2d')
  const Xa = (e, t, n) => (e.width = t,
  e.height = n,
  e)
  const Za = e => e.naturalWidth || e.width
  const Ja = e => e.naturalHeight || e.height
  const Qa = e => fetch(e).then(e => e.ok ? e.blob() : Promise.reject(new Error('Error ' + e.status + ' downloading image')), () => Promise.reject((() => {
    const e = new Error('No access to download image')
    return e.code = 18,
    e.name = 'SecurityError',
    e
  }
  )()))
  const ei = e => {
    const t = e.split(',')
    const n = /data:([^;]+)/.exec(t[0])
    if (!n) { return O.none() }
    const r = n[1]
    const o = t[1]
    const s = 1024
    const a = atob(o)
    const i = a.length
    const l = Math.ceil(i / s)
    const c = new Array(l)
    for (let e = 0; e < l; ++e) {
      const t = e * s
      const n = Math.min(t + s, i)
      const r = new Array(n - t)
      for (let e = t, o = 0; e < n; ++o,
      ++e) { r[o] = a[e].charCodeAt(0) }
      c[e] = new Uint8Array(r)
    }
    return O.some(new Blob(c, {
      type: r
    }))
  }
  const ti = e => new Promise((t, n) => {
    ei(e).fold(() => {
      n('uri is not base64: ' + e)
    }
    , t)
  }
  )
  const ni = (e, t, n) => (t = t || 'image/png',
  p(HTMLCanvasElement.prototype.toBlob) ? new Promise((r, o) => {
    e.toBlob(e => {
      e ? r(e) : o()
    }
    , t, n)
  }
  ) : ti(e.toDataURL(t, n)))
  const ri = e => (e => {
    const t = URL.createObjectURL(e)
    const n = new Image()
    return n.src = t,
    (e => new Promise((t, n) => {
      const r = () => {
        s(),
        t(e)
      }
      const o = [Ar(e, 'load', r), Ar(e, 'error', () => {
        s(),
        n('Unable to load data from image: ' + e.dom.src)
      }
      )]
      const s = () => _(o, e => e.unbind())
      e.dom.complete && r()
    }
    ))(_e.fromDom(n)).then(e => e.dom)
  }
  )(e).then(e => {
    si(e)
    const t = qa(Za(e), Ja(e))
    return Ya(t).drawImage(e, 0, 0),
    t
  }
  )
  const oi = e => new Promise(t => {
    const n = new FileReader()
    n.onloadend = () => {
      t(n.result)
    }
    ,
    n.readAsDataURL(e)
  }
  )
  const si = e => {
    URL.revokeObjectURL(e.src)
  }
  const ai = (e, t, n) => {
    const r = t.type
    const o = v(r)
    const s = v(n)
    const a = (t, n) => e.then(e => ((e, t, n) => (t = t || 'image/png',
    e.toDataURL(t, n)))(e, t, n))
    return {
      getType: o,
      toBlob: () => Promise.resolve(t),
      toDataURL: s,
      toBase64: () => n.split(',')[1],
      toAdjustedBlob: (t, n) => e.then(e => ni(e, t, n)),
      toAdjustedDataURL: a,
      toAdjustedBase64: (e, t) => a(e, t).then(e => e.split(',')[1]),
      toCanvas: () => e.then(Ka)
    }
  }
  const ii = (e, t) => ni(e, t).then(t => ai(Promise.resolve(e), t, e.toDataURL()))
  const li = (e, t, n) => {
    const r = Za(e)
    const o = Ja(e)
    let s = t / r
    let a = n / o
    let i = !1;
    (s < 0.5 || s > 2) && (s = s < 0.5 ? 0.5 : 2,
    i = !0),
    (a < 0.5 || a > 2) && (a = a < 0.5 ? 0.5 : 2,
    i = !0)
    const l = ci(e, s, a)
    return i ? l.then(e => li(e, t, n)) : l
  }
  const ci = (e, t, n) => new Promise(r => {
    const o = Za(e)
    const s = Ja(e)
    const a = Math.floor(o * t)
    const i = Math.floor(s * n)
    const l = qa(a, i)
    Ya(l).drawImage(e, 0, 0, o, s, 0, 0, a, i),
    r(l)
  }
  )
  const mi = (e, t = 2) => {
    const n = Math.pow(10, t)
    const r = Math.round(e * n)
    return Math.ceil(r / n)
  }
  const di = (e, t, n, r, o) => ((e, t, n, r, o) => e.toCanvas().then(s => ((e, t, n, r, o, s) => {
    const a = qa(o, s)
    return Ya(a).drawImage(e, -n, -r),
    ii(a, t)
  }
  )(s, e.getType(), t, n, r, o)))(e, t, n, r, o)
  const ui = (e, t) => ((e, t) => e.toCanvas().then(n => ((e, t, n) => {
    const r = (n < 0 ? 360 + n : n) * Math.PI / 180
    const o = e.width
    const s = e.height
    const a = Math.sin(r)
    const i = Math.cos(r)
    const l = mi(Math.abs(o * i) + Math.abs(s * a))
    const c = mi(Math.abs(o * a) + Math.abs(s * i))
    const m = qa(l, c)
    const d = Ya(m)
    return d.translate(l / 2, c / 2),
    d.rotate(r),
    d.drawImage(e, -o / 2, -s / 2),
    ii(m, t)
  }
  )(n, e.getType(), t)))(e, t)
  const pi = (e, t) => ((e, t) => ai(ri(e), e, t))(e, t)
  const gi = e => (e => (e => {
    const t = e.src
    return t.indexOf('data:') === 0 ? ti(t) : Qa(t)
  }
  )(e).then(e => (e => oi(e).then(t => ai(ri(e), e, t)))(e)))(e)
  const fi = e => e.toBlob()
  const hi = e => e.toDataURL()
  const vi = e => parseInt(e, 10)
  const yi = e => e.isPx && (e.cropWidth !== e.width || e.cropHeight !== e.height)
  const bi = /rotate\((\d\.\d+)rad\)/
  const xi = (e, t, n) => gi(e.dom).then((e => t => ((e, t, n) => ((e, t, n) => e.toCanvas().then(r => li(r, t, n).then(t => ii(t, e.getType()))))(e, t, n))(t, e.width, e.height))(t)).then(((e, t) => n => {
    if (yi(t)) {
      const r = -1 * vi(Wn(e, 'margin-top'))
      const o = -1 * vi(Wn(e, 'margin-left'))
      return di(n, o, r, t.cropWidth, t.cropHeight).then(n => (Sn(e, {
        width: t.cropWidth,
        height: t.cropHeight
      }),
      n))
    }
    return Promise.resolve(n)
  }
  )(e, t)).then(((e, t) => n => (e => {
    const t = Wn(e, 'transform')
    return O.from(bi.exec(t)).map(e => Math.round(parseFloat(e[1]) * (180 / Math.PI)))
  }
  )(t).fold(() => Promise.resolve(n), r => ui(n, r).then(n => (Vn(t, 'transform'),
  Nn(e, 'width'),
  Nn(e, 'height'),
  n))))(e, n)).then(t => {
    const n = hi(t)
    return In(e, 'src', n),
    Promise.resolve()
  }
  )
  const wi = e => jt(e).filter(Ne('span')).map(t => {
    const n = () => ((e, t) => {
      var n, r, o
      Vn(e, 'margin-top'),
      Vn(e, 'margin-left'),
      Vn(t, 'width'),
      Vn(t, 'height'),
      Vn(t, 'overflow'),
      Vn(t, 'display'),
      r = e,
      o = ['transform'],
      Se(n = t) && Se(r) && _(o, e => {
        ((e, t, n) => {
          $n(e, n).each(e => {
            $n(t, n).isNone() && Hn(t, n, e)
          }
          )
        }
        )(n, r, e)
      }
      ),
      Vn(t, 'transform')
    }
    )(e, t)
    const r = ((e, t) => {
      const n = (e, t) => En(e, t).map(vi).filter(e => !isNaN(e)).getOr(0)
      const r = Wn(t, 'width')
      const o = Wn(t, 'height')
      const s = n(e, 'width')
      const a = n(e, 'height')
      const i = /^\d+px$/
      return {
        isPx: i.test(r) && i.test(o),
        cropWidth: vi(r),
        cropHeight: vi(o),
        width: s,
        height: a
      }
    }
    )(e, t)
    return (yi(r) || bi.test(Wn(t, 'transform')) ? xi(e, r, t) : Promise.resolve()).then(n, n)
  }
  ).getOrThunk(() => Promise.resolve())
  var Ti = ['body', 'p', 'div', 'article', 'aside', 'figcaption', 'figure', 'footer', 'header', 'nav', 'section', 'ol', 'ul', 'li', 'table', 'thead', 'tbody', 'tfoot', 'caption', 'tr', 'td', 'th', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'address']
  const Ii = (e, t) => F(e, e => e.start === t)
  const Si = (e, t, n = 0) => R(e, (e, n) => t(n, e.len).fold(v(e), t => ({
    len: t.finish,
    list: e.list.concat([t])
  })), {
    len: n,
    list: []
  }).list
  const Oi = (e, t, n) => t.length === 0 ? e : U(e, e => {
    const r = U(t, t => ((e, t) => t >= e.start && t <= e.finish)(e, t) ? [t - e.start] : [])
    return r.length > 0 ? ((e, t, n) => ((e, t) => C(e, e => ({
      ...e,
      start: e.start + t,
      finish: e.finish + t
    })))(n(e, t), e.start))(e, r, n) : [e]
  }
  )
  const Ei = (e, t, n) => ({
    element: e,
    start: t,
    finish: n
  })
  const ki = Ct([{
    include: ['item']
  }, {
    excludeWith: ['item']
  }, {
    excludeWithout: ['item']
  }])
  const Ni = {
    include: ki.include,
    excludeWith: ki.excludeWith,
    excludeWithout: ki.excludeWithout,
    cata: (e, t, n, r) => e.fold(t, n, r)
  }
  const Di = Ct([{
    boundary: ['item', 'universe']
  }, {
    empty: ['item', 'universe']
  }, {
    text: ['item', 'universe']
  }, {
    nonEditable: ['item', 'universe']
  }])
  const Ai = I
  const Ci = S
  const _i = v(0)
  const Li = v(1)
  const Pi = e => ({
    ...e,
    isBoundary: () => e.fold(Ci, Ai, Ai, Ai),
    toText: () => e.fold(O.none, O.none, e => O.some(e), O.none),
    is: t => e.fold(Ai, Ai, (e, n) => n.eq(e, t), Ai),
    len: () => e.fold(_i, Li, (e, t) => t.property().getText(e).length, Li)
  })
  const Ri = {
    text: h(Pi, Di.text),
    boundary: h(Pi, Di.boundary),
    empty: h(Pi, Di.empty),
    nonEditable: h(Pi, Di.empty),
    cata: (e, t, n, r, o) => e.fold(t, n, r, o)
  }
  const Mi = v([])
  const Fi = (e, t, n) => {
    if (e.property().isText(t)) { return [Ri.text(t, e)] }
    if (e.property().isEmptyTag(t)) { return [Ri.empty(t, e)] }
    if (e.property().isNonEditable(t)) { return [] }
    if (e.property().isElement(t)) {
      const r = e.property().children(t)
      const o = e.property().isBoundary(t) ? [Ri.boundary(t, e)] : []
      const s = void 0 !== n && n(t) ? [] : U(r, t => Fi(e, t, n))
      return o.concat(s).concat(o)
    }
    return []
  }
  const ji = Fi
  const Ui = (e, t, n) => {
    const r = ((e, t) => {
      const n = []
      let r = []
      return _(e, e => {
        const o = t(e)
        Ni.cata(o, () => {
          r.push(e)
        }
        , () => {
          r.length > 0 && n.push(r),
          n.push([e]),
          r = []
        }
        , () => {
          r.length > 0 && n.push(r),
          r = []
        }
        )
      }
      ),
      r.length > 0 && n.push(r),
      n
    }
    )(U(t, t => ji(e, t, n)), e => e.match({
      boundary: () => Ni.excludeWithout(e),
      empty: () => Ni.excludeWith(e),
      text: () => Ni.include(e),
      nonEditable: () => Ni.excludeWithout(e)
    }))
    return P(r, e => e.length > 0)
  }
  const Hi = (e, t, n) => {
    const r = U(n, e => [e.start, e.finish])
    const o = Oi(t, r, (t, n) => ((e, t, n) => {
      const r = e.property().getText(t)
      const o = P(((e, t) => {
        if (t.length === 0) { return [e] }
        const n = R(t, (t, n) => {
          if (n === 0) { return t }
          const r = e.substring(t.prev, n)
          return {
            prev: n,
            values: t.values.concat([r])
          }
        }
        , {
          prev: 0,
          values: []
        })
        const r = t[t.length - 1]
        return r < e.length ? n.values.concat(e.substring(r)) : n.values
      }
      )(r, n), e => e.length > 0)
      if (o.length <= 1) { return [Ei(t, 0, r.length)] }
      e.property().setText(t, o[0])
      const s = Si(o.slice(1), (t, n) => {
        const r = e.create().text(t)
        const o = Ei(r, n, n + t.length)
        return O.some(o)
      }
      , o[0].length)
      const a = C(s, e => e.element)
      return e.insert().afterAll(t, a),
      [Ei(t, 0, o[0].length)].concat(s)
    }
    )(e, t.element, n))
    return C(n, t => {
      const n = ((e, t, n) => {
        const r = Ii(e, t)
        const o = Ii(e, n)
        return r.bind(t => {
          const r = o.getOr(((e, t) => e[e.length - 1] && e[e.length - 1].finish === t ? e.length + 1 : -1)(e, n))
          return r > -1 ? O.some(e.slice(t, r)) : O.none()
        }
        ).getOr([])
      }
      )(o, t.start, t.finish)
      const r = C(n, e => e.element)
      const s = C(r, e.property().getText).join('')
      return {
        elements: r,
        word: t.word,
        exact: s
      }
    }
    )
  }
  const zi = (e, t, n, r) => {
    const o = Ui(e, t, r)
    const s = U(o, t => {
      const r = U(t, e => e.fold(Mi, Mi, e => [e], Mi))
      const o = ((e, t) => {
        const n = U(t, t => {
          const n = ((e, t) => {
            const n = t.term()
            const r = []
            let o = n.exec(e)
            for (; o;) {
              const s = o.index + t.prefix(o)
              const a = o[0].length - t.prefix(o) - t.suffix(o)
              r.push({
                start: s,
                finish: s + a
              }),
              n.lastIndex = s + a,
              o = n.exec(e)
            }
            return r
          }
          )(e, t.pattern)
          return C(n, e => ({
            ...t,
            ...e
          }))
        }
        )
        return (e => {
          const t = Array.prototype.slice.call(e, 0)
          return t.sort((e, t) => e.start < t.start ? -1 : t.start < e.start ? 1 : 0),
          t
        }
        )(n)
      }
      )(C(r, e.property().getText).join(''), n)
      const s = ((e, t) => Si(t, (t, n) => {
        const r = n + e.property().getText(t).length
        return O.from(Ei(t, n, r))
      }
      ))(e, r)
      return Hi(e, s, o)
    }
    )
    return s
  }
  const Wi = {
    up: v({
      selector: Qn,
      closest: er,
      predicate: Xn,
      all: (e, t) => {
        const n = p(t) ? t : I
        let r = e.dom
        const o = []
        for (; r.parentNode !== null && void 0 !== r.parentNode;) {
          const e = r.parentNode
          const t = _e.fromDom(e)
          if (o.push(t),
          !0 === n(t)) { break }
          r = e
        }
        return o
      }
    }),
    down: v({
      selector: Yt,
      predicate: Kt
    }),
    styles: v({
      get: Wn,
      getRaw: $n,
      set: Hn,
      remove: Vn
    }),
    attrs: v({
      get: On,
      set: In,
      remove: Nn,
      copyTo: (e, t) => {
        const n = R(e.dom.attributes, (e, t) => (e[t.name] = t.value,
        e), {})
        Sn(t, n)
      }
    }),
    insert: v({
      before: cn,
      after: mn,
      afterAll: gn,
      append: un,
      appendAll: fn,
      prepend: dn,
      wrap: pn
    }),
    remove: v({
      unwrap: yn,
      remove: vn
    }),
    create: v({
      nu: _e.fromTag,
      clone: e => _e.fromDom(e.dom.cloneNode(!1)),
      text: _e.fromText
    }),
    query: v({
      comparePosition: (e, t) => e.dom.compareDocumentPosition(t.dom),
      prevSibling: Ut,
      nextSibling: Ht
    }),
    property: v({
      children: Wt,
      name: xe,
      parent: jt,
      document: e => Mt(e).dom,
      isText: Oe,
      isComment: Ie,
      isElement: Se,
      isSpecial: e => {
        const t = xe(e)
        return D(['script', 'noscript', 'iframe', 'noframes', 'noembed', 'title', 'style', 'textarea', 'xmp'], t)
      },
      getLanguage: e => Se(e) ? En(e, 'lang') : O.none(),
      getText: Ks,
      setText: (e, t) => qs.set(e, t),
      isBoundary: e => !!Se(e) && (xe(e) === 'body' || D(Ti, xe(e))),
      isEmptyTag: e => !!Se(e) && D(['br', 'img', 'hr', 'input'], xe(e)),
      isNonEditable: e => Se(e) && On(e, 'contenteditable') === 'false'
    }),
    eq: kt,
    is: Nt
  }
  const Bi = /(?:[A-Za-z][A-Za-z\d.+-]{0,14}:\/\/(?:[-.~*+=!&;:'%@?^${}(),\w]+@)?|www\.|[-;:&=+$,.\w]+@)[A-Za-z\d-]+(?:\.[A-Za-z\d-]+)*(?::\d+)?(?:\/(?:[-.~*+=!;:'%@$(),\/\w]*[-~*+=%@$()\/\w])?)?(?:\?(?:[-.~*+=!&;:'%@?^${}(),\/\w]+))?(?:#(?:[-.~*+=!&;:'%@?^${}(),\/\w]+))?/g.source
  const $i = e => !er(e, 'a', undefined).isSome()
  const Gi = (e, t) => {
    const n = (e => {
      return ((e, t, n) => zi(Wi, e, t, void 0))(e, [{
        word: '__INTERNAL__',
        pattern: (t = Bi,
        ((e, t, n, r) => ({
          term: () => new RegExp(e, r.getOr('g')),
          prefix: t,
          suffix: n
        }))(t, v(0), v(0), O.none()))
      }])
      var t
    }
    )(e)
    _(n, e => {
      const n = e.exact
      if (n.indexOf('@') < 0 || Vi(n)) {
        const r = de(n, '://') ? n : `${t.defaultProtocol}://${n}`;
        ((e, t) => {
          O.from(e[0]).filter($i).map(n => {
            const r = _e.fromTag('a')
            return cn(n, r),
            fn(r, e),
            In(r, 'href', t),
            r
          }
          )
        }
        )(e.elements, r)
      }
    }
    )
  }
  const Vi = e => {
    const t = e.indexOf('://')
    return t >= 3 && t <= 9
  }
  const qi = (e, t) => {
    _(e, e => {
      Se(e) && $n(e, 'position').isSome() && Vn(e, 'position')
    }
    )
  }
  const Ki = (e, t) => {
    const n = P(e, Ne('li'))
    if (n.length > 0) {
      const t = zt(n[0])
      const r = _e.fromTag('ul')
      if (cn(e[0], r),
      t.length > 0) {
        const e = _e.fromTag('li')
        un(r, e),
        fn(e, t)
      }
      fn(r, n)
    }
  }
  const Yi = (e, t) => {
    const n = Wt(e)
    _([Gi, qi, Ki], e => {
      e(n, t)
    }
    )
  }
  const Xi = {
    disabled: () => ({
      discriminator: 'disabled',
      data: {}
    }),
    fromClipboard: e => ({
      discriminator: 'fromClipboard',
      data: {
        rtf: e
      }
    })
  }
  const Zi = Le(Xi)
  const Ji = Xi.disabled
  const Qi = Xi.fromClipboard
  const el = e => void 0 !== e && void 0 !== e.types && e.types !== null
  const tl = (e, t) => {
    const n = new RegExp(t, 'i')
    return B(e, e => Mn(n.exec(e) !== null, {
      type: e,
      flavor: t
    }))
  }

  function nl (e) {
    return nl = typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol' ? function (e) {
      return typeof e
    }
      : function (e) {
        return e && typeof Symbol == 'function' && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e
      }
    ,
    nl(e)
  }
  function rl (e, t) {
    return rl = Object.setPrototypeOf || function (e, t) {
      return e.__proto__ = t,
      e
    }
    ,
    rl(e, t)
  }
  function ol () {
    if (typeof Reflect == 'undefined' || !Reflect.construct) { return !1 }
    if (Reflect.construct.sham) { return !1 }
    if (typeof Proxy == 'function') { return !0 }
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}
      )),
      !0
    } catch (e) {
      return !1
    }
  }
  function sl (e, t, n) {
    return sl = ol() ? Reflect.construct : function (e, t, n) {
      var r = [null]
      r.push.apply(r, t)
      var o = new (Function.bind.apply(e, r))()
      return n && rl(o, n.prototype),
      o
    }
    ,
    sl.apply(null, arguments)
  }
  function al (e) {
    return (function (e) {
      if (Array.isArray(e)) { return il(e) }
    }(e)) || (function (e) {
      if (typeof Symbol != 'undefined' && e[Symbol.iterator] != null || e['@@iterator'] != null) { return Array.from(e) }
    }(e)) || (function (e, t) {
      if (e) {
        if (typeof e == 'string') { return il(e, t) }
        var n = Object.prototype.toString.call(e).slice(8, -1)
        return n === 'Object' && e.constructor && (n = e.constructor.name),
        n === 'Map' || n === 'Set' ? Array.from(e) : n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? il(e, t) : void 0
      }
    }(e)) || (function () {
      throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.')
    }())
  }
  function il (e, t) {
    (t == null || t > e.length) && (t = e.length)
    for (var n = 0, r = new Array(t); n < t; n++) { r[n] = e[n] }
    return r
  }
  var ll = Object.hasOwnProperty
  var cl = Object.setPrototypeOf
  var ml = Object.isFrozen
  var dl = Object.getPrototypeOf
  var ul = Object.getOwnPropertyDescriptor
  var pl = Object.freeze
  var gl = Object.seal
  var fl = Object.create
  var hl = typeof Reflect != 'undefined' && Reflect
  var vl = hl.apply
  var yl = hl.construct
  vl || (vl = function (e, t, n) {
    return e.apply(t, n)
  }
  ),
  pl || (pl = function (e) {
    return e
  }
  ),
  gl || (gl = function (e) {
    return e
  }
  ),
  yl || (yl = function (e, t) {
    return sl(e, al(t))
  }
  )
  var bl; var xl = Al(Array.prototype.forEach); var wl = Al(Array.prototype.pop); var Tl = Al(Array.prototype.push); var Il = Al(String.prototype.toLowerCase); var Sl = Al(String.prototype.match); var Ol = Al(String.prototype.replace); var El = Al(String.prototype.indexOf); var kl = Al(String.prototype.trim); var Nl = Al(RegExp.prototype.test); var Dl = (bl = TypeError,
  function () {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) { t[n] = arguments[n] }
    return yl(bl, t)
  }
  )
  function Al (e) {
    return function (t) {
      for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) { r[o - 1] = arguments[o] }
      return vl(e, t, r)
    }
  }
  function Cl (e, t) {
    cl && cl(e, null)
    for (var n = t.length; n--;) {
      var r = t[n]
      if (typeof r == 'string') {
        var o = Il(r)
        o !== r && (ml(t) || (t[n] = o),
        r = o)
      }
      e[r] = !0
    }
    return e
  }
  function _l (e) {
    var t; var n = fl(null)
    for (t in e) { vl(ll, e, [t]) && (n[t] = e[t]) }
    return n
  }
  function Ll (e, t) {
    for (; e !== null;) {
      var n = ul(e, t)
      if (n) {
        if (n.get) { return Al(n.get) }
        if (typeof n.value == 'function') { return Al(n.value) }
      }
      e = dl(e)
    }
    return function (e) {
      return console.warn('fallback value for', e),
      null
    }
  }
  var Pl = pl(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr'])
  var Rl = pl(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern'])
  var Ml = pl(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence'])
  var Fl = pl(['animate', 'color-profile', 'cursor', 'discard', 'fedropshadow', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use'])
  var jl = pl(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover'])
  var Ul = pl(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none'])
  var Hl = pl(['#text'])
  var zl = pl(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'nonce', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder', 'playsinline', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'xmlns', 'slot'])
  var Wl = pl(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'targetx', 'targety', 'transform', 'transform-origin', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan'])
  var Bl = pl(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns'])
  var $l = pl(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink'])
  var Gl = gl(/\{\{[\w\W]*|[\w\W]*\}\}/gm)
  var Vl = gl(/<%[\w\W]*|[\w\W]*%>/gm)
  var ql = gl(/^data-[\-\w.\u00B7-\uFFFF]/)
  var Kl = gl(/^aria-[\-\w]+$/)
  var Yl = gl(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i)
  var Xl = gl(/^(?:\w+script|data):/i)
  var Zl = gl(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g)
  var Jl = gl(/^html$/i)
  var Ql = function () {
    return typeof window == 'undefined' ? null : window
  }
  var ec = function (e, t) {
    if (nl(e) !== 'object' || typeof e.createPolicy != 'function') { return null }
    var n = null
    var r = 'data-tt-policy-suffix'
    t.currentScript && t.currentScript.hasAttribute(r) && (n = t.currentScript.getAttribute(r))
    var o = 'dompurify' + (n ? '#' + n : '')
    try {
      return e.createPolicy(o, {
        createHTML: function (e) {
          return e
        }
      })
    } catch (e) {
      return console.warn('TrustedTypes policy ' + o + ' could not be created.'),
      null
    }
  }
  var tc = (function e () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Ql()
    var n = function (t) {
      return e(t)
    }
    if (n.version = '2.3.8',
    n.removed = [],
    !t || !t.document || t.document.nodeType !== 9) {
      return n.isSupported = !1,
      n
    }
    var r = t.document
    var o = t.document
    var s = t.DocumentFragment
    var a = t.HTMLTemplateElement
    var i = t.Node
    var l = t.Element
    var c = t.NodeFilter
    var m = t.NamedNodeMap
    var d = void 0 === m ? t.NamedNodeMap || t.MozNamedAttrMap : m
    var u = t.HTMLFormElement
    var p = t.DOMParser
    var g = t.trustedTypes
    var f = l.prototype
    var h = Ll(f, 'cloneNode')
    var v = Ll(f, 'nextSibling')
    var y = Ll(f, 'childNodes')
    var b = Ll(f, 'parentNode')
    if (typeof a == 'function') {
      var x = o.createElement('template')
      x.content && x.content.ownerDocument && (o = x.content.ownerDocument)
    }
    var w = ec(g, r)
    var T = w ? w.createHTML('') : ''
    var I = o
    var S = I.implementation
    var O = I.createNodeIterator
    var E = I.createDocumentFragment
    var k = I.getElementsByTagName
    var N = r.importNode
    var D = {}
    try {
      D = _l(o).documentMode ? o.documentMode : {}
    } catch (e) {}
    var A = {}
    n.isSupported = typeof b == 'function' && S && void 0 !== S.createHTMLDocument && D !== 9
    var C; var _; var L = Gl; var P = Vl; var R = ql; var M = Kl; var F = Xl; var j = Zl; var U = Yl; var H = null; var z = Cl({}, [].concat(al(Pl), al(Rl), al(Ml), al(jl), al(Hl))); var W = null; var B = Cl({}, [].concat(al(zl), al(Wl), al(Bl), al($l))); var $ = Object.seal(Object.create(null, {
      tagNameCheck: {
        writable: !0,
        configurable: !1,
        enumerable: !0,
        value: null
      },
      attributeNameCheck: {
        writable: !0,
        configurable: !1,
        enumerable: !0,
        value: null
      },
      allowCustomizedBuiltInElements: {
        writable: !0,
        configurable: !1,
        enumerable: !0,
        value: !1
      }
    })); var G = null; var V = null; var q = !0; var K = !0; var Y = !1; var X = !1; var Z = !1; var J = !1; var Q = !1; var ee = !1; var te = !1; var ne = !1; var re = !0; var oe = !0; var se = !1; var ae = {}; var ie = null; var le = Cl({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']); var ce = null; var me = Cl({}, ['audio', 'video', 'img', 'source', 'image', 'track']); var de = null; var ue = Cl({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'role', 'summary', 'title', 'value', 'style', 'xmlns']); var pe = 'http://www.w3.org/1998/Math/MathML'; var ge = 'http://www.w3.org/2000/svg'; var fe = 'http://www.w3.org/1999/xhtml'; var he = fe; var ve = !1; var ye = ['application/xhtml+xml', 'text/html']; var be = 'text/html'; var xe = null; var we = o.createElement('form'); var Te = function (e) {
      return e instanceof RegExp || e instanceof Function
    }; var Ie = function (e) {
      xe && xe === e || (e && nl(e) === 'object' || (e = {}),
      e = _l(e),
      H = 'ALLOWED_TAGS' in e ? Cl({}, e.ALLOWED_TAGS) : z,
      W = 'ALLOWED_ATTR' in e ? Cl({}, e.ALLOWED_ATTR) : B,
      de = 'ADD_URI_SAFE_ATTR' in e ? Cl(_l(ue), e.ADD_URI_SAFE_ATTR) : ue,
      ce = 'ADD_DATA_URI_TAGS' in e ? Cl(_l(me), e.ADD_DATA_URI_TAGS) : me,
      ie = 'FORBID_CONTENTS' in e ? Cl({}, e.FORBID_CONTENTS) : le,
      G = 'FORBID_TAGS' in e ? Cl({}, e.FORBID_TAGS) : {},
      V = 'FORBID_ATTR' in e ? Cl({}, e.FORBID_ATTR) : {},
      ae = 'USE_PROFILES' in e && e.USE_PROFILES,
      q = !1 !== e.ALLOW_ARIA_ATTR,
      K = !1 !== e.ALLOW_DATA_ATTR,
      Y = e.ALLOW_UNKNOWN_PROTOCOLS || !1,
      X = e.SAFE_FOR_TEMPLATES || !1,
      Z = e.WHOLE_DOCUMENT || !1,
      ee = e.RETURN_DOM || !1,
      te = e.RETURN_DOM_FRAGMENT || !1,
      ne = e.RETURN_TRUSTED_TYPE || !1,
      Q = e.FORCE_BODY || !1,
      re = !1 !== e.SANITIZE_DOM,
      oe = !1 !== e.KEEP_CONTENT,
      se = e.IN_PLACE || !1,
      U = e.ALLOWED_URI_REGEXP || U,
      he = e.NAMESPACE || fe,
      e.CUSTOM_ELEMENT_HANDLING && Te(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && ($.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),
      e.CUSTOM_ELEMENT_HANDLING && Te(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && ($.attributeNameCheck = e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),
      e.CUSTOM_ELEMENT_HANDLING && typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == 'boolean' && ($.allowCustomizedBuiltInElements = e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),
      C = C = ye.indexOf(e.PARSER_MEDIA_TYPE) === -1 ? be : e.PARSER_MEDIA_TYPE,
      _ = C === 'application/xhtml+xml' ? function (e) {
        return e
      }
        : Il,
      X && (K = !1),
      te && (ee = !0),
      ae && (H = Cl({}, al(Hl)),
      W = [],
      !0 === ae.html && (Cl(H, Pl),
      Cl(W, zl)),
      !0 === ae.svg && (Cl(H, Rl),
      Cl(W, Wl),
      Cl(W, $l)),
      !0 === ae.svgFilters && (Cl(H, Ml),
      Cl(W, Wl),
      Cl(W, $l)),
      !0 === ae.mathMl && (Cl(H, jl),
      Cl(W, Bl),
      Cl(W, $l))),
      e.ADD_TAGS && (H === z && (H = _l(H)),
      Cl(H, e.ADD_TAGS)),
      e.ADD_ATTR && (W === B && (W = _l(W)),
      Cl(W, e.ADD_ATTR)),
      e.ADD_URI_SAFE_ATTR && Cl(de, e.ADD_URI_SAFE_ATTR),
      e.FORBID_CONTENTS && (ie === le && (ie = _l(ie)),
      Cl(ie, e.FORBID_CONTENTS)),
      oe && (H['#text'] = !0),
      Z && Cl(H, ['html', 'head', 'body']),
      H.table && (Cl(H, ['tbody']),
      delete G.tbody),
      pl && pl(e),
      xe = e)
    }; var Se = Cl({}, ['mi', 'mo', 'mn', 'ms', 'mtext']); var Oe = Cl({}, ['foreignobject', 'desc', 'title', 'annotation-xml']); var Ee = Cl({}, ['title', 'style', 'font', 'a', 'script']); var ke = Cl({}, Rl)
    Cl(ke, Ml),
    Cl(ke, Fl)
    var Ne = Cl({}, jl)
    Cl(Ne, Ul)
    var De = function (e) {
      var t = b(e)
      t && t.tagName || (t = {
        namespaceURI: fe,
        tagName: 'template'
      })
      var n = Il(e.tagName)
      var r = Il(t.tagName)
      return e.namespaceURI === ge ? t.namespaceURI === fe ? n === 'svg' : t.namespaceURI === pe ? n === 'svg' && (r === 'annotation-xml' || Se[r]) : Boolean(ke[n]) : e.namespaceURI === pe ? t.namespaceURI === fe ? n === 'math' : t.namespaceURI === ge ? n === 'math' && Oe[r] : Boolean(Ne[n]) : e.namespaceURI === fe && !(t.namespaceURI === ge && !Oe[r]) && !(t.namespaceURI === pe && !Se[r]) && !Ne[n] && (Ee[n] || !ke[n])
    }
    var Ae = function (e) {
      Tl(n.removed, {
        element: e
      })
      try {
        e.parentNode.removeChild(e)
      } catch (t) {
        try {
          e.outerHTML = T
        } catch (t) {
          e.remove()
        }
      }
    }
    var Ce = function (e, t) {
      try {
        Tl(n.removed, {
          attribute: t.getAttributeNode(e),
          from: t
        })
      } catch (e) {
        Tl(n.removed, {
          attribute: null,
          from: t
        })
      }
      if (t.removeAttribute(e),
      e === 'is' && !W[e]) {
        if (ee || te) {
          try {
            Ae(t)
          } catch (e) {}
        } else {
          try {
            t.setAttribute(e, '')
          } catch (e) {}
        }
      }
    }
    var _e = function (e) {
      var t, n
      if (Q) { e = '<remove></remove>' + e } else {
        var r = Sl(e, /^[\r\n\t ]+/)
        n = r && r[0]
      }
      C === 'application/xhtml+xml' && (e = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + e + '</body></html>')
      var s = w ? w.createHTML(e) : e
      if (he === fe) {
        try {
          t = (new p()).parseFromString(s, C)
        } catch (e) {}
      }
      if (!t || !t.documentElement) {
        t = S.createDocument(he, 'template', null)
        try {
          t.documentElement.innerHTML = ve ? '' : s
        } catch (e) {}
      }
      var a = t.body || t.documentElement
      return e && n && a.insertBefore(o.createTextNode(n), a.childNodes[0] || null),
      he === fe ? k.call(t, Z ? 'html' : 'body')[0] : Z ? t.documentElement : a
    }
    var Le = function (e) {
      return O.call(e.ownerDocument || e, e, c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT, null, !1)
    }
    var Pe = function (e) {
      return e instanceof u && (typeof e.nodeName != 'string' || typeof e.textContent != 'string' || typeof e.removeChild != 'function' || !(e.attributes instanceof d) || typeof e.removeAttribute != 'function' || typeof e.setAttribute != 'function' || typeof e.namespaceURI != 'string' || typeof e.insertBefore != 'function')
    }
    var Re = function (e) {
      return nl(i) === 'object' ? e instanceof i : e && nl(e) === 'object' && typeof e.nodeType == 'number' && typeof e.nodeName == 'string'
    }
    var Me = function (e, t, r) {
      A[e] && xl(A[e], function (e) {
        e.call(n, t, r, xe)
      }
      )
    }
    var Fe = function (e) {
      var t
      if (Me('beforeSanitizeElements', e, null),
      Pe(e)) {
        return Ae(e),
        !0
      }
      if (Nl(/[\u0080-\uFFFF]/, e.nodeName)) {
        return Ae(e),
        !0
      }
      var r = _(e.nodeName)
      if (Me('uponSanitizeElement', e, {
        tagName: r,
        allowedTags: H
      }),
      e.hasChildNodes() && !Re(e.firstElementChild) && (!Re(e.content) || !Re(e.content.firstElementChild)) && Nl(/<[/\w]/g, e.innerHTML) && Nl(/<[/\w]/g, e.textContent)) {
        return Ae(e),
        !0
      }
      if (r === 'select' && Nl(/<template/i, e.innerHTML)) {
        return Ae(e),
        !0
      }
      if (!H[r] || G[r]) {
        if (!G[r] && Ue(r)) {
          if ($.tagNameCheck instanceof RegExp && Nl($.tagNameCheck, r)) { return !1 }
          if ($.tagNameCheck instanceof Function && $.tagNameCheck(r)) { return !1 }
        }
        if (oe && !ie[r]) {
          var o = b(e) || e.parentNode
          var s = y(e) || e.childNodes
          if (s && o) {
            for (var a = s.length - 1; a >= 0; --a) { o.insertBefore(h(s[a], !0), v(e)) }
          }
        }
        return Ae(e),
        !0
      }
      return e instanceof l && !De(e) ? (Ae(e),
      !0) : r !== 'noscript' && r !== 'noembed' || !Nl(/<\/no(script|embed)/i, e.innerHTML) ? (X && e.nodeType === 3 && (t = e.textContent,
      t = Ol(t, L, ' '),
      t = Ol(t, P, ' '),
      e.textContent !== t && (Tl(n.removed, {
        element: e.cloneNode()
      }),
      e.textContent = t)),
      Me('afterSanitizeElements', e, null),
      !1) : (Ae(e),
      !0)
    }
    var je = function (e, t, n) {
      if (re && (t === 'id' || t === 'name') && (n in o || n in we)) { return !1 }
      if (K && !V[t] && Nl(R, t))
        ;
      else if (q && Nl(M, t))
        ;
      else if (!W[t] || V[t]) {
        if (!(Ue(e) && ($.tagNameCheck instanceof RegExp && Nl($.tagNameCheck, e) || $.tagNameCheck instanceof Function && $.tagNameCheck(e)) && ($.attributeNameCheck instanceof RegExp && Nl($.attributeNameCheck, t) || $.attributeNameCheck instanceof Function && $.attributeNameCheck(t)) || t === 'is' && $.allowCustomizedBuiltInElements && ($.tagNameCheck instanceof RegExp && Nl($.tagNameCheck, n) || $.tagNameCheck instanceof Function && $.tagNameCheck(n)))) { return !1 }
      } else if (de[t])
        ;
      else if (Nl(U, Ol(n, j, '')))
        ;
      else if (t !== 'src' && t !== 'xlink:href' && t !== 'href' || e === 'script' || El(n, 'data:') !== 0 || !ce[e]) {
        if (Y && !Nl(F, Ol(n, j, '')))
          ;
        else if (n) { return !1 }
      }
      return !0
    }
    var Ue = function (e) {
      return e.indexOf('-') > 0
    }
    var He = function (e) {
      var t, r, o, s
      Me('beforeSanitizeAttributes', e, null)
      var a = e.attributes
      if (a) {
        var i = {
          attrName: '',
          attrValue: '',
          keepAttr: !0,
          allowedAttributes: W
        }
        for (s = a.length; s--;) {
          var l = t = a[s]
          var c = l.name
          var m = l.namespaceURI
          if (r = c === 'value' ? t.value : kl(t.value),
          o = _(c),
          i.attrName = o,
          i.attrValue = r,
          i.keepAttr = !0,
          i.forceKeepAttr = void 0,
          Me('uponSanitizeAttribute', e, i),
          r = i.attrValue,
          !i.forceKeepAttr && (Ce(c, e),
          i.keepAttr)) {
            if (Nl(/\/>/i, r)) { Ce(c, e) } else {
              X && (r = Ol(r, L, ' '),
              r = Ol(r, P, ' '))
              var d = _(e.nodeName)
              if (je(d, o, r)) {
                try {
                  m ? e.setAttributeNS(m, c, r) : e.setAttribute(c, r),
                  wl(n.removed)
                } catch (e) {}
              }
            }
          }
        }
        Me('afterSanitizeAttributes', e, null)
      }
    }
    var ze = function e (t) {
      var n; var r = Le(t)
      for (Me('beforeSanitizeShadowDOM', t, null); n = r.nextNode();) {
        Me('uponSanitizeShadowNode', n, null),
        Fe(n) || (n.content instanceof s && e(n.content),
        He(n))
      }
      Me('afterSanitizeShadowDOM', t, null)
    }
    return n.sanitize = function (e, o) {
      var a, l, c, m, d
      if ((ve = !e) && (e = '\x3c!--\x3e'),
      typeof e != 'string' && !Re(e)) {
        if (typeof e.toString != 'function') { throw Dl('toString is not a function') }
        if (typeof (e = e.toString()) != 'string') { throw Dl('dirty is not a string, aborting') }
      }
      if (!n.isSupported) {
        if (nl(t.toStaticHTML) === 'object' || typeof t.toStaticHTML == 'function') {
          if (typeof e == 'string') { return t.toStaticHTML(e) }
          if (Re(e)) { return t.toStaticHTML(e.outerHTML) }
        }
        return e
      }
      if (J || Ie(o),
      n.removed = [],
      typeof e == 'string' && (se = !1),
      se) {
        if (e.nodeName) {
          var u = _(e.nodeName)
          if (!H[u] || G[u]) { throw Dl('root node is forbidden and cannot be sanitized in-place') }
        }
      } else if (e instanceof i) { (l = (a = _e('\x3c!----\x3e')).ownerDocument.importNode(e, !0)).nodeType === 1 && l.nodeName === 'BODY' || l.nodeName === 'HTML' ? a = l : a.appendChild(l) } else {
        if (!ee && !X && !Z && e.indexOf('<') === -1) { return w && ne ? w.createHTML(e) : e }
        if (!(a = _e(e))) { return ee ? null : ne ? T : '' }
      }
      a && Q && Ae(a.firstChild)
      for (var p = Le(se ? e : a); c = p.nextNode();) {
        c.nodeType === 3 && c === m || Fe(c) || (c.content instanceof s && ze(c.content),
        He(c),
        m = c)
      }
      if (m = null,
      se) { return e }
      if (ee) {
        if (te) {
          for (d = E.call(a.ownerDocument); a.firstChild;) { d.appendChild(a.firstChild) }
        } else { d = a }
        return W.shadowroot && (d = N.call(r, d, !0)),
        d
      }
      var g = Z ? a.outerHTML : a.innerHTML
      return Z && H['!doctype'] && a.ownerDocument && a.ownerDocument.doctype && a.ownerDocument.doctype.name && Nl(Jl, a.ownerDocument.doctype.name) && (g = '<!DOCTYPE ' + a.ownerDocument.doctype.name + '>\n' + g),
      X && (g = Ol(g, L, ' '),
      g = Ol(g, P, ' ')),
      w && ne ? w.createHTML(g) : g
    }
    ,
    n.setConfig = function (e) {
      Ie(e),
      J = !0
    }
    ,
    n.clearConfig = function () {
      xe = null,
      J = !1
    }
    ,
    n.isValidAttribute = function (e, t, n) {
      xe || Ie({})
      var r = _(e)
      var o = _(t)
      return je(r, o, n)
    }
    ,
    n.addHook = function (e, t) {
      typeof t == 'function' && (A[e] = A[e] || [],
      Tl(A[e], t))
    }
    ,
    n.removeHook = function (e) {
      if (A[e]) { return wl(A[e]) }
    }
    ,
    n.removeHooks = function (e) {
      A[e] && (A[e] = [])
    }
    ,
    n.removeAllHooks = function () {
      A = {}
    }
    ,
    n
  }())
  const nc = ['script', 'svg']
  const rc = e => e.lastIndexOf('</html>') !== -1
  const oc = e => ({
    sanitizeHtml: (t, n) => e(t) ? t : ((e, t) => {
      tc.addHook('uponSanitizeElement', (e, t) => {
        D(nc, t.tagName) || He(t.allowedTags, t.tagName) || (t.allowedTags[t.tagName] = !0)
      }
      ),
      tc.addHook('uponSanitizeAttribute', (e, t) => {
        t.attrName.indexOf('on') === 0 || He(t.allowedAttributes, t.attrName) || (t.allowedAttributes[t.attrName] = !0),
        t.attrValue && t.attrValue.indexOf('\n') !== -1 && (t.attrValue = t.attrValue.replace(/\r?\n/g, ''))
      }
      )
      const n = (e => ue(ge(e), '<!'))(e)
      const r = n ? `<body>${e}</body>` : (e => e.replace(/^[\S\s]*?(<!DOCTYPE|<html)/i, '$1'))(e)
      const o = tc.sanitize(r, {
        ALLOW_UNKNOWN_PROTOCOLS: !0,
        FORBID_TAGS: nc,
        WHOLE_DOCUMENT: rc(e)
      })
      return tc.removeHook('uponSanitizeElement'),
      tc.removeHook('uponSanitizeAttribute'),
      n ? (s = me(o, '<body>'),
      pe(s, '</body>') ? ((e, t) => e.substring(0, e.length - t))(s, '</body>'.length) : s) : o
      var s
    }
    )(t),
    sanitizeText: y
  })
  const sc = {
    sanitizeHtml: y,
    sanitizeText: y
  }
  const ac = e => t => ({
    discriminator: e,
    data: t
  })
  const ic = e => t => t.discriminator === e ? O.some(t.data) : O.none()
  const lc = ac('event')
  const cc = ac('html')
  const mc = ac('images')
  const dc = ac('word')
  const uc = ac('text')
  const pc = ac('void')
  const gc = ic('html')
  const fc = ic('images')
  const hc = ic('word')
  const vc = ic('text')
  const yc = ['^image/', 'file']
  const bc = e => (e => de(e, '<html') && (de(e, 'xmlns:o="urn:schemas-microsoft-com:office:office"') || de(e, 'xmlns:x="urn:schemas-microsoft-com:office:excel"')))(e) || (e => de(e, 'meta name="ProgId" content="Word.Document"'))(e)
  const xc = e => de(e, 'id="docs-internal-guid-')
  const wc = e => e.length > 0
  const Tc = (e, t) => tl(e.types, t).map(t => e.getData(t.type)).filter(wc)
  const Ic = e => Tc(e, 'html')
  const Sc = e => Ic(e).filter(xc)
  const Oc = e => O.from(e.clipboardData).filter(el)
  const Ec = e => {
    const t = _e.fromTag('div')
    const n = ((e, t) => Oo(e, t, [Oa]))(Rt(t), e)
    return ((e, t) => {
      const n = Rt(e).dom
      const r = _e.fromDom(n.createDocumentFragment())
      const o = Kn(t, n)
      fn(r, o),
      hn(e),
      un(e, r)
    }
    )(t, n),
    cc({
      container: t
    })
  }
  const kc = {
    native: 'Outside of Textbox.io pasting HTML5 API (could be internal)',
    fallback: 'Outside of Textbox.io pasting offscreen (could be internal)',
    msoffice: 'Word Import pasting',
    googledocs: 'Google Docs pasting',
    image: 'Image pasting',
    plaintext: 'Only plain text is available to paste',
    text: 'Plain text pasting',
    none: 'There is no valid way to paste',
    discard: 'There is no valid way to paste, discarding content'
  }
  const Nc = {
    getLabelForApi: e => {
      const t = Le(kc)
      return M(t, t => kc[t] === e).fold(v('unknown'), e => {
        switch (e) {
          case 'native':
          case 'fallback':
            return 'html'
          case 'none':
          case 'discard':
            return 'invalid'
          default:
            return e
        }
      }
      )
    },
    ...kc
  }
  const Dc = e => C(e, e => e.asset)
  const Ac = (e, t, n) => {
    const r = It({
      cancel: Tt([]),
      error: Tt(['message']),
      insert: Tt(['elements', 'assets', 'correlated', 'isInternal', 'source', 'mode']),
      block: Tt(['state'])
    })
    let o = !1
    r.registry.block.bind(e => o = e.state)
    const s = (n, o) => {
      r.trigger.block(!0)
      const s = ((e, t, n) => {
        const r = ((e, t) => B(e, e => e.getAvailable(t).map(t => Kr(e.steps, t, e.label, e.capture()))))(e, n)
        return r.getOrThunk(() => {
          const e = t.getAvailable(n)
          return Kr(t.steps, e, t.label, t.capture())
        }
        )
      }
      )(e, t, n)
      s.capture && o()
      const a = ((e, t) => {
        const n = {
          response: jr([], []),
          bundle: Br({})
        }
        const r = R(e, (e, n) => qr(e) ? e.then(e => Xr(e, t, n)) : Xr(e, t, n), n)
        return qr(r) ? r : Promise.resolve(r)
      }
      )(s.steps, s.input)
      const i = Nc.getLabelForApi(s.label)
      a.then(e => {
        const t = e.bundle.isInternal.getOr(!1)
        const n = e.bundle.officeStyles.fold(v('auto'), e => e ? 'merge' : 'clean')
        r.trigger.block(!1),
        Mr(e.response, e => {
          r.trigger.error(e)
        }
        , (e, o) => {
          r.trigger.insert(e, Dc(o), o, t, i, n)
        }
        , () => {
          r.trigger.cancel()
        }
        , (e, o, s) => {
          r.trigger.insert(e, Dc(o), o, t, i, n),
          r.trigger.error(s)
        }
        )
      }
      )
    }

    return {
      paste: e => {
        const t = Ft(_e.fromDom(e.target))
        ln(t.dom).each(t => {
          if (!Pn(t.start, sr())) {
            const t = ((e, t = sc) => {
              const n = e => {
                return void 0 === e.items ? O.none() : (t = yc,
                n = e.types,
                B(t, e => tl(n, e))).map(t => {
                  const n = []
                  for (let t = 0; t < e.items.length; t++) { n.push(e.items[t]) }
                  return mc({
                    images: n
                  })
                }
                )
                var t, n
              }
              const r = e => B(e.types, n => n === 'text/plain' ? O.some(e.getData(n)).map(e => uc({
                text: t.sanitizeText(e)
              })) : O.none())
              return {
                getWordData: () => Oc(e).bind(e => (e => Ic(e).filter(bc))(e).map(t => {
                  const n = (e => Tc(e, 'rtf'))(e)
                  return dc({
                    html: t,
                    rtf: n.fold(() => Ji(), e => Qi(e))
                  })
                }
                )),
                getGoogleDocsData: () => Oc(e).bind(Sc).map(e => t.sanitizeHtml(e, 'googledocs')).map(Ec),
                getImage: () => Oc(e).bind(n),
                getText: () => Oc(e).bind(r),
                getHtml: () => Oc(e).bind(Ic).map(t.sanitizeHtml).map(Ec),
                getOnlyText: () => Oc(e).bind(e => {
                  return (t = e.types).length === 1 && t[0] === 'text/plain' ? r(e) : O.none()
                  var t
                }
                ),
                getNative: () => lc({
                  nativeEvent: e
                }),
                getVoid: () => pc({})
              }
            }
            )(e, n)
            s(t, () => {
              e.preventDefault()
            }
            )
          }
        }
        )
      },
      pasteCustom: (e, t = f) => {
        s(e, t)
      },
      isBlocked: () => o,
      destroy: f,
      events: r.registry
    }
  }
  const Cc = e => oi(e)
  var _c = {
    cata: (e, t, n) => e.fold(t, n),
    ...Ct([{
      blob: ['id', 'imageresult', 'objurl']
    }, {
      url: ['id', 'url', 'raw']
    }])
  }
  const Lc = e => {
    const t = URL.createObjectURL(e)
    return Pc(e, t)
  }
  const Pc = (e, t) => Cc(e).then(n => {
    const r = pi(e, n)
    const o = wn('image')
    return _c.blob(o, r, t)
  }
  )
  const Rc = e => Promise.all(C(e, Lc))
  const Mc = (e, t) => ({
    asset: e,
    image: t
  })
  const Fc = (e, t) => _c.cata(e, (e, n, r) => (In(t, 'src', r),
  !0), I)
  const jc = (e, t) => {
    const n = []
    return _(e, (e, r) => {
      const o = t[r]
      Fc(e, o) && n.push(Mc(e, o))
    }
    ),
    n
  }
  const Uc = (e, t) => ({
    asyncAsset: e.then(Er.value, Er.error),
    image: t
  })
  const Hc = e => {
    const t = _e.fromTag('div')
    return fn(t, e),
    Yt(t, 'img[src]')
  }
  const zc = e => e.indexOf('data:') === 0 && e.indexOf('base64') > -1
  const Wc = e => e.indexOf('blob:') === 0
  const Bc = e => En(e, 'src').exists(e => zc(e) || Wc(e))
  const $c = e => U(Hc(e), e => {
    const t = En(e, 'src').getOr('')
    return zc(t) ? ((e, t) => {
      return (n = t,
      ei(n)).map(t => Uc(Lc(t), e))
      var n
    }
    )(e, t).toArray() : Wc(t) ? ((e, t) => {
      return (n = t,
      O.from((r = n).indexOf('blob:') === 0 ? Qa(r) : r.indexOf('data:') === 0 ? ti(r) : null)).map(t => {
        const n = t.then(Lc)
        return Uc(n, e)
      }
      )
      var n, r
    }
    )(e, t).toArray() : []
  }
  )
  const Gc = e => {
    const t = P(e, e => !Ne('img')(e) || !Bc(e))
    return Hr(t, [], 'errors.local.images.disallowed')
  }

  var Vc = e => (t, n) => {
    const r = () => Promise.resolve(n)
    const o = (t, o) => !1 === e.allowLocalImages ? (e => {
      const t = P(Hc(e), Bc)
      return _(t, vn),
      Promise.resolve({
        response: t.length > 0 ? Gc(e) : n.response,
        bundle: n.bundle
      })
    }
    )(t) : o.length === 0 ? (e => {
      const t = $c(e)
      const r = Promise.all(C(t, e => e.asyncAsset))
      const o = C(t, e => e.image)
      return r.then(t => {
        const r = (e => {
          const t = []
          const n = []
          return _(e, e => {
            e.fold(e => {
              t.push(e)
            }
            , e => {
              n.push(e)
            }
            )
          }
          ),
          {
            errors: t,
            values: n
          }
        }
        )(t)
        const s = jc(r.values, o)
        return {
          response: r.errors.length > 0 ? Hr(e, s, 'errors.imageimport.failed') : jr(e, s),
          bundle: n.bundle
        }
      }
      )
    }
    )(t) : r()
    return Mr(n.response, Gr, o, r, o)
  }

  const qc = (e, t, n = !1) => fetch(e, {
    credentials: n ? 'include' : 'same-origin',
    headers: t
  }).then(async e => {
    const t = await e.blob()
    return {
      ok: e.ok,
      status: e.status,
      blob: t
    }
  }
  , () => ({
    ok: !1,
    status: 0
  }))
  const Kc = [{
    code: 404,
    message: 'Could not find Image Proxy'
  }, {
    code: 403,
    message: 'Rejected request'
  }, {
    code: 0,
    message: 'Incorrect Image Proxy URL'
  }]
  const Yc = [{
    type: 'not_found',
    message: 'Failed to load image.'
  }, {
    type: 'key_missing',
    message: 'The request did not include an api key.'
  }, {
    type: 'key_not_found',
    message: 'The provided api key could not be found.'
  }, {
    type: 'domain_not_trusted',
    message: 'The api key is not valid for the request origins.'
  }]
  const Xc = e => {
    const t = (e => {
      const t = M(Kc, t => e === t.code).fold(v('Unknown ImageProxy error'), e => e.message)
      return 'ImageProxy HTTP error: ' + t
    }
    )(e)
    return Promise.reject(t)
  }
  const Zc = e => M(Yc, t => t.type === e).fold(v('Unknown service error'), e => e.message)
  const Jc = e => (e => new Promise((t, n) => {
    const r = new FileReader()
    r.onload = () => {
      t(r.result)
    }
    ,
    r.onerror = e => {
      n(e)
    }
    ,
    r.readAsText(e)
  }
  ))(e).then(e => {
    const t = (e => {
      const t = (e => {
        try {
          return O.some(JSON.parse(e))
        } catch (e) {
          return O.none()
        }
      }
      )(e)
      const n = t.bind(e => ((e, t) => {
        const n = R(['error', 'type'], (e, t) => u(e) ? e[t] : void 0, e)
        return O.from(n)
      }
      )(e).map(Zc)).getOr('Invalid JSON in service error message')
      return 'ImageProxy Service error: ' + n
    }
    )(e)
    return Promise.reject(t)
  }
  )
  const Qc = (e, t, n = !1) => t ? ((e, t) => {
    const n = {
      'Content-Type': 'application/json;charset=UTF-8',
      'tiny-api-key': t
    }
    return qc(((e, t) => {
      const n = e.indexOf('?') === -1 ? '?' : '&'
      return /[?&]apiKey=/.test(e) ? e : e + n + 'apiKey=' + encodeURIComponent(t)
    }
    )(e, t), n).then(e => {
      return e.ok ? Promise.resolve(e.blob) : ((e, t) => (t == null ? void 0 : t.type) === 'application/json' && (e === 400 || e === 403 || e === 404 || e === 500))(t = e.status, n = e.blob) ? Jc(n) : Xc(t)
      var t, n
    }
    )
  }
  )(e, t) : ((e, t) => qc(e, {}, t).then(e => e.ok ? Promise.resolve(e.blob) : Xc(e.status)))(e, n)
  const em = /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@\/]*)(?::([^:@\/]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/
  const tm = /^(?:(?![^:@\/]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*)(?::([^:@\/]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  const nm = /(?:^|&)([^&=]+)=?([^&]*)/g
  const rm = e => {
    const t = {}
    for (; ;) {
      const n = nm.exec(e)
      if (n === null) { return t }
      t[n[1]] = n[2]
    }
  }
  const om = (e, t) => {
    const n = () => Promise.resolve({
      response: t.response,
      bundle: t.bundle
    })
    const r = e => Cc(e).then(t => {
      const n = wn('image')
      const r = pi(e, t)
      const o = URL.createObjectURL(e)
      return _c.blob(n, r, o)
    }
    )
    const o = (e, t) => _c.url(wn('image'), t, e)
    const s = (e, n) => {
      let s = !1
      const a = U(e, e => Yt(e, 'img'))
      return Promise.all(C(a, e => {
        const t = e.dom.src
        return (e => {
          const t = ((e, t = {}) => {
            var n
            return ((e, t) => {
              const n = (t ? em : tm).exec(e)
              const r = z(['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'], (e, t) => {
                var r
                return (r = n[t]) !== null && void 0 !== r ? r : ''
              }
              )
              return {
                ...r,
                queryKey: rm(r.query)
              }
            }
            )(e, (n = t.strictMode) !== null && void 0 !== n && n)
          }
          )(e)
          return de(t.host, 'google') && !ue(t.path, '/drawings/')
        }
        )(t) ? Qc(e.dom.src).then(r, () => (s = !0,
          o(e, t))) : o(e, t)
      }
      )).then(r => {
        const o = n.concat(jc(r, a))
        return {
          response: s ? Hr(e, o, 'errors.imageimport.failed') : jr(e, o),
          bundle: t.bundle
        }
      }
      , () => ({
        response: Fr('errors.imageimport.invalid'),
        bundle: t.bundle
      }))
    }

    return Mr(t.response, n, s, n, s)
  }
  const sm = e => {
    const t = lm(e)
    return t && am(e) || !t && im(e)
  }
  const am = e => e.officeStyles.getOr(!0)
  const im = e => e.htmlStyles.getOr(!1)
  const lm = e => e.isWord.getOr(!1)
  const cm = e => e.isInternal.getOr(!1)
  const mm = e => lm(e) ? xs.Word : (e => e.isGoogleDocs.getOr(!1))(e) ? xs.GoogleDocs : xs.Html
  const dm = (e, t) => {
    const n = ((e, t) => {
      const n = t.translations
      const r = e => O.some(Zr(t, {
        officeStyles: e,
        gdocsStyles: e,
        htmlStyles: e
      }))
      return {
        get: o => {
          const s = (e => {
            switch (e) {
              case xs.Word:
                return 'officeStyles'
              case xs.GoogleDocs:
                return 'gdocsStyles'
              default:
                return 'htmlStyles'
            }
          }
          )(o)
          const a = t[s]
          return p(a) ? a().then(e => r(e === 'merge'), e => (console.error(e),
          r(!1))) : a === 'clean' ? Promise.resolve(r(!1)) : a === 'merge' ? Promise.resolve(r(!0)) : new Promise(t => {
            const o = _e.fromTag('div')
            _n(o, gr('styles-dialog-content'))
            const s = _e.fromTag('p')
            const a = Kn(n('cement.dialog.paste.instructions'))
            fn(s, a),
            un(o, s)
            const i = {
              text: n('cement.dialog.paste.clean'),
              tabindex: 0,
              className: gr('clean-styles'),
              click: () => {
                c(),
                t(r(!1))
              }
            }
            const l = {
              text: n('cement.dialog.paste.merge'),
              tabindex: 1,
              className: gr('merge-styles'),
              click: () => {
                c(),
                t(r(!0))
              }
            }
            const c = () => {
              m.destroy()
            }
            const m = e()
            m.setTitle(n('cement.dialog.paste.title')),
            m.setContent(o),
            m.setButtons([i, l]),
            m.events.close.bind(() => {
              c(),
              t(O.none())
            }
            ),
            m.show()
          }
          )
        },
        destroy: f
      }
    }
    )(e, t)
    return (e, t) => {
      const r = t.bundle
      const o = t.response
      return n.get(mm(r)).then(e => e.fold(() => ({
        response: Ur(),
        bundle: t.bundle
      }), e => ({
        response: o,
        bundle: Br({
          officeStyles: e.officeStyles,
          gdocsStyles: e.gdocsStyles,
          htmlStyles: e.htmlStyles
        })
      })))
    }
  }
  const um = (e, t) => (n, r) => cm(r.bundle) ? (e => Promise.resolve({
    response: r.response,
    bundle: Br({
      officeStyles: e,
      gdocsStyles: e,
      htmlStyles: e
    })
  }))(!0) : dm(e, t)(n, r)
  const pm = (e, t) => {
    if (!qt(e)) { throw new Error('Internal error: attempted to write to an iframe that is not in the DOM') }
    const n = (e => (e => {
      const t = e.dom
      try {
        return ((e, t) => e != null ? O.some(t(e)) : O.none())(t.contentWindow ? t.contentWindow.document : t.contentDocument, _e.fromDom)
      } catch (e) {
        return console.log('Error reading iframe: ', t),
        console.log('Error was: ' + e),
        O.none()
      }
    }
    )(e).getOrThunk(() => Rt(e)))(e)
    const r = n.dom
    r.open('text/html', 'replace'),
    r.writeln(t),
    r.close()
  }

  var gm = function (e) {
    var t; var n; var r = e; var o = {
      a: 0,
      b: 0,
      c: 0
    }; var s = []
    return t = function (t, n) {
      var a, i, l, c, m, d
      if (t.test(r)) {
        for (i = 0,
        l = (a = r.match(t)).length; i < l; i += 1) {
          o[n] += 1,
          c = a[i],
          m = r.indexOf(c),
          d = c.length,
          s.push({
            selector: e.substr(m, d),
            type: n,
            index: m,
            length: d
          }),
          r = r.replace(c, Array(d + 1).join(' '))
        }
      }
    }
    ,
    n = function (e) {
      var t, n, o, s
      if (e.test(r)) {
        for (n = 0,
        o = (t = r.match(e)).length; n < o; n += 1) {
          s = t[n],
          r = r.replace(s, Array(s.length + 1).join('A'))
        }
      }
    }
    ,
    n(/\\[0-9A-Fa-f]{6}\s?/g),
    n(/\\[0-9A-Fa-f]{1,5}\s/g),
    n(/\\./g),
    (function () {
      var e; var t; var n; var o; var s = /{[^]*/gm
      if (s.test(r)) {
        for (t = 0,
        n = (e = r.match(s)).length; t < n; t += 1) {
          o = e[t],
          r = r.replace(o, Array(o.length + 1).join(' '))
        }
      }
    }()),
    t(/(\[[^\]]+\])/g, 'b'),
    t(/(#[^\#\s\+>~\.\[:\)]+)/g, 'a'),
    t(/(\.[^\s\+>~\.\[:\)]+)/g, 'b'),
    t(/(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi, 'c'),
    t(/(:(?!not|global|local)[\w-]+\([^\)]*\))/gi, 'b'),
    t(/(:(?!not|global|local)[^\s\+>~\.\[:]+)/g, 'b'),
    r = (r = (r = (r = (r = (r = r.replace(/[\*\s\+>~]/g, ' ')).replace(/[#\.]/g, ' ')).replace(/:not/g, '    ')).replace(/:local/g, '      ')).replace(/:global/g, '       ')).replace(/[\(\)]/g, ' '),
    t(/([^\s\+>~\.\[:]+)/g, 'c'),
    s.sort(function (e, t) {
      return e.index - t.index
    }
    ),
    {
      selector: e,
      specificity: '0,' + o.a.toString() + ',' + o.b.toString() + ',' + o.c.toString(),
      specificityArray: [0, o.a, o.b, o.c],
      parts: s
    }
  }
  var fm = e => {
    const t = e.dom.styleSheets
    return Array.prototype.slice.call(t)
  }

  const hm = e => {
    const t = e.selectorText
    const n = e.style.cssText
    if (void 0 === n) { throw new Error('WARNING: Browser does not support cssText property') }
    return {
      selector: t,
      style: n,
      raw: e.style
    }
  }
  const vm = e => {
    const t = e.cssRules
    return U(t, e => (e => e.type === window.CSSRule.IMPORT_RULE)(e) ? vm(e.styleSheet) : (e => e.type === window.CSSRule.STYLE_RULE)(e) ? [hm(e)] : [])
  }
  const ym = e => U(e, vm)
  const bm = (e, t, n) => {
    const r = e => e.selector.indexOf(',') !== -1
    const o = U(P(e, r), e => {
      const t = e.selector.split(',')
      return C(t, t => ({
        selector: t.trim(),
        raw: e.raw
      }))
    }
    )
    const s = P(e, e => !r(e)).concat(o)
    s.sort((e, t) => (function (e, t) {
      var n, r, o
      if (typeof e == 'string') {
        if (e.indexOf(',') !== -1) { throw 'Invalid CSS selector' }
        n = gm(e).specificityArray
      } else {
        if (!Array.isArray(e)) { throw 'Invalid CSS selector or specificity array' }
        if (e.filter(function (e) {
          return typeof e == 'number'
        }
        ).length !== 4) { throw 'Invalid specificity array' }
        n = e
      }
      if (typeof t == 'string') {
        if (t.indexOf(',') !== -1) { throw 'Invalid CSS selector' }
        r = gm(t).specificityArray
      } else {
        if (!Array.isArray(t)) { throw 'Invalid CSS selector or specificity array' }
        if (t.filter(function (e) {
          return typeof e == 'number'
        }
        ).length !== 4) { throw 'Invalid specificity array' }
        r = t
      }
      for (o = 0; o < 4; o += 1) {
        if (n[o] < r[o]) { return -1 }
        if (n[o] > r[o]) { return 1 }
      }
      return 0
    }(e.selector, t.selector))).reverse(),
    ((e, t, n) => {
      const r = U(t, t => {
        const n = Yt(e, t.selector)
        return _(n, e => {
          const n = ((e, t) => {
            const n = {}
            return _(e, r => {
              if (void 0 !== e[r]) {
                const o = t.dom.style
                D(o, r) || (n[r] = e[r])
              }
            }
            ),
            n
          }
          )(t.raw, e)
          zn(e, n)
        }
        ),
        n
      }
      )
      n && _(r, e => {
        Nn(e, 'class')
      }
      )
    }
    )(t, s, n)
  }
  const xm = (e, t, n, r) => {
    const o = fm(e)
    const s = ym(o).map(e => {
      const t = e.selector
      return {
        selector: n.hasOwnProperty(t) ? n[t] : t,
        raw: e.raw
      }
    }
    )
    bm(s, t, r)
  }
  const wm = (e, t, n, r) => {
    const o = fm(e)
    const s = ym(o)
    const a = P(s, e => ue(e.selector, n))
    bm(a, t, r)
  }
  const Tm = (e, t, n, r) => {
    const o = fm(e)
    const s = ym(o)
    const a = P(s, e => D(n, e.selector))
    bm(a, t, r)
  }

  var Im = {
    inlineStyles: (e, t, n) => {
      xm(e, t, n, !0)
    },
    inlineStylesKeepClasses: (e, t, n) => {
      xm(e, t, n, !1)
    },
    inlinePrefixedStyles: (e, t, n) => {
      wm(e, t, n, !0)
    },
    inlinePrefixedStylesKeepClasses: (e, t, n) => {
      wm(e, t, n, !1)
    },
    inlineSelectorsStyles: (e, t, n) => {
      Tm(e, t, n, !0)
    },
    inlineSelectorsStylesKeepClasses: (e, t, n) => {
      Tm(e, t, n, !1)
    }
  }
  var Sm = {
    inlineStyles: Im.inlineStyles,
    inlineStylesKeepClasses: Im.inlineStylesKeepClasses,
    inlinePrefixedStyles: Im.inlinePrefixedStyles,
    inlinePrefixedStylesKeepClasses: Im.inlinePrefixedStylesKeepClasses,
    inlineSelectorsStyles: Im.inlineSelectorsStyles,
    inlineSelectorsStylesKeepClasses: Im.inlineSelectorsStylesKeepClasses
  }
  const Om = {
    p: 'p, li[data-converted-paragraph]'
  }
  const Em = (e, t) => {
    const n = Yt(e, 'li[data-converted-paragraph]')
    if (_(n, e => {
      Nn(e, 'data-converted-paragraph')
    }
    ),
    t) {
      const t = Yt(e, 'li')
      _(t, t => {
        const n = (e => {
          const t = (() => {
            const t = _e.fromTag('spn')
            return dn(e, t),
            t
          }
          )()
          return {
            convertToPx: e => {
              return Hn(t, 'margin-left', e),
              n = Wn(t, 'margin-left'),
              parseFloat(/-?\d+\.?\d*/.exec(n)[0])
              var n
            },
            destroy: () => vn(t)
          }
        }
        )(e)
        const r = ((e, t) => {
          const n = En(e, 'data-tab-interval').getOr('36pt')
          return t.convertToPx(n)
        }
        )(e, n)
        const o = km(t, r, n).getOr({});
        (e => {
          Nn(e, 'data-list-level'),
          Nn(e, 'data-text-indent-alt'),
          Nn(e, 'data-border-margin'),
          Vn(e, 'margin-left'),
          Vn(e, 'text-indent'),
          Re(Gn(e), (t, n) => {
            !ue(n, 'border') || n !== 'border-image' && t.trim() !== 'none' && t.trim() !== 'initial' || Vn(e, n)
          }
          )
        }
        )(t),
        n.destroy(),
        zn(t, o)
      }
      )
      const n = Yt(e, 'ol,ul')
      _(n, e => {
        const t = Yt(e, 'li')
        $n(e, 'margin-top').isNone() && O.from(t[0]).each(t => {
          Hn(e, 'margin-top', Wn(t, 'margin-top'))
        }
        ),
        $n(e, 'margin-bottom').isNone() && O.from(t[t.length - 1]).each(t => {
          Hn(e, 'margin-bottom', Wn(t, 'margin-bottom'))
        }
        )
      }
      )
    }
    Nn(e, 'data-tab-interval')
  }
  const km = (e, t, n) => {
    const r = e => En(e, 'data-list-level').map(e => parseInt(e, 10)).getOr(1)
    return $n(e, 'text-indent').bind(o => $n(e, 'margin-left').map(s => {
      const a = $n(e, 'list-style').exists(e => de(e, 'none'))
      const i = En(e, 'data-border-margin').getOr('0px')
      const l = a ? r(e) + 1 : r(e)
      const c = n.convertToPx(s) + n.convertToPx(i)
      const m = t * l
      const d = En(e, 'data-text-indent-alt').getOr(o)
      const u = n.convertToPx(d)
      const p = {}
      const g = t / 2 * -1 - u
      g > 0 && (p['text-indent'] = g + 'px')
      const f = c - m - g
      return p['margin-left'] = f > 0 ? f + 'px' : '0px',
      p
    }
    ))
  }
  const Nm = e => {
    const t = (n = _e.fromDom(document.body),
    {
      play: (e, t, r) => {
        const o = _e.fromTag('div')
        const s = _e.fromTag('iframe')
        zn(o, {
          display: 'none'
        })
        const a = Ar(s, 'load', () => {
          var n
          a.unbind(),
          pm(s, e)
          const i = (n = s.dom.contentWindow) === null || void 0 === n ? void 0 : n.document
          if (void 0 === i) { throw new Error('sandbox iframe load event did not fire correctly') }
          const l = _e.fromDom(i)
          const c = l.dom.body
          if (void 0 === c) { throw new Error('sandbox iframe does not have a body') }
          const m = _e.fromDom(c)
          const d = t(l, m)
          vn(o),
          setTimeout(x(r, d), 0)
        }
        )
        un(o, s),
        un(n, o)
      }
    })
    var n
    return n => new Promise(r => {
      t.play(n, (t, n) => (((e, t, n) => {
        const r = n.mergeInline()
        r && (Sm.inlineStyles(e, t, Om),
        (e => {
          Ea(e)
        }
        )(t)),
        Em(t, r)
      }
      )(t, n, {
        mergeInline: v(e)
      }),
      Yn(n)), r)
    }
    )
  }
  const Dm = (e, t, n, r) => {
    const o = e.html
    return n.cleanDocument(o, t, r).then(e => {
      if ((n = e) == null || n.length === 0) {
        return {
          response: jr([], []),
          bundle: Br({})
        }
      }
      {
        const n = void 0 === r.sanitizer ? oc(r.intraFlag.isMarked) : r.sanitizer
        return ((e, t, n, r) => {
          const o = e => ({
            response: e,
            bundle: Br({})
          })
          const s = r.sanitizeHtml(t, 'word')
          return Nm(e)(s).then(e => {
            const t = Kn(e)
            const r = e => o(jr(t, e))
            const s = _e.fromTag('div')
            fn(s, t)
            const a = P(Et('img[src]', s), e => En(e, 'src').exists(e => ue(e, 'blob:') || ue(e, 'data:')))
            const i = Et('img[data-image-src]', s)
            if (a.length === 0 && i.length === 0) { return r([]) }
            if (n) {
              return _(a, e => Nn(e, 'id')),
              (e => Promise.all(C(e, e => {
                const t = e.dom
                return gi(t).then(n => n.toBlob().then(r => ((n, r) => {
                  const o = ue(t.src, 'blob:') ? t.src : URL.createObjectURL(r)
                  const s = wn('image')
                  const a = _c.blob(s, n, o)
                  return Mc(a, e)
                }
                )(n, r)))
              }
              )))(a).then(r)
            }
            {
              _(a, vn),
              _(i, vn)
              const e = Wt(s)
              return o(Hr(e, [], 'errors.local.images.disallowed'))
            }
          }
          )
        }
        )(t, e, r.allowLocalImages, n)
      }
      var n
    }
    , e => (console.error('PowerPaste error code: WIM01'),
    {
      response: Fr('errors.paste.process.failure'),
      bundle: Br({})
    }))
  }
  const Am = vt()
  const Cm = e => {
    try {
      const t = e()
      const n = t != null && t.length > 0 ? Kn(t) : []
      return Er.value(n)
    } catch (e) {
      return console.error('PowerPaste error code: PT01. Message: ', e),
      Er.error('errors.paste.process.failure')
    }
  }
  const _m = e => e.fold($r, e => ({
    response: jr(e, []),
    bundle: Br({})
  }))
  const Lm = (e, t, n, r, o) => Cm(() => {
    const s = {
      type: r,
      merge: n,
      cleanFilteredInlineElements: o.cleanFilteredInlineElements,
      indentUseMargin: o.indentUseMargin,
      preprocessor: {
        defaultProtocol: o.defaultProtocol
      }
    }
    return ((e, t, n, r) => {
      Yi(n, r.preprocessor)
      const o = Yn(n)
      const s = ((e, t) => {
        const n = t.merge
        const r = ((e, t) => {
          const n = t.browser.isFirefox()
          const r = So([(s = n ? bs : ys,
          a = !n,
          Eo((e, t) => {
            const n = ((e, t, n) => t(_e.fromDom(e.getNode())).fold(() => [e], t => {
              const r = e.type() === po
              const o = [ho(t.dom, r)]
              return !r && n && o.push(ho(t.dom, !0)),
              o
            }
            ))(t, s, a)
            e.emitTokens(n)
          }
          , f))])
          const o = n ? f : la
          var s, a
          return {
            annotate: [e.type === xs.Word ? r : f],
            local: [o]
          }
        }
        )(t, e)
        return j([r.local, Ha(t), Wa(t), r.annotate, (o = n ? [] : t.cleanFilteredInlineElements,
        [Da, Ca, va(o)]), za(t), $a(t, e), [Fs], [ha], [ea], [ta], Ua(t), [Ta, Ia, ca, Sa], [ma], [da], [ua], [ba], Ga(t), [wa], [ga], [Ea], Va(t), [ya], [na]])
        var o
      }
      )(t, r)
      return Oo(e, o, s)
    }
    )(e, Am, t, s)
  }
  )
  const Pm = (e, t) => {
    const n = Cm(() => ((e, t) => ((e, t) => Oo(e, t, [ta, Sa]))(e, Yn(t)))(e, t))
    return _m(n)
  }
  const Rm = (e, t, n, r, o) => Lm(e, t, r, n, o).fold(Gr, e => Promise.resolve({
    response: jr(e, []),
    bundle: Br({})
  }))
  const Mm = e => e === '\n' || e === '\r'
  const Fm = (e, t) => {
    const n = (e => {
      const t = _e.fromTag('div')
      return ((e, t) => {
        e.dom.textContent = t
      }
      )(t, e),
      Yn(t)
    }
    )(e)
    const r = ((e, t) => {
      const n = ((e, t) => {
        const n = e.replace(/\t/g, (r = t) <= 0 ? '' : new Array(r + 1).join(' '))
        var r
        const o = R(n, (e, t) => (e => ' \f\t\v'.indexOf(e) !== -1)(t) || t === '\xa0' ? e.pcIsSpace || e.str === '' || e.str.length === n.length - 1 || ((e, t) => t < e.length && t >= 0 && Mm(e[t]))(n, e.str.length + 1) ? {
          pcIsSpace: !1,
          str: e.str + '\xa0'
        } : {
          pcIsSpace: !0,
          str: e.str + ' '
        } : {
          pcIsSpace: Mm(t),
          str: e.str + t
        }, {
          pcIsSpace: !1,
          str: ''
        })
        return o.str
      }
      )(e, t).replace(/^[\r\n]*|[\r\n]*$/g, '').split(/(?:\r?\n){2}/)
      const r = C(n, e => e.split(/\n|\r\n/).join('<br />'))
      return r.length === 1 ? r[0] : C(r, e => '<p>' + e + '</p>').join('')
    }
    )(n, t)
    const o = Kn(r)
    return jr(o, [])
  }
  const jm = e => (t, n) => ((e, t) => {
    const n = vc(e).getOrDie('Required text input for Text Handler')
    return {
      response: n.text.length > 0 ? Fm(n.text, t) : Ur(),
      bundle: Br({})
    }
  }
  )(t, e)
  const Um = e => (t, n) => {
    const r = (t, r) => {
      const o = _e.fromTag('div')
      fn(o, t),
      Yi(o, e)
      const s = Wt(o)
      return {
        response: jr(s, r),
        bundle: n.bundle
      }
    }
    const o = v(n)
    return Mr(n.response, o, r, o, r)
  }
  const Hm = (e, t, n) => (r, o) => {
    const s = gc(r).getOrDie('Wrong input type for HTML handler').container
    const a = Rt(t)
    const i = o.bundle
    return cm(i) ? Pm(a, s) : (e(s),
    ((e, t, n, r, o) => {
      const s = Lm(e, t, n, r, o)
      return _m(s)
    }
    )(a, s, sm(i), mm(i), n))
  }
  const zm = (e, t, n) => (r, o) => {
    const s = o.bundle
    return (e => ({
      handle: (t, n) => e.proxyBin.fold(() => (console.error(t),
      Promise.resolve({
        response: Ur(),
        bundle: Br({})
      })), n)
    }))(s).handle('There was no proxy bin setup. Ensure you have run proxyStep first.', r => {
      const o = sm(s)
      const a = mm(s)
      const i = cm(s)
      const l = Rt(e)
      return i ? ((e, t, n, r) => {
        const o = xs.Html
        const s = t.findClipboardTags(Wt(n)).getOr([])
        return _(s, vn),
        Rm(e, n, o, !0, r)
      }
      )(l, t, r, n) : ((e, t, n, r, o) => Rm(e, t, r, n, o))(l, r, o, a, n)
    }
    )
  }
  const Wm = (e, t) => (n, r) => {
    const o = hc(n).getOrDie('Wrong input type for Word Import handler')
    const s = am(r.bundle)
    return Dm(o, s, e, t)
  }
  const Bm = (e, t) => Vr
  const $m = e => (t, n) => {
    const r = Wr(n.bundle, Br(e))
    return {
      response: n.response,
      bundle: r
    }
  }
  const Gm = (e, t) => (e => {
    const t = e => ({
      response: jr([e], []),
      bundle: Br({})
    })
    return (e => (e => {
      const t = Yt(e, 'img')
      return Promise.all(C(t, wi)).then(() => e)
    }
    )(e))(e).then(t).catch(() => t(e))
  }
  )(gc(e).getOrDie('Wrong input type for HTML handler').container)
  const Vm = vt()
  var qm = (e, t, n, r) => (o, s) => {
    const a = s.response
    return new Promise((o, s) => {
      const i = e(n)
      i.events.after.bind(e => {
        const n = e.container
        if (Vm.browser.isSafari() && (i = n,
        l = 'img[src^="webkit-fake-url"]',
        ((e, t) => {
          const n = void 0 === t ? document : t.dom
          return Ot(n) ? O.none() : O.from(n.querySelector(e)).map(_e.fromDom)
        }
        )(l, i)).isSome()) {
          const e = Vm.deviceType.isWebView() ? 'webview.imagepaste' : 'safari.imagepaste'
          o({
            response: Fr(e),
            bundle: Br({})
          })
        } else {
          t(n),
          _n(n, hr())
          const e = (s = Yn(n)).indexOf('<o:p>') >= 0 || s.indexOf('mso-list') >= 0 || s.indexOf('p.MsoNormal, li.MsoNormal, div.MsoNormal') >= 0 || s.indexOf('MsoListParagraphCxSpFirst') >= 0 || s.indexOf('<w:WordDocument>') >= 0
          const i = ((e, t) => {
            const n = Yt(t, '*[id]')
            return A(n, e => En(e, 'id').exists(e => ue(e, 'docs-internal-guid-')))
          }
          )(0, n)
          const l = Wt(n)
          const c = r.findClipboardTags(l).isSome()
          o({
            response: a,
            bundle: Br({
              isWord: e,
              isGoogleDocs: i,
              isInternal: c,
              proxyBin: n
            })
          })
        }
        var s, i, l
      }
      ),
      i.run()
    }
    )
  }

  const Km = Ct([{
    unsupported: ['id', 'message', 'isEquation', 'attrs']
  }, {
    supported: ['id', 'contentType', 'blob', 'isEquation', 'attrs']
  }])
  const Ym = {
    unsupported: Km.unsupported,
    supported: Km.supported,
    cata: (e, t, n) => e.fold(t, n)
  }
  const Xm = (e, t, n) => t.indexOf(e, n)
  const Zm = (e, t, n, r, o, s, a) => e === -1 || t === -1 ? O.none() : O.some({
    start: e,
    end: t,
    bower: n,
    regex: r,
    idRef: o,
    isEquation: s,
    attrs: a
  })
  const Jm = (e, t, n) => e.substring(t, n)
  const Qm = (e, t) => {
    if (t === -1) { return t }
    let n = 0
    const r = e.length
    do {
      const o = e.indexOf('{', t)
      const s = e.indexOf('}', t)
      if (s > o && o !== -1 ? (t = o + 1,
      ++n) : (o > s || o < 0) && s !== -1 && (t = s + 1,
      --n),
      t > r || s === -1) { return -1 }
    } while (n > 0)
    return t
  }
  const ed = (e, t, n, r, o) => {
    const s = Jm(e, n, r)
    const a = ((e, t) => {
      const n = Xm('\\picscalex', e, t)
      const r = Xm('\\bliptag', e, n)
      return n > -1 && n < r ? O.from(e.substring(n, r)) : O.none()
    }
    )(e, n)
    return Zm(n, r, s, /[^a-fA-F0-9]([a-fA-F0-9]+)\}$/, 'i', o, a)
  }
  const td = (e, t, n, r, o) => {
    const s = Jm(e, n, r)
    return Zm(n, r, s, /([a-fA-F0-9]{64,})(?:\}.*)/, 's', o, O.none())
  }
  const nd = (e, t) => ((e, t) => {
    const n = Xm('{\\pict{', e, t)
    const r = Qm(e, n)
    const o = Xm('{\\shp{', e, t)
    const s = Qm(e, o)
    const a = Xm('{\\mmathPict{', e, t)
    const i = Qm(e, a)
    const l = a !== -1 && (a < n && i > r || a < o && i > s)
    const c = x(td, e, t, o, s, l)
    const m = x(ed, e, t, n, r, l)
    return n === -1 && o === -1 ? O.none() : n === -1 ? c() : o === -1 || o < n && s > r ? m() : n < o && r > s ? c() : n < o ? m() : o < n ? c() : O.none()
  }
  )(e, t)
  const rd = e => {
    let t = []
    const n = () => e.length
    const r = e => {
      const n = (e => {
        const t = e.bower
        const n = e.regex
        const r = e.isEquation
        const o = e.attrs
        return (e => {
          const t = /\\shplid(\d+)/.exec(e)
          return t !== null ? O.some(t[1]) : O.none()
        }
        )(t).map(s => {
          const a = e.idRef + s
          return (e => e.indexOf('\\pngblip') >= 0 ? Er.value('image/png') : e.indexOf('\\jpegblip') >= 0 ? Er.value('image/jpeg') : Er.error('errors.imageimport.unsupported'))(t).fold(e => Ym.unsupported(a, e, r, o), e => ((e, t) => {
            const n = e.match(t)
            return n && n[1] && n[1].length % 2 == 0 ? Er.value(n[1]) : Er.error('errors.imageimport.invalid')
          }
          )(t, n).fold(e => Ym.unsupported(a, e, r, o), t => Ym.supported(a, e, ((e, t) => {
            if (e.length === 0) { throw new Error('Zero length content passed to Hex conversion') }
            const n = (e => {
              const t = new Array(e.length / 2)
              for (let n = 0; n < e.length; n += 2) {
                const r = e.substr(n, 2)
                t[Math.floor(n / 2)] = parseInt(r, 16)
              }
              return t
            }
            )(e)
            const r = new Uint8Array(n)
            return new Blob([r], {
              type: t
            })
          }
          )(t, e), r, o)))
        }
        )
      }
      )(e)
      return t = t.concat(n.toArray()),
      e.end
    }

    let o = 0
    for (; o < e.length;) { o = nd(e, o).fold(n, r) }
    return t
  }
  const od = e => Ym.cata(e, (e, t, n) => e, (e, t, n, r, o) => e)
  const sd = e => Ym.cata(e, (e, t, n) => n, (e, t, n, r, o) => r)
  const ad = e => Ym.cata(e, (e, t, n) => Er.error(t), (e, t, n, r, o) => Er.value(n))
  const id = (e, t) => {
    const n = new RegExp('\\\\pic' + t + '(\\-?\\d+)\\\\').exec(e)[1]
    return parseInt(n, 10)
  }
  const ld = (e, t, n, r, o) => {
    const s = []
    const a = []
    let i = !1
    const l = U(e, (e, l) => {
      const c = On(e, 'data-image-id')
      return Nn(e, 'rtf-data-image'),
      Nn(e, 'data-image-id'),
      Nn(e, 'data-ms-equation'),
      o || Nn(e, 'data-image-src'),
      c === 'unsupported' ? (i = !0,
      In(e, 'alt', n('errors.imageimport.unsupported')),
      []) : M(t, (e, t) => r(e, t, c, l)).fold(() => (console.log('WARNING: unable to find data for image ', e.dom),
      i = !0,
      In(e, 'alt', n('errors.imageimport.unsupported')),
      []), t => ad(t).fold(t => (i = !0,
      console.error('PowerPaste error code: RTF04'),
      In(e, 'alt', n(t)),
      []), n => {
        var r
        return s.push(e),
        a.push((r = t,
        Ym.cata(r, (e, t, n) => O.none(), (e, t, n, r, o) => o))),
        o && Nn(e, 'data-image-src'),
        [n]
      }
      ))
    }
    )
    return {
      blobs: l,
      filteredImages: s,
      imageAttrs: a,
      failedImage: i
    }
  }
  const cd = (e, t, n, r, o) => {
    const s = (e => R(e, (e, t) => {
      const n = od(t)
      const r = sd(t)
      return F(e, e => !(r || sd(e)) && od(e) === n).fold(() => e.concat([t]), n => ad(e[n]).isValue() ? e : e.slice(0, n).concat(e.slice(n + 1)).concat([t]))
    }
    , []))(t)
    const { pass: a, fail: i } = L(s, e => !sd(e))
    const { pass: l, fail: c } = L(e, e => !(e => On(e, 'data-ms-equation') === 'true')(e))
    const m = ld(l, a, r, (e, t, n, r) => od(e) === n, o.keepSrc)
    const d = ld(c, i, r, (e, t, n, r) => t === r, o.keepSrc)
    const u = m.filteredImages.concat(d.filteredImages)
    const p = m.imageAttrs.concat(d.imageAttrs)
    const g = m.blobs.concat(d.blobs)
    const f = m.failedImage || d.failedImage
    Rc(g).then(e => {
      ((e, t) => e.length === t.length ? Promise.all(C(e, (e, n) => ((e, t) => t.fold(() => Promise.resolve(e), t => _c.cata(e, (n, r, o) => r.toCanvas().then(s => {
        const a = _e.fromDom(s)
        const i = En(a, 'width').map(e => parseInt(e, 10)).getOr(1)
        const l = En(a, 'height').map(e => parseInt(e, 10)).getOr(1)
        const c = ((e, t, n) => {
          const r = x(id, e)
          const o = r('wgoal')
          const s = r('hgoal')
          const a = o / t
          const i = s / n
          const l = r('cropl')
          const c = r('cropt')
          return {
            cropl: l / a,
            cropt: c / i,
            cropw: (o - l - r('cropr')) / a,
            croph: (s - c - r('cropb')) / i
          }
        }
        )(t, i, l)
        return i === c.cropw && l === c.croph && c.cropl === 0 && c.cropt === 0 ? Promise.resolve(e) : di(r, c.cropl, c.cropt, c.cropw, c.croph).then(e => e.toBlob().then(t => {
          URL.revokeObjectURL(o)
          const r = URL.createObjectURL(t)
          return _c.blob(n, e, r)
        }
        ))
      }
      ), (t, n, r) => Promise.resolve(e))))(e, t[n]))) : Promise.resolve(e))(e, p).then(e => {
        const t = jc(e, u)
        n(t, f)
      }
      )
    }
    )
  }
  const md = e => Yt(e, '[rtf-data-image]')
  const dd = e => {
    const t = e.translations
    const n = It({
      insert: Tt(['elements', 'correlated']),
      incomplete: Tt(['elements', 'correlated', 'message'])
    })
    return {
      events: n.registry,
      processRtf: (e, r, o, s) => {
        const a = (e => {
          const t = e.replace(/\r/g, '').replace(/\n/g, '')
          return rd(t)
        }
        )(o)
        const i = md(e)
        cd(i, a, (t, o) => {
          const s = Wt(e)
          const a = t.concat(r)
          o ? (console.error('PowerPaste error code: RTF01'),
          n.trigger.incomplete(s, a, 'errors.imageimport.failed')) : n.trigger.insert(s, a)
        }
        , t, s)
      }
    }
  }

  const ud = e => {
    const t = () => Promise.resolve(e)
    return _c.cata(e.asset, (n, r, o) => /(tiff|pdf)$/.test(r.getType()) ? (e => ((e, t, n) => e.toAdjustedBlob(t, n))(e, 'image/png').then(Lc).then(O.some).catch(e => (console.warn(e),
    O.none())))(r).then(t => t.map(t => {
      const n = e.image
      return URL.revokeObjectURL(o),
      Fc(t, n),
      Mc(t, n)
    }
    ).getOr(e)) : t(), t)
  }

  var pd = (e, t) => {
    const n = (e, n) => Promise.all(C(e, ud)).then(e => ({
      response: n(e),
      bundle: t.bundle
    }))
    return Mr(t.response, Gr, (e, t) => n(t, t => jr(e, t)), () => Promise.resolve(t), (e, t, r) => n(t, t => (console.error('PowerPaste error code:  IMG01'),
    Hr(e, t, r))))
  }

  const gd = (e, t) => e.isSupported ? t.getWordData() : O.none()
  const fd = e => e.getNative()
  const hd = e => e.getImage()
  const vd = e => e.getHtml()
  const yd = e => e.getText()
  const bd = e => e.getOnlyText()
  const xd = e => e.getGoogleDocsData()
  const wd = e => e.getVoid()
  const Td = (e, t, n, r) => ({
    label: e,
    getAvailable: t,
    steps: n,
    capture: v(r)
  })
  const Id = (e, t, n, r) => ({
    label: e,
    getAvailable: t,
    steps: n,
    capture: v(r)
  })
  const Sd = (e, t, n, r) => {
    return Td(Nc.native, vd, [(o = t.intraFlag,
    (e, t) => {
      const n = gc(e).getOrDie('Wrong input type for HTML handler')
      const r = o.findClipboardTags(Wt(n.container))
      r.each(e => {
        _(e, vn)
      }
      )
      const s = r.isSome()
      return {
        response: t.response,
        bundle: Br({
          isInternal: s
        })
      }
    }
    ), um(e, t), Hm(n, r, t), Vc(t), pd], !0)
    var o
  }
  const Od = (e, t, n) => {
    return Td(Nc.msoffice, x(gd, e), [$m({
      isWord: !0
    }), dm(t, n), Wm(e, n), (r = n,
    (e, t) => new Promise((n, o) => {
      const s = dd(r)
      const a = e => n({
        response: e,
        bundle: Br({})
      })
      s.events.insert.bind(e => {
        a(jr(e.elements, e.correlated))
      }
      ),
      s.events.incomplete.bind(e => {
        console.error('PowerPaste error code: RTF02'),
        a(Hr(e.elements, e.correlated, e.message))
      }
      )
      const i = hc(e).getOrDie('Word input required for rtf data')
      const l = e => {
        const n = () => Promise.resolve(t)
        const o = (t, n) => {
          const o = _e.fromTag('div')
          return fn(o, t),
          e.fold(() => {
            const e = md(o)
            return e.length > 0 ? (e => {
              _(e, vn)
              const t = Wt(o)
              return console.error('PowerPaste error code: RTF03'),
              a(Hr(t, n, 'errors.imageimport.failed'))
            }
            )(e) : (() => {
              const e = Wt(o)
              return a(jr(e, n))
            }
            )()
          }
          , e => {
            s.processRtf(o, n, e, r)
          }
          )
        }

        return Mr(t.response, n, o, n, o)
      }
          ;
      ((e, t) => {
        const n = Le(t)
        if (n.length !== Zi.length) { throw new Error('Partial match') }
        B(n, n => Mn(e.discriminator === n, t[n])).getOrDie('Must find branch for constructor: ' + e.discriminator)(e.data)
      }
      )(i.rtf, {
        disabled: () => {
          l(O.none())
        },
        fromClipboard: e => {
          l(!0 === r.allowLocalImages ? O.some(e.rtf) : O.none())
        }
      })
    }
    )), pd], !0)
    var r
  }
  const Ed = (e, t, n, r) => Td(Nc.googledocs, xd, [$m({
    isGoogleDocs: !0
  }), dm(e, t), Gm, Hm(n, r, t), om, Vc(t), pd], !0)
  const kd = e => Td(Nc.image, hd, [!1 === e.allowLocalImages ? (e, t) => Gr('errors.local.images.disallowed') : (e, t) => (e => {
    const t = P(e, e => e.kind === 'file' && /image/.test(e.type))
    const n = R(t, (e, t) => {
      const n = t.getAsFile()
      return (e => e !== null)(n) ? e.concat(n) : e
    }
    , [])
    return Rc(n).then(e => {
      const t = (e => {
        const t = []
        const n = []
        return _(e, e => _c.cata(e, (r, o, s) => {
          const a = _e.fromTag('img')
          In(a, 'src', s),
          t.push(a),
          n.push(Mc(e, a))
        }
        , (e, t, n) => {
          console.error('Internal error: Paste operation produced an image URL instead of a Data URI: ', t)
        }
        )),
        jr(t, n)
      }
      )(e)
      return {
        response: t,
        bundle: Br({})
      }
    }
    )
  }
  )(fc(e).getOrDie('Must have image data for images handler').images), pd], !0)
  const Nd = e => Td(Nc.plaintext, bd, [jm(e.tabSpaces), Um({
    defaultProtocol: e.defaultProtocol
  })], !0)
  const Dd = (e, t) => Td(Nc.text, yd, [jm(e), Um({
    defaultProtocol: t
  })], !0)
  var Ad = Object.freeze({
    __proto__: null,
    loadScript: (e, t) => tinymce.Resource.load(e, t)
  })
  const Cd = {
    'cement.dialog.paste.title': 'Paste Formatting Options',
    'cement.dialog.paste.instructions': 'Choose to keep or remove formatting in the pasted content.',
    'cement.dialog.paste.merge': 'Keep formatting',
    'cement.dialog.paste.clean': 'Remove formatting',
    'safari.imagepaste': 'Safari does not support direct paste of images. <a href="https://support.ephox.com/entries/88543243-Safari-Direct-paste-of-images-does-not-work" style="text-decoration: underline">More information on image pasting for Safari</a>',
    'webview.imagepaste': 'Safari does not support direct paste of images. <a href="https://support.ephox.com/entries/88543243-Safari-Direct-paste-of-images-does-not-work" style="text-decoration: underline">More information on image pasting for Safari</a>',
    'error.code.images.not.found': 'The images service was not found: (',
    'error.imageupload': 'Image failed to upload: (',
    'error.full.stop': ').',
    'errors.local.images.disallowed': 'Local image paste has been disabled. Local images have been removed from pasted content.',
    'errors.imageimport.failed': 'Some images failed to import.',
    'errors.imageimport.unsupported': 'Unsupported image type.',
    'errors.imageimport.invalid': 'Image is invalid.'
  }
  const _d = e => tinymce.translate((e => Cd[e])(e))
  const Ld = e => {
    const t = document.createElement('div')
    return t.appendChild(e.cloneNode(!0)),
    t.innerHTML
  }
  const Pd = v('x-tinymce/html')
  const Rd = '\x3c!-- x-tinymce/html --\x3e'
  const Md = e => e.indexOf(Rd) !== -1
  const Fd = e => /^https?:\/\/[\w\-\/+=.,!;:&%@^~(){}?#]+$/i.test(e)
  const jd = e => {
    const t = /^<a href="([^"]+)">([^<]+)<\/a>$/.exec(e)
    return O.from(t).bind(t => {
      const n = {
        url: t[1],
        html: e
      }
      return Mn(t[1] === t[2], n)
    }
    )
  }
  const Ud = (e, t, n) => (e => 'extra' in e.undoManager)(e) ? (e.undoManager.extra(() => {
    Wd(e, t)
  }
  , n),
  O.some(!0)) : O.none()
  const Hd = (e, t) => jd(t).bind(t => !1 === e.selection.isCollapsed() && Fd(t.url) ? ((e, t) => Ud(e, t.html, () => {
    e.execCommand('mceInsertLink', !1, t.url)
  }
  ))(e, t) : O.none())
  const zd = (e, t) => jd(t).bind(t => ((e, t) => {
    const n = e.toLowerCase()
    return Fd(n) && A(t, e => pe(n, `.${e.toLowerCase()}`))
  }
  )(t.url, ae(e)) ? ((e, t) => Ud(e, t.html, () => {
      e.insertContent('<img src="' + t.url + '">')
    }
    ))(e, t) : O.none())
  const Wd = (e, t) => (e.insertContent(t, {
    merge: V(e),
    paste: !0
  }),
  O.some(!0))
  const Bd = (e, t) => e.hasEventListeners(t)
  const $d = (e, t, n, r, o) => {
    const s = (e => e.replace(Rd, ''))(t)
    return ((e, t, n, r, o) => Bd(e, 'PastePostProcess') ? ((e, t, n, r, o) => {
      const s = e.dom.add(e.getBody(), 'div', {
        style: 'display:none'
      }, t)
      const a = ((e, t) => e.dispatch('PastePostProcess', t))(e, {
        internal: n,
        node: s,
        source: r,
        mode: o
      }).node.innerHTML
      return e.dom.remove(s),
      a
    }
    )(e, t, n, r, o) : t)(e, ((e, t, n, r, o) => Bd(e, 'PastePreProcess') ? ((e, t, n, r, o) => ((e, t) => e.dispatch('PastePreProcess', t))(e, {
      internal: n,
      content: t,
      source: r,
      mode: o
    }).content)(e, t, n, r, o) : t)(e, s, n, r, o), n, r, o)
  }
  const Gd = (e, t, n, r, o, s) => {
    const a = le()
    const i = ('/js',
    (r ? r.jsUrl : n).replace(/\/$/, '') + '/' + '/js'.replace(/^\//, ''))
    const l = (e, t) => (e.undoManager.transact(() => {
      var n
      Wd(e, t),
      n = e.getBody(),
      _(C(n.getElementsByTagName('*'), _e.fromDom), e => {
        kn(e, 'data-mce-style') && !kn(e, 'style') && En(e, 'data-mce-style').each(t => In(e, 'style', t))
      }
      )
    }
    ),
    O.some(!0))
    const c = () => {
      a.on(t => e.selection.moveToBookmark(t)),
      a.clear()
    }
    const m = q(e)
    const d = {
      baseUrl: i,
      cacheSuffix: Y(e),
      officeStyles: te(e),
      htmlStyles: re(e),
      gdocsStyles: ne(e),
      translations: _d,
      allowLocalImages: ee(e),
      pasteBinAttrs: {
        'data-mce-bogus': 'all',
        class: 'mce-pastebin'
      },
      intraFlag: {
        isMarked: Md,
        findClipboardTags: e => {
          const t = P(e, e => Ie(e) && de(Ae(e), Pd()))
          return t.length ? O.some(t) : O.none()
        }
      },
      keepSrc: Q(e),
      cleanFilteredInlineElements: oe(e),
      indentUseMargin: Z(e),
      sanitizer: o,
      tabSpaces: m,
      defaultProtocol: se(e)
    }
    const p = ((e, t, n, r, o = Pr) => {
      const s = {
        ...{
          ...fr,
          sanitizer: oc(r.intraFlag.isMarked)
        },
        ...je(r, u)
      }
      const a = wt(o, s.baseUrl, s.cacheSuffix)
      const i = pr(s.pasteBinAttrs)
      const l = [Nd(s), Od(a, t, s), Ed(t, s, n, e), Sd(t, s, n, e), kd(s), Dd(s.tabSpaces, s.defaultProtocol)]
      const c = ((e, t, n, r, o) => Id(Nc.fallback, fd, [qm(r, n, o, t.intraFlag), um(e, t), zm(o, t.intraFlag, t), Vc(t), pd], !1))(t, s, n, i, e)
      return Ac(l, c, s.sanitizer)
    }
    )(_e.fromDom(e.getBody()), (e => ({
      createDialog: () => {
        let t = ''
        const n = le()
        const r = (() => {
          const e = ie([{
            text: 'Close',
            name: 'close',
            type: 'custom',
            primary: !0
          }])
          const t = ie({})
          return {
            setButtons: n => {
              const r = {}
              const o = C(n, e => {
                const t = e.text
                return r[t.toLowerCase()] = e.click,
                {
                  text: t,
                  name: t.toLowerCase(),
                  type: 'custom'
                }
              }
              )
              t.set(r),
              e.set(o)
            },
            getButtons: e.get,
            getAction: e => {
              const n = t.get()
              return He(n, e) ? O.some(n[e]) : O.none()
            }
          }
        }
        )()
        const o = It({
          close: Tt([])
        })
        const s = () => {
          o.trigger.close()
        }

        return {
          events: o.registry,
          setTitle: e => t = e,
          setContent: e => n.set(e),
          setButtons: e => {
            r.setButtons(e)
          },
          show: () => {
            n.on(n => {
              const o = Ld(n.dom)
              const a = {
                title: t,
                body: {
                  type: 'panel',
                  items: [{
                    type: 'htmlpanel',
                    html: o
                  }]
                },
                initialData: {},
                buttons: r.getButtons(),
                onCancel: s,
                onAction: (e, t) => {
                  r.getAction(t.name).each(T),
                  e.close()
                }
              }
              e.windowManager.open(a)
            }
            )
          },
          hide: f,
          destroy: () => {
            n.clear()
          },
          reflow: f
        }
      }
    }))(e).createDialog, f, d, Ad)
    const g = ((e = sc, t = fr.tabSpaces) => Ac([Dd(t, fr.defaultProtocol)], Id(Nc.discard, wd, [Bm], !0), e))(o, m)
    return _([p, g], t => {
      t.events.cancel.bind(() => {
        c()
      }
      ),
      t.events.error.bind(t => {
        c(),
        e.notificationManager ? e.notificationManager.open({
          text: _d(t.message),
          type: 'error'
        }) : ((e, t) => {
          const n = {
            title: 'Error',
            body: {
              type: 'panel',
              items: [{
                type: 'htmlpanel',
                html: t
              }]
            },
            initialData: {},
            buttons: [{
              text: 'OK',
              type: 'cancel',
              name: 'ok',
              primary: !0
            }]
          }
          e.windowManager.open(n)
        }
        )(e, _d(t.message))
      }
      ),
      t.events.insert.bind(t => {
        const n = C(t.elements, e => Ld(e.dom)).join('')
        e.focus(),
        s.importImages(t.assets).get(() => {
          c(),
          ((e, t) => {
            ((e, t, n) => {
              B(n, n => n(e, t))
            }
            )(e, t, (K(e) ? [Hd, zd] : []).concat([l]))
          }
          )(e, $d(e, n, t.isInternal, t.source, t.mode)),
          X(e) && s.uploadImages(t.assets)
        }
        )
      }
      ),
      t.events.block.bind(t => {
        e.setProgressState(t.state)
      }
      )
    }
    ),
    {
      pasteHtml: e => p.pasteCustom(((e, t = sc) => ({
        getWordData: () => O.from(e).filter(bc).map(e => dc({
          html: e,
          rtf: Ji()
        })),
        getGoogleDocsData: () => O.from(e).filter(xc).map(e => t.sanitizeHtml(e, 'googledocs')).map(Ec),
        getImage: O.none,
        getHtml: () => O.some(Ec(t.sanitizeHtml(e))),
        getText: O.none,
        getNative: w('There is no native event'),
        getOnlyText: O.none,
        getVoid: w('There is no paste event')
      }))(e, o)),
      pasteText: e => g.pasteCustom(((e, t = sc) => ({
        getWordData: O.none,
        getGoogleDocsData: O.none,
        getImage: O.none,
        getHtml: O.none,
        getText: () => O.some(uc({
          text: t.sanitizeText(e)
        })),
        getNative: w('There is no native event'),
        getOnlyText: O.none,
        getVoid: w('There is no paste event')
      }))(e, o)),
      pasteEvent: n => {
        (e => {
          return (t = e,
          O.from(t.clipboardData).bind(e => O.from(e.getData('text/html')))).bind(e => (e => de(e, '<google-sheets-html-origin'))(e) ? O.some('googlesheets') : (e => de(e, ' data-ccp-props=') && de(e, ' paraid=') && /font-family:.+?_MSFontService(&quot;)?[,;]/.test(e))(e) ? O.some('mswordonline') : (e => de(e, '<meta name=ProgId content=Excel.Sheet>') && !de(e, '="urn:schemas-microsoft-com:office:'))(e) ? O.some('msexcelonline') : O.none())
          var t
        }
        )(n).each(t => {
          ((e, t) => {
            e.dispatch('PowerPasteTempStats', {
              source: t
            })
          }
          )(e, t)
        }
        ),
        a.isSet() || a.set(e.selection.getBookmark(1)),
        (t.isText() ? g : p).paste(n),
        t.reset()
      }
    }
  }
  const Vd = (e, t) => {
    const n = tinymce.html.DomParser({}, e.schema).parse(t, {
      forced_root_block: !1,
      isRootContent: !0
    })
    return tinymce.html.Serializer({
      validate: !0
    }, e.schema).serialize(n)
  }
  const qd = (e, t) => {
    e.dom.bind(t, 'drop dragstart dragend dragover dragenter dragleave dragdrop draggesture', e => {
      e.preventDefault(),
      e.stopImmediatePropagation()
    }
    )
  }
  const Kd = (e, t, n, r) => {
    const o = tinymce.dom.RangeUtils
    let s
    const a = t => {
      var n, r
      const s = o.getCaretRangeFromPoint((n = t.clientX) !== null && void 0 !== n ? n : 0, (r = t.clientY) !== null && void 0 !== r ? r : 0, e.getDoc())
      e.focus(),
      u(s) && e.selection.setRng(s)
    }

    e.on('dragstart dragend', e => {
      s = e.type === 'dragstart'
    }
    ),
    e.on('dragover dragend dragleave', e => {
      s || (e.preventDefault(),
      a(e))
    }
    )
    const i = (e, t) => t in e && e[t].length > 0
    e.on('drop', t => {
      if (!s) {
        a(t)
        const o = (t => {
          var n, r, o
          const s = (o = (n = t.target.files) !== null && void 0 !== n ? n : (r = t.dataTransfer) === null || void 0 === r ? void 0 : r.files) !== null && void 0 !== o ? o : []
          const a = ae(e)
          return P(s, e => ue(e.type, 'image/') && A(a, t => (e => {
            const t = e.toLowerCase()
            const n = {
              jpg: 'jpeg',
              jpe: 'jpeg',
              jfi: 'jpeg',
              jif: 'jpeg',
              jfif: 'jpeg',
              pjpeg: 'jpeg',
              pjp: 'jpeg',
              svg: 'svg+xml'
            }
            return He(n, t) ? 'image/' + n[t] : 'image/' + t
          }
          )(t) === e.type))
        }
        )(t)
        if (o.length > 0) {
          return (t => {
            Rc(t).then(t => {
              const n = (e => C(e, e => {
                const t = _e.fromTag('img')
                const n = _c.cata(e, r.getLocalURL, (e, t, n) => t)
                return In(t, 'src', n),
                t.dom.outerHTML
              }
              ).join(''))(t)
              e.insertContent($d(e, n, !1, 'imagedrop', 'auto'), {
                merge: V(e)
              }),
              X(e) && r.uploadImages(t)
            }
            )
          }
          )(o),
          void t.preventDefault()
        }
        const s = (e => {
          const t = {}
          if (e && e.types) {
            for (let n = 0; n < e.types.length; n++) {
              const r = e.types[n]
              t[r] = e.getData(r)
            }
          }
          return t
        }
        )(t.dataTransfer)
        i(s, 'text/html') ? (n.pasteHtml(s['text/html']),
        t.preventDefault()) : i(s, 'text/plain') && !(e => {
          const t = e['text/plain']
          return !!t && t.indexOf('file://') === 0
        }
        )(s) && (n.pasteText(s['text/plain']),
        t.preventDefault())
      }
    }
    )
  }

  tinymce.PluginManager.requireLangPack('powerpaste', 'ar,bg_BG,ca,cs,da,de,el,es,eu,fa,fi,fr_FR,he_IL,hi,hr,hu_HU,id,it,ja,kk,ko_KR,ms,nb_NO,nl,pl,pt_BR,pt_PT,ro,ru,sk,sl_SI,sv_SE,th_TH,tr,uk,vi,zh_CN,zh_TW'),
  tinymce.PluginManager.add('powerpaste', (e => (n, o) => {
    if (((e, n) => !!e && ((e, n) => {
      const r = t(e.major, n.major)
      if (r !== 0) { return r }
      const o = t(e.minor, n.minor)
      if (o !== 0) { return o }
      const s = t(e.patch, n.patch)
      return s !== 0 ? s : 0
    }
    )((e => r((e => [e.majorVersion, e.minorVersion].join('.').split('.').slice(0, 3).join('.'))(e)))(e), r(n)) === -1)(tinymce, '6.0.0')) { return void console.error('The "powerpaste" plugin requires at least version 6.0.0 of TinyMCE.') }
    (e => {
      const t = e.options.register
      const n = e => {
        const t = p(e) || (e => a(e) && D(['clean', 'merge', 'prompt'], e))(e)
        return t ? {
          value: e,
          valid: t
        } : {
          valid: !1,
          message: 'Must be prompt, clean or merge.'
        }
      }

      t('powerpaste_block_drop', {
        processor: 'boolean',
        default: !1
      }),
      t('powerpaste_keep_unsupported_src', {
        processor: 'boolean',
        default: !1
      }),
      t('powerpaste_allow_local_images', {
        processor: 'boolean',
        default: !0
      }),
      t('powerpaste_word_import', {
        processor: n,
        default: 'prompt'
      }),
      t('powerpaste_googledocs_import', {
        processor: n,
        default: 'prompt'
      }),
      t('powerpaste_html_import', {
        processor: n,
        default: 'clean'
      }),
      t('powerpaste_clean_filtered_inline_elements', {
        processor: 'string[]',
        default: []
      }),
      e.options.isRegistered('link_default_protocol') || t('link_default_protocol', {
        processor: 'string',
        default: 'https'
      })
    }
    )(n),
    (e => {
      const t = e.options.set
      t('paste_block_drop', !1),
      t('paste_data_images', !1),
      t('paste_remove_styles_if_webkit', !1)
    }
    )(n)
    const s = (e => {
      const t = ie(G(e))
      const n = ie(!1)
      return e.on('keydown', e => {
        (e => tinymce.util.VK.metaKeyPressed(e) && e.keyCode === 86 && e.shiftKey)(e) && n.set(!0)
      }
      ),
      e.on('PastePlainTextToggle', e => {
        t.set(e.state)
      }
      ),
      {
        reset: () => {
          n.set(!1)
        },
        isText: () => n.get() || t.get()
      }
    }
    )(n)
    const i = (e => {
      const t = (e, t) => v(e + '.' + (e => {
        const t = e.toLowerCase()
        const n = {
          'image/jpeg': 'jpg',
          'image/jpg': 'jpg',
          'image/gif': 'gif',
          'image/png': 'png',
          'image/apng': 'apng',
          'image/avif': 'avif',
          'image/svg+xml': 'svg',
          'image/webp': 'webp',
          'image/bmp': 'bmp',
          'image/tiff': 'tiff'
        }
        return He(n, t) ? n[t] : 'dat'
      }
      )(t))
      const n = (n, r, o, s) => wr(a => {
        fi(r).then(r => {
          e.editorUpload.blobCache.add({
            id: v(n),
            name: v(n),
            filename: t(n, r.type),
            blob: v(r),
            base64: v(o.split(',')[1]),
            blobUri: v(s),
            uri: v(void 0)
          }),
          a(r)
        }
        )
      }
      )
      return {
        importImages: e => {
          const t = U(e, e => _c.cata(e, (e, t, r) => {
            const o = hi(t)
            return [n(e, t, o, r)]
          }
          , v([])))
          return Tr(t)
        },
        uploadImages: () => {
          e.uploadImages()
        },
        getLocalURL: (e, t, n) => hi(t)
      }
    }
    )(n)
    const l = (e => {
      const t = oc(Md)
      const n = (e => ({
        sanitizeHtml: x(Vd, e),
        sanitizeText: y
      }))(e)
      return {
        sanitizeText: t.sanitizeText,
        sanitizeHtml: (e, r) => (Md(e) ? n : t).sanitizeHtml(e, r)
      }
    }
    )(n)
    n.on('PreInit', () => {
      if (n.removed) { return }
      const t = Gd(n, s, o, e, l, i);
      ((e, t) => {
        e.addCommand('mceInsertClipboardContent', (e, n) => {
          a(n.html) ? t.pasteHtml(n.html) : a(n.text) && t.pasteText(n.text)
        }
        )
      }
      )(n, t),
      ((e, t) => {
        e.on('paste', e => {
          e.isDefaultPrevented() || (t.pasteEvent(e),
          e.stopImmediatePropagation())
        }
        )
      }
      )(n, t),
      J(n) ? (e => {
        qd(e, e.getBody()),
        e.inline || qd(e, e.getDoc())
      }
      )(n) : Kd(n, 0, t, i)
    }
    )
  }
  )(undefined))
}())
