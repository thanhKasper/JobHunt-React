import type JobFilterDTO from "@/apis/DTO/JobFilterDTO";
import { useAppDispatch } from "@/store/hooks";
import {
  deleteJobFilter,
  toggleJobFilterActiveState,
  toggleJobFilterStar,
} from "@/store/slices/jobFilterSlice";
import {
  BusinessCenter,
  ChevronRight,
  Delete,
  PowerSettingsNew,
  Star,
  StarBorder,
  Work,
} from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  CardContent,
  Chip,
  IconButton,
  Link as MuiLink,
  Stack,
  Tooltip,
  Typography,
  useTheme,
  Zoom,
} from "@mui/material";
import { Link } from "react-router";
import InfoCard from "./InfoCard";
// import theme from "@/layouts/Theme";

interface JobFilterCardProps {
  jobFilter: JobFilterDTO;
}

const JobFilterCard = ({ jobFilter }: JobFilterCardProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const handleToggleActive = () => {
    dispatch(toggleJobFilterActiveState(jobFilter.jobFilterId));
  };

  const handleToggleStar = () => {
    dispatch(toggleJobFilterStar(jobFilter.jobFilterId));
  };

  const handleDelete = () => {
    dispatch(deleteJobFilter(jobFilter.jobFilterId));
  };

  return (
    <InfoCard>
      <CardContent sx={{ p: 4, position: "relative" }}>
        {/* Main Content */}
        <Stack spacing={3}>
          {/* Header Row - Title with Star and Toggle */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* Title with Chevron */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ flex: 1 }}
            >
              <MuiLink
                component={Link}
                to={jobFilter.jobFilterId}
                underline="none"
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: jobFilter.isActive ? "text.primary" : "text.disabled",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: jobFilter.isActive
                      ? "primary.main"
                      : "text.secondary",
                  },
                }}
              >
                {jobFilter.title}
              </MuiLink>
              <ChevronRight
                sx={{
                  fontSize: 20,
                  color: jobFilter.isActive
                    ? "action.active"
                    : "action.disabled",
                  transform: "translateX(0)",
                  transition: "transform 0.3s ease",
                  "div:hover > &": {
                    transform: "translateX(4px)",
                  },
                }}
              />
            </Stack>

            {/* Star Button - Positioned absolutely in top-right corner */}
            <Tooltip title={jobFilter.isStarred ? "Bỏ yêu thích" : "Yêu thích"}>
              <IconButton
                onClick={handleToggleStar}
                sx={{
                  transition: "all 0.2s ease",
                  color: jobFilter.isStarred
                    ? "warning.main"
                    : "action.disabled",
                  "&:hover": {
                    color: "warning.main",
                    transform: "scale(1.1)",
                    backgroundColor: alpha(theme.palette.warning.main, 0.1),
                  },
                }}
              >
                {jobFilter.isStarred ? (
                  <Star sx={{ fontSize: 20 }} />
                ) : (
                  <StarBorder sx={{ fontSize: 20 }} />
                )}
              </IconButton>
            </Tooltip>
          </Stack>

          {/* Content Row - Meta Info and Status */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            {/* Meta Information */}
            <Stack spacing={1.5}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Work
                  sx={{
                    fontSize: 16,
                    color: jobFilter.isActive
                      ? "text.secondary"
                      : "text.disabled",
                  }}
                />
                <Typography
                  variant="body2"
                  fontWeight={500}
                  color={
                    jobFilter.isActive ? "text.secondary" : "text.disabled"
                  }
                >
                  {jobFilter.occupation}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <BusinessCenter
                  sx={{
                    fontSize: 16,
                    color: jobFilter.isActive
                      ? "text.secondary"
                      : "text.disabled",
                  }}
                />
                <Typography
                  variant="body2"
                  color={
                    jobFilter.isActive ? "text.secondary" : "text.disabled"
                  }
                >
                  {jobFilter.totalJobs} Công Việc
                </Typography>
              </Stack>

              {/* Status Chip */}
              <Zoom in={true} timeout={500}>
                <Chip
                  label={jobFilter.isActive ? "Đang Hoạt Động" : "Tạm Dừng"}
                  size="small"
                  icon={
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: jobFilter.isActive
                          ? "success.main"
                          : "error.main",
                        animation: jobFilter.isActive
                          ? "pulse 2s infinite"
                          : "none",
                        "@keyframes pulse": {
                          "0%": { opacity: 1 },
                          "50%": { opacity: 0.5 },
                          "100%": { opacity: 1 },
                        },
                      }}
                    />
                  }
                  sx={{
                    backgroundColor: jobFilter.isActive
                      ? alpha(theme.palette.success.main, 0.1)
                      : alpha(theme.palette.error.main, 0.1),
                    color: jobFilter.isActive ? "success.main" : "error.main",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    "& .MuiChip-icon": {
                      marginLeft: 1,
                    },
                    width: "fit-content",
                  }}
                />
              </Zoom>
            </Stack>

            <Stack gap={0.5}>
              {/* Activate or deactivate filter*/}
              <Tooltip title={jobFilter.isActive ? "Tắt bộ lọc" : "Bật bộ lọc"}>
                <Button
                  startIcon={
                    <PowerSettingsNew
                      sx={{
                        fontSize: 16,
                        transition: "transform 0.2s ease",
                      }}
                    />
                  }
                  variant="outlined"
                  color={jobFilter.isActive ? "warning" : "success"}
                  size="small"
                  onClick={handleToggleActive}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    px: 2,
                    py: 0.5,
                    minWidth: 80,
                    fontSize: "0.75rem",
                    transition: "all 0.2s ease",
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: jobFilter.isActive
                        ? alpha("#ed6c02", 0.05)
                        : alpha("#2e7d32", 0.05),
                      transform: "scale(1.02)",
                      boxShadow: jobFilter.isActive
                        ? `0 4px 12px ${alpha("#ed6c02", 0.2)}`
                        : `0 4px 12px ${alpha("#2e7d32", 0.2)}`,
                    },
                    "&:active": {
                      transform: "scale(0.98)",
                    },
                  }}
                >
                  {jobFilter.isActive ? "TẮT" : "BẬT"}
                </Button>
              </Tooltip>

              {/* Delete Button */}
              <Tooltip title="Xóa bộ lọc">
                <Button
                  startIcon={
                    <Delete
                      sx={{
                        fontSize: 16,
                        transition: "transform 0.2s ease",
                      }}
                    />
                  }
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={handleDelete}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    px: 2,
                    py: 0.5,
                    minWidth: 70,
                    fontSize: "0.75rem",
                    transition: "all 0.2s ease",
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: alpha("#d32f2f", 0.05),
                      transform: "scale(1.02)",
                      boxShadow: `0 4px 12px ${alpha("#d32f2f", 0.2)}`,
                    },
                    "&:active": {
                      transform: "scale(0.98)",
                    },
                  }}
                >
                  XÓA
                </Button>
              </Tooltip>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </InfoCard>
  );
};

export default JobFilterCard;
