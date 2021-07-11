import React from "react";
import PriceVolumeChart from "./PriceVolumeChart";
import SimulateInvestment from "./SimulateInvestment";

interface Props {}

interface State {
  priceData: {
    timestamp: Date;
    price: number;
    volume: number;
  }[];
}

export default class ToolsV2 extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { priceData: [] };
  }

  private readonly requestPayload = {
    query: `
    {
      pairHourDatas(
        where:{
          pair: "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852"
         },
        orderBy: hourStartUnix,
        orderDirection: desc,
        first: 10
      ) {
        hourStartUnix,
        reserve0,
        reserve1,
        hourlyVolumeUSD
      }
    }
    `,
    variables: null,
  };

  render() {
    return (
      <>
        <PriceVolumeChart priceData={this.state.priceData} />
        <SimulateInvestment
          priceData={this.state.priceData}
        ></SimulateInvestment>
      </>
    );
  }

  componentDidMount() {
    fetch("https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.requestPayload),
    })
      .then((res) => res.json())
      .then((payload) => {
        const priceArray = payload.data.pairHourDatas as {
          hourStartUnix: number;
          reserve0: string;
          reserve1: string;
          hourlyVolumeUSD: string;
        }[];

        this.setState({
          priceData: priceArray
            .map((x) => ({
              timestamp: new Date(x.hourStartUnix * 1000),
              price: +x.reserve1 / +x.reserve0,
              volume: +x.hourlyVolumeUSD,
            }))
            .reverse(),
        });
      });
  }
}
