import HeaderCard from "@/components/cards/HeaderCard";
import LongTextInput from "@/components/input/LongTextInput";
import TagInput from "@/components/input/TagInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createNewProject,
  setProjectFormToNormal,
  updateField,
} from "@/store/slices/projectNewSlice";
import {
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  Code as CodeIcon,
  GitHub as GitHubIcon,
  Link as LinkIcon,
  Person as PersonIcon,
  PlayArrow as PlayIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router";

const ProjectNewPage = () => {
  const newProjectState = useAppSelector((state) => state.projectCreationState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  console.log(newProjectState);
  const handleSubmit = () => {
    dispatch(createNewProject(newProjectState.newProject)).then((arg) => {
      if (arg.meta.requestStatus == "fulfilled") {
        navigate("/portfolio");
        // console.log("Thong tin hop le, tao form");
      }
    });
  };

  const handleCancel = () => {
    dispatch(setProjectFormToNormal());
  };

  return (
    <Box paddingY={4}>
      {/* Hero Section */}
      <HeaderCard elevation={6}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <AddIcon sx={{ fontSize: 32, mr: 2 }} />
          <Typography variant="h4" component="h1" fontWeight={700}>
            Tạo Dự Án Mới
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 800 }}>
          Tạo và quản lý dự án của bạn, thể hiện kỹ năng và kinh nghiệm làm việc
          của tôi.
        </Typography>
      </HeaderCard>

      {/* Form Sections */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={3}
          justifyContent={"space-between"}
        >
          {/* Basic Information */}
          <Card sx={{ flexShrink: 0, flexBasis: "65%" }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <PersonIcon sx={{ color: "primary.main", mr: 1 }} />
                <Typography variant="h5" fontWeight="600">
                  Thông Tin Cơ Bản
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Tên Dự Án"
                    required
                    placeholder="Nhập tên dự án..."
                    variant="outlined"
                    value={newProjectState.newProject.projectName ?? ""}
                    onChange={(e) =>
                      dispatch(
                        updateField({
                          field: "projectName",
                          value: e.target.value,
                        })
                      )
                    }
                    error={!!newProjectState.errors.projectName}
                    helperText={newProjectState.errors.projectName}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Mô Tả Dự Án"
                    required
                    multiline
                    rows={4}
                    placeholder="Mô tả chi tiết về dự án của bạn..."
                    variant="outlined"
                    value={newProjectState.newProject.projectDescription}
                    error={!!newProjectState.errors.projectDescription}
                    helperText={newProjectState.errors.projectDescription}
                    onChange={(e) =>
                      dispatch(
                        updateField({
                          field: "projectDescription",
                          value: e.target.value,
                        })
                      )
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card sx={{ width: "100%" }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <CalendarIcon sx={{ color: "primary.main", mr: 1 }} />
                <Typography variant="h5" fontWeight="600">
                  Thời Gian Thực Hiện
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <DatePicker
                        label="Ngày Bắt Đầu"
                        sx={{ width: "100%" }}
                        views={["month", "year"]}
                        format="MM / YYYY"
                        value={
                          dayjs(newProjectState.newProject.startDate).isValid()
                            ? dayjs(newProjectState.newProject.startDate)
                            : null
                        }
                        maxDate={dayjs(Date.now())}
                        onChange={(date) => {
                          dispatch(
                            updateField({
                              field: "startDate",
                              value: date ? date.date(15).toDate() : null,
                            })
                          );
                        }}
                      />
                      <FormHelperText
                        error={!!newProjectState.errors.startDate}
                      >
                        {newProjectState.errors.startDate}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <DatePicker
                        label="Ngày Kết Thúc"
                        views={["month", "year"]}
                        sx={{ width: "100%" }}
                        format="MM / YYYY"
                        value={
                          dayjs(newProjectState.newProject.endDate).isValid()
                            ? dayjs(newProjectState.newProject.endDate)
                            : null
                        }
                        maxDate={dayjs(Date.now())}
                        onChange={(date) =>
                          dispatch(
                            updateField({
                              field: "endDate",
                              value: date ? date.date(15).toDate() : null,
                            })
                          )
                        }
                      />
                      <FormHelperText error={!!newProjectState.errors.endDate}>
                        {newProjectState.errors.endDate ??
                          "Để trống nếu dự án chưa hoàn thành"}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </LocalizationProvider>
              </Grid>
            </CardContent>
          </Card>
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={3}
          justifyContent={"space-between"}
        >
          {/* Roles */}
          <Card sx={{ width: "100%" }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <PersonIcon sx={{ color: "secondary.main", mr: 1 }} />
                <Typography variant="h5" fontWeight="600">
                  Vai Trò Của Tôi
                </Typography>
              </Box>
              <TagInput
                label="Vai Trò"
                placeholder="Gõ một vai trò rồi nhấn enter"
                value={newProjectState.newProject.roles}
                onTagChange={(tags) =>
                  dispatch(
                    updateField({
                      field: "roles",
                      value: tags,
                    })
                  )
                }
                error={!!newProjectState.errors.roles}
                helperText={
                  newProjectState.errors.roles ??
                  "Nếu đảm nhận nhiều vai trò, gõ một vai trò rồi ấn 'Enter'"
                }
              />
            </CardContent>
          </Card>

          {/* Technologies */}
          <Card sx={{ width: "100%" }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <CodeIcon sx={{ color: "#10b981", mr: 1 }} />
                <Typography variant="h5" fontWeight="600">
                  Công Nghệ / Kỹ Thuật Sử Dụng
                </Typography>
              </Box>
              <TagInput
                label="Công Nghệ/Kỹ Thuật"
                value={newProjectState.newProject.techOrSkills}
                helperText="Nếu sử dụng nhiều công nghệ, gõ từ khóa và ấn 'Enter'"
                onTagChange={(tags) =>
                  dispatch(
                    updateField({
                      field: "techOrSkills",
                      value: tags,
                    })
                  )
                }
              />
            </CardContent>
          </Card>
        </Stack>

        {/* Features */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <StarIcon sx={{ color: "#f59e0b", mr: 1 }} />
              <Typography variant="h5" fontWeight="600">
                Đặc Điểm Nổi Bật
              </Typography>
            </Box>
            <LongTextInput
              label="Điểm Nổi Bật"
              placeholder=""
              textList={newProjectState.newProject.features}
              onListChange={(features) =>
                dispatch(
                  updateField({
                    field: "features",
                    value: features,
                  })
                )
              }
            />
          </CardContent>
        </Card>

        {/* Links */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <LinkIcon sx={{ color: "primary.main", mr: 1 }} />
              <Typography variant="h5" fontWeight="600">
                Liên Kết Dự Án
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Link Dự Án (GitHub, etc.)"
                  type="url"
                  placeholder="https://github.com/..."
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <GitHubIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                  variant="outlined"
                  value={newProjectState.newProject.projectLink || null}
                  onChange={(e) =>
                    dispatch(
                      updateField({
                        field: "projectLink",
                        value: e.target.value,
                      })
                    )
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Live Demo Link"
                  type="url"
                  placeholder="https://demo.example.com"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PlayIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                  variant="outlined"
                  value={newProjectState.newProject.liveDemoLink || null}
                  onChange={(e) =>
                    dispatch(
                      updateField({
                        field: "liveDemoLink",
                        value: e.target.value,
                      })
                    )
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", pt: 4 }}>
          <Link to={"/portfolio"}>
            <Button
              onClick={handleCancel}
              variant="outlined"
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              Trở Lại
            </Button>
          </Link>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            sx={{
              px: 4,
              py: 1.5,
              background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              boxShadow: "0 4px 15px 0 rgba(59, 130, 246, 0.35)",
              "&:hover": {
                background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              },
            }}
          >
            Tạo Dự Án
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectNewPage;
