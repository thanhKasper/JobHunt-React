import { Grid } from "@mui/material";
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
      <Grid size={2}>{label}</Grid>
      <Grid size={10}>{value}</Grid>
    </>
  );
}
