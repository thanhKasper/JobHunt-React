import { Button, Card, CardActions, CardContent, Link as MuiLink, Stack, Typography } from "@mui/material";
import { Link } from "react-router";

export default function JobCard() {
  return (
    <Card elevation={3} sx={{ borderStyle: "solid", borderWitdth: 2, borderColor: "black"}}>
      <CardContent>
        <Stack direction={"row"} spacing={1}>
          <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
            Bộ Lọc:
          </Typography>
          <MuiLink to={"#"} component={Link}>Bộ lọc của công việc</MuiLink>
        </Stack>
        <Typography variant="h5" component="div">
          Tuyển lập trình viên ReactJS
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          Công Ty TNHH MTV ABC
        </Typography>
        <Stack>
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
