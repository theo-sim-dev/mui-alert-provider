import React, {useState} from "react";
import {createRoot} from "react-dom/client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {AlertProvider, useAlert} from "../dist";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import {AlertPosition} from "../dist/types";

const alertPositions = ["top-right", "top-left", "bottom-left", "bottom-right"];

const TestComponent = ({
  position,
  setPosition,
  limit,
  setLimit,
  mobileLimit,
  setMobileLimit,
}) => {
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
        height: "95vh",
      }}
    >
      <Box sx={{width: "100%", maxWidth: 600}}>
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
        <Accordion defaultExpanded sx={{mt: 5}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">Important Props</Typography>
          </AccordionSummary>
          <AccordionDetails>
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
            <TextField
              label="Limit"
              type="number"
              value={limit}
              onChange={event => {
                setLimit(parseInt(event.target.value, 10));
              }}
              sx={{
                my: 2,
                mr: 1,
                width: "45%",
              }}
              helperText="The maximum number of alerts to show at once. 5 by default."
            />
            <TextField
              label="Mobile Limit"
              type="number"
              value={mobileLimit}
              onChange={event => {
                setMobileLimit(parseInt(event.target.value, 10));
              }}
              sx={{
                my: 2,
                width: "45%",
              }}
              helperText="The maximum number of alerts to show at once on mobile. 2 by default."
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

const App = () => {
  const [position, setPosition] = useState<AlertPosition>("top-right");
  const [limit, setLimit] = useState<number>(5);
  const [mobileLimit, setMobileLimit] = useState<number>(1);

  return (
    <AlertProvider limit={limit} mobileLimit={mobileLimit} position={position}>
      <TestComponent
        position={position}
        setPosition={setPosition}
        limit={limit}
        setLimit={setLimit}
        mobileLimit={mobileLimit}
        setMobileLimit={setMobileLimit}
      />
    </AlertProvider>
  );
};

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}
const root = createRoot(rootElement);
root.render(<App />);
