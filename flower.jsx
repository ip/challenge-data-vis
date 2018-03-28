const React = require('React')
const linmap = require('linmap')

module.exports = function Flower(props) {
  const { petalLength, petalWidth, species, petalRange,
    containerWidth, containerHeight, mouseEvents } = props

  const style = {
    left: linmap(petalRange.minWidth, petalRange.maxWidth, 0, containerWidth,
      petalWidth),
    bottom: linmap(petalRange.minLength, petalRange.maxLength, 0,
      containerHeight, petalLength),
    background: colorMap[species]
  }

  return <div className='flower' { ...{ style } } { ...mouseEvents } />
}

const colorMap = {
  virginica: 'blue',
  versicolor: 'green',
  setosa: 'orange'
}
