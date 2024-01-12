"use client";
// import node module libraries
import { Row, Col, Container } from "react-bootstrap";

// import widget as custom components
import { PageHeading } from "widgets";

// import sub components

const page = () => {
  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="info hub" />

      <Row className="mt-6">
        <Col
          xl={{ span: 8, offset: 2 }}
          lg={{ span: 10, offset: 1 }}
          md={12}
          xs={12}
        >
          <Row></Row>
        </Col>
      </Row>
    </Container>
  );
};

export default page;
