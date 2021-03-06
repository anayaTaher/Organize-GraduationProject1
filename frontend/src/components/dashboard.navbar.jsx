import {
  Toolbar,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Drawer,
  Divider,
  Typography,
  Badge,
  LinearProgress,
  Link,
} from "@mui/material";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import TaskIcon from "@mui/icons-material/Task";
import ContributorsIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import AboutProjectIcon from "@mui/icons-material/Help";
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import ProjectDetailsIcon from "@mui/icons-material/Business";
import NavigateIcon from "@mui/icons-material/Navigation";
import Logo from "../assets/logo/logo.png";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import { useDispatch, useSelector } from "react-redux";
import { getProjectDetails } from "../reducers/actions/projects";
import { fetchTasks } from "../reducers/actions/tasks";
import React from "react";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { isProjectOwner } from "../reducers/actions/projects";

const drawerWidth = 280;

const drawerItems = [
  {
    text: "Announcements",
    icon: AnnouncementIcon,
    isBadge: false,
    href: "announcements",
  },
  {
    text: "Calendar",
    icon: CalendarTodayIcon,
    isBadge: false,
    href: "",
  },
  {
    text: "Tasks",
    icon: TaskIcon,
    isBadge: false,
    badgeContent: 0,
    href: "tasks",
  },
  {
    text: "Contributors",
    icon: GroupsIcon,
    isBadge: false,
    badgeContent: 0,
    href: "contributors",
  },
  {
    text: "Teams",
    icon: ContributorsIcon,
    isBadge: false,
    href: "teams",
  },
];

