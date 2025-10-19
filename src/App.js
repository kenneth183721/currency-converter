import { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convert() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();
        setConverted(data.rates[toCur]);
        setIsLoading(false);
      }
      if (fromCur === toCur) return setConverted(amount);
      convert();
    },
    [amount, fromCur, toCur]
  );

  return (
    <div>
      <div>
        <input
          className="inputField"
          type="text"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          disabled={isLoading}
        />
        <select
          className="selectBtn"
          value={fromCur}
          onChange={(e) => setFromCur(e.target.value)}
          disabled={isLoading}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="HKD">HKD</option>
          <option value="JPY">JPY</option>
          <option value="CAD">CAD</option>
        </select>
      </div>

      <div className="convertRow">
        <p className="convert">
          {converted} {toCur}
        </p>
        <select
          className="selectBtn"
          value={toCur}
          onChange={(e) => setToCur(e.target.value)}
          disabled={isLoading}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="HKD">HKD</option>
          <option value="JPY">JPY</option>
          <option value="CAD">CAD</option>
        </select>
      </div>
    </div>
  );
}
