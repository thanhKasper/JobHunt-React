import { Card, styled } from "@mui/material";

// Styled Card with hover effects
const InfoCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  border: `1px solid ${theme.palette.divider}`,
  position: "relative",
  
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
    "& .job-title": {
      color: theme.palette.primary.main,
    },
    "& .detail-button": {
      background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
      color: "white",
      transform: "translateX(4px)",
    },
  },
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    background: "linear-gradient(90deg, #667eea, #764ba2)",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  
  "&:hover::before": {
    opacity: 1,
  },
}));

export default InfoCard;