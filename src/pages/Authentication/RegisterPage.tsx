import Subtitle from "@/components/Subtitle";
import Title from "@/components/Title";
import theme from "@/layouts/Theme";
import {
  Email,
  Facebook,
  Google,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Fade,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  return (
    <Box overflow={"hidden"}>
      {" "}
      {/* use box to hide the scrollbar when fadeInUp animation */}
      <Fade timeout={800} in mountOnEnter unmountOnExit>
        <Paper
          elevation={0}
          sx={{
            mx: "auto",
            overflow: "hidden",
            animation: "fadeInUp 0.6s ease-out",
            padding: 4,
            maxWidth: { xs: "100%", sm: 480, md: 520 },
            width: "100%",
            backdropFilter: "blur(10px)",
            background: "rgba(255, 255, 255, 0.95)",
          }}
        >
          <CardContent sx={{ padding: 0 }}>
            <Title title="Create Account" />
            <Subtitle title="Join us today and start your journey" />

            <Stack spacing={3} mt={4}>
              {/* Name Fields */}

              <TextField
                size="small"
                label="Full Name"
                fullWidth
                type="text"
                variant="outlined"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                size="small"
                label="Email Address"
                fullWidth
                type="email"
                variant="outlined"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                size="small"
                label="Password"
                fullWidth
                type={showPassword ? "text" : "password"}
                variant="outlined"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                size="small"
                label="Confirm Password"
                fullWidth
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Stack>
          </CardContent>

          <CardActions sx={{ padding: 0, mt: 3 }}>
            <Stack spacing={2} width="100%">
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  paddingY: 1.5,
                  background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.info.main} 100%)`,
                  "&:hover": {
                    background: `linear-gradient(135deg, ${theme.palette.success.dark} 0%, ${theme.palette.info.dark} 100%)`,
                  },
                }}
              >
                Create Account
              </Button>

              {/* Divider with "or" */}
              <Box sx={{ position: "relative", my: 2 }}>
                <Divider />
                <Chip
                  label="or"
                  size="small"
                  sx={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    color: "text.secondary",
                  }}
                />
              </Box>

              {/* Social Registration Buttons */}
              <Stack spacing={1}>
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  startIcon={<Google />}
                  sx={{
                    paddingY: 1.5,
                    borderColor: "#dadce0",
                    color: "#3c4043",
                    "&:hover": {
                      borderColor: "#dadce0",
                      backgroundColor: "#f8f9fa",
                    },
                  }}
                >
                  Sign up with Google
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  startIcon={<Facebook />}
                  sx={{
                    paddingY: 1.5,
                    borderColor: "#1877f2",
                    color: "#1877f2",
                    "&:hover": {
                      borderColor: "#1877f2",
                      backgroundColor: "#f0f8ff",
                    },
                  }}
                >
                  Sign up with Facebook
                </Button>
              </Stack>

              {/* Sign In Link */}
              <Box sx={{ textAlign: "center", mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 hover:underline">
                    Sign in
                  </Link>
                </Typography>
              </Box>
            </Stack>
          </CardActions>
        </Paper>
      </Fade>
    </Box>
  );
};

export default RegisterPage;
