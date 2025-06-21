import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getJobsWithSearchAndFilter,
  updateFilterIdList,
  updateSearchKeyword,
} from "@/store/jobSlice";
import { SearchOutlined } from "@mui/icons-material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Autocomplete,
  Checkbox,
  InputBase,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function JobSearchAndFilter() {
  const [focusStyle, setFocusStyle] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const jobFilters = useAppSelector((state) => state.jobFilterState.jobFilters);
  const searchKeyword = useAppSelector((state) => state.jobState.searchKeyword);

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const searchValue = (event.target as HTMLInputElement).value.trim();
      if (searchValue) {
        dispatch(updateSearchKeyword(searchValue));
        dispatch(
          getJobsWithSearchAndFilter({
            keyword: searchValue,
            filterIdList: [],
            position: 1,
          })
        );
      }
    }
  };

  return (
    <>
      <Stack
        direction="row"
        border={1}
        borderColor={focusStyle ? "primary.dark" : "grey.400"}
        bgcolor="common.white"
        borderRadius={10}
        sx={{
          mb: 1,
          paddingX: 1,
          paddingY: 0.5,
          transition: "border-color 0.2s ease",
        }}
      >
        <InputBase
          fullWidth
          startAdornment={<SearchOutlined color="disabled" sx={{ mr: 1 }} />}
          onKeyDown={handleSearch}
          placeholder="Tìm kiếm công việc..."
          onFocus={() => setFocusStyle(true)}
          onBlur={() => setFocusStyle(false)}
        />
      </Stack>
      <Typography variant="subtitle2">Lọc Thông Tin Công Việc</Typography>
      <Autocomplete
        multiple
        size="small"
        sx={{
          mt: 1,
          "& .MuiAutocomplete-tag": {
            bgcolor: "secondary.light",
            color: "secondary.contrastText",
          },
        }}
        options={jobFilters}
        disableCloseOnSelect
        onChange={(_, chosenList) => {
          dispatch(
            updateFilterIdList(
              chosenList.map((jobFilter) => jobFilter.jobFilterId)
            )
          );
          dispatch(
            getJobsWithSearchAndFilter({
              keyword: searchKeyword,
              filterIdList: chosenList.map(
                (jobFilter) => jobFilter.jobFilterId
              ),
              position: 1,
            })
          );
        }}
        getOptionLabel={(option) => option.jobFilterName}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.jobFilterName}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Yêu Cầu Tương Thích Đã Tạo"
            sx={{ borderRadius: 10 }}
          />
        )}
      />
    </>
  );
}
