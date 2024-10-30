import React from "react";
import Plot from "react-plotly.js";

const PieChart = (props) => {
  const data = [
    {
      values: props.data.values,
      labels: props.data.labels,
      type: "pie",
      marker: {
        colors: props.data.colors,
      },
    },
  ];

  const layout = {
    height: 500,
    width: 500,
    title: {
      text: props.title,
      font: {
        color: "white",
      },
    },
    legend: {
      font: {
        color: "white",
      },
      x: 0.5,
      xanchor: "center",
      orientation: "h",
    },
    plot_bgcolor: "rgba(0,0,0,0)",
    paper_bgcolor: "rgba(0,0,0,0)",
  };

  const config = {
    displayModeBar: false,
  };

  return <Plot data={data} layout={layout} config={config} />;
};

export default PieChart;
