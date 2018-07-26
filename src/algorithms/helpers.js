function * permutationsOfSize (n, items) {
  if (n === 1) {
    for (let i = 0; i < items.length; i++) {
      yield items[i]
    }
  }
  for (let index = 0; index < items.length; index++) {
    const item = items[index]
    const permutations = permutationsOfSize(
      n - 1,
      items.slice(0, index).concat(items.slice(index + 1))
    )
    for (const rest of permutations) {
      yield [item].concat(rest)
    }
  }
}

function * nonSingleSortedPermutations (items) {
  for (let l = 2; l <= items.length; l++) {
    for (const permutation of permutationsOfSize(l, items)) {
      yield permutation
    }
  }
}

function combinationColors (colors) {
  const percent = Math.floor(100 / colors.length)
  let parts = []
  for (let i = 1; i < colors.length; i++) {
    const left = colors[i - 1]
    const right = colors[i]
    parts.push(`${left} ${i * percent}%`)
    parts.push(`${right} ${i * percent}%`)
  }
  return parts.join(', ')
}

function combinationStyles (varColors) {
  const allVarNames = Object.keys(varColors)
  allVarNames.sort()
  const styles = {}
  for (const varNames of nonSingleSortedPermutations(allVarNames)) {
    const colors = varNames.map(name => varColors[name])
    styles[varNames.join('-')] = { background: `linear-gradient(${combinationColors(colors)})` }
  }
  return styles
}

function singleStyles (varColors) {
  const styles = {}
  for (const [varName, color] of Object.entries(varColors)) {
    styles[varName] = { backgroundColor: color }
  }
  return styles
}

export function colorVariables (varColors) {
  /*
  Turns an object like {A: 'red', B: 'blue'} into
  {
    A: { backgroundColor: 'red' },
    B: { backgroundColor: 'blue' },
    'A-B': { background: 'linear-gradient(red 50%, blue 50%)' }
  }
  */
  return {...singleStyles(varColors), ...combinationStyles(varColors)}
}
