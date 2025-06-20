import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  AppBar,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router";

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
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const navigateProfile = () => {
    navigate("/profile");
    setAnchorEl(null);
  };

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
          <div>
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
                <Button fullWidth color="error" variant="outlined">
                  Đăng Xuất
                </Button>
              </Box>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
