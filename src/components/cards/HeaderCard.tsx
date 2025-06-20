import { Paper, styled } from "@mui/material";

const HeaderCard = styled(Paper)(({ theme }) => ({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  borderRadius: 20,
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  position: "relative",
  overflow: "hidden",

  "&::before": {
    content: '""',
    position: "absolute",
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "50%",
  },

  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -30,
    left: -30,
    width: 100,
    height: 100,
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "50%",
  },
}));

export default HeaderCard;
