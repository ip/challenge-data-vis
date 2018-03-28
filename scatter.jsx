const React = require('React')
const jsonist = require('jsonist')

const Flower = require('./flower.jsx')
const Stats = require('./stats.jsx')

module.exports = class Scatter extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      flowers: [],
      selectedFlower: -1
    }
  }

  componentDidMount () {
    this.loadData(this.props.dataset)
  }

  render () {
    const { width, height } = this.props
    const { flowers, selectedFlower } = this.state

    const style = { width, height }
    const flowerElems = flowers.map(
      (flower, i) => <Flower
        key={ i }
        { ...flower }
        petalRange={ calculatePetalRange(flowers) }
        containerWidth={ width }
        containerHeight={ height }
        mouseEvents={ this.createFlowerMouseEvents(i) } />
    )

    return (
      <div { ...{ style } } className='scatter'>
        <Stats info={ this.makeStatsInfo(selectedFlower) } />
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

  createFlowerMouseEvents (i) {
    return {
      onMouseOver: () => this.setState({ selectedFlower: i }),
      onMouseOut: () => this.setState({ selectedFlower: -1 })
    }
  }

  makeStatsInfo (selectedFlower) {
    if (selectedFlower === -1) return null

    return Object.assign(
      {},
      { index: selectedFlower },
      this.state.flowers[selectedFlower]
    )
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

const calculatePetalRange = flowers => ({
  minWidth: reduceMinProperty(flowers, 'petalWidth'),
  maxWidth: reduceMaxProperty(flowers, 'petalWidth'),
  minLength: reduceMinProperty(flowers, 'petalLength'),
  maxLength: reduceMaxProperty(flowers, 'petalLength')
})
