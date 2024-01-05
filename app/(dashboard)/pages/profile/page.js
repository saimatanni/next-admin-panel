"use client";
// import node module libraries
import { Col, Row, Container } from "react-bootstrap";

// import widget as custom components
import { PageHeading } from "widgets";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log("status :>> ", session);
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/authentication/sign-in");
    }
  },[status]);
  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Overview" />

      {/* Profile Header  */}
      {/* <ProfileHeader /> */}

      {/* content */}
      <div className="py-6">
        <Row>
          {/* About Me */}
          {/* <AboutMe /> */}

          {/* Projects Contributions */}
          {/* <ProjectsContributions /> */}

          {/* Recent From Blog */}
          {/* <RecentFromBlog /> */}

          <Col xl={6} lg={12} md={12} xs={12} className="mb-6">
            {/* My Team */}
            {/* <MyTeam /> */}

            {/* Activity Feed */}
            {/* <ActivityFeed /> */}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Profile;
