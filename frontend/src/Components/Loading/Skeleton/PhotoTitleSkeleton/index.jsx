import { Avatar, Box, Skeleton, Typography } from "@mui/material";

export const PhotoAndTitleSkeleton = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }} width="100%">
      <Box sx={{ margin: 1 }}>
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Skeleton width="100%">
          <Typography>.</Typography>
        </Skeleton>
      </Box>
    </Box>
  );
};
