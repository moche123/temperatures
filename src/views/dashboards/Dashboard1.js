import { Grid, Box, Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import utc from "dayjs/plugin/utc";
import axios from "axios";
import Swal from "sweetalert2";

import { SalesOverview } from "./dashboard1-components";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "./dashboard1.css";

const Dashboard1 = () => {
  // 2\
  dayjs.extend(utc);

  const dateFrom = dayjs()
    .utc()
    .subtract(1, "day")
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const dateTo = dayjs()
    .utc()
    .add(1, "day")
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

  const [valueFrom, setValueFrom] = useState(dayjs(dateFrom));
  const [valueTo, setValueTo] = useState(dayjs(dateTo));
  const [valueTC1, setValueTC1] = useState([]);
  const [valueTC2, setValueTC2] = useState([]);

  const [showGraphic, setShowGraphic] = useState(false);

  const handleChangeFrom = (newValue) => {
    setValueFrom(newValue);
  };

  const handleChangeTo = (newValue) => {
    setValueTo(newValue);
  };

  useEffect(() => {
    if (valueTC1.length > 0 && valueTC2.length > 0) {
      setShowGraphic(true);
    }
  }, [valueTC1, valueTC2]);

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

      setValueTC2(resultstc2.data);
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
      <Typography
        variant="h1"
        sx={{
          marginBottom: "0",
        }}
        gutterBottom
      >
        Inicio
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <br />
        <Grid
          container
          spacing={0}
          sx={{
            display: "flex",
          }}
          className="gapgrid"
        >
          <Grid item xs={12} sm={4}>
            <DateTimePicker
              label="Desde"
              value={valueFrom}
              onChange={handleChangeFrom}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DateTimePicker
              label="Hasta"
              value={valueTo}
              onChange={handleChangeTo}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="secondary"
              onClick={operateValues}
            >
              Buscar
            </Button>
          </Grid>
        </Grid>
      </LocalizationProvider>

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
