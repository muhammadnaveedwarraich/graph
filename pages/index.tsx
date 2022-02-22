import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { endOfMonth, startOfYear, addMonths } from "date-fns";
import { users } from "./api/hello";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Home: NextPage = () => {
  const year = endOfMonth(startOfYear(new Date()));
  // Array of months from Feb/Mar to current month Feb
  const monthArray = Array.from({ length: 13 }, (_, i) => {
    return addMonths(new Date(year), i).toISOString().slice(0, 10);
  });
  monthArray.pop();
  const [chartData, setChartData] = useState<any>([]);

  useEffect(() => {
    let monthCountArr = new Array(12).fill(0);

    users.forEach(
      ({ date }) => (monthCountArr[new Date(date).getMonth()] += 1)
    );
    setChartData(monthCountArr);
    let finalArray = [];
    for (let i = 1; i < monthCountArr.length + 2; i++) {
      finalArray.push(
        monthCountArr[i < monthCountArr.length ? i : i - monthCountArr.length]
      );
    }
    setChartData(finalArray);
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>Parse users data into the chart</p>
        <Chart
          type="area"
          height={300}
          width={600}
          options={{
            colors: ["yellow"],
            chart: {
              toolbar: {
                show: false,
              },
              zoom: {
                enabled: false,
              },
              foreColor: "gray",
            },
            grid: {
              show: false,
            },
            dataLabels: {
              enabled: false,
            },
            tooltip: {
              enabled: false,
            },
            xaxis: {
              axisBorder: {
                color: "gray",
              },
              axisTicks: {
                color: "gray",
              },
              categories: [
                "feb",
                "mar",
                "apr",
                "may",
                "jun",
                "jul",
                "aug",
                "sep",
                "oct",
                "nov",
                "dec",
                "jan",
                "feb",
              ],
            },
            fill: {
              opacity: 0.4,
              type: "gradient",
              gradient: {
                shade: "dark",
                opacityFrom: 0.7,
                opacityTo: 0.2,
              },
            },
          }}
          series={[
            {
              name: "series1",
              // TODO: get data parsed to fit the year
              data: [...chartData],
            },
          ]}
        />
      </main>
    </div>
  );
};

export default Home;
