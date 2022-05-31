import PropTypes from "prop-types";

import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

import Box from "components/Box";
import Typography from "components/Typography";

import typography from "assets/theme/base/typography";

function Footer({ light }) {
  const { size } = typography;

  return (
    <Box position="absolute" width="100%" bottom={0} py={4}>
      <Container>
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
            color={light ? "white" : "text"}
            fontSize={size.sm}
          >
            {new Date().getFullYear()},
            <Link href="https://www.creative-tim.com/" target="_blank">
              <Typography variant="button" fontWeight="medium" color={light ? "white" : "dark"}>
                Tombini Nicolò & Francesco Cavalieri
              </Typography>
            </Link>
          </Box>
          <Box
            component="ul"
            sx={({ breakpoints }) => ({
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              listStyle: "none",
              mt: 3,
              mb: 0,
              p: 0,

              [breakpoints.up("lg")]: {
                mt: 0,
              },
            })}
          >
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

Footer.defaultProps = {
  light: false,
};

Footer.propTypes = {
  light: PropTypes.bool,
};

export default Footer;
