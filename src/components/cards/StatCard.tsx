import { Card, styled } from "@mui/material";

const StatsCard = styled(Card)(() => ({
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  borderRadius: 16,
  border: "1px solid rgba(255, 255, 255, 0.2)",
  transition: "all 0.3s ease",
  height: "fit-content",

  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
  },
}));

export default StatsCard;