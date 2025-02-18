// import React from "react";
import {
  Grid,
  Box,
  TextField,
  Typography,
  Button,
  Fab,
  // Card,
  // CardContent,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExTable from "../dashboards/dashboard1-components/ExTable";

// import { ComboBoxAutocomplete } from "../../components/Forms/AutoComplete/ComboBoxAutocomplete";

// import { MultipleValuesAutocomplete } from "../../components/Forms/AutoComplete/MultipleValuesAutocomplete";
// import { CheckboxesAutocomplete } from "../../components/Forms/AutoComplete/CheckboxesAutocomplete";
// import { SizesAutocomplete } from "../../components/Forms/AutoComplete/SizesAutocomplete";
import "./forms.css";

const ExAutoComplete = () => {
  // 2

  return (
    <Box>
      <Fab
        color="success"
        variant="extended"
        sx={{
          mr: 1,
          mb: {
            xs: 1,
            sm: 0,
            lg: 0,
          },
        }}
      >
        <AddCircleOutlineIcon />
        <Typography
          sx={{
            ml: 1,
            textTransform: "capitalize",
          }}
        >
          Nuevo
        </Typography>
      </Fab>
      {/* <hr className="hrdivisor" /> */}
      <br />
      <br />
      <Grid container spacing={0} className="superior">
        {/* ------------------------- row 1 ------------------------- */}
        <Grid
          item
          xs={10}
          sm={9}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          className="labelinput"
        >
          <Typography variant="h5" gutterBottom>
            Usuario
          </Typography>

          <TextField
            id="default-value"
            label="Default Text"
            variant="outlined"
            defaultValue=""
            fullWidth
          />
        </Grid>
        {/* <Grid
          item
          xs={12}
          sm={8}
          sx={{
            display: "flex",
            alignItems: "center",
            grid: "10px",
          }}
        >
          <TextField
            id="default-value"
            label="Default Text"
            variant="outlined"
            defaultValue=""
            fullWidth
          />
        </Grid> */}
        <Grid
          item
          xs={12}
          sm={2}
          sx={{
            display: "flex",
            alignItems: "center",
            grid: "10px",
          }}
        >
          <Button variant="contained" color="secondary">
            Buscar
          </Button>
        </Grid>

        {/* ------------------------- row 5 ------------------------- */}
        {/* <Grid
          item
          xs={12}
          lg={4}
          sm={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <MultipleValuesAutocomplete />
        </Grid> */}

        {/* ------------------------- row 6 ------------------------- */}
        {/* <Grid
          item
          xs={12}
          lg={4}
          sm={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <CheckboxesAutocomplete />
        </Grid> */}
        {/* ------------------------- row 7 ------------------------- */}
        {/* <Grid
          item
          xs={12}
          lg={4}
          sm={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <SizesAutocomplete />
        </Grid>*/}
      </Grid>
      <br />
      <br />
      <Typography variant="h3">Resultado</Typography>
      <Box
        sx={{
          overflow: {
            xs: "auto",
            sm: "unset",
          },
        }}
      >
        <ExTable />
      </Box>
    </Box>
  );
};

export default ExAutoComplete;
