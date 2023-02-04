import { useCallback } from "react";
import useCard from "../../hooks/useCard";
import "./Card.css";
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from "react-transition-group";

const CARDS = {
  visa: "^4",
  amex: "^(34|37)",
  mastercard: "^5[1-5]",
  discover: "^6011",
  unionpay: "^62",
  troy: "^9792",
  diners: "^(30[0-5]|36)",
};

const Card = () => {
  const { state, setState } = useCard();

  const cardType = useCallback((cardNumber: string) => {
    const number = cardNumber;
    let re;
    for (const [card, pattern] of Object.entries(CARDS)) {
      re = new RegExp(pattern);
      if (number.match(re) != null) {
        return card;
      }
    }

    return "visa"; // default type
  }, []);

  const maskCardNumber = useCallback((cardNumber: string) => {
    let cardNumberArr = cardNumber.split("");
    cardNumberArr.forEach((val, index) => {
      if (index > 4 && index < 14) {
        if (cardNumberArr[index] !== " ") {
          cardNumberArr[index] = "*";
        }
      }
    });

    return cardNumberArr;
  }, []);

  const maskCvv = useCallback((cvv: string) => {
    return "*".repeat(cvv.length);
  }, []);

  return (
    <div className={`card absolute -top-28 left-16 font-sourceCodePro`}>
      <div className={`card-inner ${state.isFlipped ? "flipped" : ""}`}>
        <div className="card-front px-4 py-6">
          <div className="top flex items-center justify-between mb-8 px-2">
            <img
              src="/chip.png"
              style={{
                width: "60px",
              }}
            />
            <div style={{ height: "45px" }}>
              <img
                src={`/cardType/${cardType(state.cardNumber)}.png`}
                alt="card-type"
                className="object-contain w-full h-full"
              />
            </div>
          </div>

          <div
            onClick={() =>
              setState((prevValue) => ({
                ...prevValue,
                activeInput: "cardNumber",
              }))
            }
            className={`card-number cursor-pointer mb-10 w-max flex items-center px-2 py-1 ${
              state.activeInput === "cardNumber"
                ? "border-special"
                : "border-not-visible"
            }`}
            style={{
              height: "50px",
              width: "328px",
            }}
          >
            <h3
              className="text-white font-semibold"
              style={{
                fontSize: "27px",
              }}
            >
              <TransitionGroup>
                {state.cardNumber === "#### #### #### ####"
                  ? state.cardNumber.split("").map((n, index) => (
                      <CSSTransition
                        key={index}
                        timeout={250}
                        classNames={"slide-fade-up"}
                      >
                        <span
                          className="inline-block"
                          style={{
                            width: "16px",
                          }}
                        >
                          {n}
                        </span>
                      </CSSTransition>
                    ))
                  : maskCardNumber(state.cardNumber).map((n, index) => (
                      <CSSTransition
                        key={index}
                        timeout={250}
                        classNames={"slide-fade-up"}
                      >
                        <span
                          className="inline-block"
                          style={{
                            width: "16px",
                          }}
                        >
                          {n}
                        </span>
                      </CSSTransition>
                    ))}
              </TransitionGroup>
            </h3>
          </div>

          <div className="name-and-expires flex items-center justify-between text-white gap-x-4">
            <div
              onClick={() =>
                setState((prevValue) => ({
                  ...prevValue,
                  activeInput: "cardHolder",
                }))
              }
              className={`card-holder cursor-pointer flex flex-1 flex-col overflow-hidden justify-center font-semibold px-2 py-1   ${
                state.activeInput === "cardHolder"
                  ? "border-special"
                  : "border-not-visible"
              }`}
              style={{
                columnGap: "1px",
                height: "54px",
                width: "327px",
              }}
            >
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
                <TransitionGroup className={"overflow-hidden flex"}>
                  {state.cardHolder === "FULL NAME"
                    ? state.cardHolder.split("").map((n) => (
                        <CSSTransition
                          timeout={250}
                          classNames={"slide-fade-right"}
                        >
                          <span
                            className="inline-block"
                            style={{
                              width: "10px",
                            }}
                          >
                            {n.toUpperCase()}
                          </span>
                        </CSSTransition>
                      ))
                    : state.cardHolder.split("").map((n) => (
                        <CSSTransition
                          timeout={250}
                          classNames={"slide-fade-right"}
                        >
                          <span
                            className="inline-block"
                            style={{
                              width: "10px",
                            }}
                          >
                            {n.toUpperCase()}
                          </span>
                        </CSSTransition>
                      ))}
                </TransitionGroup>
              </span>
            </div>
            <div
              className={`card-expires cursor-pointer flex flex-col font-semibold px-2 py-1  ${
                state.activeInput === "expirationMonth" ||
                state.activeInput === "expirationYear"
                  ? "border-special"
                  : "border-not-visible"
              }`}
              style={{
                columnGap: "1px",
              }}
              onClick={() =>
                setState((prevValue) => ({
                  ...prevValue,
                  activeInput: "expirationMonth",
                }))
              }
            >
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
                <SwitchTransition in-out>
                  <CSSTransition
                    key={state.expirationMonth}
                    timeout={200}
                    classNames={"slide-fade-up"}
                  >
                    <span className="inline-block">
                      {state.expirationMonth}
                    </span>
                  </CSSTransition>
                </SwitchTransition>
                /
                <SwitchTransition out-in>
                  <CSSTransition
                    key={state.expirationYear}
                    timeout={200}
                    classNames={"slide-fade-up"}
                  >
                    <span className="inline-block">{state.expirationYear}</span>
                  </CSSTransition>
                </SwitchTransition>
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
              <span>
                <TransitionGroup>
                  {maskCvv(state.cvv)
                    .split("")
                    .map((n, index) => (
                      <CSSTransition
                        key={index}
                        timeout={250}
                        classNames={"zoom-in-out"}
                      >
                        <span className="inline-block">{n}</span>
                      </CSSTransition>
                    ))}
                </TransitionGroup>
              </span>
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
