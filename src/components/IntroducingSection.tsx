import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import HeaderCard from "./cards/HeaderCard";

interface IntroducingSectionProps {
  headingText: string;
  additionalHeading?: React.ReactNode;
  description: string;
  cta?: React.ReactNode;
  icon: React.ReactNode;
}

const IntroducingSection = ({
  headingText,
  additionalHeading,
  description,
  cta,
  icon,
}: IntroducingSectionProps) => {
  const theme = useTheme();
  const mediaSm = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <HeaderCard elevation={6}>
      <Stack
        justifyContent="space-between"
        alignItems="center"
        sx={{
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 2,
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              alignItems: {
                sx: "flex-start",
                md: "center",
              },
              gap: 1,
            }}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              {mediaSm && icon}
              <Typography variant="h4" fontWeight={700}>
                {headingText}
              </Typography>
            </Stack>
            {additionalHeading}
          </Box>
          <Typography
            variant="body1"
            sx={{ opacity: 0.9, maxWidth: 600, mt: 2 }}
          >
            {description}
          </Typography>
        </Box>

        {cta}
      </Stack>
    </HeaderCard>
  );
};

export default IntroducingSection;
