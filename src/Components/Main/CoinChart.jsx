import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import PropTypes from "prop-types";

const scaleValue = (value, type) => {
  if (type === "prices") {
    return value;
  }
  return value / 1e9;
};

const formatTooltipValue = (value, name) => {
  if (name === "prices") {
    return (value * 1e9).toLocaleString();
  }
  return value.toFixed(2) + "B";
};
const formatYAxisValue = (value, type) => {
  if (type === "prices") {
    return value * 1e9;
  }
  return value.toFixed(2) + "B";
};
const CoinChart = ({ data: { ChartDatas, ChartType, price_change } = {} }) => {
  const scaledData = ChartDatas.map((item) => ({
    Date: item.Date,
    [ChartType]: scaleValue(item[ChartType]),
  }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={600} height={200} data={scaledData}>
        <CartesianGrid strokeDasharray="3 2" stroke="#BC66DB" />
        <XAxis dataKey="Date" />
        <YAxis
          datakey={ChartType}
          domain={["auto", "auto"]}
          tickFormatter={(value) => formatYAxisValue(value, ChartType)}
        />
        <Line
          type="monotone"
          dataKey={ChartType}
          stroke={price_change >= 0 ? "#15DB15" : "#DB1527"}
        />
        <Legend />
        <Tooltip formatter={formatTooltipValue} />
      </LineChart>
    </ResponsiveContainer>
  );
};
CoinChart.propTypes = {
  data: PropTypes.shape({
    ChartDatas: PropTypes.array,
    ChartType: PropTypes.string,
    setChartType: PropTypes.func,
  }),
};
export default CoinChart;
