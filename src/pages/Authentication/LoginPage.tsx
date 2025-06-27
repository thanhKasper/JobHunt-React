import Subtitle from "@/components/Subtitle";
import Title from "@/components/Title";
import theme from "@/layouts/Theme";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { signin } from "@/store/slices/authenticationSlice";
import {
  Email,
  Facebook,
  Google,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Alert,
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
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useLogin } from "./LoginPage.Hook";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const loginHandler = useLogin();
  const authenState = useAppSelector((state) => state.authState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    loginHandler.validate(() => {
      // Handle login logic here, e.g., dispatch an action
      dispatch(
        signin({
          email: loginHandler.email,
          password: loginHandler.password,
        })
      ).then((arg) => {
        if (arg.meta.requestStatus === "fulfilled") navigate("/");
      });
    });
  };

  return (
    <Box overflow={"hidden"}>
      {" "}
      {/* use box to hide the scrollbar when fadeInUp animation */}
      <Fade timeout={800} in mountOnEnter unmountOnExit>
        <Paper
          elevation={0}
          sx={{
            mx: "auto",
            animation: "fadeInUp 0.6s ease-out",
            padding: 4,
            borderRadius: 0,
            maxWidth: { xs: "100%", sm: 400, md: 450 },
            width: "100%",
            backdropFilter: "blur(10px)",
            background: "rgba(255, 255, 255, 0.95)",
          }}
        >
          {authenState.errors.general && (
            <Alert severity="error">{authenState.errors.general}</Alert>
          )}
          <CardContent sx={{ padding: 0 }}>
            <Title title="Welcome Back" />
            <Subtitle title="Sign in to your account to continue" />

            <Stack spacing={3} mt={4}>
              <TextField
                size="small"
                label="Email Address"
                fullWidth
                type="email"
                variant="outlined"
                value={loginHandler.email}
                onChange={(e) =>
                  loginHandler.updateLogin("email", e.target.value)
                }
                error={!!loginHandler.errors.email}
                helperText={loginHandler.errors.email}
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
                value={loginHandler.password}
                onChange={(e) =>
                  loginHandler.updateLogin("password", e.target.value)
                }
                error={!!loginHandler.errors.password}
                helperText={loginHandler.errors.password}
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

              {/* Forgot Password Link */}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Link to="#" className="text-blue-600 hover:underline">
                  Forgot your password?
                </Link>
              </Box>
            </Stack>
          </CardContent>

          <CardActions sx={{ padding: 0, mt: 3 }}>
            <Stack spacing={2} width="100%">
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleLogin}
                sx={{
                  paddingY: 1.5,
                  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
                  "&:hover": {
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                  },
                }}
              >
                Sign In
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

              {/* Social Login Buttons */}
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
                  Continue with Google
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
                  Continue with Facebook
                </Button>
              </Stack>

              {/* Sign Up Link */}
              <Box sx={{ textAlign: "center", mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 hover:underline"
                  >
                    Sign up
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

export default LoginPage;
