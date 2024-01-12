"use client";
// import node module libraries
import { Fragment, Suspense } from "react";
import Link from "next/link";
import { Container, Col, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";

import { Briefcase, ListTask, People, Bullseye } from "react-bootstrap-icons";
import LeadChart from "./LeadChart";
import PriceQuoteChart from "./PriceQuoteChart";
import NewApplicationChart from "./NewApplicationChart";
import AllApplicationChirt from "./AllApplicationChirt";
import UpfrontCommissionChart from "./UpfrontCommissionChart";
import ResidualChart from "./ResidualChart";
import DashboardNotification from "./notification/DashboardNotification";
import EarningDetails from "./EarningDetails";
import './Dashboard.css'
import Loading from "app/Loading";
const DashboardData = ({ data, notificationList }) => {

  return (

    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6 mb-6">
        <Row>
          {/* Page header */}

          <Col lg={12} md={12} xs={12}>
            <div>
              <div className="d-flex justify-content-start align-items-center">
                <div className="mb-2 mb-lg-0">
                  <h3 className="mb-0  text-white">Accounts</h3>
                </div>
                {/* <div>
                  <Link href="#" className="btn btn-white">
                    Create New Project
                  </Link>
                </div> */}
              </div>
            </div>
          </Col>
          {/* Applications */}
          <Col lg={8}>
            <Row>
              <Col xl={4} lg={6} md={12} xs={12} className="mt-6">
                <Card>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <h4 className="mb-0">New Leads</h4>
                        {/* <h4 className="mb-0">{info.title}</h4> */}
                      </div>
                      <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                        <Briefcase size={18} />
                      </div>
                    </div>
                    <div>
                      <h1 className="fw-bold">{data.total_new_leads}</h1>
                      <p className="mb-0">
                        <span className="text-dark me-2"></span> Total
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xl={4} lg={6} md={12} xs={12} className="mt-6">
                <Card>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <h4 className="mb-0">New Opportunities</h4>
                        {/* <h4 className="mb-0">{info.title}</h4> */}
                      </div>
                      <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                        <ListTask size={18} />
                      </div>
                    </div>
                    <div>
                      <h1 className="fw-bold">{data.total_quotes}</h1>
                      <p className="mb-0">
                        <span className="text-dark me-2"></span> Total
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xl={4} lg={6} md={12} xs={12} className="mt-6">
                <Card>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <h4 className="mb-0">New Applications</h4>
                        {/* <h4 className="mb-0">{info.title}</h4> */}
                      </div>
                      <div className="icon-shape icon-md bg-light-primary text-primary rounded-2">
                        <ListTask size={18} />
                      </div>
                    </div>
                    <div>
                      <h1 className="fw-bold">{data.total_new_applications}</h1>
                      <p className="mb-0">
                        <span className="text-dark me-2"></span> Total
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xl={12} xs={12} className="mt-6">
                <EarningDetails allChart={data} />
              </Col>
            </Row>
          </Col>

          <Col lg={4} className="mt-6">
            <DashboardNotification notificationList={notificationList} />
          </Col>
        </Row>

        {/* lead and quote  */}
        <Row>
          <Col md={6} xs={12} className="mt-6">
            <LeadChart allChart={data} />
          </Col>
          <Col md={6} xs={12} className="mt-6">
            <PriceQuoteChart allChart={data} />
          </Col>
          <Col md={6} xs={12} className="mt-6">
            <NewApplicationChart allChart={data} />
          </Col>
          <Col md={6} xs={12} className="mt-6">
            <AllApplicationChirt allChart={data} />
          </Col>
          <Col md={6} xs={12} className="mt-6">
            <UpfrontCommissionChart allChart={data} />
          </Col>
          <Col md={6} xs={12} className="mt-6">
            <ResidualChart allChart={data} />
          </Col>
        </Row>
      </Container>
    </Fragment>


  );
};
export default DashboardData;
