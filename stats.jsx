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

const formatInfo = info => (
  <table cols='2' rows={ info.length }>
    <tbody>
    {
      Object.keys(info).map(
        (key, i) => (
          <tr key={ i }>
            <td>{ key }:</td><td>{ info[key] }</td>
          </tr>
        )
      )
    }
    </tbody>
  </table>
)
