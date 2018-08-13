/* eslint-disable operator-linebreak */

/**
 *
 * Renderer
 *
 */

function Renderer (options) {
  this.options = options || {}
}

Renderer.prototype.code = function (code, lang, escaped) {
  if (this.options.highlight) {
    let out = this.options.highlight(code, lang)
    if (out != null && out !== code) {
      escaped = true
      code = out
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>'
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n'
}

Renderer.prototype.blockquote = function (quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n'
}

Renderer.prototype.html = function (html) {
  return html
}

Renderer.prototype.heading = function (text, level, raw) {
  return ''
    + '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + raw.toLowerCase().replace(/[^\w]+/g, '-')
    + '">'
    + '<cape-markdown-element>'
    + text
    + '</cape-markdown-element>'
    + '</h'
    + level
    + '>\n'
}

Renderer.prototype.hr = function () {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n'
}

Renderer.prototype.list = function (body, ordered) {
  let type = ordered ? 'ol' : 'ul'
  return '<' + type + '>\n' + body + '</' + type + '>\n'
}

Renderer.prototype.listitem = function (text) {
  return ''
    + '<li>'
    + '<cape-markdown-element>'
    + text
    + '</cape-markdown-element>'
    + '</li>\n'
}

Renderer.prototype.paragraph = function (text) {
  return ''
    + '<p>'
    + '<cape-markdown-element>'
    + text
    + '</cape-markdown-element>'
    + '</p>\n'
}

Renderer.prototype.table = function (header, body) {
  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n'
}

Renderer.prototype.tablerow = function (content) {
  return '<tr>\n' + content + '</tr>\n'
}

Renderer.prototype.tablecell = function (content, flags) {
  let type = flags.header ? 'th' : 'td'
  let tag = flags.align
    ? '<' + type + ' style="text-align:' + flags.align + '">'
    : '<' + type + '>'
  return ''
    + tag
    + '<cape-markdown-element>'
    + content
    + '</cape-markdown-element>'
    + '</' + type + '>\n'
}

/**
 * Span level renderer
 */

Renderer.prototype.strong = function (text) {
  return ''
    + '<strong>'
    + '<cape-markdown-element>'
    + text
    + '</cape-markdown-element>'
    + '</strong>'
}

Renderer.prototype.em = function (text) {
  return ''
    + '<em>'
    + '<cape-markdown-element>'
    + text
    + '</cape-markdown-element>'
    + '</em>'
}

Renderer.prototype.codespan = function (text) {
  return ''
    + '<code>'
    + '<cape-markdown-element>'
    + text
    + '</cape-markdown-element>'
    + '</code>'
}

Renderer.prototype.br = function () {
  return this.options.xhtml ? '<br/>' : '<br>'
}

Renderer.prototype.del = function (text) {
  return ''
    + '<del>'
    + '<cape-markdown-element>'
    + text
    + '</cape-markdown-element>'
    + '</del>'
}

Renderer.prototype.link = function (href, title, text) {
  if (this.options.sanitize) {
    let prot
    try {
      prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase()
    } catch (e) {
      return text
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return text
    }
  }
  if (this.options.baseUrl && !originIndependentUrl.test(href)) {
    href = resolveUrl(this.options.baseUrl, href)
  }
  let out = '<a href="' + href + '"'
  if (title) {
    out += ' title="' + title + '"'
  }
  out += '><cape-markdown-element>' + text + '</cape-markdown-element></a>'
  return out
}

Renderer.prototype.image = function (href, title, text) {
  if (this.options.baseUrl && !originIndependentUrl.test(href)) {
    href = resolveUrl(this.options.baseUrl, href)
  }
  let out = '<img src="' + href + '" alt="' + text + '"'
  if (title) {
    out += ' title="' + title + '"'
  }
  out += this.options.xhtml ? '/>' : '>'
  return out
}

Renderer.prototype.text = function (text) {
  return text
}

/**
 *
 * Text renderer
 *
 */

function TextRenderer () {}

TextRenderer.prototype.strong =
TextRenderer.prototype.em =
TextRenderer.prototype.codespan =
TextRenderer.prototype.del =
TextRenderer.prototype.text = function (text) {
  return text
}

TextRenderer.prototype.link =
TextRenderer.prototype.image = function (href, title, text) {
  return '' + text
}

TextRenderer.prototype.br = function () {
  return ''
}

/**
 *
 * Helpers
 *
 */

function escape (html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function unescape (html) {
  return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, function (_, n) {
    n = n.toLowerCase()
    if (n === 'colon') return ':'
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1))
    }
    return ''
  })
}

function resolveUrl (base, href) {
  if (!baseUrls[' ' + base]) {
    if (/^[^:]+:\/*[^/]*$/.test(base)) {
      baseUrls[' ' + base] = base + '/'
    } else {
      baseUrls[' ' + base] = base.replace(/[^/]*$/, '')
    }
  }
  base = baseUrls[' ' + base]
  if (href.slice(0, 2) === '//') {
    return base.replace(/:[\s\S]*/, ':') + href
  } else if (href.charAt(0) === '/') {
    return base.replace(/(:\/*[^/]*)[\s\S]*/, '$1') + href
  } else {
    return base + href
  }
}

let baseUrls = {}
let originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i

/**
 *
 * Exports
 *
 */

export {
  Renderer,
  TextRenderer
}
