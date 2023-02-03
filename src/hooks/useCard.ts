import { useContext } from "react";
import { CardContext } from "../contexts/CardContext";

const useCard = () => {
  const context = useContext(CardContext);

  if (context === undefined) {
    throw new Error("useCard must be used within a CardContextProvider");
  }

  return context;
};

export default useCard;