import { Box, Skeleton } from "@mui/material";
import React from "react";

// interface FieldsSkeletonProps {
//   fields: number;
// }

const FieldsSkeleton = ({ fields }) => {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      width="100%"
    >
      {Array.from({ length: fields }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          width="100%"
          height={40}
          sx={{
            marginBottom: 2,
            borderRadius: 2,
            marginTop: index === 0 ? 2 : 0,
          }}
        />
      ))}
    </Box>
  );
};

export default FieldsSkeleton;
