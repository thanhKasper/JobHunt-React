import { Button, styled } from "@mui/material";

const AddButton = styled(Button)(() => ({
  borderRadius: 25,
  padding: "12px 24px",
  fontWeight: 600,
  textTransform: "none",
  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",

  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
  },

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
    transition: "left 0.6s ease",
  },

  "&:hover::before": {
    left: "100%",
  },
}));

export default AddButton;