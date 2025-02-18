import { Grid, Box, Typography, Fab, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./reportes.css";
import axios from "axios";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

import // BlogCard,
//   SalesOverview,
// ProductPerformance,
// DailyActivities,
"../dashboards/dashboard1-components";
import { useEffect, useState } from "react";
import "../dashboards/dashboard1.css";
import ExTable2 from "../dashboards/dashboard1-components/Extable2";
import Swal from "sweetalert2";
// import xlsx from "json-as-xlsx";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const lectors = [
  {
    value: "tc1",
    label: "Lector 1",
  },
  {
    value: "tc2",
    label: "Lector 2",
  },
];

const sensors = [
  {
    value: "AMBIENTE1",
    label: "Ambiente 1",
  },
  {
    value: "AMBIENTE2",
    label: "Ambiente 2",
  },
  {
    value: "SENSOR1",
    label: "Sensor 1",
  },
  {
    value: "SENSOR2",
    label: "Sensor 2",
  },
  {
    value: "SENSOR3",
    label: "Sensor 3",
  },
  {
    value: "SENSOR4",
    label: "Sensor 4",
  },
];

const Reportes = () => {
  // 2\
  dayjs.extend(utc);

  const dateFrom = dayjs()
    .utc()
    .subtract(20, "day")
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const dateTo = dayjs()
    .utc()
    .add(20, "day")
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const [valueFrom, setValueFrom] = useState(dayjs(dateFrom));
  const [valueTo, setValueTo] = useState(dayjs(dateTo));
  const [resultsFilter, setValueResultsFilter] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    console.log(resultsFilter);
    if (resultsFilter.length > 0) {
      setShowTable(true);
    }
  }, [resultsFilter]);

  const handleChangeFrom = (newValue) => {
    setValueFrom(newValue);
  };
  const handleChangeTo = (newValue) => {
    setValueTo(newValue);
  };

  const [lector, setLector] = useState("");
  const [sensor, setSensor] = useState("");

  const handleChangeLector = (event) => {
    setShowTable(false);
    setLector(event.target.value);
  };
  const handleChangeSensor = (event) => {
    setShowTable(false);

    setSensor(event.target.value);
  };

  const operateValuesByType = async (type, sensor) => {
    try {
      const resultsFilter = await axios.get(
        "https://temperaturesback.netlify.app/.netlify/functions/index/api/lecture/reports",
        {
          params: {
            from: valueFrom.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            to: valueTo.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
            type: type,
            sensor: sensor,
          },
        }
      );
      setValueResultsFilter(resultsFilter.data);
    } catch (error) {
      setShowTable(false);
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

  const csvdownload = async () => {
    try {
      console.log(resultsFilter);
      const worksheet = XLSX.utils.json_to_sheet(
        resultsFilter.map((el) => {
          return {
            ...el,
            LECTOR: lector,
          };
        })
      );
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
      //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
      XLSX.writeFile(workbook, "DataSheet.xlsx");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text:
          error?.response?.data?.message ??
          "Hubo un error al momento de las descargas",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };
  const pdfdownload = async () => {
    try {
      // var employees = resultsFilter;
      console.log(resultsFilter);
      var doc = new jsPDF();

      const headers = ["FECHA", "SENSOR", "TIEMPO", "VALOR"];

      const body = [];
      resultsFilter.map((res) => {
        return body.push([res.FECHA, res.SENSOR, res.TIEMPO, res.VALOR]);
      });
      autoTable(doc, {
        head: [headers],
        body: body,
      });
      doc.save("descarga.pdf");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text:
          error?.response?.data?.message ??
          "Hubo un error al momento de las descargas",
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
        Reportes
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
          <Grid item xs={12} sm={4} className="buttonActions">
            {lector && sensor && (
              <Fab
                color="primary"
                variant="extended"
                size="small"
                sx={{
                  mr: 1,
                  mb: {
                    xs: 1,
                    sm: 0,
                    lg: 0,
                  },
                }}
                onClick={() => operateValuesByType(lector, sensor)}
              >
                <AddCircleOutlineIcon />
                <Typography
                  sx={{
                    ml: 1,
                    textTransform: "capitalize",
                  }}
                >
                  Buscar
                </Typography>
              </Fab>
            )}
            {showTable && (
              <Fab
                color="success"
                variant="extended"
                size="small"
                sx={{
                  mr: 1,
                  mb: {
                    xs: 1,
                    sm: 0,
                    lg: 0,
                  },
                }}
                onClick={() => csvdownload()}
              >
                <AddCircleOutlineIcon />
                <Typography
                  sx={{
                    ml: 1,
                    textTransform: "capitalize",
                  }}
                >
                  CSV
                </Typography>
              </Fab>
            )}
            {lector && sensor && (
              <Fab
                color="error"
                variant="extended"
                size="small"
                sx={{
                  mr: 1,
                  mb: {
                    xs: 1,
                    sm: 0,
                    lg: 0,
                  },
                }}
                onClick={pdfdownload}
              >
                <AddCircleOutlineIcon />
                <Typography
                  sx={{
                    ml: 1,
                    textTransform: "capitalize",
                  }}
                >
                  PDF
                </Typography>
              </Fab>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          spacing={0}
          sx={{
            display: "flex",
          }}
          className="gapgrid-2"
        >
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              id="standard-select-number"
              variant="outlined"
              select
              label="Lector"
              value={lector}
              onChange={handleChangeLector}
              sx={{
                mb: 2,
              }}
            >
              {lectors.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              id="standard-select-number"
              variant="outlined"
              select
              label="Sensor"
              value={sensor}
              onChange={handleChangeSensor}
              sx={{
                mb: 2,
              }}
            >
              {sensors.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </LocalizationProvider>

      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          {showTable && <ExTable2 resultsFilter={resultsFilter} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reportes;
