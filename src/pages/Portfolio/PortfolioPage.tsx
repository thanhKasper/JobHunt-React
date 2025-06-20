import HeaderCard from "@/components/cards/HeaderCard";
import ProjectCard from "@/components/cards/ProjectCard";
import StatsCard from "@/components/cards/StatCard";
import {
  CalendarTodayRounded,
  CategoryRounded,
  CodeRounded,
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
  Typography
} from "@mui/material";
import { useState } from "react";


export default function PortfolioPage() {
  const [totalProjects] = useState(6);

  return (
    <Box paddingY={4}>
      {/* Header Section */}
      <HeaderCard elevation={6}>
        <Box sx={{ zIndex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={2} mb={1}>
            <FolderRounded sx={{ fontSize: 32 }} />
            <Typography variant="h4" fontWeight={700}>
              Danh Sách Các Dự Án
            </Typography>
            <Chip
              label={`${totalProjects} dự án`}
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: 600,
              }}
            />
          </Stack>
          <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 800 }}>
            Tổng hợp các dự án đã thực hiện, thể hiện kỹ năng và kinh nghiệm làm
            việc của tôi.
          </Typography>
        </Box>
      </HeaderCard>

      {/* Project Summary */}
      <Stack direction="row" spacing={3} mb={3}>
        <StatsCard sx={{ flex: 1 }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              <CodeRounded sx={{ color: "primary.main", fontSize: 28 }} />
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {totalProjects} Dự Án
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Đã hoàn thành
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </StatsCard>

        <StatsCard>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              <CalendarTodayRounded sx={{ color: "info.main", fontSize: 28 }} />
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  12 Tháng
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Số thời gian thực hiện
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </StatsCard>

        <StatsCard>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              <CategoryRounded sx={{ color: "success.main", fontSize: 28 }} />
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  5 Vai Trò
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Đã Từng Tham Qua
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </StatsCard>
      </Stack>

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
        <Stack direction="row" alignItems="center" spacing={2}>
          <CodeRounded sx={{ color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Công nghệ chính:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {[
              "React",
              "Node.js",
              "Python",
              "JavaScript",
              "MongoDB",
              "PostgreSQL",
            ].map((tech) => (
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
        </Stack>
      </Paper>

      {/* Projects Grid */}
      <Fade in={true} timeout={800}>
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
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
                <ProjectCard />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Fade>
    </Box>
  );
}
