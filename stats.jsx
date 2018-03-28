const React = require('React')

module.exports = function Stats(props) {
  const { info } = props

  return (
    <div className='stats'>
      {
        info === null?
          'Hover on an element to view the stats':
          formatInfo(info)
      }
    </div>
  )
}

const formatInfo = info => Object.keys(info).map(
  (key, i) => (
    <div key={ i }>{ key }: { info[key] }</div>  
  )
)
