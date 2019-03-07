// Dependencies
import React from 'react';
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Local
//import styles from './Chart.module.scss';

const Chart = (props) => {
  return (
    <ComposedChart width={1440} height={800} data={props.data}
          margin={{top: 20, right: 20, bottom: 20, left: 20}}>
        {/* <CartesianGrid horizontal={false}/> */}
        <XAxis />
        <YAxis yAxisId="left" domain={[0, 35]} />
        {/* <YAxis/> */}
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey='jonas' barSize={4} fill='maroon' yAxisId="left" />
        <Bar dataKey='rasmus' barSize={4} fill='darkblue' yAxisId="left" />
        <Line type='monotone' dataKey='jonasTotal' stroke='red' dot={false} style={{strokeWidth: '3px'}} yAxisId="right"/>
        <Line type='monotone' dataKey='rasmusTotal' stroke='blue' dot={false} style={{strokeWidth: '3px'}} yAxisId="right"/>
     </ComposedChart>
  );
};

export default Chart;
