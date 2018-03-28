const React = require('React')
const linmap = require('linmap')

module.exports = function Flower(props) {
  const { sepalLength, sepalWidth, petalLength, petalWidth, species,
    minPetalWidth, maxPetalWidth, minPetalLength, maxPetalLength,
    containerWidth, containerHeight } = props

  const style = {
    left: linmap(minPetalWidth, maxPetalWidth, 0, containerWidth, petalWidth),
    bottom: linmap(minPetalLength, maxPetalLength, 0, containerHeight,
      petalLength),
    background: colorMap[species]
  }

  return <div className='flower' { ...{ style } } />
}

const colorMap = {
  virginica: 'blue',
  versicolor: 'green',
  setosa: 'orange'
}
