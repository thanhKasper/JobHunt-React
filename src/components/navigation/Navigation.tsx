import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import React, { useState } from "react";
import { Link } from "react-router";

export default function Navigation() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box position="sticky" top={0} zIndex={1000}>
      <AppBar
        position="sticky"
        component="nav"
        sx={{
          top: 0,
          // backgroundColor: "rgba(255, 79, 15, 0.65)",
          // opacity: 0.8,
          backdropFilter: "blur(8px)",
        }}
      >
        <Toolbar
          variant="dense"
          className="w-full flex justify-between items-center"
        >
          <Typography variant="h5">JobHunt</Typography>
          <Stack direction="row" spacing={8}>
            <Box
              paddingX={1.5}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: 4,
              }}
            >
              <Link to="/" className="text-white">
                Công Việc Phù Hợp
              </Link>
            </Box>

            <Link to="/job-filters">Bộ Lọc Công Việc</Link>

            <Link to="#">Dự Án Của Bạn</Link>
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
              elevation={1}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                list: {
                  "aria-labelledby": "basic-button",
                },
              }}
            >
              <MenuItem onClick={handleClose}>Thông Tin Ứng Viên</MenuItem>
              <MenuItem onClick={handleClose}>Tài Khoản Của Tôi</MenuItem>
              {/* <MenuItem onClick={handleClose}> */}
              <Box paddingX={1} marginTop={2}>
                <Button fullWidth color="error" variant="outlined">
                  Đăng Xuất
                </Button>
              </Box>
              {/* </MenuItem> */}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
