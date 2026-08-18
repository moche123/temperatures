import { useEffect, useRef, useState } from "react";
import { Grid, Box, Typography, Card, CardContent } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";

import "../dashboards/dashboard1.css";
import "./realtime.css";

const MAX_POINTS = 30;
const TICK_MS = 2000;

const READERS = [
  { key: "tc1", label: "Reader 1", base: 22, variance: 3 },
  { key: "tc2", label: "Reader 2", base: 25, variance: 4 },
];

const nextValue = (base, variance, prev) => {
  const drift = (Math.random() - 0.5) * variance;
  const value = prev !== null ? prev * 0.7 + (base + drift) * 0.3 : base + drift;
  return Number(value.toFixed(1));
};

const RealTime = () => {
  const [series, setSeries] = useState(
    READERS.map((r) => ({ name: r.label, data: [] }))
  );
  const [current, setCurrent] = useState(READERS.map(() => null));
  const lastValues = useRef(READERS.map(() => null));

  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = dayjs().format("HH:mm:ss");

      lastValues.current = lastValues.current.map((prev, i) =>
        nextValue(READERS[i].base, READERS[i].variance, prev)
      );

      setCurrent([...lastValues.current]);

      setSeries((prevSeries) =>
        prevSeries.map((s, i) => {
          const data = [...s.data, { x: timestamp, y: lastValues.current[i] }];
          if (data.length > MAX_POINTS) data.shift();
          return { ...s, data };
        })
      );
    }, TICK_MS);

    return () => clearInterval(interval);
  }, []);

  const options = {
    chart: {
      id: "realtime",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: { speed: TICK_MS },
      },
      toolbar: { show: false },
    },
    stroke: { curve: "smooth", width: 2 },
    xaxis: { type: "category" },
    yaxis: { title: { text: "°C" } },
    dataLabels: { enabled: false },
    legend: { show: true },
  };

  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        Real-time readings
      </Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {READERS.map((r, i) => (
          <Grid item xs={12} sm={6} key={r.key}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" variant="h6">
                  {r.label}
                </Typography>
                <Typography variant="h2">
                  {current[i] !== null ? `${current[i]} °C` : "—"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box>
        <ReactApexChart options={options} series={series} type="line" height={350} />
      </Box>
    </Box>
  );
};

export default RealTime;
