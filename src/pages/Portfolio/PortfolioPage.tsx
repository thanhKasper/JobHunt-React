import ProjectCard from "@/components/ProjectCard";
import Subtitle from "@/components/Subtitle";
import Title from "@/components/Title";
import { Grid, Stack } from "@mui/material";

export default function PortfolioPage() {
  return (
    <Stack>
      <Title title="Danh Sách Các Dự Án" />
      <Subtitle title="Các dự án của tôi" />
      <Grid container spacing={2}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <Grid size={4} key={idx}>
            <ProjectCard />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
