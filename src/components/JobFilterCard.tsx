import { Delete } from "@mui/icons-material";
import { Button, Card, Link as MuiLink, Stack, Typography } from "@mui/material";
import { Link } from "react-router";

const JobFilterCard = () => {
  return (
    <Card sx={{ padding: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="start">
        <Stack flexBasis="70%">
          <MuiLink component={Link} to="jkj1j-1877-33" sx={{ cursor: "pointer" }} variant="h6">
            Lọc Công Việc
          </MuiLink>
          <Typography variant="body2">Nghề Nghiệp Lọc</Typography>
          <Typography variant="body2">Ngày Tạo Bộ Lọc</Typography>
        </Stack>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            console.log("Delete Button Cliked");
          }}
          startIcon={<Delete />}
          size="small"
          variant="outlined"
          color="error"
        >
          XÓA
        </Button>
      </Stack>
    </Card>
  );
};

export default JobFilterCard;
