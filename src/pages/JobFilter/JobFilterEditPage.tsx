import jobLevelList from "@/apis/BusinessData/JobLevel";
import TagInput from "@/components/input/TagInput";
import occupationList from "@apis/BusinessData/OccupationList";
import Subtitle from "@components/Subtitle";
import Title from "@components/Title";
import { Save } from "@mui/icons-material";
import {
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import HorizontalDisplay from "./components/HorizontalDisplay";
import { useAppSelector } from "@/store/hooks";

export default function JobFilterEditPage({
  setEditMode,
}: {
  setEditMode: (mode: boolean) => void;
}) {
  const jobFilter = useAppSelector(state => state.jobFilterDetailState.jobFilter);
  return (
    <Stack>
      <Title title="Chi Tiết Bộ Lọc Công Việc" />
      <Subtitle title="Thông Tin Chi Tiết Về Bộ Lọc Mà Bạn Đã Tạo" />
      <Grid container spacing={2}>
        <HorizontalDisplay
          label="Tên Bộ Lọc"
          value={
            <Stack direction="row" alignItems="center" gap={1}>
              <TextField size="small" variant="outlined" fullWidth />
              <Tooltip title="Lưu Chỉnh Sửa">
                <IconButton size="small" onClick={() => setEditMode(false)}>
                  <Save />
                </IconButton>
              </Tooltip>
            </Stack>
          }
        />
        <HorizontalDisplay
          label="Ngành Nghề"
          value={
            <Select
              labelId="occupation"
              id="demo-simple-select"
              size="small"
              fullWidth
              // value={jobFilterForm.jobFilterForm.ocupation}
              // onChange={(e) =>
              //   jobFilterForm.updateOccupation(e.target.value as string)
              // }
            >
              {occupationList.map((occupation) => (
                <MenuItem key={occupation.key} value={occupation.key}>
                  {occupation.value}
                </MenuItem>
              ))}
            </Select>
          }
        />
        <HorizontalDisplay
          label="Vị Trí Làm Việc"
          value={<TextField size="small" variant="outlined" fullWidth />}
        />
        <HorizontalDisplay
          label="Cấp Bậc"
          value={
            <Select
              size="small"
              fullWidth
              // value={jobFilterForm.jobFilterForm.ocupation}
              // onChange={(e) =>
              //   jobFilterForm.updateOccupation(e.target.value as string)
              // }
            >
              {jobLevelList.map((jobLevel) => (
                <MenuItem key={jobLevel.key} value={jobLevel.key}>
                  {jobLevel.value}
                </MenuItem>
              ))}
            </Select>
          }
        />
        <HorizontalDisplay
          label="Số Năm Kinh Nghiệm"
          value={
            <TextField
              size="small"
              variant="outlined"
              type="number"
              fullWidth
              // value={jobFilterForm.jobFilterForm.experience
            />
          }
        />
        <HorizontalDisplay
          label="Kiến Thức Chuyên Môn"
          value={<TagInput size="small" />}
        />
        <HorizontalDisplay
          label="Kỹ Năng Mềm"
          value={<TagInput size="small" />}
        />
        <HorizontalDisplay
          label="Công Cụ Biết Sử Dụng"
          value={<TagInput size="small" />}
        />
        <HorizontalDisplay
          label="Ngôn Ngữ Giao Tiếp"
          value={<TagInput size="small" />}
        />
      </Grid>
    </Stack>
  );
}
