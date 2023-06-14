import React, { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "../../api";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement } from "chart.js";
ChartJS.register(BarElement);

const BarChart = () => {
  const [rating, setRating] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    axios
      .get(`${apiUrl}users/all`)
      .then((response) => {
        const data = response.data.users;
        setUsers(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const usersAcount =
    users &&
    users
      .filter((users) => users.userCount !== 0)
      .map((users) => users.userCount)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products/all")
      .then((response) => {
        const data = response.data.products;
        setRating(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const favs =
    rating &&
    rating
      .filter((product) => product.rating !== 0)
      .map((product) => product.rating)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const generateInteractions = () => {
    return [
      "Users who added to favorites",
      "Registered users",
      "Top selling brands",
    ];
  };

  const labels = generateInteractions(7);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [favs, usersAcount, 10],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} />;
};

export default BarChart;
