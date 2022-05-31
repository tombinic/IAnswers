import Box from "components/Box";

import typography from "assets/theme/base/typography";

function Footer() {
  const { size } = typography;

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()} Francesco Cavalieri - Tombini Nicolò
      </Box>
    </Box>
  );
}

export default Footer;
