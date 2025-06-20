import { Pagination, styled } from "@mui/material";

const StyledPagination = styled(Pagination)(() => ({
  "& .MuiPaginationItem-root": {
    borderRadius: 12,
    fontWeight: 600,
    transition: "all 0.3s ease",

    "&:hover": {
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.2)",
    },
  },

  "& .MuiPaginationItem-page.Mui-selected": {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",

    "&:hover": {
      background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
    },
  },
}));

export default StyledPagination;
