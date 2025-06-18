import { List, ListItem, Pagination, Stack } from "@mui/material";
import JobCardDetail from "../../../components/JobCardDetail";

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
      <Pagination count={10} sx={{ pb: 2 }} />
    </Stack>
  );
}
