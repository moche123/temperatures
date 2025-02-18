import { Grid, Box } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import utc from "dayjs/plugin/utc";
import axios from "axios";
import Swal from "sweetalert2";

import { SalesOverview } from "../dashboards/dashboard1-components";

import "../dashboards/dashboard1.css";

const Dashboard1 = () => {
  dayjs.extend(utc);
  const dateFrom = dayjs()
    .utc()
    .subtract(5, "month")
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const dateTo = dayjs()
    .utc()
    .add(50, "day")
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

  const [valueFrom, setValueFrom] = useState(dayjs(dateFrom));
  const [valueTo, setValueTo] = useState(dayjs(dateTo));
  const [valueTC1, setValueTC1] = useState([]);
  const [valueTC2, setValueTC2] = useState([]);

  const [showGraphic, setShowGraphic] = useState(false);

  useEffect(() => {
    setValueFrom(valueFrom);
    setValueTo(valueTo);

    operateValues();
  }, [valueFrom, valueTo]);
  const operateValues = async () => {
    try {
      const resultstc1 = await axios.get(
        "https://temperaturesback.netlify.app/.netlify/functions/index/api/lecture/ranges",
        {
          params: {
            from: valueFrom.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            to: valueTo.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            type: "tc1",
          },
        }
      );

      console.log(resultstc1.data);
      setValueTC1(resultstc1.data);

      const resultstc2 = await axios.get(
        "https://temperaturesback.netlify.app/.netlify/functions/index/api/lecture/ranges",
        {
          params: {
            from: valueFrom.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            to: valueTo.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            type: "tc2",
          },
        }
      );
      console.log(resultstc2.data);

      setValueTC2(resultstc2.data);
      setShowGraphic(true);
    } catch (error) {
      setShowGraphic(false);
      Swal.fire({
        title: "Error!",
        text:
          error?.response?.data?.message ??
          "Hubo un error al momento de la lectura",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
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
