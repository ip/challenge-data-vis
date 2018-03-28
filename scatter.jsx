const React = require('React')
const jsonist = require('jsonist')

const Flower = require('./flower.jsx')

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
