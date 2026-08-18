import { Box, Typography } from "@mui/material";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography>© {currentYear} mmf</Typography>
    </Box>
  );
};

export default Footer;
