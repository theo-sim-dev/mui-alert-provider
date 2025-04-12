import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {AlertPosition, useAlert} from "../../dist";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AlertColor,
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

const alertPositions = ["top-right", "top-left", "bottom-left", "bottom-right"];

interface DemoProps {
  position: AlertPosition;
  setPosition: (position: AlertPosition) => void;
  limit: number;
  setLimit: (limit: number) => void;
  mobileLimit: number;
  setMobileLimit: (mobileLimit: number) => void;
}

const Demo: React.FC<DemoProps> = ({
  position,
  setPosition,
  limit,
  setLimit,
  mobileLimit,
  setMobileLimit,
}) => {
  const {addAlert} = useAlert();

  const handleShowAlert = (severity: AlertColor) => {
    addAlert({
      message: `This is a test alert for ${severity}`,
      severity,
    });
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "95vh",
      }}
    >
      <Box sx={{width: "100%", maxWidth: 600}}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              width: "100%",
            }}
          >
            Test MUI Alert Provider
          </Typography>
          <Box sx={{display: "flex", gap: "10px", my: 2}}>
            <Button
              onClick={() => {
                return handleShowAlert("error");
              }}
              variant="contained"
              color="error"
            >
              Show Error
            </Button>
            <Button
              onClick={() => {
                return handleShowAlert("warning");
              }}
              variant="contained"
              color="warning"
            >
              Show Warning
            </Button>
            <Button
              onClick={() => {
                return handleShowAlert("info");
              }}
              variant="contained"
              color="info"
            >
              Show Info
            </Button>
            <Button
              onClick={() => {
                return handleShowAlert("success");
              }}
              variant="contained"
              color="success"
            >
              Show Success
            </Button>
          </Box>
        </Box>
        <Accordion defaultExpanded>
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
                  setPosition(event.target.value as AlertPosition);
                }}
              >
                {alertPositions.map(position => {
                  return (
                    <FormControlLabel
                      key={position}
                      value={position}
                      control={<Radio />}
                      label={position}
                    />
                  );
                })}
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
              helperText="The maximum number of alerts to show at once on mobile. 1 by default."
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default Demo;
