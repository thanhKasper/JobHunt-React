import HeaderCard from "@/components/cards/HeaderCard";
import TagInput from "@/components/input/TagInput";
import jobLevelList from "@apis/BusinessData/JobLevel";
import occupationList from "@apis/BusinessData/OccupationList";
import {
  AccessTime,
  Build,
  Close,
  Code,
  FilterList,
  Language,
  LocationOn,
  Psychology,
  School,
  Send,
  StarBorder,
  Work,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ListFilterPlus } from "lucide-react";
import useCreateJobFilter from "./CreateJobFilterPage.Hook";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createNewJobFilter } from "@/store/slices/jobFilterCreateSlice";

export default function CreateJobFilterPage() {
  const jobFilterCreationForm = useCreateJobFilter();
  const dispatch = useAppDispatch();
  const jobFilterCreationResult = useAppSelector(
    (state) => state.jobFilterCreationState
  );

  console.log("Job Filter Creation Result:", jobFilterCreationResult);

  return (
    <Box paddingY={4}>
      {/* Sticky Header */}
      <HeaderCard elevation={6}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            {/* <FilterList sx={{ fontSize: 28 }} /> */}
            <Box display="flex" gap={2} alignItems={"center"} mb={1}>
              <ListFilterPlus size={32} />
              <Typography variant="h4" fontWeight={700}>
                Tạo Bộ Lọc Công Việc
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Lọc công việc dựa trên những gì bạn mong muốn
            </Typography>
          </Box>
        </Stack>
      </HeaderCard>

      <Stack spacing={3} paddingY={4}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            {/* Filter Title */}
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <StarBorder color="primary" />
              Thông Tin Cơ Bản
            </Typography>
            <TextField
              fullWidth
              label="Tên Bộ Lọc"
              variant="outlined"
              value={jobFilterCreationForm.filterTitle}
              onChange={(e) =>
                jobFilterCreationForm.updateFilterTitle(e.target.value)
              }
              placeholder="Ví dụ: Công việc IT tại TP.HCM"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FilterList color="secondary" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Main Fields Grid */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Work color="primary" />
              Chi Tiết Công Việc
            </Typography>
            <Grid container spacing={3}>
              <Grid
                size={{
                  xs: 12,
                  md: 6,
                  lg: 3,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel>Ngành Nghề</InputLabel>
                  <Select
                    startAdornment={
                      <InputAdornment position="start">
                        <Work color="secondary" />
                      </InputAdornment>
                    }
                    value={jobFilterCreationForm.ocupation}
                    onChange={(e) =>
                      jobFilterCreationForm.updateOccupation(e.target.value)
                    }
                    label="Ngành Nghề"
                  >
                    {occupationList.map((occupation) => (
                      <MenuItem key={occupation.key} value={occupation.key}>
                        {occupation.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                  lg: 3,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel>Cấp Độ Chuyên Môn</InputLabel>
                  <Select
                    value={jobFilterCreationForm.jobLevel}
                    onChange={(e) =>
                      jobFilterCreationForm.updateJobLevel(e.target.value)
                    }
                    startAdornment={
                      <InputAdornment position="start">
                        <School color="secondary" />
                      </InputAdornment>
                    }
                    label="Cấp Độ Chuyên Môn"
                  >
                    {jobLevelList.map((level) => (
                      <MenuItem key={level.key} value={level.key}>
                        {level.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                  lg: 3,
                }}
              >
                <TextField
                  fullWidth
                  label="Kinh Nghiệm Làm Việc (năm)"
                  type="number"
                  variant="outlined"
                  value={jobFilterCreationForm.experience}
                  onChange={(e) =>
                    jobFilterCreationForm.updateExperience(
                      parseInt(e.target.value, 10) || 0
                    )
                  }
                  placeholder="Ví dụ: 2"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccessTime color="secondary" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                  lg: 3,
                }}
              >
                <TextField
                  fullWidth
                  label="Thành Phố Làm Việc"
                  variant="outlined"
                  value={jobFilterCreationForm.workingLocation}
                  onChange={(e) =>
                    jobFilterCreationForm.updateWorkingLocation(e.target.value)
                  }
                  placeholder="Ví dụ: TP. Hồ Chí Minh"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn color="secondary" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Code color="secondary" />
              Kỹ Năng & Công Cụ
            </Typography>
            <Stack spacing={3}>
              <TagInput
                value={jobFilterCreationForm.technicalKnowledge}
                onTagChange={jobFilterCreationForm.updateTechnicalKnowledge}
                label="Kiến Thức Chuyên Môn"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Code color="secondary" />
                      </InputAdornment>
                    ),
                  },
                }}
                placeholder="Các kiến thức chuyên môn cần thiết cho công việc"
                color="primary"
              />

              <TagInput
                value={jobFilterCreationForm.softSkills}
                onTagChange={jobFilterCreationForm.updateSoftSkills}
                label="Kỹ Năng Mềm"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Psychology color="secondary" />
                      </InputAdornment>
                    ),
                  },
                }}
                placeholder="Ví dụ: Giao tiếp, Làm việc nhóm, Lãnh đạo..."
                color="secondary"
              />

              <TagInput
                value={jobFilterCreationForm.tools}
                onTagChange={jobFilterCreationForm.updateTools}
                label="Công Cụ Thành Thạo"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Build color="success" />
                      </InputAdornment>
                    ),
                  },
                }}
                placeholder="Ví dụ: Excel, Power Bi, Autodesk, Git..."
                color="success"
              />

              <TagInput
                value={jobFilterCreationForm.languages}
                onTagChange={jobFilterCreationForm.updateLangeuages}
                label="Ngôn Ngữ Thành Thạo"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Language color="success" />
                      </InputAdornment>
                    ),
                  },
                }}
                placeholder="Ví dụ: Tiếng Việt, Tiếng Anh, Tiếng Nhật..."
                color="success"
              />
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      {/* Sticky Footer */}

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button
          LinkComponent={"a"}
          href="/job-filters"
          variant="outlined"
          size="large"
          startIcon={<Close />}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 600,
            borderWidth: 2,
            "&:hover": {
              borderWidth: 2,
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            },
          }}
        >
          Hủy
        </Button>
        <Button
          onClick={() => {
            dispatch(
              createNewJobFilter(jobFilterCreationForm.toJobFilterDTO())
            );
          }}
          variant="contained"
          size="large"
          startIcon={<Send />}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 600,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            boxShadow: "0 4px 16px rgba(102, 126, 234, 0.4)",
            "&:hover": {
              background: "linear-gradient(135deg, #5a6fd8 0%, #684d9c 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 24px rgba(102, 126, 234, 0.6)",
            },
          }}
        >
          Tạo Bộ Lọc
        </Button>
      </Stack>
    </Box>
  );
}
