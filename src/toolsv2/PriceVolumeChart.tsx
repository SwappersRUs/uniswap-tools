import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const options: Highcharts.Options = {
  title: {
    text: "ETH Price",
  },
  yAxis: [
    {
      height: "60%",
    },
    { height: "35%", top: "65%" },
  ],
};

interface Props {
  priceData: {
    timestamp: Date;
    price: number;
    volume: number;
  }[];
}

function getOptions(props: Props): Highcharts.Options {
  return {
    ...options,
    series: [
      {
        type: "line",
        name: "Price",
        data: props.priceData.map((x) => [x.timestamp.getTime(), x.price]),
      },
      {
        type: "column",
        name: "Volume",
        data: props.priceData.map((x) => [x.timestamp.getTime(), x.volume]),
        yAxis: 1,
      },
    ],
  };
}

export default function PriceVolumeChart(props: Props) {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={getOptions(props)}
    />
  );
}
