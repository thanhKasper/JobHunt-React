import type JobDetailDTO from "@/apis/DTO/JobDetailDTO";
import {
  ArrowForward,
  AssessmentOutlined,
  CalendarToday,
  Info,
  LocationOn,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Chip,
  Divider,
  Link as MuiLink,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router";
import InfoCard from "./InfoCard";

const CompanyChip = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1, 1.5),
  borderRadius: 20,
  background: "rgba(102, 126, 234, 0.1)",
  border: "1px solid rgba(102, 126, 234, 0.2)",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  transition: "all 0.2s ease",

  "&:hover": {
    background: "rgba(102, 126, 234, 0.15)",
    transform: "scale(1.02)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 25,
  padding: theme.spacing(1.5, 3),
  fontWeight: 600,
  textTransform: "none",
  background: "rgba(102, 126, 234, 0.1)",
  color: theme.palette.primary.main,
  border: "1px solid rgba(102, 126, 234, 0.3)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",

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

const JobCardDetail = ({ job }: { job: JobDetailDTO }) => {

  return (
    <InfoCard elevation={0} sx={{ width: "100%", p: 2 }}>
      <Stack spacing={2}>
        {/* Header Section */}
        <Stack spacing={1.5}>
          <Typography
            variant="h6"
            component="div"
            className="job-title"
            sx={{
              fontWeight: 700,
              lineHeight: 1.2,
              transition: "all 0.3s ease",
            }}
          >
            {job.jobTitle}
          </Typography>

          <CompanyChip elevation={0}>
            <Avatar
              alt="Company Logo"
              src={job.companyLogo}
              sx={{ width: 28, height: 28 }}
            />
            <MuiLink
              component={Link}
              to={job.companyLink}
              sx={{
                textDecoration: "none",
                fontWeight: 600,
                color: "primary.main",
                fontSize: "0.9rem",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {job.companyName}
            </MuiLink>
          </CompanyChip>
        </Stack>

        <Divider sx={{ opacity: 0.2, my: 0.5 }} />

        {/* Matching Keywords */}
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Từ khóa tương thích
            </Typography>
            <Chip
              size="small"
              label={`${job.matchingRequirement.length}`}
              sx={{
                bgcolor: "success.light",
                color: "success.contrastText",
                fontWeight: 600,
                fontSize: "0.7rem",
                height: 20,
              }}
            />
          </Stack>

          <Stack direction="row" flexWrap="wrap" gap={1}>
            {job.matchingRequirement.map((keyword, index) => (
              <Chip
                key={index}
                size="small"
                label={keyword}
                sx={{
                  bgcolor: "rgba(102, 126, 234, 0.1)",
                  color: "primary.main",
                  fontWeight: 500,
                  border: "1px solid rgba(102, 126, 234, 0.3)",
                  borderRadius: 2,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "rgba(102, 126, 234, 0.2)",
                    transform: "scale(1.05)",
                  },
                }}
              />
            ))}
          </Stack>
        </Stack>

        <Divider sx={{ opacity: 0.2, my: 0.5 }} />

        {/* Job Details */}
        <Stack direction="row" spacing={3} alignItems="center">
          <Stack direction="row" alignItems="center" spacing={1}>
            <CalendarToday
              sx={{
                fontSize: 16,
                color: "text.secondary",
              }}
            />
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {new Date(job.jobOpenDate).toLocaleDateString("vi-VN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            // sx={{ flex: 1 }}
          >
            <LocationOn
              sx={{
                fontSize: 16,
                color: "text.secondary",
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {job.workingLocation}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ flex: 1 }}
          >
            <AssessmentOutlined
              sx={{
                fontSize: 16,
                color: "text.secondary",
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {job.jobCompatibilityPercentage}%
            </Typography>
            <Tooltip title="Độ tương thích của bạn với công việc này dựa trên các dự án bạn đã làm và yêu cầu công việc.">
              <Info sx={{ fontSize: "12px" }} />
            </Tooltip>
          </Stack>

          <StyledButton
            className="detail-button"
            LinkComponent={"a"}
            formTarget="_blank"
            href={job.jobLink}
            endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
            size="small"
            sx={{ minWidth: "auto", px: 2, py: 0.5 }}
          >
            Chi Tiết
          </StyledButton>
        </Stack>
      </Stack>
    </InfoCard>
  );
};

export default JobCardDetail;
