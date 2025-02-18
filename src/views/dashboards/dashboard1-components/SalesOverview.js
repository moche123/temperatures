import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function interpolateByDates(data) {
  const allDates = [...data.valueTC1, ...data.valueTC2].map(item => new Date(item.FECHA));

  const minDate = new Date(Math.min(...allDates));
  const maxDate = new Date(Math.max(...allDates));

  const dates = [];
  let currentDate = new Date(minDate);
  while (currentDate <= maxDate) {
    dates.push(currentDate.toISOString());
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const interpolatedTC1 = dates.map(date => {
    const found = data.valueTC1.find(item => new Date(item.FECHA).toISOString() === date);
    return found ? found.AVG : 0;
  });
  const interpolatedTC2 = dates.map(date => {
    const found = data.valueTC2.find(item => new Date(item.FECHA).toISOString() === date);
    return found ? found.AVG : 0;
  });

  return {
    dates,
    interpolatedTC1,
    interpolatedTC2
  };
}
const SalesOverview = ( data ) => {
  const { dates, interpolatedTC1, interpolatedTC2 } = interpolateByDates(data);

  console.log(interpolatedTC1)
  console.log(interpolatedTC2)
  console.log(dates)

  const [state] = useState({
    series: [
      { name: 'series1', data: interpolatedTC1 },
      { name: 'series2', data: interpolatedTC2 }
    ],
    options: {
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: dates
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    },
  });

  return (
    <div>
      <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
    </div>
  );
};

export default SalesOverview;