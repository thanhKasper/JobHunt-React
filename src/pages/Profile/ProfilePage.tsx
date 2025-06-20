import educationLevels from "@/apis/BusinessData/EducationLevel";
import majors from "@/apis/BusinessData/Major";
import EditIcon from "@mui/icons-material/Edit";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AwardInput from "./components/AwardInput";
import HeaderCard from "@/components/cards/HeaderCard";

export default function ProfilePage() {
  return (
    <Box paddingY={4}>
      {/* <Title title="Thông Tin Ứng Viên" /> */}

      {/* Header Section with Avatar */}
      <HeaderCard elevation={6}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: "rgba(255,255,255,0.2)",
                fontSize: "2rem",
              }}
            >
              <PersonIcon fontSize="large" />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" fontWeight={600} gutterBottom>
                Hồ Sơ Ứng Viên
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Điền thông tin chi tiết để tạo hồ sơ chuyên nghiệp
              </Typography>
            </Box>
            <IconButton
              sx={{
                color: "white",
                bgcolor: "rgba(255,255,255,0.2)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
              }}
            >
              <EditIcon />
            </IconButton>
          </Box>
        </CardContent>
      </HeaderCard>

      <Grid container spacing={3}>
        {/* Personal Information Section */}
        <Grid size={12}>
          <Card elevation={2} sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <PersonIcon sx={{ mr: 2, color: "primary.main" }} />
                <Typography variant="h6" fontWeight={600}>
                  Thông Tin Cá Nhân
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Họ Tên Ứng Viên"
                    id="fullName"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Email Làm Việc"
                    id="email"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Ngày Sinh"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          sx: {
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Số Điện Thoại"
                    id="phone"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Địa Chỉ"
                    id="address"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Education Section */}
        <Grid size={12}>
          <Card elevation={2} sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <SchoolIcon sx={{ mr: 2, color: "success.main" }} />
                <Typography variant="h6" fontWeight={600}>
                  Thông Tin Học Vấn
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Trường Đại Học"
                    id="university"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  >
                    <InputLabel id="educationLevel">Học vấn</InputLabel>
                    <Select
                      labelId="educationLevel"
                      id="educationLevel"
                      label="Học vấn"
                    >
                      {educationLevels.map((level) => (
                        <MenuItem key={level.key} value={level.key}>
                          {level.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  >
                    <InputLabel id="major">Chuyên Ngành</InputLabel>
                    <Select labelId="major" id="major" label="Chuyên Ngành">
                      {majors.map((major) => (
                        <MenuItem key={major.key} value={major.key}>
                          {major.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* About Me Section */}
        <Grid size={6}>
          <Card elevation={2} sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <WorkIcon sx={{ mr: 2, color: "info.main" }} />
                <Typography variant="h6" fontWeight={600}>
                  Giới Thiệu Bản Thân
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <TextField
                fullWidth
                multiline
                minRows={4}
                label="Về tôi"
                id="about"
                placeholder="Hãy chia sẻ về bản thân, kinh nghiệm, và mục tiêu nghề nghiệp của bạn..."
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Awards Section */}
        <Grid size={6}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <EmojiEventsIcon sx={{ mr: 2, color: "warning.main" }} />
                <Typography variant="h6" fontWeight={600}>
                  Các Giải Thưởng & Thành Tích
                </Typography>
                <Chip
                  label="Tùy chọn"
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ ml: 2 }}
                />
              </Box>
              <Divider sx={{ mb: 3 }} />

              <AwardInput />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
        <Paper
          elevation={1}
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: "grey.50",
            border: 1,
            borderColor: "grey.200",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            💡 Mẹo: Hồ sơ chi tiết sẽ giúp bạn có cơ hội được tuyển dụng cao hơn
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
