import React, { ReactNode, useCallback, useEffect, useState } from "react";
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
const Years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031];

const Form = ({ children }: Props) => {
  const { state, setState } = useCard();
  const [cardNumber, setCardNumber] = useState("");

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
            autoComplete="off"
            maxLength={19}
            value={cardNumber}
            name="cardNumber"
            onChange={handleChange}
          />
        </div>

        <div className="card-holder form-group mb-5">
          <label htmlFor="cardHolder">Card Holder</label>
          <input
            id="cardHolder"
            type="text"
            autoComplete="off"
            value={state.cardHolder}
            name="cardHolder"
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
                value={state.expirationYear}
              >
                <option value="">Year</option>
                {Years.map((y) => (
                  <option key={y} value={y}>
                    {y}
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
