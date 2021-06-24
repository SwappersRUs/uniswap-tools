import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const options: Highcharts.Options = {
  title: {
    text: "ETH Price",
  },
};

interface Props {
  priceData: {
    timestamp: Date;
    price: number;
  }[];
}

function getOptions(props: Props): Highcharts.Options {
  return {
    ...options,
    series: [
      {
        type: "line",
        data: props.priceData.map((x) => [x.timestamp.getTime(), x.price]),
      },
    ],
  };
}

export default function PriceChart(props: Props) {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={getOptions(props)}
    />
  );
}
