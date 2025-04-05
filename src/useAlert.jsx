import {useContext} from "react";
import {AlertContext} from "./AlertProvider";

const useAlert = () => {
  const {addAlert} = useContext(AlertContext);

  return {
    addAlert,
  };
};

export default useAlert;
