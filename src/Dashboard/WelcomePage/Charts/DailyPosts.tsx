import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart, Line } from "react-chartjs-2";
import Card from "@Dashboard/Card";

ChartJS.register(...registerables);

interface DailyPostsData {
  date: string;
  post_count: string;
}

interface DailyPostsProps {
  postStats: DailyPostsData[];
}

const DailyPosts: React.FC<DailyPostsProps> = ({ postStats }) => {
  const chartData = {
    labels: postStats.map((stat) => new Date(stat.date).toLocaleDateString()),
    datasets: [
      {
        label: "Posts",
        data: postStats.map((stat) => parseInt(stat.post_count, 10)),
        fill: true,
        backgroundColor: "rgb(75, 192, 192, .2)",
        borderColor: "rgba(75, 192, 192)",
        borderWidth: 1,
      },
    ],
  };

  const options: object = {
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Post Count",
        },
        beginAtZero: true,
        precision: 0,
        ticks: {
          stepSize: 1,
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
  };

  return (
    <Card title="Daily posts" className="daily-posts-block">
      <Line data={chartData} options={options} />
    </Card>
  );
};

export default DailyPosts;
