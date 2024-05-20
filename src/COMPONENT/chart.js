import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import './chart.css';



const chartSetting = {
  yAxis: [
    {
      label: '',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-0px, 0)',
    },
  },
};
const dataset = [
  {
    Doha: 59,
    Lusail: 57,
    IndustrialArea: 86,
    Rayyan: 21,
    month: 'Jan',
  },
  {
    Doha: 50,
    Lusail: 52,
    IndustrialArea: 78,
    Rayyan: 28,
    month: 'Fev',
  },
  {
    Doha: 47,
    Lusail: 53,
    IndustrialArea: 106,
    Rayyan: 41,
    month: 'Mar',
  },
  {
    Doha: 54,
    Lusail: 56,
    IndustrialArea: 92,
    Rayyan: 73,
    month: 'Apr',
  },
  {
    Doha: 57,
    Lusail: 69,
    IndustrialArea: 92,
    Rayyan: 99,
    month: 'May',
  },
  {
    Doha: 60,
    Lusail: 63,
    IndustrialArea: 103,
    Rayyan: 144,
    month: 'June',
  },
  {
    Doha: 59,
    Lusail: 60,
    IndustrialArea: 105,
    Rayyan: 319,
    month: 'July',
  },
  {
    Doha: 65,
    Lusail: 60,
    IndustrialArea: 106,
    Rayyan: 249,
    month: 'Aug',
  },
  {
    Doha: 51,
    Lusail: 51,
    IndustrialArea: 95,
    Rayyan: 131,
    month: 'Sept',
  },
  {
    Doha: 60,
    Lusail: 65,
    IndustrialArea: 97,
    Rayyan: 55,
    month: 'Oct',
  },
  {
    Doha: 67,
    Lusail: 64,
    IndustrialArea: 76,
    Rayyan: 48,
    month: 'Nov',
  },
  {
    Doha: 61,
    Lusail: 70,
    IndustrialArea: 103,
    Rayyan: 25,
    month: 'Dec',
  },
];



const valueFormatter = (value) => `${value} vehicles`;

export default function Chart() {
  return (
    <>
    <h1>Vehicle Count Area Wise</h1>
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'Doha', label: 'Doha', valueFormatter },
        { dataKey: 'Lusail', label: 'Lusail', valueFormatter },
        { dataKey: 'IndustrialArea', label: 'New York', valueFormatter },
        { dataKey: 'Rayyan', label: 'Rayyan', valueFormatter },
      ]}
      {...chartSetting}
    />
    </>
  );
}
