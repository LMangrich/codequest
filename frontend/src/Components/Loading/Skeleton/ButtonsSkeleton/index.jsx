import { Box, Skeleton } from "@mui/material";
import React from "react";

// interface ButtonsSkeletonProps {
//   fields: number;
// }
export const ButtonSkeleton = ({ fields }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {Array.from({ length: fields }).map((_, index) => (
        <Skeleton
          key={index}
          width="100%"
          height={60}
          sx={{
            borderRadius: 2,
            marginBottom: 2,
            marginTop: index === 0 ? 2 : 0,
          }}
        />
      ))}
    </Box>
  );
};

export const ButtonSeparetedSkeleton = ({
  fields,
}) => {
  return (
    <>
      {Array.from({ length: fields }).map((_, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            width: "100%",
            marginTop: 2,
            justifyContent: "space-between",
          }}
        >
          <Skeleton width="40%" height={60} sx={{ borderRadius: 2 }} />
          <Skeleton width="40%" height={60} sx={{ borderRadius: 2 }} />
        </Box>
      ))}
    </>
  );
};