function Navbar(props) {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const projectDetails = useSelector((state) => state.projectDetails);
  const owner = useSelector((state) => state.owner);

  let tasksDone = 0;
  let progress = 0;
  let totalWeight = 0;
  for (let i = 0; i < tasks.length; i++) {
    totalWeight += tasks[i].weight;
    if (tasks[i].done) {
      tasksDone++;
      progress += tasks[i].weight;
    }
  }
  progress = totalWeight === 0 ? 0 : (100 * progress) / totalWeight;

  React.useEffect(() => {
    dispatch(getProjectDetails({ projectId: params.id }));
    dispatch(fetchTasks({ projectId: params.id }));
    dispatch(isProjectOwner({ projectId: params.id }));
  }, [dispatch]);
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#f5f4f8",
          },
          display: { xs: "none", md: "block" },
        }}
      >
        <Toolbar
          sx={{ ":hover": { cursor: "pointer" } }}
          onClick={() => {
            history.push("/");
          }}
        >
          <Avatar
            alt="Organize"
            src={Logo}
            sx={{ mr: 1, display: { xs: "none", md: "block" } }}
          />
          <Typography variant="h6">Organize</Typography>
        </Toolbar>
        <Divider />
        <List dense={true}>
          <ListItem>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <ProjectDetailsIcon
                sx={{ mr: 1, width: 20, height: 20, color: "#708090" }}
              />
              <Typography variant="overline" sx={{ color: "#708090" }}>
                Project Details
              </Typography>
              <Divider variant="middle" sx={{ flexGrow: 1 }} />
            </Box>
          </ListItem>
          <List dense={true}>
            <ListItem>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  width: "100%",
                }}
              >
                <Avatar src={projectDetails.image} sx={{ mr: 2 }} />
                <Typography
                  variant="h6"
                  sx={{ color: "#708090", fontWeight: "bold" }}
                  noWrap
                >
                  {projectDetails.name}
                </Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Box
                sx={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <Typography variant="button" sx={{ color: "#708090", mr: 2 }}>
                  Progress
                </Typography>
                <LinearProgress
                  sx={{ flexGrow: 1 }}
                  variant="determinate"
                  value={progress}
                />
              </Box>
            </ListItem>
            <ListItem>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="button" sx={{ color: "#708090" }}>
                  Tasks Finished
                </Typography>
                <Typography variant="overline" sx={{ color: "#708090" }}>
                  {tasksDone}/{tasks.length}
                </Typography>
              </Box>
            </ListItem>
          </List>
          <ListItem sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <NavigateIcon
                sx={{ mr: 1, width: 20, height: 20, color: "#708090" }}
              />
              <Typography variant="overline" sx={{ color: "#708090" }}>
                Navigate
              </Typography>
              <Divider variant="middle" sx={{ flexGrow: 1 }} />
            </Box>
          </ListItem>
          {drawerItems.map((item) => (
            <ListItem key={item} sx={{ pb: 0, pt: 0 }}>
              <ListItemButton
                onClick={() =>
                  history.push(`/projects/${params.id}/${item.href}`)
                }
              >
                <ListItemIcon>
                  {item.isBadge ? (
                    <>
                      <Badge variant="dot" badgeContent={2} color="error">
                        <item.icon sx={{ color: "#708090" }} />
                      </Badge>
                    </>
                  ) : (
                    <item.icon sx={{ color: "#708090" }} />
                  )}
                </ListItemIcon>
                <ListItemText sx={{ color: "#708090" }} primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
          {owner && (
            <>
              <ListItem>
                <Box
                  sx={{ display: "flex", alignItems: "center", width: "100%" }}
                >
                  <AdminPanelSettingsOutlinedIcon
                    sx={{ mr: 1, width: 20, height: 20, color: "#708090" }}
                  />
                  <Typography variant="overline" sx={{ color: "#708090" }}>
                    Admin
                  </Typography>
                  <Divider variant="middle" sx={{ flexGrow: 1 }} />
                </Box>
              </ListItem>
              <ListItem key={"newTask"} sx={{ pb: 0, pt: 0 }}>
                <ListItemButton
                  onClick={() => history.push(`/projects/${params.id}/newTask`)}
                >
                  <ListItemIcon>
                    <AddIcon sx={{ color: "#708090" }} />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: "#708090" }}
                    primary={"New Task"}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem sx={{ pb: 0, pt: 0 }}>
                <ListItemButton
                  onClick={() => history.push(`/projects/${params.id}/newTeam`)}
                >
                  <ListItemIcon>
                    <GroupAddIcon sx={{ color: "#708090" }} />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: "#708090" }}
                    primary={"New Team"}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem sx={{ pb: 0, pt: 0 }}>
                <ListItemButton
                  onClick={() => history.push(`/projects/${params.id}/reports`)}
                >
                  <ListItemIcon>
                    <InsertChartOutlinedIcon sx={{ color: "#708090" }} />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: "#708090" }}
                    primary={"Reports"}
                  />
                </ListItemButton>
              </ListItem>
            </>
          )}
          <ListItem>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <PublicOutlinedIcon
                sx={{ mr: 1, width: 20, height: 20, color: "#708090" }}
              />
              <Typography variant="overline" sx={{ color: "#708090" }}>
                Social
              </Typography>
              <Divider variant="middle" sx={{ flexGrow: 1 }} />
            </Box>
          </ListItem>
          <ListItem key={"chat"} sx={{ pb: 0, pt: 0 }}>
            <ListItemButton
              onClick={() => history.push(`/projects/${params.id}/chat`)}
            >
              <ListItemIcon>
                <ChatOutlinedIcon sx={{ color: "#708090" }} />
              </ListItemIcon>
              <ListItemText sx={{ color: "#708090" }} primary={"Chat"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"video"} sx={{ pb: 0, pt: 0 }}>
            <ListItemButton
              onClick={() =>
                (window.location.href = `http://localhost:4000/${params.id}`)
              }
            >
              <ListItemIcon>
                <OndemandVideoOutlinedIcon sx={{ color: "#708090" }} />
              </ListItemIcon>
              <ListItemText
                sx={{ color: "#708090" }}
                primary={"Video Meetings"}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Drawer
        variant="temporary"
        sx={{
          "& .MuiDrawer-paper": { width: drawerWidth },
          display: { xs: "block", md: "none" },
        }}
        open={props.mobileOpen}
        onClose={props.HandleMobileClose}
      >
        <Divider />
        <List dense={true}>
          <ListItem>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <ProjectDetailsIcon
                sx={{ mr: 1, width: 20, height: 20, color: "#708090" }}
              />
              <Typography variant="overline" sx={{ color: "#708090" }}>
                Project Details
              </Typography>
              <Divider variant="middle" sx={{ flexGrow: 1 }} />
            </Box>
          </ListItem>
          <List dense={true}>
            <ListItem>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  width: "100%",
                }}
              >
                <Avatar src={projectDetails.image} sx={{ mr: 2 }} />
                <Typography
                  variant="h6"
                  sx={{ color: "#708090", fontWeight: "bold" }}
                  noWrap
                >
                  {projectDetails.name}
                </Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Box
                sx={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <Typography variant="button" sx={{ color: "#708090", mr: 2 }}>
                  Progress
                </Typography>
                <LinearProgress
                  sx={{ flexGrow: 1 }}
                  variant="determinate"
                  value={progress}
                />
              </Box>
            </ListItem>
            <ListItem>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="button" sx={{ color: "#708090" }}>
                  Tasks Finished
                </Typography>
                <Typography variant="overline" sx={{ color: "#708090" }}>
                  {tasksDone}/{tasks.length}
                </Typography>
              </Box>
            </ListItem>
          </List>
          <ListItem sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <NavigateIcon
                sx={{ mr: 1, width: 20, height: 20, color: "#708090" }}
              />
              <Typography variant="overline" sx={{ color: "#708090" }}>
                Navigate
              </Typography>
              <Divider variant="middle" sx={{ flexGrow: 1 }} />
            </Box>
          </ListItem>
          {drawerItems.map((item) => (
            <ListItem key={item} sx={{ pb: 0, pt: 0 }}>
              <ListItemButton
                onClick={() =>
                  history.push(`/projects/${params.id}/${item.href}`)
                }
              >
                <ListItemIcon>
                  {item.isBadge ? (
                    <>
                      <Badge variant="dot" badgeContent={2} color="error">
                        <item.icon sx={{ color: "#708090" }} />
                      </Badge>
                    </>
                  ) : (
                    <item.icon sx={{ color: "#708090" }} />
                  )}
                </ListItemIcon>
                <ListItemText sx={{ color: "#708090" }} primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
          {owner && (
            <>
              <ListItem>
                <Box
                  sx={{ display: "flex", alignItems: "center", width: "100%" }}
                >
                  <AdminPanelSettingsOutlinedIcon
                    sx={{ mr: 1, width: 20, height: 20, color: "#708090" }}
                  />
                  <Typography variant="overline" sx={{ color: "#708090" }}>
                    Admin
                  </Typography>
                  <Divider variant="middle" sx={{ flexGrow: 1 }} />
                </Box>
              </ListItem>
              <ListItem key={"newTask"} sx={{ pb: 0, pt: 0 }}>
                <ListItemButton
                  onClick={() => history.push(`/projects/${params.id}/newTask`)}
                >
                  <ListItemIcon>
                    <AddIcon sx={{ color: "#708090" }} />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: "#708090" }}
                    primary={"New Task"}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem sx={{ pb: 0, pt: 0 }}>
                <ListItemButton
                  onClick={() => history.push(`/projects/${params.id}/newTeam`)}
                >
                  <ListItemIcon>
                    <GroupAddIcon sx={{ color: "#708090" }} />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: "#708090" }}
                    primary={"New Team"}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem sx={{ pb: 0, pt: 0 }}>
                <ListItemButton
                  onClick={() => history.push(`/projects/${params.id}/reports`)}
                >
                  <ListItemIcon>
                    <InsertChartOutlinedIcon sx={{ color: "#708090" }} />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: "#708090" }}
                    primary={"Reports"}
                  />
                </ListItemButton>
              </ListItem>
            </>
          )}
          <ListItem>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <PublicOutlinedIcon
                sx={{ mr: 1, width: 20, height: 20, color: "#708090" }}
              />
              <Typography variant="overline" sx={{ color: "#708090" }}>
                Social
              </Typography>
              <Divider variant="middle" sx={{ flexGrow: 1 }} />
            </Box>
          </ListItem>
          <ListItem key={"chat"} sx={{ pb: 0, pt: 0 }}>
            <ListItemButton
              onClick={() => history.push(`/projects/${params.id}/chat`)}
            >
              <ListItemIcon>
                <ChatOutlinedIcon sx={{ color: "#708090" }} />
              </ListItemIcon>
              <ListItemText sx={{ color: "#708090" }} primary={"Chat"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"video"} sx={{ pb: 0, pt: 0 }}>
            <ListItemButton
              onClick={() =>
                (window.location.href = `http://localhost:4000/${params.id}`)
              }
            >
              <ListItemIcon>
                <OndemandVideoOutlinedIcon sx={{ color: "#708090" }} />
              </ListItemIcon>
              <ListItemText
                sx={{ color: "#708090" }}
                primary={"Video Meetings"}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
