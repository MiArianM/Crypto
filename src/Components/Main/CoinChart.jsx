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

const CoinChart = ({ data: { ChartDatas, ChartType } }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={600} height={200} data={ChartDatas}>
        <CartesianGrid strokeDasharray="3 2" stroke="#BC66DB" />
        <XAxis dataKey="Date" />
        <YAxis datakey={ChartType} domain={["auto", "auto"]} />
        <Line type="monotone" dataKey={ChartType} stroke="#DC6868" />
        <Legend />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
CoinChart.propTypes = {
  data: PropTypes.shape({
    ChartDatas: PropTypes.array,
    ChartType: PropTypes.string.isRequired,
    setChartType: PropTypes.func.isRequired,
  }).isRequired,
};
export default CoinChart;
