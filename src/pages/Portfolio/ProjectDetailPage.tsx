import HeaderCard from "@/components/cards/HeaderCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteProject, getProjectDetail } from "@/store/slices/projectSlice";
import {
  CalendarToday,
  Code,
  Delete,
  Edit,
  Group,
  Launch,
  Star,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Fade,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";

const ProjectDetailPage = () => {
  const theme = useTheme();
  const projectId = useParams().projectId || "";
  const projectState = useAppSelector((state) => state.projectState);
  const project = projectState.currentProject;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProjectDetail(projectId));
  }, []);

  const handleDeleteProject = () => {
    dispatch(deleteProject(projectId)).then(() => navigate("/portfolio"));
  };

  return (
    projectState.projectsLoadingState == "succeeded" && (
      <Box paddingY={4}>
        <HeaderCard sx={{ p: 6 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={3}
          >
            <Box>
              <Typography variant="h3" fontWeight="700" gutterBottom>
                {project.projectName}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                <CalendarToday sx={{ fontSize: 20 }} />
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  {dayjs(project.startDate).format("MMM YYYY")} -{" "}
                  {project.endDate
                    ? dayjs(project.endDate).format("MMM YYYY")
                    : "Hiện tại"}
                </Typography>
              </Stack>
            </Box>

            <Stack direction="row" spacing={1}>
              <Link to={`/portfolio/${project.projectId}/edit`}>
                <IconButton
                  sx={{
                    bgcolor: alpha("#ffffff", 0.2),
                    color: "white",
                    "&:hover": { bgcolor: alpha("#ffffff", 0.3) },
                  }}
                >
                  <Edit />
                </IconButton>
              </Link>
              <IconButton
                onClick={handleDeleteProject}
                sx={{
                  bgcolor: alpha("#ff4444", 0.2),
                  color: "white",
                  "&:hover": { bgcolor: alpha("#ff4444", 0.3) },
                }}
              >
                <Delete />
              </IconButton>
            </Stack>
          </Box>

          <Typography
            variant="h6"
            sx={{ opacity: 0.95, maxWidth: "70%", lineHeight: 1.6 }}
          >
            {project.projectDescription}
          </Typography>
        </HeaderCard>

        <Box display="flex" gap={3} flexDirection={{ xs: "column", md: "row" }}>
          <Box flex={2}>
            {/* Roles Section */}
            <Card elevation={2} sx={{ mb: 3, borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                  <Group color="primary" />
                  <Typography variant="h5" fontWeight="600">
                    Vai Trò Của Tôi
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  {project.roles.map((role, index) => (
                    <Chip
                      key={index}
                      label={role}
                      sx={{
                        bgcolor: alpha(theme.palette.success.main, 0.3),
                        fontWeight: 500,
                        px: 2,
                        py: 1,
                        fontSize: "0.9rem",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                          bgcolor: alpha(theme.palette.success.main, 0.5),
                        },
                        transition: "all 0.3s ease",
                      }}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>

            {/* Technologies Section */}
            <Card elevation={2} sx={{ mb: 3, borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                  <Code color="primary" />
                  <Typography variant="h5" fontWeight="600">
                    Công Nghệ / Kỹ Thuật Sử Dụng
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  {project.techOrSkills.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      sx={{
                        bgcolor: alpha(theme.palette.info.main, 0.2),
                        fontWeight: 500,
                        px: 2,
                        py: 1,
                        fontSize: "0.9rem",
                        // border: `2px solid ${tech.color}`,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: alpha(theme.palette.info.main, 0.5),
                          transform: "translateY(-2px)",
                          boxShadow: `0 8px 25px ${alpha(
                            theme.palette.info.main,
                            0.3
                          )}`,
                        },
                      }}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Box>

          <Box flex={1}>
            {/* Key Features */}
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                  <Star color="primary" />
                  <Typography variant="h5" fontWeight="600">
                    Đặc Điểm Nổi Bật
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  {project.features.map((feature, index) => (
                    <Fade in timeout={500 + index * 200} key={index}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          bgcolor: alpha(theme.palette.primary.main, 0.04),
                          borderRadius: 2,
                          border: `1px solid ${alpha(
                            theme.palette.primary.main,
                            0.1
                          )}`,
                          "&:hover": {
                            bgcolor: alpha(theme.palette.primary.main, 0.08),
                            transform: "translateX(8px)",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                            transitionProperty: "transform",
                            transitionDuration: "10s",
                            transitionTimingFunction: "ease-in-out",
                          },
                          transition: "all 1s ease-in",
                          cursor: "pointer",
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="body1" fontWeight="500">
                            {feature}
                          </Typography>
                        </Stack>
                      </Paper>
                    </Fade>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box display="flex" gap={2} mt={4} justifyContent="center">
          <Button
            variant="contained"
            size="large"
            disabled={!!project.projectLink}
            onClick={() => navigate(project.projectLink ?? "")}
            sx={{
              background: "linear-gradient(135deg, #24292e 0%, #040d21 100%)",
              px: 4,
              py: 2,
              borderRadius: 3,
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: 600,
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Xem Sản Phẩm
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<Launch />}
            onClick={() => navigate(project.liveDemoLink ?? "")}
            disabled={!!project.liveDemoLink}
            sx={{
              px: 4,
              py: 2,
              borderRadius: 3,
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: 600,
              borderWidth: 2,
              "&:hover": {
                borderWidth: 2,
                transform: "translateY(-2px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Demo Trực Tiếp
          </Button>
        </Box>
      </Box>
    )
  );
};

export default ProjectDetailPage;
