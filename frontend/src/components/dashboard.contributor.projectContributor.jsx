import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Grid,
  Tooltip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ProfileIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteContributor } from "../reducers/actions/contributors";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const MAX_TEAMS = 2;

function ProjectContributor({ firstName, lastName, id, teams = []}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const params = useParams();
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteContributor = () => {
    dispatch(deleteContributor({ projectId: params.id, contributorId: id }));
    handleMenuClose();
  };
  let teamsToDisplay = [];
  let tooltipString = "";
  if (teams) {
    for (let i = 0; i < Math.min(MAX_TEAMS, teams.length); i++) {
      teamsToDisplay.push(teams[i]);
    }

    if (teamsToDisplay.length !== teams.length) {
      for (let i = MAX_TEAMS; i < teams.length; i++) {
        if (i == teams.length - 1) tooltipString += teams[i];
        else tooltipString += teams[i] + ", ";
      }
    }
  }

  return (
    <>
      <Grid
        container
        sx={{
          p: 2,
          px: 5,
          //   display: "flex",
          //   alignItems: "center",
          //   "& > *": {
          //     ml: 2,
          //   },
          "&:hover": {
            backgroundColor: "#eee",
          },
        }}
        rowGap={2}
      >
        <Grid item container alignItems="center" xs={12} md={6}>
          <Avatar />
          <Typography variant="body1" sx={{ ml: 2, width: "50%" }}>
            {firstName + " " + lastName}
          </Typography>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          xs={12}
          md={6}
          sx={{
            "& > .MuiChip-root:not(:first-child)": {
              ml: 1,
            },
          }}
        >
          {teamsToDisplay.map((team) => {
            return <Chip label={team} variant="outlined"></Chip>;
          })}
          {teams.length !== teamsToDisplay.length ? (
            <Tooltip title={tooltipString}>
              <Chip label={`+${teams.length - teamsToDisplay.length}`} />
            </Tooltip>
          ) : (
            <></>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleMenuClose}>
              <ProfileIcon sx={{ color: "gray", mr: "4px" }} />
              Open Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleDeleteContributor}>
              <DeleteIcon sx={{ color: "red", opacity: "50%", mr: "4px" }} />
              <Typography sx={{ color: "red" }}>Remove User</Typography>
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </>
  );
}

export default ProjectContributor;