import JobCardDetail from "@/components/cards/JobCardDetail";
import StyledPagination from "@/components/StyledPagination";
import { List, ListItem, Paper, Stack } from "@mui/material";

export default function MatchJobList() {
  return (
    <Stack>
      <List sx={{ maxHeight: "100%", overflowY: "auto" }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <ListItem sx={{ width: "100%" }} key={index}>
            <JobCardDetail />
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
