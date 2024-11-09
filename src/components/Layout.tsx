import {
  Box,
  Card,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, styled, Theme, useTheme } from "@mui/material/styles";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { CiMenuBurger } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdSettings,
} from "react-icons/io";
import { LuListTodo } from "react-icons/lu";
import { TiWeatherShower } from "react-icons/ti";
import { NavLink, Outlet } from "react-router-dom";
import ChangeLang from "./ChangeLang";
import ThemeToggleButton from "./ChangeTheme";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: theme.palette.grey[50],
  boxShadow: theme.shadows[3],
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": {
          ...openedMixin(theme),
          backgroundColor: theme.palette.grey[50],
        },
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": {
          ...closedMixin(theme),
          backgroundColor: theme.palette.grey[50],
        },
      },
    },
  ],
}));

export default function Layout() {
  const theme = useTheme();
  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const greetings = {
    home: t("MenuItems.home"),
    todoList: t("MenuItems.todoList"),
    weather: t("MenuItems.weather"),
    setting: t("MenuItems.setting"),
  };

  const items = [
    {
      title: greetings.home,
      url: "/",
      icon: FaHome,
    },
    {
      title: greetings.todoList,
      url: "/todoList",
      icon: LuListTodo,
    },
    {
      title: greetings.weather,
      url: "/weather",
      icon: TiWeatherShower,
    },
    {
      title: greetings.setting,
      url: "/settings",
      icon: IoMdSettings,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        direction: "ltr",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{ background: theme.palette.grey[50] }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <CiMenuBurger />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              paddingX: 3,
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <ThemeToggleButton />
            <ChangeLang />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <IoIosArrowForward />
            ) : (
              <IoIosArrowBack />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {items.map((item) => (
            <ListItem key={item.title} disablePadding sx={{ display: "block" }}>
              <NavLink
                to={item.url}
                style={({ isActive }) => ({
                  minHeight: 48,
                  padding: "0 16px",
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: isActive ? theme.palette.primary.main : "inherit",
                })}
              >
                {({ isActive }) => {
                  return (
                    <>
                      <ListItemIcon
                        sx={{ minWidth: 0, justifyContent: "center", mr: 2 }}
                      >
                        <item.icon
                          style={{
                            color: isActive
                              ? theme.palette.primary.main
                              : "inherit",
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        sx={{
                          opacity: open ? 1 : 0,
                          color: isActive
                            ? theme.palette.primary.main
                            : "inherit",
                        }}
                      />
                    </>
                  );
                }}
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, mt: 12, px: 6 }}>
        <Card
          sx={{
            height: "80vh",
            overflowY: "auto",
            background: theme.palette.grey[50],
          }}
        >
          <Outlet />
        </Card>
      </Box>
    </Box>
  );
}
