import { Button, Grid, Stack } from "@mui/material";
import { Outlet, useParams } from "react-router";
import JobFilterCard from "../../components/JobFilterCard";
import Subtitle from "../../components/Subtitle";
import Title from "../../components/Title";
import CreateJobFilterPage from "./CreateJobFilterPage";
import React from "react";

export default function JobFilterPage() {
  const filterId = useParams().jobFilterId;
  const [open, setOpen] = React.useState(false);

  console.log(
    "this page has been rendered with filterId: " + (filterId ?? "null")
  );
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent="space-between"
        alignItems="center"
        marginBottom={1}
      >
        <Title title="Bộ Lọc Công Việc" />
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          size="small"
          sx={{ height: "fit-content" }}
        >
          Thêm Bộ Lọc
        </Button>
      </Stack>
      <Subtitle
        title="Tại đây, bạn có thể quản lý các bộ lọc công việc của mình. Bộ lọc này sẽ
        giúp bạn tìm kiếm công việc phù hợp với sở thích và kỹ năng của bạn."
      />
      <Grid container spacing={2} marginY={2}>
        {/* Map through your filter options here */}
        {Array.from({ length: 5 }).map((_, index) => (
          <Grid size={4} key={index}>
            <JobFilterCard />
          </Grid>
        ))}
      </Grid>

      <Outlet />
      <CreateJobFilterPage open={open} toggleDrawer={setOpen} />
    </>
  );
}
