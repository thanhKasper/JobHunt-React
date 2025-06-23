import type ProjectDTO from "@/apis/DTO/ProjectDTO";
import { Code, DateRange, Person, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import { Link } from "react-router";
import InfoCard from "./InfoCard";

// Enhanced button (similar to DetailButton)
const ViewButton = styled(Button)(({ theme }) => ({
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

export default function ProjectCard({ project }: { project: ProjectDTO }) {
  return (
    <InfoCard elevation={2}>
      <CardContent sx={{ p: 3 }}>
        {/* Project Title */}
        <Typography
          component={Link}
          to="jkdf-17wjgj-178saasb-16782"
          className="project-title"
          variant="h6"
          sx={{
            textDecoration: "none",
            fontWeight: 700,
            mb: 1.5,
            fontSize: "1.25rem",
            lineHeight: 1.3,
            transition: "color 0.3s ease",
            color: "text.primary",
            display: "block",
            "&:hover": {
              textDecoration: "none",
            },
          }}
        >
          {project.projectName}
        </Typography>

        {/* Project Duration */}
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <DateRange sx={{ fontSize: 18, color: "primary.main" }} />
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontWeight: 500,
            }}
          >
            Thời gian:
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: "text.primary",
            }}
          >
            {`${dayjs(project.startDate).format("MM/YYYY")}`} -{" "}
            {project.endDate
              ? dayjs(project.endDate).format("MM/YYYY")
              : "Hiện tại"}
          </Typography>
          <Chip
            label={project.endDate ? "Hoàn thành" : "Đang thực hiện"}
            size="small"
            color="success"
            sx={{
              height: 20,
              fontSize: "0.7rem",
              fontWeight: 600,
            }}
          />
        </Stack>

        <Divider sx={{ mb: 2, opacity: 0.3 }} />

        {/* Roles Section */}
        <Box
          sx={{
            backgroundColor: "grey.50",
            borderRadius: 2,
            p: 2,
            border: "1px solid",
            borderColor: "grey.200",
            mb: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
            <Person sx={{ fontSize: 16, color: "primary.main" }} />
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              Vai Trò:
            </Typography>
          </Stack>
          <Stack
            direction="row"
            gap={1}
            sx={{ overflowX: "scroll", scrollbarWidth: "none" }}
          >
            {project.roles.map((role, idx) => (
              <Chip
                key={idx}
                label={role}
                color="primary"
                variant="outlined"
                sx={{
                  fontWeight: 500,
                  borderRadius: 2,
                  userSelect: "none",
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Technologies Section */}
        <Box
          sx={{
            backgroundColor: "grey.50",
            borderRadius: 2,
            p: 2,
            border: "1px solid",
            borderColor: "grey.200",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
            <Code sx={{ fontSize: 16, color: "secondary.main" }} />
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              Công Nghệ Sử Dụng / Kỹ Năng:
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{ overflowX: "scroll", scrollbarWidth: "none" }}
          >
            {project.techOrSkills.map((tech, idx) => (
              <Chip
                key={idx}
                label={tech}
                color="secondary"
                size="small"
                sx={{
                  fontWeight: 500,
                  borderRadius: 2,
                }}
              />
            ))}
          </Stack>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 3, pt: 0 }}>
        <ViewButton
          LinkComponent={"a"}
          href={`portfolio/${project.projectId}`}
          size="small"
          className="view-button"
          startIcon={<Visibility />}
        >
          Xem Chi Tiết
        </ViewButton>
      </CardActions>
    </InfoCard>
  );
}
