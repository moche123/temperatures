import { Grid, Box } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import utc from "dayjs/plugin/utc";
// import axios from "axios";
// import Swal from "sweetalert2";

import { SalesOverview } from "../dashboards/dashboard1-components";

import "../dashboards/dashboard1.css";

dayjs.extend(utc);

const generateMockSeries = (from, to, base, variance) => {
  const data = [];
  let current = dayjs(from);
  const end = dayjs(to);
  while (current.isBefore(end) || current.isSame(end)) {
    data.push({
      FECHA: current.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      AVG: Number((base + (Math.random() - 0.5) * variance).toFixed(1)),
    });
    current = current.add(1, "day");
  }
  return data;
};

const Dashboard1 = () => {
  const dateFrom = dayjs()
    .utc()
    .subtract(5, "month")
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const dateTo = dayjs()
    .utc()
    .add(50, "day")
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

  const [valueFrom] = useState(dayjs(dateFrom));
  const [valueTo] = useState(dayjs(dateTo));
  const [valueTC1, setValueTC1] = useState([]);
  const [valueTC2, setValueTC2] = useState([]);

  const [showGraphic, setShowGraphic] = useState(false);

  useEffect(() => {
    operateValues();
  }, [valueFrom, valueTo]);

  const operateValues = async () => {
    // --- Backend (disabled, using mock data below) ---
    // try {
    //   const resultstc1 = await axios.get(
    //     "https://temperaturesback.netlify.app/.netlify/functions/index/api/lecture/ranges",
    //     {
    //       params: {
    //         from: valueFrom.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    //         to: valueTo.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    //         type: "tc1",
    //       },
    //     }
    //   );
    //   setValueTC1(resultstc1.data);
    //
    //   const resultstc2 = await axios.get(
    //     "https://temperaturesback.netlify.app/.netlify/functions/index/api/lecture/ranges",
    //     {
    //       params: {
    //         from: valueFrom.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    //         to: valueTo.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    //         type: "tc2",
    //       },
    //     }
    //   );
    //   setValueTC2(resultstc2.data);
    //   setShowGraphic(true);
    // } catch (error) {
    //   setShowGraphic(false);
    //   Swal.fire({
    //     title: "Error!",
    //     text: error?.response?.data?.message ?? "There was an error reading the data",
    //     icon: "error",
    //     confirmButtonText: "Ok",
    //   });
    // }

    setValueTC1(generateMockSeries(valueFrom, valueTo, 22, 6));
    setValueTC2(generateMockSeries(valueFrom, valueTo, 25, 8));
    setShowGraphic(true);
  };

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          {showGraphic && (
            <SalesOverview valueTC1={valueTC1} valueTC2={valueTC2} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard1;
