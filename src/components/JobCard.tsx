import {
  Button,
  Card,
  CardActions,
  CardContent,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router";

export default function JobCard() {
  return (
    <Card
      variant="outlined"
      sx={{ p: 2 }}
    >
      <CardContent>
        <Stack direction={"row"} spacing={1}>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Bộ Lọc:
          </Typography>
          <MuiLink to={"#"} component={Link}>
            Bộ lọc của công việc
          </MuiLink>
        </Stack>
        <Typography variant="h6" component="div">
          Tuyển lập trình viên ReactJS
        </Typography>
        <MuiLink component={Link} to="#">
          Công Ty TNHH MTV ABC
        </MuiLink>
        <Stack mt={2}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Ngày mở đơn: 12/03/2025
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Địa điểm làm việc: Hà Nội
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small">Thông Tin Chi Tiết</Button>
      </CardActions>
    </Card>
  );
}
