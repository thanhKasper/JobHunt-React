import {
  Autocomplete,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import useProjectForm from "./ProjectEditPage.Hook";
import dayjs from "dayjs";

const ProjectEditPage: React.FC = () => {
  const projectForm = useProjectForm();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" gutterBottom>
            Edit Project
          </Typography>

          <Stack spacing={3}>
            {/* Project Title */}
            <TextField
              required
              label="Project Title"
              fullWidth
              value={projectForm.projectForm.projectTitle ?? ""}
              onChange={(e) => projectForm.updateProjectTitle(e.target.value)}
            />

            {/* Start / End Dates */}
            <Stack direction="row" spacing={2}>
              <DatePicker
                label="Start Date"
                value={
                  projectForm.projectForm.startDate
                    ? dayjs(projectForm.projectForm.startDate)
                    : undefined
                }
                onChange={(newValue) =>
                  projectForm.updateStartDate(newValue?.toDate() || undefined)
                }
              />
              <DatePicker
                label="End Date"
                value={
                  projectForm.projectForm.endDate
                    ? dayjs(projectForm.projectForm.endDate)
                    : undefined
                }
                onChange={(newValue) =>
                  projectForm.updateEndDate(newValue?.toDate() || undefined)
                }
              />
            </Stack>

            {/* Description */}
            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={projectForm.projectForm.description ?? ""}
              onChange={(e) => projectForm.updateDescription(e.target.value)}
            />

            {/* Roles */}
            <Autocomplete
              multiple
              freeSolo
              options={[]}
              value={projectForm.projectForm.roles ?? []}
              onChange={(_, newValue) => projectForm.updateRoles(newValue)}
              renderInput={(params) => <TextField {...params} label="Roles" />}
            />

            {/* Technologies */}
            <Autocomplete
              multiple
              freeSolo
              options={[]}
              value={projectForm.projectForm.technologiesOrSkills ?? []}
              onChange={(_, newValue) =>
                projectForm.updateTechnologiesOrSkills(newValue)
              }
              renderInput={(params) => (
                <TextField {...params} label="Technologies / Skills" />
              )}
            />

            {/* Features */}
            <Autocomplete
              multiple
              freeSolo
              options={[]}
              value={projectForm.projectForm.features ?? []}
              onChange={(_, newValue) => projectForm.updateFeatures(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Key Features" />
              )}
            />

            {/* Project Link */}
            <TextField
              label="Project Link"
              fullWidth
              value={projectForm.projectForm.projectLink ?? ""}
              onChange={(e) => projectForm.updateProjectLink(e.target.value)}
            />

            {/* Action Buttons */}
            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
              <Button variant="outlined" color="inherit">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => console.log(projectForm.projectForm)}
              >
                Save Changes
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
};

export default ProjectEditPage;
