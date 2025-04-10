import React, {useState} from "react";
import {AlertPosition, AlertProvider} from "../dist";
import Demo from "./Demo";
import {createRoot} from "react-dom/client";

const App = () => {
  const [position, setPosition] = useState<AlertPosition>("top-right");
  const [limit, setLimit] = useState<number>(5);
  const [mobileLimit, setMobileLimit] = useState<number>(1);

  return (
    <AlertProvider limit={limit} mobileLimit={mobileLimit} position={position}>
      <Demo
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
