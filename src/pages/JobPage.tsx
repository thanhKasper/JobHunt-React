import HeaderCard from "@/components/cards/HeaderCard";
import StatsCard from "@/components/cards/StatCard";
import {
  AutoAwesome,
  SearchRounded,
  TrendingUp,
  WorkRounded,
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
import JobCard from "../components/cards/JobCard";
import JobSearchAndFilter from "../components/JobSearchAndFilter";
import StyledPagination from "@/components/StyledPagination";



const JobPage = () => {
  const [totalJobs] = useState(156);
  const [activeFilters] = useState(2);

  return (
    <Box paddingY={4}>
      {/* Header Section */}
      <HeaderCard elevation={6}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box sx={{ zIndex: 1 }}>
            <Stack direction="row" alignItems="center" spacing={2} mb={1}>
              <WorkRounded sx={{ fontSize: 32 }} />
              <Typography variant="h4" fontWeight={700}>
                Công Việc Phù Hợp
              </Typography>
              <Chip
                label={`${totalJobs} công việc`}
                size="small"
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontWeight: 600,
                }}
              />
            </Stack>
            <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 600 }}>
              Danh sách các công việc phù hợp với kỹ năng và sở thích của bạn.
              Tìm kiếm và ứng tuyển ngay hôm nay!
            </Typography>
          </Box>
        </Stack>
      </HeaderCard>

      {/* Stats and Quick Info */}
      <Stack direction="row" spacing={3} mb={3}>
        <StatsCard sx={{ flex: 1 }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              <SearchRounded sx={{ color: "primary.main", fontSize: 28 }} />
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {activeFilters} Bộ Lọc Đang Áp Dụng
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tối ưu kết quả tìm kiếm
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </StatsCard>

        <StatsCard>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              <TrendingUp sx={{ color: "success.main", fontSize: 28 }} />
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  24 Mới Hôm Nay
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Công việc mới nhất
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </StatsCard>

        <StatsCard>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              <AutoAwesome sx={{ color: "warning.main", fontSize: 28 }} />
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  98% Phù Hợp
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Độ chính xác
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </StatsCard>
      </Stack>

      {/* Search & Filter Section */}
      <StatsCard sx={{ p: 2 }}>
        <JobSearchAndFilter />
      </StatsCard>

      {/* Quick Filter Tags */}
      {/* <Paper
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
          <FilterList sx={{ color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Lọc nhanh:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {[
              "Tất cả",
              "Remote",
              "Full-time",
              "Part-time",
              "Lương cao",
              "Mới nhất",
            ].map((filter, index) => (
              <Chip
                key={filter}
                label={filter}
                size="small"
                variant={index === 0 ? "filled" : "outlined"}
                color={index === 0 ? "primary" : "default"}
                sx={{
                  borderRadius: 2,
                  fontWeight: 500,
                  "&:hover": {
                    bgcolor: index === 0 ? "primary.dark" : "action.hover",
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.2s ease",
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Paper> */}

      {/* Job Cards Grid */}
      <Fade in={true} timeout={800}>
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {Array.from({ length: 20 }).map((_, index) => (
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
              key={index}
            >
              <Box
                sx={{
                  animation: `fadeInUp 0.6s ease-out ${
                    (index % 6) * 0.1
                  }s both`,
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
                <JobCard />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Fade>

      {/* Pagination */}
      <Stack direction="row" justifyContent="center" mt={6}>
        <Paper
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <StyledPagination
            count={10}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Paper>
      </Stack>
    </Box>
  );
};

export default JobPage;
