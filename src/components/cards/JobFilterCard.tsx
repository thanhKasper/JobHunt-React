import { CalendarToday, ChevronRight, Delete, Work } from "@mui/icons-material";
import {
  Box,
  Button,
  CardContent,
  Chip,
  Link as MuiLink,
  Stack,
  Typography,
  Zoom,
  alpha,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router";
import InfoCard from "./InfoCard";

const JobFilterCard = () => {
  const theme = useTheme();

  return (
    <InfoCard>
      <CardContent sx={{ p: 4, position: "relative" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          {/* Left Content */}
          <Stack spacing={2} sx={{ flex: 1 }}>
            {/* Title with Chevron */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <MuiLink
                component={Link}
                to="fjk1234jk15"
                underline="none"
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "text.primary",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                Tên Của Bộ Lọc Công Việc
              </MuiLink>
              <ChevronRight
                sx={{
                  fontSize: 20,
                  color: "action.active", //theme.palette.action.active,
                  transform: "translateX(0)",
                  transition: "transform 0.3s ease",
                  "div:hover > &": {
                    transform: "translateX(4px)",
                  },
                }}
              />
            </Stack>

            {/* Meta Information */}
            <Stack spacing={1.5}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Work
                  sx={{
                    fontSize: 16,
                    color: "text.secondary",
                  }}
                />
                <Typography
                  variant="body2"
                  fontWeight={500}
                  color="text.secondary"
                >
                  Nghề Nghiệp Lọc
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <CalendarToday
                  sx={{
                    fontSize: 16,
                    color: "text.secondary",
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  Ngày Tạo Bộ Lọc
                </Typography>
              </Stack>
            </Stack>

            {/* Status Chip */}
            <Zoom in={true} timeout={500}>
              <Chip
                label="Đang Hoạt Động"
                size="small"
                icon={
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "success.main",
                      animation: "pulse 2s infinite",
                      "@keyframes pulse": {
                        "0%": { opacity: 1 },
                        "50%": { opacity: 0.5 },
                        "100%": { opacity: 1 },
                      },
                    }}
                  />
                }
                sx={{
                  backgroundColor: alpha("#2e7d32", 0.1),
                  color: "success.main",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  alignSelf: "flex-start",
                  "& .MuiChip-icon": {
                    marginLeft: 1,
                  },
                }}
              />
            </Zoom>
          </Stack>

          {/* Delete Button */}
          <Button
            startIcon={
              <Delete
                sx={{
                  transition: "transform 0.2s ease",
                }}
              />
            }
            variant="outlined"
            color="error"
            size="small"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: 2,
              py: 1,
              minWidth: 80,
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
        </Stack>
      </CardContent>
    </InfoCard>
  );
};

export default JobFilterCard;
