import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import React from "react";

const ProjectDetailPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Typography variant="h4">AI Resume Analyzer</Typography>
          <Stack direction="row" spacing={1}>
            <IconButton LinkComponent="a" href="/portfolio/jkdf-17wjgj-178saasb-16782/edit" color="primary" aria-label="edit">
              <Edit />
            </IconButton>
            <IconButton color="error" aria-label="delete">
              <Delete />
            </IconButton>
          </Stack>
        </Box>

        {/* Date Range */}
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Jan 2023 – May 2023
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Description */}
        <Typography variant="h6" gutterBottom>
          Description
        </Typography>
        <Typography variant="body1" gutterBottom>
          This project analyzes resumes using NLP techniques to automatically
          extract relevant skills and match them to job descriptions.
        </Typography>

        {/* Roles */}
        <Typography variant="h6" gutterBottom>
          Roles
        </Typography>
        <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
          <Chip label="Backend Developer" color="primary" variant="outlined" />
          <Chip label="DevOps Engineer" color="primary" variant="outlined" />
        </Stack>

        {/* Technologies */}
        <Typography variant="h6" gutterBottom>
          Technologies / Skills
        </Typography>
        <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
          <Chip label="Node.js" color="secondary" />
          <Chip label="MongoDB" color="secondary" />
          <Chip label="Docker" color="secondary" />
          <Chip label="Natural Language Processing" color="secondary" />
        </Stack>

        {/* Features */}
        <Typography variant="h6" gutterBottom>
          Key Features
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li className="list-disc">Resume keyword extraction</li>
          <li className="list-disc">Job-resume matching score</li>
          <li className="list-disc">Admin dashboard for analytics</li>
          <li className="list-disc">PDF parsing and skill tagging</li>
        </Box>

        {/* Project Link */}
        <Button
          variant="contained"
          color="primary"
          href="https://github.com/example/resume-analyzer"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Project on GitHub
        </Button>
      </Paper>
    </Container>
  );
};

export default ProjectDetailPage;
