import {
  Chip,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Title from "@components/Title";
import Subtitle from "@components/Subtitle";
import HorizontalDisplay from "./HorizontalDisplay";
import { Edit } from "@mui/icons-material";

export default function JobFilter({
  setEditMode,
}: {
  setEditMode: (mode: boolean) => void;
}) {
  return (
    <Stack>
      <Title title="Chi Tiết Bộ Lọc Công Việc" />
      <Subtitle title="Thông Tin Chi Tiết Về Bộ Lọc Mà Bạn Đã Tạo" />
      <Grid container spacing={2}>
        <HorizontalDisplay
          label="Tên Bộ Lọc"
          value={
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography
                variant="h6"
                fontWeight="bold"
                textTransform={"uppercase"}
              >
                Lập Trình Viên Frontend
              </Typography>
              <Tooltip title="Chỉnh Sửa Bộ Lọc">
                <IconButton
                  disabled
                  size="small"
                  onClick={() => setEditMode(true)}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
            </Stack>
          }
        />
        <HorizontalDisplay
          label="Ngành Nghề"
          value={<Typography>Công Nghệ Thông Tin</Typography>}
        />
        <HorizontalDisplay
          label="Vị Trí Làm Việc"
          value={<Typography>Hà Nội</Typography>}
        />
        <HorizontalDisplay
          label="Cấp Bậc"
          value={<Typography>Nhân Viên</Typography>}
        />
        <HorizontalDisplay
          label="Số Năm Kinh Nghiệm"
          value={<Typography>2 Năm</Typography>}
        />
        <HorizontalDisplay
          label="Kiến Thức Chuyên Môn"
          value={
            <Stack direction="row" gap={1} flexWrap="wrap">
              <Chip
                color="primary"
                variant="outlined"
                label="Khoa Học Máy Tính"
              />
              <Chip
                color="primary"
                variant="outlined"
                label="Adaptive Design"
              />
              <Chip
                color="primary"
                variant="outlined"
                label="Responsive Design"
              />
            </Stack>
          }
        />
        <HorizontalDisplay
          label="Kỹ Năng Mềm"
          value={
            <Stack direction="row" gap={1} flexWrap="wrap">
              <Chip color="success" variant="outlined" label="Làm Việc Nhóm" />
              <Chip color="success" variant="outlined" label="Giao Tiếp" />
              <Chip
                color="success"
                variant="outlined"
                label="Giải Quyết Vấn Đề"
              />
            </Stack>
          }
        />
        <HorizontalDisplay
          label="Công Cụ Biết Sử Dụng"
          value={
            <Stack direction="row" gap={1} flexWrap="wrap">
              <Chip
                color="warning"
                variant="outlined"
                label="Visual Studio Code"
              />
              <Chip color="warning" variant="outlined" label="Git" />
              <Chip color="warning" variant="outlined" label="Figma" />
            </Stack>
          }
        />
        <HorizontalDisplay
          label="Ngôn Ngữ Giao Tiếp"
          value={
            <Stack direction="row" gap={1} flexWrap="wrap">
              <Chip color="secondary" variant="outlined" label="Tiếng Việt" />
              <Chip color="secondary" variant="outlined" label="Tiếng Anh" />
            </Stack>
          }
        />
      </Grid>
    </Stack>
  );
}
