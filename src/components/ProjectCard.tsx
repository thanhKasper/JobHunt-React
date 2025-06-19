import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Link } from "react-router";

export default function ProjectCard() {
  return (
    <Card variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
      <CardContent>
        <Typography
          component={Link}
          to="jkdf-17wjgj-178saasb-16782"
          variant="h6"
          gutterBottom
          sx={{
            textDecoration: "none",
            color: blue[700],
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {"Untitled Project"}
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          07/2024 - 10/2024
        </Typography>

        {/* <Typography variant="body1" sx={{ mt: 1 }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat
          tempore nostrum iste consequuntur aut expedita. Numquam dicta
          blanditiis mollitia sapiente nisi eligendi consectetur, ratione sequi,
          alias molestias qui placeat aliquid?
        </Typography> */}

        <Typography variant="subtitle2" sx={{ mt: 2 }}>
          Vai Trò:
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
          {["Frontend Developer", "Scrum Master"].map((r, idx) => (
            <Chip key={idx} label={r} color="primary" variant="outlined" />
          ))}
        </Stack>

        <Typography variant="subtitle2" sx={{ mt: 2 }}>
          Công Nghệ Sử Dụng / Kỹ Năng:
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
          {["React", "TypeScript", "Node.js"].map((tech, idx) => (
            <Chip key={idx} label={tech} color="secondary" size="small" />
          ))}
        </Stack>
      </CardContent>

      {/* <CardActions>
        <Button
          size="small"
          color="primary"
          component={Link}
          to="#"
          // href={project.projectLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Project Source
        </Button>
      </CardActions> */}
    </Card>
  );
}
