import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function TemperatureGraph({ data }) {
  return (
    <div style={{ width: '100%', height: 300, marginTop: '40px' }}>
      <h3 style={{ color: 'white', marginBottom: '10px' }}>Hourly Temperature</h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="time" stroke="#fff" />
          <YAxis stroke="#fff" unit="°C" />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#00ffff" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TemperatureGraph;
