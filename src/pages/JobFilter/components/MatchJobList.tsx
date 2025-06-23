import JobCardDetail from "@/components/cards/JobCardDetail";
import StyledPagination from "@/components/StyledPagination";
import { useAppSelector } from "@/store/hooks";
import { List, ListItem, Paper, Stack } from "@mui/material";

export default function MatchJobList() {
  const jobs = useAppSelector(
    (state) => state.jobFilterDetailState.jobsFromFilter
  );
  return (
    <Stack>
      <List sx={{ maxHeight: "100%", overflowY: "auto" }}>
        {jobs.map((job) => (
          <ListItem sx={{ width: "100%" }} key={job.jobId}>
            <JobCardDetail job={job} />
          </ListItem>
        ))}
      </List>
      {/* Pagination */}
      <Stack direction="row" justifyContent="center" mt={4}>
        <Paper
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <StyledPagination
            count={10}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Paper>
      </Stack>
    </Stack>
  );
}
