import { headCase } from "@/utils";
import {
  Autocomplete,
  Box,
  Chip,
  Stack,
  TextField,
  type TextFieldProps,
  type TextFieldVariants,
} from "@mui/material";
import React from "react";

type TagInputProps = {
  variant?: TextFieldVariants;
} & Omit<TextFieldProps, "variant"> & {
    value?: string[];
    onTagChange?: (tags: string[]) => void;
    optionList?: string[];
  };

export default function TagInput({
  value,
  onTagChange,
  optionList,
  ...props
}: TagInputProps) {
  const [tags, setTags] = React.useState<string[]>(value || []);
  const handleDelete = (e: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== e));
    onTagChange?.(tags.filter((tag) => tag !== e));
  };

  // In some niche cases, the parent component will use useEffect to set the value prop.
  // Therefore, the value can not be updated affter that useEffect because useEffect
  // will not trigger the re-render on the parent component
  // => no re-render on the child component
  // => value won't be updated.
  // Solution: use useEffect in here to update the tags
  // React.useEffect(() => {
  //   setTags(value || []);
  // }, [value]);
  return (
    <Box>
      <Autocomplete
        fullWidth
        multiple
        options={optionList ?? []}
        freeSolo
        renderValue={() => null}
        onChange={(_, value) => {
          console.log("onChange is called");
          const latestValue = value.pop();
          if (latestValue === undefined) setTags([]);
          else {
            const dupValue = value.findIndex(
              (tag) => tag.toUpperCase() === latestValue.toUpperCase()
            );

            const formattedTagList = value.map((tag) => headCase(tag));

            if (dupValue == -1) {
              formattedTagList.push(headCase(latestValue));
            }
            setTags(formattedTagList);
            onTagChange?.(formattedTagList);
          }
        }}
        value={tags ?? []}
        renderInput={(params) => <TextField {...props} {...params} />}
      />
      {tags.length != 0 && (
        <Stack direction="row" gap={1} marginTop={2}>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} onDelete={() => handleDelete(tag)} />
          ))}
        </Stack>
      )}
    </Box>
  );
}
