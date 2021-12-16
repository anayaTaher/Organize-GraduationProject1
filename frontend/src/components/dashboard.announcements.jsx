import React from "react";
import Header from "./dashboard.header";
import Navbar from "./dashboard.navbar";
import AnnouncementsImp from "./dashboard.announcements.imp";
import { Box } from "@mui/system";

function NewTask() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const HandleMobileClose = () => setMobileOpen(!mobileOpen);
  return (
    <>
      <Header HandleMobileClose={HandleMobileClose} />
      <Box component="div" sx={{ display: "flex" }}>
        <Navbar mobileOpen={mobileOpen} HandleMobileClose={HandleMobileClose} />
        <AnnouncementsImp />
      </Box>
    </>
  );
}

export default NewTask;