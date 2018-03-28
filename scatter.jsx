const React = require('React')
const linmap = require('linmap')
const jsonist = require('jsonist')

module.exports = class Scatter extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      flowers: []
    }
  }

  componentDidMount () {
    this.loadData(this.props.dataset)
  }

  render () {
    const { width, height } = this.props
    const { flowers } = this.state

    const minPetalWidth = reduceMinProperty(flowers, 'petalWidth')
    const maxPetalWidth = reduceMaxProperty(flowers, 'petalWidth')
    const minPetalLength = reduceMinProperty(flowers, 'petalLength')
    const maxPetalLength = reduceMaxProperty(flowers, 'petalLength')

    const style = { width, height }
    const flowerElems = flowers.map(
      (flower, i) => <Flower
        key={ i }
        { ...flower }
        { ...{ minPetalWidth, maxPetalWidth, minPetalLength, maxPetalLength } }
        containerWidth={ width }
        containerHeight={ height } />
    )

    return (
      <div { ...{ style } } className='scatter'>
        { flowerElems }
      </div>
    )
  }

  loadData (url) {
    const opts = {}
    jsonist.get(url, opts, (err, flowers) => {
      if (err) return console.log('Error loading data:', err)

      this.setState({ flowers })
    })
  }
}

function Flower(props) {
  const { sepalLength, sepalWidth, petalLength, petalWidth, species,
    minPetalWidth, maxPetalWidth, minPetalLength, maxPetalLength,
    containerWidth, containerHeight } = props

  const style = {
    left: linmap(minPetalWidth, maxPetalWidth, 0, containerWidth, petalWidth),
    bottom: linmap(minPetalLength, maxPetalLength, 0, containerHeight,
      petalLength)
  }

  return <div className='flower' { ...{ style } }>x</div>
}

const reduceProperty = (iteratee, initialValue) => (array, property) =>
  array.reduce(
    (accumulator, currentValue) => iteratee(
      accumulator,
      currentValue[property]
    ),
    initialValue
  )

const reduceMinProperty = reduceProperty(Math.min, +Infinity)
const reduceMaxProperty = reduceProperty(Math.max, -Infinity)
