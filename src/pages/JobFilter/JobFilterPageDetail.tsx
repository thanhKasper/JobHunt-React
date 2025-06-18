import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import JobFilter from "./components/JobFilter";
import MatchJobList from "./components/MatchJobList";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function JobFilterPageDetail() {
  const jobFilterId = useParams().jobFilterId;
  console.log("Chi tiết bộ lọc công việc: " + jobFilterId);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="h-[calc(100vh-48px)]">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Thông Tin Chi Tiết" {...a11yProps(0)} />
          <Tab label="Danh Sách Công Việc Phù Hợp" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <JobFilter />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MatchJobList />
      </CustomTabPanel>
    </div>
  );
}
