import React from 'react'

const Info = ({ setShowInfo }) => {

  return (
    <div className='yesterdayInfo'>
      <div className='yesterdayInfoTop'>
        <h1>196</h1>
        <h2>Hazardous</h2>
      </div>
      <div>
        <table className='tableOld'>
            <thead>
                <tr>
                    <th className='stationName'>Khumaltar</th>
                    <th className='exitTable'  onClick={() => setShowInfo(false)}><p>x</p></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Air Temperature</td>
                    <td>14.56 C°</td>
                </tr>
                <tr>
                    <td>PM10</td>
                    <td>173.4 µg/m³</td>
                </tr>
                <tr>
                    <td>PM1</td>
                    <td>108.7 µg/m³</td>
                </tr>
                <tr>
                    <td>PM2.5</td>
                    <td>126.7 µg/m³</td>
                </tr>
                <tr>
                    <td>
                        <p>Total Suspended</p>
                        <p>Particulate</p>
                    </td>
                    <td>
                        <p>178.7</p>
                        <p>µg/m³</p>
                    </td>
                </tr>
                <tr>
                    <td>Wind direction</td>
                    <td>162 °</td>
                </tr>
                <tr>
                    <td>Wind Speed</td>
                    <td>0.38 m/s</td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Info
