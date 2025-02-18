// import React from "react";

import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  // FormControlLabel,
  // Checkbox,
  Button,
  Grid,
  Chip
  // RadioGroup,
  // Radio,
  // FormControl,
  // MenuItem,
} from "@mui/material";

// const numbers = [
//   {
//     value: "one",
//     label: "One",
//   },
//   {
//     value: "two",
//     label: "Two",
//   },
//   {
//     value: "three",
//     label: "Three",
//   },
//   {
//     value: "four",
//     label: "Four",
//   },
// ];
import "./fbelements.css"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import dayjs from "dayjs";


const FbDefaultForm = () => {
  // const [state, setState] = React.useState({
  //   checkedA: false,
  //   checkedB: false,
  //   checkedC: false,
  // });

  // const handleChange = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };

  // const [value, setValue] = React.useState("");

  // const handleChange2 = (event) => {
  //   setValue(event.target.value);
  // };

  // const [number, setNumber] = React.useState("");

  // const handleChange3 = (event) => {
  //   setNumber(event.target.value);
  // };

  const [valueFrom, setValueFrom] = useState(dayjs("2014-08-18T21:11:54"));
  const handleChangeFrom = (newValue) => {
    setValueFrom(newValue);
  };

  return (
    <div>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Checkbox */}
      {/* ------------------------------------------------------------------------------------------------ */}
      <Card
        variant="outlined"
        sx={{
          p: 0,
        }}
      >
        <Box
          sx={{
            padding: "15px 30px",
          }}
          display="flex"
          alignItems="center"
        >
          <Box flexGrow={1}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              Consulta/Creación de usuario
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent
          sx={{
            padding: "30px",
          }}
        >
          <form>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={8}
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                }}
              >
                <Grid container spacing={0}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      // alignItems: "stretch",
                    }}
                  >

                    <TextField
                      id="default-value"
                      label="Nombre"
                      variant="outlined"
                      defaultValue=""
                      fullWidth
                      sx={{
                        mb: 2,
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      // alignItems: "stretch",
                    }}
                  >

                  <TextField
                    id="email-text"
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    sx={{
                      mb: 2,
                    }}
                  />
                  </Grid>

                  
                </Grid>
            
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
              
                className="imgcontainer"
              >
               <div className="imgwrapper">

                <img style={{maxHeight:94}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s" alt="" />
               </div>
               <Button color="error" variant="contained" size="small">
                Cambiar imagen
                </Button>
              </Grid>
            </Grid>
            {/* <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              fullWidth
              sx={{
                mb: 2,
              }}
            />
            <TextField
              id="outlined-multiline-static"
              label="Textarea"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              sx={{
                mb: 2,
              }}
            /> */}
            <TextField
              id="readonly-text"
              label="DNI"
              defaultValue=""
        
              variant="outlined"
              fullWidth
              sx={{
                mb: 2,
              }}
            />
            <TextField
              id="readonly-text"
              label="Teléfono"
              defaultValue=""
        
              variant="outlined"
              fullWidth
              sx={{
                mb: 2,
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              
              <DateTimePicker
                label="Fecha de nacimiento"
                value={valueFrom}
                onChange={handleChangeFrom}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <br/>
            <br/>
            <Chip
              label="Privilegio: Administrador"
              size="medium"
              sx={{
                ml: "auto",
                fontSize: "12px",
                fontWeight: "500",
              }}
            ></Chip>

            {/* <Grid
              container
              spacing={0}
              sx={{
                mb: 2,
              }}
            > */}
              {/* <Grid item lg={4} md={6} sm={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedA}
                      onChange={handleChange}
                      name="checkedA"
                      color="primary"
                    />
                  }
                  label="Check this custom checkbox"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Check this custom checkbox"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedC}
                      onChange={handleChange}
                      name="checkedC"
                      color="primary"
                    />
                  }
                  label="Check this custom checkbox"
                />
              </Grid>
              <Grid item lg={4} md={6} sm={12}>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={value}
                    onChange={handleChange2}
                  >
                    <FormControlLabel
                      value="radio1"
                      control={<Radio />}
                      label="Toggle this custom radio"
                    />
                    <FormControlLabel
                      value="radio2"
                      control={<Radio />}
                      label="Toggle this custom radio"
                    />
                    <FormControlLabel
                      value="radio3"
                      control={<Radio />}
                      label="Toggle this custom radio"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid> */}
            {/* </Grid> */}
            {/* <TextField
              fullWidth
              id="standard-select-number"
              variant="outlined"
              select
              label="Select"
              value={number}
              onChange={handleChange3}
              sx={{
                mb: 2,
              }}
            >
              {numbers.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField> */}
            <br/>
            <br/>
            <br/>
            <TextField
              id="user"
              label="Usuario"
              defaultValue=""
        
              variant="outlined"
              fullWidth
              sx={{
                mb: 2,
              }}
            />
            <TextField
              id="outlined-password-input"
              label="Conraseña"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              fullWidth
              sx={{
                mb: 2,
              }}
            />
            <div>
              <Button color="error" variant="contained">
                Eliminar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FbDefaultForm;
