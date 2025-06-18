import { ArrowForward } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
  Link as MuiLink,
  Box,
} from "@mui/material";
import { Link } from "react-router";

const JobCardDetail = () => {
  return (
    <Card
      elevation={3}
      sx={{
        width: "100%",
        borderStyle: "solid",
        borderWitdth: 2,
        borderColor: "black",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: 2,
      }}
    >
      <Stack>
        <Typography variant="h5" component="div">
          Tuyển lập trình viên ReactJS
        </Typography>

        <div className="flex gap-2">
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 24, height: 24 }}
          />
          <MuiLink component={Link} to="#" sx={{ mb: 1.5 }}>
            Công Ty TNHH MTV ABC
          </MuiLink>
        </div>

        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Từ khóa tương thích
            </Typography>
            <Stack direction="row" flexWrap={"wrap"} gap={1}>
              <Chip size="small" color="secondary" label="ReactJS" />
              <Chip size="small" color="secondary" label="Frontend" />
              <Chip size="small" color="secondary" label="JavaScript" />
            </Stack>
          </Stack>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Ngày mở đơn:{" "}
            <Box fontWeight={500} color="black" component="span">
              12/03/2025
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Địa điểm làm việc:{" "}
            <Box fontWeight={500} color="black" component="span">
              123/22 Đường Lương Định Của, Quận 2, TP. Hồ Chí Minh
            </Box>
          </Typography>
        </Stack>
      </Stack>
      <CardActions>
        <Button
          classes={{ endIcon: "pb-2" }}
          endIcon={<ArrowForward />}
          size="small"
        >
          Thông Tin Chi Tiết
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobCardDetail;
