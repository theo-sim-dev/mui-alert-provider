import React from "react";
import {createRoot} from "react-dom/client";
import {AlertProvider, useAlert} from "../src";
import {Button} from "@mui/material";

const TestComponent = () => {
  const {addAlert} = useAlert();

  const handleShowAlert = severity => {
    addAlert({
      message: `This is a test alert for ${severity}`,
      severity,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>Test MUI Alert Provider</h1>
      <div style={{display: "flex", gap: "10px"}}>
        <Button
          onClick={() => handleShowAlert("error")}
          variant="outlined"
          color="error"
        >
          Show Error
        </Button>
        <Button
          onClick={() => handleShowAlert("warning")}
          variant="outlined"
          color="warning"
        >
          Show Warning
        </Button>
        <Button
          onClick={() => handleShowAlert("info")}
          variant="outlined"
          color="info"
        >
          Show Info
        </Button>
        <Button
          onClick={() => handleShowAlert("success")}
          variant="outlined"
          color="success"
        >
          Show Success
        </Button>
      </div>
    </div>
  );
};

const App = () => (
  <AlertProvider>
    <TestComponent />
  </AlertProvider>
);

const root = createRoot(document.getElementById("root"));
root.render(<App />);
