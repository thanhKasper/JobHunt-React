import { Grid, Pagination, Stack, Typography } from "@mui/material";
import JobCard from "../components/JobCard";
import JobSearchAndFilter from "../components/JobSearchAndFilter";

const JobPage = () => {
  return (
    <Stack>
      <Typography variant="h5" sx={{ marginY: 2 }}>
        Danh sách công việc phù hợp
      </Typography>
      <JobSearchAndFilter />
      <div className="flex flex-col items-center">
        <Grid container spacing={2}>
          {Array.from({ length: 20 }).map((_, index) => (
            <Grid size={3} key={index}>
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
