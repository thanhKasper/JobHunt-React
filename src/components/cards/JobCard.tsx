import {
  Business,
  DateRange,
  FilterList,
  LocationOn,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router";
import InfoCard from "./InfoCard";
import type JobDTO from "@/apis/DTO/JobDTO";

// Enhanced button
const DetailButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  padding: "8px 20px",
  fontWeight: 600,
  textTransform: "none",
  transition: "all 0.3s ease",
  border: `2px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,

  "&:hover": {
    transform: "translateX(4px)",
  },
}));

export default function JobCard({ job }: { job: JobDTO }) {
  return (
    <InfoCard elevation={2}>
      <CardContent sx={{ p: 3 }}>
        {/* Filter Section */}
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <FilterList sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Bộ Lọc:
          </Typography>
          <MuiLink
            to={`job-filter/${job.jobFilterId}`}
            component={Link}
            sx={{
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
              color: "primary.main",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {job.jobFilterName}
          </MuiLink>
        </Stack>

        <Divider sx={{ mb: 2, opacity: 0.3 }} />

        {/* Job Title */}
        <Typography
          variant="h6"
          component="div"
          className="job-title"
          sx={{
            fontWeight: 700,
            mb: 1.5,
            fontSize: "1.25rem",
            lineHeight: 1.3,
            transition: "color 0.3s ease",
          }}
        >
          {job.jobTitle}
        </Typography>

        {/* Company */}
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <Business sx={{ fontSize: 18, color: "text.secondary" }} />
          <MuiLink
            component={Link}
            to={job.companyLink}
            sx={{
              textDecoration: "none",
              fontWeight: 600,
              color: "text.primary",
              fontSize: "0.95rem",
              "&:hover": {
                color: "primary.main",
                textDecoration: "underline",
              },
              transition: "color 0.3s ease",
            }}
          >
            {job.companyName}
          </MuiLink>
        </Stack>

        {/* Job Details */}
        <Box
          sx={{
            backgroundColor: "grey.50",
            borderRadius: 2,
            p: 2,
            border: "1px solid",
            borderColor: "grey.200",
          }}
        >
          <Stack spacing={1.5}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <DateRange sx={{ fontSize: 16, color: "primary.main" }} />
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontWeight: 500,
                }}
              >
                Ngày mở đơn:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                }}
              >
                {job.jobOpenDate}
              </Typography>
              <Chip
                label="Mới"
                size="small"
                color="success"
                sx={{
                  height: 20,
                  fontSize: "0.7rem",
                  fontWeight: 600,
                }}
              />
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <LocationOn sx={{ fontSize: 16, color: "error.main" }} />
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontWeight: 500,
                }}
              >
                Địa điểm làm việc:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                }}
              >
                {job.workingLocation}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 3, pt: 0 }}>
        <DetailButton
          LinkComponent={MuiLink}
          href={job.jobLink}
          size="small"
          className="detail-button"
        >
          Thông Tin Chi Tiết
        </DetailButton>
      </CardActions>
    </InfoCard>
  );
}
