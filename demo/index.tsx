import React, {useState} from "react";
import {createRoot} from "react-dom/client";
import {AlertProvider, useAlert} from "../dist";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import {AlertPosition} from "../dist/types";

const alertPositions = ["top-right", "top-left", "bottom-left", "bottom-right"];

const TestComponent = ({position, setPosition}) => {
  const {addAlert} = useAlert();

  const handleShowAlert = severity => {
    addAlert({
      message: `This is a test alert for ${severity}`,
      severity,
    });
  };

  return (
    <Box
      style={{
        // Center the content.
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box sx={{width: 600}}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
          }}
        >
          Test MUI Alert Provider
        </Typography>
        <Box sx={{display: "flex", gap: "10px", my: 2}}>
          <Button
            onClick={() => handleShowAlert("error")}
            variant="contained"
            color="error"
          >
            Show Error
          </Button>
          <Button
            onClick={() => handleShowAlert("warning")}
            variant="contained"
            color="warning"
          >
            Show Warning
          </Button>
          <Button
            onClick={() => handleShowAlert("info")}
            variant="contained"
            color="info"
          >
            Show Info
          </Button>
          <Button
            onClick={() => handleShowAlert("success")}
            variant="contained"
            color="success"
          >
            Show Success
          </Button>
        </Box>
        <Typography
          variant="h6"
          sx={{
            alignSelf: "flex-start",
          }}
        >
          Props
        </Typography>
        <Card
          sx={{
            my: 2,
          }}
        >
          <CardContent>
            <FormControl>
              <FormLabel id="alert-position-group-label">
                Alert Position
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="alert-position-group-label"
                defaultValue={position}
                name="alert-position-group"
                onChange={event => {
                  setPosition(event.target.value);
                }}
              >
                {alertPositions.map(position => (
                  <FormControlLabel
                    key={position}
                    value={position}
                    control={<Radio />}
                    label={position}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

const App = () => {
  const [position, setPosition] = useState<AlertPosition>("top-right");

  return (
    <AlertProvider limit={5} mobileLimit={2} position={position}>
      <TestComponent position={position} setPosition={setPosition} />
    </AlertProvider>
  );
};

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}
const root = createRoot(rootElement);
root.render(<App />);
