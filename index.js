
module.exports = function (source) {
  return replaceSource(source)
}

/**
   * 替换文档内容
   * @param {String} source 文档内容
   */
function replaceSource(source) {
  const replaceHolder = []
  const lines = source.split('\n')
  for (let i = 0; i < lines.length; i++) {
    detectReplaceComment(replaceHolder, lines[i])
  }
  if (replaceHolder.length == 0) {
    return source
  }
  genRandomReplace(replaceHolder)
  for (let i = 0; i < lines.length; i++) {
    lines[i] = replaceLine(replaceHolder, lines[i])
  }
  return lines.join('\n')
}

function detectReplaceComment(replaceHolder, line) {
  if (/\/\* +DYNAMIC-REPLACE +(.+) +\*\//g.test(line)) {
    replaceHolder.push({
      match: RegExp.$1,
    })
  }
}

function genRandomReplace(replaceHolder) {
  const replaceSet = {}
  replaceHolder.forEach(e => {
    let replace = randomWords()
    while (replaceSet[replace] !== undefined) {
      replace = randomWords()
    }
    e.replace = replace
  })
}

function replaceLine(randomVars, line) {
  randomVars.forEach(v => {
    line = line.replace(RegExp(`${v.match}.*?`), v.replace)
  })
  return line
}

function randomWords (length = 2) {
  const s = []
  const words = '_$ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = 0; i < length; i++) {
    s[i] = words.substr(Math.floor(Math.random() * 27), 1)
  }
  return s.join('')
}
