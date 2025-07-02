import AddButton from "@/components/AddButton";
import ProjectCard from "@/components/cards/ProjectCard";
import StatsCard from "@/components/cards/StatCard";
import IntroducingSection from "@/components/IntroducingSection";
import useFetch from "@/hooks/useFetch";
import { useAppSelector } from "@/store/hooks";
import { getProjects } from "@/store/slices/projectSlice";
import {
  Add,
  CalendarTodayRounded,
  CategoryRounded,
  CodeRounded,
  FolderOpenRounded,
  FolderRounded,
} from "@mui/icons-material";
import {
  Box,
  CardContent,
  Chip,
  Fade,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router";

export default function PortfolioPage() {
  const projectState = useAppSelector((state) => state.projectState);
  useFetch(() => getProjects());

  return (
    <Box paddingY={4}>
      {/* Header Section */}
      <IntroducingSection
        icon={<FolderRounded sx={{ fontSize: 32 }} />}
        description="Tổng hợp các dự án đã thực hiện, thể hiện kỹ năng và kinh nghiệm làm
            việc của tôi."
        headingText="Danh Sách Các Dự Án"
        additionalHeading={
          <Chip
            label={`${projectState.totalProjects} dự án`}
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "white",
              fontWeight: 600,
              width: "fit-content",
            }}
          />
        }
        cta={
          <AddButton
            variant="contained"
            startIcon={<Add />}
            sx={{
              width: {
                xs: "100%",
                sm: "max-content",
              },
            }}
          >
            <Link to={`/portfolio/new`}>Thêm Dự Án</Link>
          </AddButton>
        }
      />

      {/* Project Summary */}
      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <StatsCard sx={{ flex: 1 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <CodeRounded sx={{ color: "primary.main", fontSize: 28 }} />
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {projectState.totalCompletedProjects} Dự Án
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Đã hoàn thành
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </StatsCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <CalendarTodayRounded
                  sx={{ color: "info.main", fontSize: 28 }}
                />
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {projectState.toolsCount} Công Nghệ
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Đã sử dụng
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </StatsCard>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <CategoryRounded sx={{ color: "success.main", fontSize: 28 }} />
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {projectState.rolesCount} Vai Trò
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Đã Từng Tham Gia
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </StatsCard>
        </Grid>
      </Grid>

      {/* Technology Stack */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
          bgcolor: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <Box display={"flex"} flexDirection={{xs: "column", md: "row"}} gap={2}>
          <Stack direction="row" alignItems="center" gap={1}>
            <CodeRounded sx={{ color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Công nghệ chính:
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            {projectState.mainTechnologies.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  fontWeight: 500,
                  "&:hover": {
                    bgcolor: "action.hover",
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.2s ease",
                }}
              />
            ))}
          </Stack>
        </Box>
      </Paper>

      {/* Projects Grid */}
      <Fade in={true} timeout={800}>
        <Grid container spacing={3}>
          {projectState.projects.length > 0 ? (
            projectState.projects.map((project, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.projectId}>
                <Box
                  sx={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                    "@keyframes fadeInUp": {
                      "0%": {
                        opacity: 0,
                        transform: "translateY(30px)",
                      },
                      "100%": {
                        opacity: 1,
                        transform: "translateY(0)",
                      },
                    },
                  }}
                >
                  <ProjectCard project={project} />
                </Box>
              </Grid>
            ))
          ) : (
            <EmptyProjectDisplay />
          )}
        </Grid>
      </Fade>
    </Box>
  );
}

const EmptyProjectDisplay = () => (
  <Fade in={true} timeout={800}>
    <Paper
      sx={{
        p: 6,
        textAlign: "center",
        borderRadius: 3,
        bgcolor: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.2)",
        minHeight: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          bgcolor: "rgba(102, 126, 234, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
          animation: "pulse 2s infinite",
          "@keyframes pulse": {
            "0%": {
              transform: "scale(1)",
              opacity: 0.7,
            },
            "50%": {
              transform: "scale(1.05)",
              opacity: 1,
            },
            "100%": {
              transform: "scale(1)",
              opacity: 0.7,
            },
          },
        }}
      >
        <FolderOpenRounded
          sx={{
            fontSize: 48,
            color: "rgba(102, 126, 234, 0.6)",
          }}
        />
      </Box>

      <Typography variant="h5" fontWeight={600} color="text.primary" mb={2}>
        Chưa Có Dự Án Nào
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        mb={4}
        sx={{ maxWidth: 500, lineHeight: 1.6 }}
      >
        Bạn chưa có dự án nào trong danh sách. Hãy bắt đầu thêm các dự án đầu
        tiên để xây dựng portfolio ấn tượng của mình!
      </Typography>

      <Stack>
        <Link to="/portfolio/new">
          <AddButton
            variant="contained"
            startIcon={<Add />}
            sx={{
              width: {
                xs: "100%",
                sm: "max-content",
              },
            }}
          >
            Thêm Dự Án Đầu Tiên
          </AddButton>
        </Link>
      </Stack>

      <Box mt={4}>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Gợi ý các loại dự án bạn có thể thêm:
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          justifyContent="center"
        >
          {["Web App", "Mobile App", "API", "E-commerce", "Portfolio"].map(
            (type) => (
              <Chip
                key={type}
                label={type}
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  fontWeight: 500,
                  borderColor: "rgba(102, 126, 234, 0.2)",
                  color: "text.secondary",
                  "&:hover": {
                    bgcolor: "rgba(102, 126, 234, 0.1)",
                    borderColor: "rgba(102, 126, 234, 0.4)",
                    transform: "scale(1.02)",
                  },
                  transition: "all 0.2s ease",
                  mb: 1,
                }}
              />
            )
          )}
        </Stack>
      </Box>
    </Paper>
  </Fade>
);
