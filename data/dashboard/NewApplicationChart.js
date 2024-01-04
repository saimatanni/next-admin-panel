import React, { useState } from "react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

import { Button, ButtonGroup } from "react-bootstrap";

export const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // To hide the x-axis gridlines
      },
    },
    y: {
      grid: {
        display: false, // To hide the y-axis gridlines
      },
    },
  },
};

export default function NewApplicationChart({ allChart }) {
  NewApplicationChart.propTypes = {
    allChart: PropTypes.object.isRequired,
  };
  const [type, setType] = useState("Month");
  const week_applications_label = allChart
    ? Object?.keys(allChart?.weekly_applications)
    : [];
  const week_applications_value = allChart
    ? // ? Object?.values(allChart?.weekly_applications)
      [
        allChart?.weekly_applications.new_application,
        allChart?.weekly_applications.application_received,
        allChart?.weekly_applications.ps_query,
        allChart?.weekly_applications.sent_for_esign,
        allChart?.weekly_applications.signed_back,
        allChart?.weekly_applications.sent_to_bank,
        // Exclude "approved", "declined", "live", "transacting", "not_transacting"
      ]
    : [];
  const month_applications_label = allChart
    ? Object?.keys(allChart?.monthly_applications)
    : [];

  const month_applications_value = allChart
    ? // ? Object?.values(allChart?.monthly_applications)
      [
        allChart?.monthly_applications.new_application,
        allChart?.monthly_applications.application_received,
        allChart?.monthly_applications.ps_query,
        allChart?.monthly_applications.sent_for_esign,
        allChart?.monthly_applications.signed_back,
        allChart?.monthly_applications.sent_to_bank,
        // Exclude "approved", "declined", "live", "transacting", "not_transacting"
      ]
    : [];
  const year_applications_label = allChart
    ? Object?.keys(allChart?.yearly_applications)
    : [];
  // const year_applications_value = allChart
  //   ? Object?.values(allChart?.yearly_applications)
  //   : [];

  const year_applications_value = allChart
    ? [
        allChart?.yearly_applications.new_application,
        allChart?.yearly_applications.application_received,
        allChart?.yearly_applications.ps_query,
        allChart?.yearly_applications.sent_for_esign,
        allChart?.yearly_applications.signed_back,
        allChart?.yearly_applications.sent_to_bank,
        // Exclude "approved", "declined", "live", "transacting", "not_transacting"
      ]
    : [];

  const getName = (array) => {
    const mappedArray = array.map((element) => {
      if (element.includes("_")) {
        const splitArray = element.split("_");
        return splitArray.map((word) => word.toUpperCase()).join(" ");
      }
      console.log("element :>> ", element);
      return element.toUpperCase();
    });
    // Filter out specific values
    const filteredArray = mappedArray.filter((element) => {
      return ![
        "DECLINED",
        "APPROVED",
        "NOT TRANSACTING",
        "TRANSACTING",
        "LIVE",
      ].includes(element);
    });

    return filteredArray;
    // return mappedArray;
  };

  const apexWeek = {
    options: {
      colors: [
        "#28a745",
        "#38B6FF",
        "#D32F2F",
        "#F9B115",
        "#66BB6A",
        "#2EB85C",
      ], // Add more colors as needed
      // colors: ["rgb(93, 135, 255)"],
      chart: {
        id: "basic-bar",
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: getName(week_applications_label),
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true,
        textAnchor: "end",
        style: {
          colors: ["#fff"],
        },
        formatter: function (val, opt) {
          return val > 0 ? val : "";
        },
      },
    },
    series: [
      {
        name: "Weekly Applications",
        data: week_applications_value,
      },
    ],
  };
  const apexMonth = {
    options: {
      colors: [
        "#28a745",
        "#38B6FF",
        "#D32F2F",
        "#F9B115",
        "#66BB6A",
        "#2EB85C",
      ], // Add more colors as needed
      chart: {
        id: "basic-bar",
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: getName(month_applications_label),
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true,
        textAnchor: "end",
        style: {
          colors: ["#fff"],
        },
        formatter: function (val, opt) {
          return val > 0 ? val : "";
        },
      },
    },
    series: [
      {
        name: "Monthly Applications",
        data: month_applications_value,
      },
    ],
  };
  const apexYear = {
    options: {
      // colors: ["rgb(93, 135, 255)"],
      colors: [
        "#28a745",
        "#38B6FF",
        "#D32F2F",
        "#F9B115",
        "#66BB6A",
        "#2EB85C",
      ], // Add more colors as needed
      chart: {
        id: "basic-bar",
        type: "bar",
        height: 380,
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: getName(year_applications_label),
      },
      yaxis: {
        labels: {
          show: true,
        },
      },

      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true,
        textAnchor: "end",
        style: {
          colors: ["#fff"],
        },
        formatter: function (val, opt) {
          return val > 0 ? val : "";
        },
      },
    },
    series: [
      {
        name: "Yearly Applications",
        data: year_applications_value,
      },
    ],
  };

  return (
    <div className="card">
      <div className="card-body ">
        <div className="row">
          <div className="col-md-6">
            <div className="chart_title">
              <h3>New Application</h3>
            </div>
          </div>
          <div className="col-md-6">
            <div className="float-end">
             
              <ButtonGroup size="sm" className="float-end me-3">
                {["Week", "Month", "Year"].map((value) => (
                  <Button
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === type}
                    onClick={() => setType(value)}
                  >
                    {/* {displayLabels[value]} */}
                    {value}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="chart my-4">
            <Chart
              options={
                type === "Month"
                  ? apexMonth.options
                  : type === "Week"
                  ? apexWeek?.options
                  : apexYear?.options
              }
              series={
                type === "Month"
                  ? apexMonth.series
                  : type === "Week"
                  ? apexWeek?.series
                  : apexYear?.series
              }
              type="bar"
              // width="450"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
