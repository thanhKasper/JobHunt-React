import HeaderCard from "@/components/cards/HeaderCard";
import {
  Delete,
  Edit,
  GitHub,
  Launch,
  CalendarToday,
  Code,
  Group,
  Star,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
  Card,
  CardContent,
  Fade,
  useTheme,
  alpha,
} from "@mui/material";
import React, { useState } from "react";

const ProjectDetailPage: React.FC = () => {
  const theme = useTheme();
  const [hovered, setHovered] = useState<string | null>(null);

  const technologies = [
    { name: "Node.js", color: "#68A063" },
    { name: "MongoDB", color: "#4DB33D" },
    { name: "Docker", color: "#2496ED" },
    { name: "Natural Language Processing", color: "#FF6B35" },
  ];

  const features = [
    { title: "Resume keyword extraction", icon: "🔍" },
    { title: "Job-resume matching score", icon: "🎯" },
    { title: "Admin dashboard for analytics", icon: "📊" },
    { title: "PDF parsing and skill tagging", icon: "📄" },
  ];

  const roles = [
    {
      name: "Backend Developer",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      name: "DevOps Engineer",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
  ];

  return (
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
              AI Resume Analyzer
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2} mb={2}>
              <CalendarToday sx={{ fontSize: 20 }} />
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Jan 2023 - May 2023
              </Typography>
            </Stack>
          </Box>

          <Stack direction="row" spacing={1}>
            <IconButton
              LinkComponent="a"
              href="/portfolio/jkdf-17wjgj-178saasb-16782/edit"
              sx={{
                bgcolor: alpha("#ffffff", 0.2),
                color: "white",
                "&:hover": { bgcolor: alpha("#ffffff", 0.3) },
              }}
            >
              <Edit />
            </IconButton>
            <IconButton
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
          Advanced NLP-powered resume analysis tool that automatically extracts
          skills and provides intelligent job-resume compatibility scoring.
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
                {roles.map((role, index) => (
                  <Chip
                    key={index}
                    label={role.name}
                    sx={{
                      background: role.gradient,
                      color: "white",
                      fontWeight: 500,
                      px: 2,
                      py: 1,
                      fontSize: "0.9rem",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
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
                {technologies.map((tech, index) => (
                  <Chip
                    key={index}
                    label={tech.name}
                    onMouseEnter={() => setHovered(tech.name)}
                    onMouseLeave={() => setHovered(null)}
                    sx={{
                      bgcolor:
                        hovered === tech.name
                          ? tech.color
                          : alpha(tech.color, 0.1),
                      color: hovered === tech.name ? "white" : tech.color,
                      fontWeight: 500,
                      px: 2,
                      py: 1,
                      fontSize: "0.9rem",
                      border: `2px solid ${tech.color}`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: `0 8px 25px ${alpha(tech.color, 0.3)}`,
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
                {features.map((feature, index) => (
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
                        },
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        {/* <Typography sx={{ fontSize: "1.5rem" }}>
                          {feature.icon}
                        </Typography> */}
                        <Typography variant="body1" fontWeight="500">
                          {feature.title}
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
          // startIcon={<GitHub />}
          href="https://github.com/example/resume-analyzer"
          target="_blank"
          rel="noopener noreferrer"
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
  );
};

export default ProjectDetailPage;
