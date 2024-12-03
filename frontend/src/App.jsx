import React from "react";
import { Routes } from "./Routes";

const App = () => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <p
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          color: "white",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        Carregando...
      </p>
    );
  }

  return <Routes />;
};

export default App;
