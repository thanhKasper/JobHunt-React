import HeaderCard from "@/components/cards/HeaderCard";
import StatsCard from "@/components/cards/StatCard";
import useFetch from "@/hooks/useFetch";
import { useAppSelector } from "@/store/hooks";
import { getJobFilter } from "@/store/slices/jobFilterDetailSlice";
import {
  InfoRounded,
  ListAltRounded,
  TuneRounded,
  WorkRounded,
} from "@mui/icons-material";
import {
  Box,
  CardContent,
  Chip,
  Fade,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useParams } from "react-router";
import JobFilter from "./components/JobFilter";
import MatchJobList from "./components/MatchJobList";
import JobFilterEditPage from "./JobFilterEditPage";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-root": {
    minHeight: 48,
  },
  "& .MuiTabs-indicator": {
    height: 3,
    borderRadius: "3px 3px 0 0",
    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
  },
  "& .MuiTab-root": {
    textTransform: "none",
    minWidth: 160,
    fontWeight: 600,
    fontSize: "0.95rem",
    color: theme.palette.text.secondary,
    transition: "all 0.3s ease",
    "&:hover": {
      color: theme.palette.primary.main,
      transform: "translateY(-1px)",
    },
    "&.Mui-selected": {
      color: theme.palette.primary.main,
      fontWeight: 700,
    },
  },
}));

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Fade in={true} timeout={600}>
          <Box sx={{ pt: 3 }}>{children}</Box>
        </Fade>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function JobFilterPageDetail() {
  const jobfilterId = useParams().jobFilterId;
  const [editMode, setEditMode] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const jobFilterDetailState = useAppSelector(
    (state) => state.jobFilterDetailState
  );

  const fetchingState = useFetch(() => getJobFilter(jobfilterId ?? ""));

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    fetchingState == "succeeded" && (
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
                  Chi Tiết Bộ Lọc
                </Typography>
                <Chip
                  label={
                    jobFilterDetailState.jobFilter.isActive
                      ? "Đang hoạt động"
                      : "Tạm dừng"
                  }
                  size="small"
                  sx={{
                    bgcolor: "rgba(76, 175, 80, 0.2)",
                    color: "white",
                    fontWeight: 600,
                  }}
                />
              </Stack>
              <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 600 }}>
                Xem và chỉnh sửa thông tin chi tiết của bộ lọc công việc. Theo
                dõi các công việc phù hợp với tiêu chí của bạn.
              </Typography>
            </Box>
          </Stack>
        </HeaderCard>

        {/* Stats Cards */}
        <Stack direction="row" spacing={3} mb={3}>
          <StatsCard sx={{ flex: 1 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <WorkRounded sx={{ color: "primary.main", fontSize: 28 }} />
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {jobFilterDetailState.jobFilter.totalJobs} Công Việc
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Phù hợp với bộ lọc
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </StatsCard>

          <StatsCard sx={{ flex: 1 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <InfoRounded sx={{ color: "info.main", fontSize: 28 }} />
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {jobFilterDetailState.jobFilter.averageCompatibility}% Tương
                    Thích
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Độ Tương Thích Trung Bình
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </StatsCard>
        </Stack>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="job filter tabs"
          >
            <Tab
              icon={<InfoRounded sx={{ fontSize: 20 }} />}
              iconPosition="start"
              label="Thông Tin Chi Tiết"
              {...a11yProps(0)}
            />
            <Tab
              icon={<ListAltRounded sx={{ fontSize: 20 }} />}
              iconPosition="start"
              label="Danh Sách Công Việc Phù Hợp"
              {...a11yProps(1)}
            />
          </StyledTabs>
        </Box>

        {/* Tab Content */}
        <CustomTabPanel value={value} index={0}>
          {jobFilterDetailState.jobFilterState == "succeeded" &&
            (editMode ? (
              <JobFilterEditPage setEditMode={setEditMode} />
            ) : (
              <JobFilter
                jobFilter={jobFilterDetailState.jobFilter}
                setEditMode={setEditMode}
              />
            ))}
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <MatchJobList />
        </CustomTabPanel>
      </Box>
    )
  );
}
