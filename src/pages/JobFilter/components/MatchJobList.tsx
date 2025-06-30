import JobCardDetail from "@/components/cards/JobCardDetail";
import StyledPagination from "@/components/StyledPagination";
import { useAppSelector } from "@/store/hooks";
import { SearchOff } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  Paper,
  Stack,
  Typography
} from "@mui/material";

export default function MatchJobList() {
  const jobs = useAppSelector(
    (state) => state.jobFilterDetailState.jobsFromFilter
  );
  return (
    <Stack>
      {jobs != null && jobs.length > 0 ? (
        <>
          <List sx={{ maxHeight: "100%", overflowY: "auto" }}>
            {jobs.map((job) => (
              <ListItem sx={{ width: "100%" }} key={job.jobId}>
                <JobCardDetail job={job} />
              </ListItem>
            ))}
          </List>

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
        </>
      ) : (
        <EmptyJobsDisplay />
      )}
    </Stack>
  );
}

const EmptyJobsDisplay = () => (
  <Box textAlign="center">
    <Paper
      elevation={0}
      sx={{
        p: 6,
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          bgcolor: "rgba(59, 130, 246, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: 3,
        }}
      >
        <SearchOff
          sx={{
            fontSize: 40,
            color: "rgba(59, 130, 246, 0.6)",
          }}
        />
      </Box>

      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontWeight: 600,
          color: "text.primary",
          mb: 2,
        }}
      >
        No Jobs Found
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          mb: 4,
          lineHeight: 1.6,
        }}
      >
        We couldn't find any jobs matching your current criteria. Try adjusting
        your filters or check back later for new opportunities.
      </Typography>
    </Paper>
  </Box>
);
