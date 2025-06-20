import { SearchOutlined } from "@mui/icons-material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Autocomplete,
  Checkbox,
  InputBase,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React from "react";

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
];

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function JobSearchAndFilter() {
  const [focusStyle, setFocusStyle] = React.useState<boolean>(false);
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
          placeholder="Tìm kiếm công việc..."
          onFocus={() => setFocusStyle(true)}
          onBlur={() => setFocusStyle(false)}
        />
      </Stack>
      <Typography variant="subtitle2">Lọc Thông Tin Công Việc</Typography>
      <Autocomplete
        multiple
        // onChange={(e, value) => {
        //   console.log("Input changed:", value, e);
        // }}
        size="small"
        sx={{
          mb: 4,
          mt: 1,
          "& .MuiAutocomplete-tag": {
            bgcolor: "secondary.light",
            color: "secondary.contrastText",
          },
        }}
        options={top100Films}
        disableCloseOnSelect
        getOptionLabel={(option) => option.title}
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
              {option.title}
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
