import React, { Suspense } from "react";
import { Routes as Switch, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import ProtectedRoute from "./ProtectedRoute";
import {
  ButtonSeparetedSkeleton,
  ButtonSkeleton,
} from "../Components/Loading/Skeleton/ButtonsSkeleton";
import { PhotoAndTitleSkeleton } from "../Components/Loading/Skeleton/PhotoTitleSkeleton";

const LoginPage = React.lazy(() => import("../Components/Pages/Login"));
const HomePage = React.lazy(() => import("../Components/Pages/HomePage"));
const QuizzSelection = React.lazy(() =>
  import("../Components/Pages/QuizzPage/QuizzGame")
);
const QuizzGame = React.lazy(() =>
  import("../Components/Pages/QuizzPage/QuizzGame/Quizz")
);
const CreateQuestion = React.lazy(() =>
  import("../Components/Pages/CreateQuestions")
);
const CreateClass = React.lazy(() =>
  import("../Components/Pages/Class/CreateClasses")
);
const ManageClass = React.lazy(() => import("../Components/Pages/ManagePage"));
const CreateQuizz = React.lazy(() =>
  import("../Components/Pages/QuizzPage/CreateQuizz")
);
const SelectClassPage = React.lazy(() =>
  import("../Components/Pages/StudentPerformancePage")
);
export const Routes = () => (
  <div
    style={{
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Box
      sx={{
        bgcolor: "var(--lighter-blue-color)",
        borderRadius: 8,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
      minWidth={380}
      maxWidth={480}
      margin={4}
      padding={5}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <PhotoAndTitleSkeleton />
            <ButtonSkeleton fields={2} />
            <ButtonSeparetedSkeleton fields={1} />
            <ButtonSkeleton fields={1} />
          </Box>
        }
      >
        <Switch>
          <Route path="/login" Component={LoginPage} />
          <Route
            path="/menu"
            element={
              <ProtectedRoute roles={["professor", "aluno"]}>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quizz"
            element={
              <ProtectedRoute roles={["aluno"]}>
                <QuizzSelection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quizzes/:quizzId"
            element={
              <ProtectedRoute roles={["aluno"]}>
                <QuizzGame />
              </ProtectedRoute>
            }
          />
          <Route
            path="/select-class"
            element={
              <ProtectedRoute roles={["aluno"]}>
                <SelectClassPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/question/create"
            element={
              <ProtectedRoute roles={["professor"]}>
                <CreateQuestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/class/create"
            element={
              <ProtectedRoute roles={["professor"]}>
                <CreateClass />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage/class"
            element={
              <ProtectedRoute roles={["professor"]}>
                <ManageClass />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create/quizz"
            element={
              <ProtectedRoute roles={["professor"]}>
                <CreateQuizz />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Switch>
      </Suspense>
    </Box>
  </div>
);
