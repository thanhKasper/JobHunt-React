import StatsCard from "@/components/cards/StatCard";
import { useAppSelector } from "@/store/hooks";
import { Edit } from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";

const StyledButton = styled(IconButton)(({ theme }) => ({
  borderRadius: 12,
  padding: 8,
  background: "rgba(102, 126, 234, 0.1)",
  color: theme.palette.primary.main,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    background: "rgba(102, 126, 234, 0.2)",
    transform: "scale(1.1)",
  },
}));

const StatsCardWithAnimation = styled(StatsCard)(() => ({
  padding: 32,
  animation: `slideInLeft 0.6s ease-out 0.1s both`,
  "@keyframes slideInLeft": {
    "0%": {
      opacity: 0,
      transform: "translateX(-30px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateX(0)",
    },
  },
}));

export default function JobFilter({
  setEditMode,
}: {
  setEditMode: (mode: boolean) => void;
}) {
  const jobFilter = useAppSelector(
    (state) => state.jobFilterDetailState.jobFilter
  );

  return (
    <Stack spacing={3}>
      <StatsCardWithAnimation>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              fontWeight={600}
              mb={1}
              sx={{ textTransform: "uppercase", letterSpacing: 1 }}
            >
              Tên Bộ Lọc
            </Typography>

            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {jobFilter.jobFilterName}
              </Typography>
            </Stack>
          </Box>

          <Tooltip title="Chỉnh Sửa Bộ Lọc" arrow>
            <StyledButton disabled onClick={() => setEditMode(true)}>
              <Edit />
            </StyledButton>
          </Tooltip>
        </Stack>
      </StatsCardWithAnimation>

      <StatsCardWithAnimation>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          fontWeight={600}
          mb={1}
          sx={{ textTransform: "uppercase", letterSpacing: 1 }}
        >
          Ngành Nghề Được Lọc
        </Typography>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="body1" fontWeight={500}>
            {jobFilter.filterOccupation}
          </Typography>
        </Stack>
      </StatsCardWithAnimation>

      <StatsCardWithAnimation>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          fontWeight={600}
          mb={1}
          sx={{ textTransform: "uppercase", letterSpacing: 1 }}
        >
          Vi trí Làm Việc Mong Muốn
        </Typography>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="body1" fontWeight={500}>
            {jobFilter.desireWorkingLocation}
          </Typography>
        </Stack>
      </StatsCardWithAnimation>

      <StatsCardWithAnimation>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          fontWeight={600}
          mb={1}
          sx={{ textTransform: "uppercase", letterSpacing: 1 }}
        >
          Cấp Bậc Công Việc
        </Typography>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="body1" fontWeight={500}>
            {jobFilter.jobLevel}
          </Typography>
        </Stack>
      </StatsCardWithAnimation>

      <StatsCardWithAnimation>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          fontWeight={600}
          mb={1}
          sx={{ textTransform: "uppercase", letterSpacing: 1 }}
        >
          Số Năm Kinh Nghiệm Hiện có
        </Typography>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="body1" fontWeight={500}>
            {jobFilter.exp} Năm
          </Typography>
        </Stack>
      </StatsCardWithAnimation>

      <StatsCardWithAnimation>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          fontWeight={600}
          mb={1}
          sx={{ textTransform: "uppercase", letterSpacing: 1 }}
        >
          Kiến Thức Chuyên Môn
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {jobFilter.technicalKnowledge.map((chip, chipIndex) => (
            <Chip
              key={chipIndex}
              label={chip}
              variant="outlined"
              color="primary"
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                },
              }}
            />
          ))}
        </Stack>
      </StatsCardWithAnimation>

      <StatsCardWithAnimation>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          fontWeight={600}
          mb={1}
          sx={{ textTransform: "uppercase", letterSpacing: 1 }}
        >
          Kỹ Năng Mềm
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {jobFilter.softSkills.map((chip, chipIndex) => (
            <Chip
              key={chipIndex}
              label={chip}
              variant="outlined"
              color="success"
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                },
              }}
            />
          ))}
        </Stack>
      </StatsCardWithAnimation>

      <StatsCardWithAnimation>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          fontWeight={600}
          mb={1}
          sx={{ textTransform: "uppercase", letterSpacing: 1 }}
        >
          Công Cụ Sử Dụng
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {jobFilter.tools.map((chip, chipIndex) => (
            <Chip
              key={chipIndex}
              label={chip}
              variant="outlined"
              color="warning"
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                },
              }}
            />
          ))}
        </Stack>
      </StatsCardWithAnimation>

      <StatsCardWithAnimation>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          fontWeight={600}
          mb={1}
          sx={{ textTransform: "uppercase", letterSpacing: 1 }}
        >
          Ngôn Ngữ Giao Tiếp
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {jobFilter.softSkills.map((chip, chipIndex) => (
            <Chip
              key={chipIndex}
              label={chip}
              variant="outlined"
              color="secondary"
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                },
              }}
            />
          ))}
        </Stack>
      </StatsCardWithAnimation>
    </Stack>
  );
}
