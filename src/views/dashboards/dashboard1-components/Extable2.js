import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
  } from "@mui/material";
  import "../dashboard1.css"
import { useEffect, useState } from "react";


// eslint-disable-next-line react/prop-types
const ExTable2 = ({resultsFilter}) => {

 
  const [products, setProducts] = useState([]);
     useEffect(() => {
      console.log(resultsFilter);
      // eslint-disable-next-line react/prop-types
      const pushedResults = resultsFilter.map((el,i) =>{ 
          return {
            id: (i+1),
            fecha: el.FECHA,
            hora: el.TIEMPO,
            sensor: el.SENSOR,
            valor: el.VALOR

          }
      })
      setProducts(pushedResults)
     }, []);
    return (
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Fecha
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Hora
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Sensor
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Valor
              </Typography>
            </TableCell>

            
          </TableRow>
        </TableHead>
        <TableBody>
          {
          products.map((product,index) => (
            <TableRow key={index} className="tableitem" >
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.fecha}
                </Typography>
              </TableCell>
             
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                      {product.hora}
                    </Typography>
                 
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                      {product.sensor}
                    </Typography>
                 
                  </Box>
                </Box>
              </TableCell>
            
             
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                      {product.valor}
                    </Typography>
                 
                  </Box>
                </Box>
              </TableCell>
    
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };
  
  export default ExTable2;
  