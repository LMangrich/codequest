import { Box, Button, Skeleton, Typography } from "@mui/material";
import { useState } from "react";
import { PhotoAndTitleSkeleton } from "../../Loading/Skeleton/PhotoTitleSkeleton";
import UserService from "../../../Services/UserService";
import ProfessorHomeActions from "./ProfessorActions";
import StudentHomeActions from "./StudentActions";
import { ButtonSkeleton } from "../../Loading/Skeleton/ButtonsSkeleton";
import { useNavigate } from "react-router-dom";
import useToast from "../../../hooks/toast";

//'https://jsonplaceholder.typicode.com/users'
const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const user = UserService.getCurrentUser();
  const showToast = useToast();
  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <>
          <PhotoAndTitleSkeleton />
          <ButtonSkeleton fields={4} />
          <Skeleton
            width="100%"
            height={60}
            sx={{ marginBottom: 2, marginTop: 2 }}
          />
        </>
      ) : (
        <Box>
          <Typography
            gutterBottom
            padding={2}
            variant="h5"
            component="h1"
            fontWeight={"bold"}
            color={"var(--text-color)"}
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
              maxWidth: { sm: "450px", xs: "70vw" },
              textAlign: "center",
            }}
          >
            {`Olá, ${user?.role} ${user?.name}`}
          </Typography>
          {UserService.isAuthorized("professor") && (
            <ProfessorHomeActions loading={loading} setLoading={setLoading} />
          )}
          {UserService.isAuthorized("aluno") && (
            <StudentHomeActions loading={loading} setLoading={setLoading} />
          )}
          <Button
            fullWidth
            onClick={() => {
              UserService.clearUser();
              showToast("Deslogado!", "warning");
              navigate("/login");
            }}
            sx={{
              marginTop: 4,
              fontWeight: "bold",
            }}
          >
            Sair
          </Button>
        </Box>
      )}
    </>
  );
};

export default HomePage;
