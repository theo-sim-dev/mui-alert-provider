import React from "react";
import {createRoot} from "react-dom/client";
import {AlertProvider, useAlert} from "../src";

const TestComponent = () => {
  const {addAlert} = useAlert();

  const handleShowAlert = severity => {
    addAlert({
      message: "This is a test alert!",
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
        <button onClick={() => handleShowAlert("error")}>Show Error</button>
        <button onClick={() => handleShowAlert("warning")}>Show Warning</button>
        <button onClick={() => handleShowAlert("info")}>Show Info</button>
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
