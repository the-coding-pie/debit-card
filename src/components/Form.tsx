import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Card from "./Card/Card";
import useCard from "../hooks/useCard";

interface Props {
  children: ReactNode;
}

const Months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
const Years = [
  { label: 2023, value: 23 },
  { label: 2024, value: 24 },
  { label: 2025, value: 25 },
  { label: 2026, value: 26 },
  { label: 2027, value: 27 },
  { label: 2028, value: 28 },
  { label: 2029, value: 29 },
  { label: 2030, value: 30 },
  { label: 2031, value: 31 },
];

const Form = ({ children }: Props) => {
  const { state, setState } = useCard();
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  const cardNumberRef = useRef<HTMLInputElement | null>(null);
  const cardHolderRef = useRef<HTMLInputElement | null>(null);
  const cardMonthRef = useRef<HTMLSelectElement | null>(null);
  const cardYearRef = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    if (state.activeInput) {
      if (state.activeInput === "cardNumber") {
        cardNumberRef?.current?.focus();
      } else if (state.activeInput === "cardHolder") {
        cardHolderRef?.current?.focus();
      } else if (state.activeInput === "expirationMonth") {
        cardMonthRef?.current?.focus();
      } else if (state.activeInput === "expirationYear") {
        cardYearRef?.current?.focus();
      }
    }
  }, [state.activeInput]);

  const formatCardNumber = useCallback((value: string): string => {
    let cardNumber = value;

    value = value.replace(/\D/g, "");

    if (/^3[47]\d{0,13}$/.test(value)) {
      cardNumber = value
        .replace(/(\d{4})/, "$1 ")
        .replace(/(\d{4}) (\d{6})/, "$1 $2 ");
    } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
      // diner's club, 14 digits
      cardNumber = value
        .replace(/(\d{4})/, "$1 ")
        .replace(/(\d{4}) (\d{6})/, "$1 $2 ");
    } else if (/^\d{0,16}$/.test(value)) {
      // regular cc number, 16 digits
      cardNumber = value
        .replace(/(\d{4})/, "$1 ")
        .replace(/(\d{4}) (\d{4})/, "$1 $2 ")
        .replace(/(\d{4}) (\d{4}) (\d{4})/, "$1 $2 $3 ");
    }
    return cardNumber.trim();
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      // local update
      if (name === "cardNumber") {
        setCardNumber(formatCardNumber(e.target.value));
      }
      if (name === "cardHolder") {
        setCardHolder(e.target.value);
      }

      // global update
      if (name === "cardNumber") {
        if (value === "") {
          setState((prevValue) => ({
            ...prevValue,
            [name]: "#### #### #### ####",
          }));
        } else {
          // format value
          setState((prevValue) => ({
            ...prevValue,
            [name]: formatCardNumber(value),
          }));
        }
      } else if (name === "cardHolder" && value === "") {
        setState((prevValue) => ({
          ...prevValue,
          [name]: "FULL NAME",
        }));
      } else if (name === "expirationMonth" && value === "") {
        setState((prevValue) => ({
          ...prevValue,
          [name]: "MM",
        }));
      } else if (name === "expirationYear" && value === "") {
        setState((prevValue) => ({
          ...prevValue,
          [name]: "YY",
        }));
      } else {
        setState((prevValue) => ({
          ...prevValue,
          [name]: value,
        }));
      }
    },
    []
  );

  return (
    <div
      className="form bg-white rounded-2xl relative shadow-xl"
      style={{
        width: "570px",
      }}
    >
      {children}

      <div className="form p-8 pt-48">
        <div className="card-number form-group mb-5">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            id="cardNumber"
            type="tel"
            ref={cardNumberRef}
            autoComplete="off"
            maxLength={19}
            value={cardNumber}
            name="cardNumber"
            onFocus={() =>
              setState((prevValue) => ({
                ...prevValue,
                activeInput: "cardNumber",
              }))
            }
            onBlur={() =>
              setState((prevValue) => ({
                ...prevValue,
                activeInput: null,
              }))
            }
            onChange={handleChange}
          />
        </div>

        <div className="card-holder form-group mb-5">
          <label htmlFor="cardHolder">Card Holder</label>
          <input
            id="cardHolder"
            type="text"
            ref={cardHolderRef}
            autoComplete="off"
            value={cardHolder}
            name="cardHolder"
            onFocus={() =>
              setState((prevValue) => ({
                ...prevValue,
                activeInput: "cardHolder",
              }))
            }
            onBlur={() =>
              setState((prevValue) => ({
                ...prevValue,
                activeInput: null,
              }))
            }
            onChange={handleChange}
          />
        </div>

        <div className="date-and-cvv flex items-center gap-x-8">
          <div className="expiration-date flex-1">
            <label className="mb-1.5 block">Expiration Date</label>

            <div className="month-and-year flex items-center gap-x-3">
              <select
                name="expirationMonth"
                onChange={handleChange}
                ref={cardMonthRef}
                onFocus={() =>
                  setState((prevValue) => ({
                    ...prevValue,
                    activeInput: "expirationMonth",
                  }))
                }
                onBlur={() =>
                  setState((prevValue) => ({
                    ...prevValue,
                    activeInput: null,
                  }))
                }
                value={state.expirationMonth}
              >
                <option value="">Month</option>
                {Months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>

              <select
                name="expirationYear"
                onChange={handleChange}
                onFocus={() =>
                  setState((prevValue) => ({
                    ...prevValue,
                    activeInput: "expirationYear",
                  }))
                }
                onBlur={() =>
                  setState((prevValue) => ({
                    ...prevValue,
                    activeInput: null,
                  }))
                }
                ref={cardYearRef}
                value={state.expirationYear}
              >
                <option value="">Year</option>
                {Years.map((y) => (
                  <option key={y.value} value={y.value}>
                    {y.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="cvv form-group w-36">
            <label htmlFor="cvv">CVV</label>
            <input
              maxLength={4}
              onFocus={() =>
                setState((prevValue) => ({
                  ...prevValue,
                  isFlipped: true,
                }))
              }
              onBlur={() =>
                setState((prevValue) => ({
                  ...prevValue,
                  isFlipped: false,
                }))
              }
              type="text"
              name="cvv"
              value={state.cvv}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
