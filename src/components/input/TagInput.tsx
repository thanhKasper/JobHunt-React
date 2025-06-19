import {
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
  };

export default function TagInput({
  value,
  onTagChange,
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
  React.useEffect(() => {
    setTags(value || []);
  }, [value]);

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentValue = (e.target as HTMLInputElement).value.trim();
    if (
      e.key === "Enter" &&
      currentValue !== "" &&
      !tags.map((tag) => tag.toUpperCase()).includes(currentValue.toUpperCase())
    ) {
      let updatedTags: string[] = [];
      setTags((prevTags) => {
        updatedTags = [
          ...prevTags,
          currentValue
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        ];
        return updatedTags;
      });
      onTagChange?.(updatedTags);
      (e.target as HTMLInputElement).value = "";
    } else if (e.key === "Enter") {
      (e.target as HTMLInputElement).value = ""; // Clear the input field
    }
  };
  return (
    <Box>
      <TextField
        fullWidth
        {...props}
        onKeyDown={handleEnter}
        helperText="Gõ Từ Khóa Cần Lọc Rồi Nhấn Enter"
      />
      {tags.length != 0 && (
        <Stack direction="row" gap={1}>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} onDelete={() => handleDelete(tag)} />
          ))}
        </Stack>
      )}
    </Box>
  );
}
