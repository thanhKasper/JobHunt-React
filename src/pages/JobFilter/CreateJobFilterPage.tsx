import {
  Button,
  Container,
  Drawer,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TagInput from "@components/input/TagInput";
import { Close, SendOutlined } from "@mui/icons-material";
import useCreateJobFilter from "./CreateJobFilterPage.Hook";
import occupationList from "@apis/BusinessData/OccupationList";
import jobLevelList from "@apis/BusinessData/JobLevel";

export default function CreateJobFilterPage({
  open,
  toggleDrawer,
}: {
  open: boolean;
  toggleDrawer: (isOpen: boolean) => void;
}) {
  const jobFilterForm = useCreateJobFilter();

  return (
    <Drawer
      anchor="bottom"
      open={open}
      sx={{
        "& .MuiPaper-root": {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
      onClose={() => toggleDrawer(false)}
    >
      <Container sx={{ paddingY: 4 }}>
        <Typography variant="h5" textAlign={"center"}>
          Tạo Bộ Lọc Công Việc
        </Typography>
        <Typography
          variant="subtitle1"
          marginBottom={4}
          textAlign={"center"}
          color="grey.600"
        >
          Lọc Công Việc Dựa Trên Những Gì Bạn Mong Muốn
        </Typography>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Tên Bộ Lọc"
            variant="outlined"
            value={jobFilterForm.jobFilterForm.filterTitle}
            onChange={(e) => jobFilterForm.updateFilterTitle(e.target.value)}
          />
          <Grid container spacing={2}>
            <Grid size={3}>
              <FormControl fullWidth>
                <InputLabel id="occupation">Ngành Nghề</InputLabel>
                <Select
                  labelId="occupation"
                  id="demo-simple-select"
                  label="Ngành Nghề"
                  fullWidth
                  value={jobFilterForm.jobFilterForm.ocupation}
                  onChange={(e) =>
                    jobFilterForm.updateOccupation(e.target.value as string)
                  }
                >
                  {occupationList.map((occupation) => (
                    <MenuItem key={occupation.key} value={occupation.key}>
                      {occupation.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={3}>
              <FormControl fullWidth>
                <InputLabel id="job-level">Cấp Độ Chuyên Môn</InputLabel>
                <Select
                  labelId="job-level"
                  label="Cấp Độ Chuyên Môn"
                  fullWidth
                  value={jobFilterForm.jobFilterForm.jobLevel}
                  onChange={(e) =>
                    jobFilterForm.updateJobLevel(e.target.value as string)
                  }
                >
                  {jobLevelList.map((jobLevel) => (
                    <MenuItem key={jobLevel.key} value={jobLevel.key}>
                      {jobLevel.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={3}>
              <TextField
                label="Kinh Nghiệm Làm Việc"
                type="number"
                variant="outlined"
                value={jobFilterForm.jobFilterForm.experience}
                onChange={(e) =>
                  jobFilterForm.updateExperience(Number(e.target.value))
                }
                fullWidth
              />
            </Grid>
            <Grid size={3}>
              <TextField
                fullWidth
                label="Thành Phố Làm Việc Mong Muốn"
                variant="outlined"
                value={jobFilterForm.jobFilterForm.workingLocation}
                onChange={(e) =>
                  jobFilterForm.updateWorkingLocation(e.target.value as string)
                }
              />
            </Grid>
          </Grid>
          <TagInput
            onTagChange={(tags) => jobFilterForm.updateTechnicalKnowledge(tags)}
            label="Kiến Thức Chuyên Môn"
          />
          <TagInput
            onTagChange={(tags) => jobFilterForm.updateSoftSkills(tags)}
            label="Kỹ Năng Mềm"
          />
          <TagInput
            onTagChange={(tags) => jobFilterForm.updateTools(tags)}
            label="Công Cụ Thành Thạo"
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => toggleDrawer(false)}
            endIcon={<Close />}
          >
            Từ Chối
          </Button>
          <Button
            onClick={() => console.log(jobFilterForm.jobFilterForm)}
            variant="contained"
            color="info"
            endIcon={<SendOutlined />}
          >
            Gửi
          </Button>
        </Stack>
      </Container>
    </Drawer>
  );
}
