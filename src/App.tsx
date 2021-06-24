import React from "react";
import "./App.css";
import PriceChart from "./PriceChart";

interface Props {}

interface State {
  priceData: {
    timestamp: Date;
    price: number;
  }[];
}

export default class App extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { priceData: [] };
  }

  private readonly requestPayload = {
    query: `
    {
      poolHourDatas(
        where: {
          pool: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8"
        },
        orderBy:periodStartUnix,
        orderDirection:desc,
        first:1000
      ) {
        periodStartUnix,
        token0Price
      }
    }
    `,
    variables: null,
  };

  render() {
    return (
      <div className="App">
        <h1>Uniswap Tools</h1>
        <PriceChart priceData={this.state.priceData} />
      </div>
    );
  }

  componentDidMount() {
    fetch("https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.requestPayload),
    })
      .then((res) => res.json())
      .then((payload) => {
        const priceArray = payload.data.poolHourDatas as {
          periodStartUnix: number;
          token0Price: number;
        }[];

        this.setState({
          priceData: priceArray
            .map((x) => ({
              timestamp: new Date(x.periodStartUnix * 1000),
              price: +x.token0Price,
            }))
            .reverse(),
        });
      });
  }
}
