import { Grid, Typography } from "@mui/material";
import type { ReactNode } from "react";

export default function HorizontalDisplay({
  label,
  value,
}: {
  label: string;
  value: string | ReactNode;
}) {
  return (
    <>
      <Grid size={2} my="auto">
        <Typography>{label}</Typography>
      </Grid>
      <Grid size={10}>{value}</Grid>
    </>
  );
}
