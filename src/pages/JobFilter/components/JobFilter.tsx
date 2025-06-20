import StatsCard from "@/components/cards/StatCard";
import { Edit } from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  styled,
  Tooltip,
  Typography
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

export default function JobFilter({
  setEditMode,
}: {
  setEditMode: (mode: boolean) => void;
}) {
  const filterData = [
    { label: "Tên Bộ Lọc", value: "Lập Trình Viên Frontend", type: "title" },
    { label: "Ngành Nghề", value: "Công Nghệ Thông Tin", type: "text" },
    { label: "Vị Trí Làm Việc", value: "Hà Nội", type: "text" },
    { label: "Cấp Bậc", value: "Nhân Viên", type: "text" },
    { label: "Số Năm Kinh Nghiệm", value: "2 Năm", type: "text" },
    {
      label: "Kiến Thức Chuyên Môn",
      value: ["Khoa Học Máy Tính", "Adaptive Design", "Responsive Design"],
      type: "chips",
      color: "primary",
    },
    {
      label: "Kỹ Năng Mềm",
      value: ["Làm Việc Nhóm", "Giao Tiếp", "Giải Quyết Vấn Đề"],
      type: "chips",
      color: "success",
    },
    {
      label: "Công Cụ Biết Sử Dụng",
      value: ["Visual Studio Code", "Git", "Figma"],
      type: "chips",
      color: "warning",
    },
    {
      label: "Ngôn Ngữ Giao Tiếp",
      value: ["Tiếng Việt", "Tiếng Anh"],
      type: "chips",
      color: "secondary",
    },
  ];

  return (
    <Stack spacing={3}>
      {filterData.map((item, index) => (
        <StatsCard
          key={index}
          sx={{
            padding: 3,
            animation: `slideInLeft 0.6s ease-out ${index * 0.1}s both`,
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
          }}
        >
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
                {item.label}
              </Typography>

              {item.type === "title" && (
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
                    {item.value}
                  </Typography>
                </Stack>
              )}

              {item.type === "text" && (
                <Typography variant="body1" fontWeight={500}>
                  {item.value}
                </Typography>
              )}

              {item.type === "chips" && (
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {(item.value as string[]).map((chip, chipIndex) => (
                    <Chip
                      key={chipIndex}
                      label={chip}
                      variant="outlined"
                      color={item.color as any}
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
              )}
            </Box>

            {item.type === "title" && (
              <Tooltip title="Chỉnh Sửa Bộ Lọc" arrow>
                <StyledButton onClick={() => setEditMode(true)}>
                  <Edit />
                </StyledButton>
              </Tooltip>
            )}
          </Stack>
        </StatsCard>
      ))}
    </Stack>
  );
}
