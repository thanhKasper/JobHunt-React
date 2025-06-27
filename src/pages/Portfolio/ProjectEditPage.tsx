import HeaderCard from "@/components/cards/HeaderCard";
import LongTextInput from "@/components/input/LongTextInput";
import TagInput from "@/components/input/TagInput";
import {
  CalendarToday as CalendarIcon,
  Code as CodeIcon,
  Edit as EditIcon,
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
import useProjectForm from "./ProjectEditPage.Hook";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { editProject } from "@/store/slices/projectSlice";

const ProjectEditPage = () => {
  const projectEditId = useParams().projectId;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const project = useAppSelector((state) =>
    state.projectState.projects.find((p) => p.projectId === projectEditId)
  );

  if (!projectEditId) {
    throw new Error("Project ID is required for editing");
  } else if (!project) {
    throw new Error(`Project with ID ${projectEditId} not found`);
  }
  const projectForm = useProjectForm({
    description: project.projectDescription,
    projectTitle: project.projectName,
    startDate: new Date(project.startDate),
    endDate: project.endDate ? new Date(project.endDate) : undefined,
    roles: project.roles || [],
    technologiesOrSkills: project.techOrSkills || [],
    features: project.features || [],
    projectLink: project.projectLink || "",
    demoLink: project.liveDemoLink || "",
  });

  const handleSubmit = async () => {
    try {
      await dispatch(
        editProject({ ...projectForm.toProjectDTO(projectEditId) })
      ).unwrap();
      navigate(`/portfolio/${projectEditId}`);
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box paddingY={4}>
        {/* Hero Section */}
        <HeaderCard elevation={6}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <EditIcon sx={{ fontSize: 32, mr: 2 }} />
            <Typography variant="h4" component="h1" fontWeight={700}>
              Chỉnh Sửa Dự Án
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 800 }}>
            Cập nhật thông tin dự án của bạn, điều chỉnh các chi tiết và nội
            dung để phản ánh chính xác nhất về dự án.
          </Typography>
        </HeaderCard>

        {/* Form Sections */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Stack direction="row" gap={3} justifyContent={"space-between"}>
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
                      value={projectForm.projectForm.projectTitle ?? ""}
                      onChange={(e) =>
                        projectForm.updateProjectTitle(e.target.value)
                      }
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
                      value={projectForm.projectForm.description ?? ""}
                      onChange={(e) =>
                        projectForm.updateDescription(e.target.value)
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
                  <Grid size={12}>
                    <DatePicker
                      label="Ngày Bắt Đầu"
                      sx={{ width: "100%" }}
                      value={
                        projectForm.projectForm.startDate
                          ? dayjs(projectForm.projectForm.startDate)
                          : null
                      }
                      onChange={(newValue) =>
                        projectForm.updateStartDate(
                          newValue?.toDate() || undefined
                        )
                      }
                    />
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <DatePicker
                        label="Ngày Kết Thúc"
                        sx={{ width: "100%" }}
                        value={
                          projectForm.projectForm.endDate
                            ? dayjs(projectForm.projectForm.endDate)
                            : null
                        }
                        onChange={(newValue) =>
                          projectForm.updateEndDate(
                            newValue?.toDate() || undefined
                          )
                        }
                      />
                      <FormHelperText>
                        Để trống nếu dự án chưa hoàn thành
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Stack>

          <Stack direction="row" gap={3} justifyContent={"space-between"}>
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
                  value={projectForm.projectForm.roles ?? []}
                  onTagChange={projectForm.updateRoles}
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
                  value={projectForm.projectForm.technologiesOrSkills ?? []}
                  onTagChange={projectForm.updateTechnologiesOrSkills}
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
                placeholder="Nhập các điểm nổi bật của dự án..."
                textList={projectForm.projectForm.features ?? []}
                onListChange={(newFeatures) =>
                  projectForm.updateFeatures(newFeatures)
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
                    value={projectForm.projectForm.projectLink ?? ""}
                    onChange={(e) =>
                      projectForm.updateProjectLink(e.target.value)
                    }
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
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Live Demo Link"
                    type="url"
                    placeholder="https://demo.example.com"
                    value={projectForm.projectForm.demoLink ?? ""}
                    onChange={(e) => projectForm.updateDemoLink(e.target.value)}
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
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <Box
            sx={{ display: "flex", gap: 2, justifyContent: "center", pt: 4 }}
          >
            <Button
              variant="outlined"
              size="large"
              sx={{ px: 4, py: 1.5 }}
              href={`/portfolio/${project.projectId}`}
            >
              Hủy Bỏ
            </Button>
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
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                },
              }}
            >
              Lưu Thay Đổi
            </Button>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default ProjectEditPage;
