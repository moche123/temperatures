import { Box, Link, Typography } from "@mui/material";
const Footer = () => {
  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      {/* <Typography>© 2024 All rights reserved by <Link href="https://www.wrappixel.com">Wrappixel.com</Link> </Typography> */}
      <Typography>
        © 2024 <Link href="https://www.wrappixel.com">Paico</Link>{" "}
      </Typography>
    </Box>
  );
};

export default Footer;
