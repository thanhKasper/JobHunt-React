import { Typography } from "@mui/material";

export default function Subtitle({ title }: { title: string }) {
  return (
    <Typography variant="body1" color="grey.600" mb={2}>
      {title}
    </Typography>
  );
}