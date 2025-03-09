import React from 'react';

function Station() {
    const stations=[
            { name: 'Ratnapark', value: '194.2 µg/m³' },
            { name: 'Deukhuri, Dang', value: '116.5 µg/m³' },
            { name: 'Bharatpur', value: '264.6 µg/m³' },
            { name: 'Shankapark', value: '-' },
            { name: 'Khumaltar', value: '-' },
            { name: 'Nepalgunj', value: '-' },
            { name: 'Bhaktapur', value: '41.4 µg/m³' },
            { name: 'Dhulikhel', value: '27.7 µg/m³' },
            { name: 'Ilam', value: '18.2 µg/m³' },
            { name: 'Achaam', value: '-' },
          ];

  return (
    <div>
      <table className='tab1'>
        <thead>
          <tr>
            <th>Stations</th>
            <th>PM1</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((station, index) => (
            <tr key={index}>
              <td>{station.name}</td>
              <td>{station.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Station;