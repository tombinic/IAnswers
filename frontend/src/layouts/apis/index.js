import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "components/Box";
import Typography from "components/Typography";
import DashboardLayout from "objects/LayoutContainers/DashboardLayout";
import DashboardNavbar from "objects/DashboardNavbar";
import Footer from "objects/Footer";
import DataTable from "objects/Tables/DataTable";

import projectsTableData from "layouts/apis/data/projectsTableData";

import {
  useMaterialUIController,
} from "context";

function APIs() {
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [controller] = useMaterialUIController();
  const { sidenavColor } = controller;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <Box
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor={sidenavColor}
                borderRadius="lg"
                coloredShadow="info"
              >
                <Typography variant="h6" color="white">
                  IAnswers APIs
                </Typography>
              </Box>
              <Box pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default APIs;
