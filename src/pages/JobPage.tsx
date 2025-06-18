import { Grid, Pagination, Stack } from "@mui/material";
import JobCard from "../components/JobCard";
import JobSearchAndFilter from "../components/JobSearchAndFilter";
import Subtitle from "../components/Subtitle";
import Title from "../components/Title";

const JobPage = () => {
  return (
    <Stack>
      <Title title="Công Việc Phù Hợp" />
      <Subtitle title="Danh sách các công việc phù hợp với kỹ năng và sở thích của bạn." />
      <JobSearchAndFilter />
      <div className="flex flex-col items-center">
        <Grid container spacing={2}>
          {Array.from({ length: 20 }).map((_, index) => (
            <Grid size={{ lg: 4, md: 6, xs: 12 }} key={index}>
              <JobCard />
            </Grid>
          ))}
        </Grid>
        <Pagination count={10} sx={{ marginY: 2 }} />
      </div>
    </Stack>
  );
};

export default JobPage;
