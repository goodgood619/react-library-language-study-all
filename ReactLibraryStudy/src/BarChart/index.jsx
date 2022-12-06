import React from "react";
import { BarChart, XAxis, YAxis, Bar, Tooltip, CartesianGrid } from "recharts";

const data = [
  {
    time: "pon",
    users: 1,
  },
  {
    time: "wt",
    users: 3,
  },
  {
    time: "śr",
    users: 7,
  },
];

const Chart = () => {
  return (
    <BarChart width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      {/* chart에 점선으로 구분지어주는것 */}
      <XAxis dataKey="time"/>
      {/* X축에 이름 표시 */}
      <YAxis dataKey = "users"/>
      <Tooltip /> 
      {/* Bar에 갖다 대면 내용이 보여짐 */}
      <Bar label={true} dataKey="users" fill="#8884d8" />
      {/* 실제 Bar */}
    </BarChart>
  );
};

export default Chart;
