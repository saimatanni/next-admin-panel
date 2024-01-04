import React from "react";

import { Badge, Form } from "react-bootstrap";
import { useState } from "react";
import { Search } from "react-bootstrap-icons";

const DashboardNotification = ({ notificationList }) => {
  return (
    <div className="card">
      <div
        className="card-body notification_detail_card mb-4"
        style={{ minHeight: "645px" }}
      >
        <div className="d-flex gap-2  align-items-center justify-content-between mb-3">
          <div className="d-flex gap-1 align-items-center ">
            <h4 className="m-0">Notification List </h4>{" "}
            {notificationList?.results?.unread_count > 0 && (
              <Badge color="danger" shape="rounded-pill">
                {notificationList?.results?.unread_count}
              </Badge>
            )}
          </div>
        </div>
        <div
          className="notification-list-container"
          style={{ height: "calc(100% - 3.5rem)" }}
        >
          {/* <NotificationList search={search} /> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardNotification;
