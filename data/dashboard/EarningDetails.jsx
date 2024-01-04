import React, { useState } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function EarningDetails({ allChart }) {
  EarningDetails.propTypes = {
    allChart: PropTypes.object.isRequired,
  };

  const perfomanceChartSeries = [
    allChart?.upfront > 0 ? allChart?.upfront : 1,
    allChart?.residual > 0 ? allChart?.residual : 1,
  ];
  const perfomanceChartOptions = {
    dataLabels: { enabled: !1 },
    labels: ["Upfront Comission(Weekly)", "Residual (Monthly)"],
    colors: ["#2E4284", "#425EBD"],

    chart: { type: "donut" },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 250,
          },
        },
      },
      {
        breakpoint: 5000,
        options: {
          chart: {
            height: 270,
          },
        },
      },
    ],
  };

  return (
    <div className="card">
      <div className="card-body p-4" style={{ height: "auto" }}>
        <div className="transaction_card p-4 mb-3">
          <h4>Earning Details</h4>
          <div className="transaction_chart mt-n3">
            <Chart
              options={perfomanceChartOptions}
              series={perfomanceChartSeries}
              type="donut"
              width="100%"
            />
          </div>

          <div className="row row-cols-3 mt-4">
            <div className="col-lg-6 col-sm-6">
              <div className="chart-amount">
                <p>Upfront</p>
                <h6>£{allChart?.upfront}</h6>
              </div>
            </div>
            <div className="col-lg-6 col-sm-6">
              <div className="chart-amount">
                <p>Residual</p>
                <h6>£{allChart?.residual}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
