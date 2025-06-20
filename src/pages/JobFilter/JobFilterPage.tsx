import HeaderCard from "@/components/cards/HeaderCard";
import StatsCard from "@/components/cards/StatCard";
import {
  Add,
  AutoAwesome,
  FilterList,
  SearchRounded,
  TuneRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CardContent,
  Chip,
  Fade,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useParams } from "react-router";
import JobFilterCard from "../../components/cards/JobFilterCard";
import CreateJobFilterPage from "./CreateJobFilterPage";

const StyledButton = styled(Button)(() => ({
  borderRadius: 25,
  padding: "12px 24px",
  fontWeight: 600,
  textTransform: "none",
  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",

  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
  },

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
    transition: "left 0.6s ease",
  },

  "&:hover::before": {
    left: "100%",
  },
}));

export default function JobFilterPage() {
  const filterId = useParams().jobFilterId;
  const [open, setOpen] = React.useState(false);
  const [filterCount] = React.useState(5);
  const [activeFilters] = React.useState(3);

  console.log(
    "this page has been rendered with filterId: " + (filterId ?? "null")
  );

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
                label={`${filterCount} bộ lọc`}
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
            <StyledButton
              onClick={() => setOpen(true)}
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
            </StyledButton>
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
                  {activeFilters} Bộ Lọc Đang Hoạt Động
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
                  24 Kết Quả
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
                  variant={filter === "Tất cả" ? "filled" : "outlined"}
                  color={filter === "Tất cả" ? "primary" : "default"}
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
      <Fade in={true} timeout={800}>
        <Grid container spacing={3}>
          {Array.from({ length: 5 }).map((_, index) => (
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
                <JobFilterCard />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Fade>

      {/* Empty State (if no filters) */}
      {filterCount === 0 && (
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
          <StyledButton
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpen(true)}
          >
            Tạo Bộ Lọc Đầu Tiên
          </StyledButton>
        </Paper>
      )}

      {/* <Outlet /> */}
      <CreateJobFilterPage open={open} toggleDrawer={setOpen} />
    </Box>
  );
}
