import HeaderCard from "@/components/cards/HeaderCard";
import StatsCard from "@/components/cards/StatCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { filterJobFilters } from "@/store/slices/jobFilterSlice";
import {
  Add,
  AutoAwesome,
  FilterList,
  SearchRounded,
  TuneRounded,
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
import React from "react";
import { Link } from "react-router";
import JobFilterCard from "../../components/cards/JobFilterCard";
import AddButton from "./components/AddButton";

export default function JobFilterPage() {
  const [filterType, setFilterType] = React.useState("Tất cả");
  const dispatch = useAppDispatch();
  const jobFilterState = useAppSelector((state) => state.jobFilterState);
  const totalJobs = useAppSelector((state) => state.jobState.totalJobs);

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
              <TuneRounded sx={{ fontSize: 32 }} />
              <Typography variant="h4" fontWeight={700}>
                Bộ Lọc Công Việc
              </Typography>
              <Chip
                label={`${jobFilterState.filterTotal} bộ lọc`}
                size="small"
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontWeight: 600,
                }}
              />
            </Stack>
            <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 600 }}>
              Tại đây, bạn có thể quản lý các bộ lọc công việc của mình. Bộ lọc
              này sẽ giúp bạn tìm kiếm công việc phù hợp với sở thích và kỹ năng
              của bạn.
            </Typography>
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ zIndex: 1 }}
          >
            <Link to="/job-filters/new">
              <AddButton
                variant="contained"
                startIcon={<Add />}
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.3)",
                  },
                }}
              >
                Thêm Bộ Lọc
              </AddButton>
            </Link>
          </Stack>
        </Stack>
      </HeaderCard>

      {/* Stats and Controls */}
      <Stack direction="row" spacing={3} mb={3}>
        <StatsCard sx={{ flex: 1 }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              <SearchRounded sx={{ color: "primary.main", fontSize: 28 }} />
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {jobFilterState.activeFilterTotal} Bộ Lọc Đang Hoạt Động
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tìm kiếm công việc phù hợp
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
                  {totalJobs} Kết Quả
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Công việc phù hợp
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </StatsCard>
      </Stack>

      {/* Quick Actions */}
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
          <FilterList sx={{ color: "text.secondary" }} />
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Lọc nhanh:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {["Tất cả", "Đang hoạt động", "Tạm dừng", "Yêu thích"].map(
              (filter) => (
                <Chip
                  key={filter}
                  label={filter}
                  size="small"
                  onClick={() => {
                    setFilterType(filter);
                    dispatch(filterJobFilters(filter));
                  }}
                  variant={filter === filterType ? "filled" : "outlined"}
                  color={filter === filterType ? "primary" : "default"}
                  sx={{
                    borderRadius: 2,
                    fontWeight: 500,
                    "&:hover": {
                      bgcolor:
                        filter === "Tất cả" ? "primary.dark" : "action.hover",
                      transform: "scale(1.05)",
                    },
                    transition: "all 0.2s ease",
                  }}
                />
              )
            )}
          </Stack>
        </Stack>
      </Paper>

      {/* Filter Cards Grid */}
      {jobFilterState.filterTotal > 0 ? (
        <Fade in={true} timeout={800}>
          <Grid container spacing={3}>
            {jobFilterState.filteredJobFilters.map((jobFilter, index) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
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
                  <JobFilterCard jobFilter={jobFilter} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Fade>
      ) : (
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            border: "2px dashed",
            borderColor: "divider",
            mt: 4,
          }}
        >
          <TuneRounded sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" mb={1}>
            Chưa có bộ lọc nào
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Tạo bộ lọc đầu tiên để bắt đầu tìm kiếm công việc phù hợp
          </Typography>
          <AddButton
            variant="contained"
            startIcon={<Add />}
            LinkComponent={"a"}
            href="/job-filters/new"
          >
            Tạo Bộ Lọc Đầu Tiên
          </AddButton>
        </Paper>
      )}
    </Box>
  );
}
