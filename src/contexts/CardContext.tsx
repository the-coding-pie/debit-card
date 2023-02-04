import { createContext, useState } from "react";

interface CardObj {
  cardNumber: string;
  cardHolder: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
  isFlipped: boolean;
  activeInput:
    | "cardNumber"
    | "cardHolder"
    | "expirationMonth"
    | "expirationYear"
    | null;
}

interface CardState {
  state: CardObj;
  setState: React.Dispatch<React.SetStateAction<CardObj>>;
}

interface Props {
  children: React.ReactNode;
}

export const CardContext = createContext<CardState | undefined>(undefined);

const CardContextProvider = ({ children }: Props) => {
  const [state, setState] = useState<CardObj>({
    cardHolder: "FULL NAME",
    cardNumber: "#### #### #### ####",
    cvv: "",
    expirationMonth: "MM",
    expirationYear: "YY",
    isFlipped: false,
    activeInput: null,
  });

  return (
    <CardContext.Provider value={{ state, setState }}>
      {children}
    </CardContext.Provider>
  );
};

export default CardContextProvider;
