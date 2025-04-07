import {useContext} from "react";
import {AlertContext} from "./AlertProvider";
import {AlertContextType} from "./types";

const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }

  return context;
};

export default useAlert;
