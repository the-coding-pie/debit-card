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

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      if (name === "cardNumber") {
        setCardNumber(e.target.value);
      }

      setState((prevValue) => ({
        ...prevValue,
        [name]: value,
      }));
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
            value={state.cardHolder}
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
              maxLength={3}
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
