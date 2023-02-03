import React, { useCallback } from "react";
import useCard from "../../hooks/useCard";
import "./Card.css";

const Card = () => {
  const { state } = useCard();

  return (
    <div className={`card absolute -top-28 left-16 font-sourceCodePro`}>
      <div className={`card-inner ${state.isFlipped ? "flipped" : ""}`}>
        <div className="card-front px-6 py-6">
          <div className="top flex items-center justify-between mb-10 px-1">
            <img
              src="/chip.png"
              style={{
                width: "60px",
              }}
            />
            <div style={{ height: "45px" }}>
              <img
                src="/cardType/visa.png"
                alt="card-type"
                className="object-contain w-full h-full"
              />
            </div>
          </div>

          <div className="card-number mb-6 w-full">
            <h3
              className="text-white font-semibold px-1 py-2.5"
              style={{
                fontSize: "27px",
              }}
            >
              {state.cardNumber}
            </h3>
          </div>

          <div className="name-and-expires flex items-center justify-between text-white px-1">
            <div className="card-holder flex flex-col gap-y-0.5 font-semibold">
              <span
                style={{
                  opacity: "0.7",
                  fontSize: "13px",
                }}
              >
                Card Holder
              </span>
              <span
                style={{
                  fontSize: "18px",
                }}
              >
                {state.cardHolder}
              </span>
            </div>
            <div className="card-holder flex flex-col gap-y-0.5 font-semibold">
              <span
                style={{
                  opacity: "0.7",
                  fontSize: "13px",
                }}
              >
                Expires
              </span>
              <span
                style={{
                  fontSize: "18px",
                }}
              >
                {state.expirationMonth}/{state.expirationYear}
              </span>
            </div>
          </div>
        </div>

        <div className="card-back">
          <div
            className="magnetic-strip"
            style={{
              height: "50px",
              marginTop: "30px",
              background: "rgba(0, 0, 0, 0.8)",
            }}
          />

          <div className="cvv p-4 text-right">
            <span
              className="text-white font-medium mb-1.5 pr-2.5"
              style={{
                fontSize: "15px",
              }}
            >
              CVV
            </span>
            <div
              className="bg-white rounded flex items-center justify-end pr-2.5 mb-7"
              style={{ height: "45px" }}
            >
              <span>{state.cvv}</span>
            </div>

            <div className="w-full flex items-center justify-end">
              <div style={{ height: "45px", opacity: "0.7" }}>
                <img
                  src="/cardType/visa.png"
                  alt="card-type"
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
