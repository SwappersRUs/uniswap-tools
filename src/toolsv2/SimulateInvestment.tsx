import { render } from "@testing-library/react";
import React from "react";
import { useState } from "react";

interface Props {
  priceData: {
    timestamp: Date;
    price: number;
    volume: number;
  }[];
}

interface State {
  date: Date;
  setToken?: "ETH" | "USDT";
  setAmount?: number;
}

function showValue(event) {
  console.log(event.target.value);
  const asDate = new Date(event.target.value);
  console.log(asDate.getHours());
}

export default class SimulateInvestment extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { date: new Date() };
  }

  setDate(newDate: Date) {
    if (this.state.setToken) {
      const mostRecentDatePoint = this.props.priceData.find(x => x.timestamp == newDate.))
    }
  }

  render() {
    return (
      <form>
        <label>
          Date of investment:
          <input
            type="datetime-local"
            name="date"
            value={this.state.date.toISOString().slice(0, -1)}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </label>
        <label>
          Amount invested ETH:
          <input type="number" name="amountEth" onChange={showValue} />
        </label>
        <label>
          Amount invested USDT:
          <input type="number" name="amountUsdt" onChange={showValue} />
        </label>
      </form>
    );
  }
}
