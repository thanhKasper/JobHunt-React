import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authenticationSlice";
import {
  AccountCircle,
  Dehaze,
  FilterList,
  FolderOpen,
  Logout,
  Person,
  Work
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  styled,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";

const AnimatedNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  display: "block",
  width: "fit-content",
  position: "relative",
  overflow: "hidden",
  borderRadius: theme.spacing(1),

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
    transition: "left 0.6s ease-in-out",
    zIndex: 1,
  },

  "&:hover::before": {
    left: "100%",
  },
}));

export default function Navigation() {
  const theme = useTheme();
  const mediaSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box position="sticky" top={0} zIndex={1000}>
      <AppBar
        position="sticky"
        sx={{
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(33, 33, 33, 0.8)",
        }}
      >
        <Toolbar className="w-full flex justify-between items-center">
          <Typography variant="h5" fontWeight="bold">
            JobHunt
          </Typography>
          {mediaSmDown ? <PhoneSizeNavigation /> : <SxUpNavigation />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const SxUpNavigation = () => {
  const linkStyle = {
    color: "white",
    textDecoration: "none",
    padding: "6px 12px",
    borderRadius: "8px",
    fontWeight: 500,
  };

  const activeStyle = {
    backgroundColor: "rgba(255,255,255,0.2)",
    fontWeight: "bold",
  };

  const authState = useAppSelector((state) => state.authState);
  return (
    <>
      {authState.isAuthenticated && (
        <Stack direction="row" spacing={2} alignItems="center">
          <AnimatedNavLink
            to="/"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            Công Việc Phù Hợp
          </AnimatedNavLink>
          <AnimatedNavLink
            to="/job-filters"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            Bộ Lọc Công Việc
          </AnimatedNavLink>
          <AnimatedNavLink
            to="/portfolio"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            Dự Án Của Bạn
          </AnimatedNavLink>
        </Stack>
      )}
      <div>
        {authState.isAuthenticated ? (
          <UserPopper />
        ) : (
          <>
            <Button color="primary" variant="contained">
              <Link to={"/login"}>LogIn</Link>
            </Button>
            <Button
              // color={orange[500]}
              variant="outlined"
              sx={{
                ml: 1,
                // bgcolor: orange[500],
                borderColor: "white",
                color: "white",
                "&:hover": {
                  borderColor: orange[500],
                  color: orange[500],
                },
              }}
            >
              <Link to={"/register"}>Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </>
  );
};

const PhoneSizeNavigation = () => {
  const [open, setOpen] = React.useState(false);
  const authState = useAppSelector((state) => state.authState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <Dehaze sx={{ color: "white" }} />
      </IconButton>
      <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 280, height: "100%" }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {authState.isAuthenticated ? (
            <>
              {/* User Info Section */}
              <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ width: 40, height: 40 }}>M</Avatar>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      User Name
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Ứng viên
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Navigation Links */}
              <List>
                <ListItem disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to="/"
                    sx={{
                      "&.active": {
                        backgroundColor: "primary.main",
                        color: "white",
                        "& .MuiListItemIcon-root": {
                          color: "white",
                        },
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Work />
                    </ListItemIcon>
                    <ListItemText primary="Công Việc Phù Hợp" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to="/job-filters"
                    sx={{
                      "&.active": {
                        backgroundColor: "primary.main",
                        color: "white",
                        "& .MuiListItemIcon-root": {
                          color: "white",
                        },
                      },
                    }}
                  >
                    <ListItemIcon>
                      <FilterList />
                    </ListItemIcon>
                    <ListItemText primary="Bộ Lọc Công Việc" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to="/portfolio"
                    sx={{
                      "&.active": {
                        backgroundColor: "primary.main",
                        color: "white",
                        "& .MuiListItemIcon-root": {
                          color: "white",
                        },
                      },
                    }}
                  >
                    <ListItemIcon>
                      <FolderOpen />
                    </ListItemIcon>
                    <ListItemText primary="Dự Án Của Bạn" />
                  </ListItemButton>
                </ListItem>
              </List>

              <Divider />

              {/* Account Actions */}
              <List>
                <ListItem disablePadding>
                  <ListItemButton component={NavLink} to="/profile">
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText primary="Thông Tin Ứng Viên" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary="Tài Khoản Của Tôi" />
                  </ListItemButton>
                </ListItem>
              </List>

              {/* Logout Button */}
              <Box sx={{ p: 2, mt: "auto" }}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  startIcon={<Logout />}
                  onClick={() => {
                    dispatch(logout());
                    navigate("/login");
                    setOpen(false);
                  }}
                >
                  Đăng Xuất
                </Button>
              </Box>
            </>
          ) : (
            <>
              {/* Guest User Content */}
              <Box sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="h6" gutterBottom>
                  Chào mừng đến với JobHunt
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Đăng nhập để truy cập đầy đủ tính năng
                </Typography>

                <Stack spacing={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/login"
                    onClick={() => setOpen(false)}
                  >
                    Đăng Nhập
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      borderColor: orange[500],
                      color: orange[500],
                      "&:hover": {
                        borderColor: orange[600],
                        backgroundColor: orange[50],
                      },
                    }}
                    component={Link}
                    to="/register"
                    onClick={() => setOpen(false)}
                  >
                    Đăng Ký
                  </Button>
                </Stack>
              </Box>
            </>
          )}
        </Box>
      </Drawer>
    </div>
  );
};

const UserPopper = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const handleClose = () => setAnchorEl(null);
  const navigateProfile = () => {
    navigate("/profile");
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        onClick={handleClick}
        size="medium"
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={navigateProfile}>Thông Tin Ứng Viên</MenuItem>
        <MenuItem onClick={handleClose}>Tài Khoản Của Tôi</MenuItem>
        <Box paddingX={1} marginTop={2}>
          <Button
            fullWidth
            color="error"
            variant="outlined"
            onClick={handleLogout}
          >
            Đăng Xuất
          </Button>
        </Box>
      </Menu>
    </>
  );
};
