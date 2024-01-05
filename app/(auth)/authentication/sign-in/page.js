"use client";

// import node module libraries
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import Link from "next/link";
import { signIn } from "next-auth/react";
// import hooks
import useMounted from "hooks/useMounted";
import { SubmitLoginInfo } from "app/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  // const { data: session, status } = ()
  const router = useRouter();
  const loginSuccess = useSelector((data) => data.loginInfo);

  const hasMounted = useMounted();
  const dispatch = useDispatch();
  // State for managing the form input values
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    // back: `${route.push('/')}`
  });
 
  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSignIn = (e) => {
  //   e.preventDefault();
  //   // Dispatch the action with the form data
  //   dispatch(SubmitLoginInfo(credentials));
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sign in using NextAuth.js
      await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
        // callbackUrl: "/",
      });
      router.push("/");
      // router.replace("/");
      // If signIn succeeds, the user will be redirected, no need for explicit redirection here
    } catch (error) {
      // Handle sign-in error, if needed
      console.error("Sign-in error:", error);
    }
  };
  // useEffect(() => {
  //   if (hasMounted && loginSuccess?.isAuthenticated) {
  //     // Redirect to the dashboard page
  //     route.push('/');
  //   }
  // }, [ loginSuccess?.isAuthenticated]);

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-4">
              <Link href="/">
                {" "}
                <h3
                  className="mb-2"
                  style={{ color: "#624bff", fontWeight: "bolder" }}
                >
                  Sayma UI
                </h3>
              </Link>
              {/* <Link href="/"><Image src="/images/brand/logo/logo-primary.svg" className="mb-2" alt="" /></Link> */}
              <p className="mb-6">Please enter your user information.</p>
            </div>
            {/* Form */}
            {hasMounted && (
              <Form onSubmit={handleSubmit}>
                {/* Username */}
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username or email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter address here"
                    value={credentials.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="**************"
                    value={credentials.password}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                {/* Checkbox */}
                <div className="d-lg-flex justify-content-between align-items-center mb-4">
                  <Form.Check type="checkbox" id="rememberme">
                    <Form.Check.Input type="checkbox" />
                    <Form.Check.Label>Remember me</Form.Check.Label>
                  </Form.Check>
                </div>
                <div>
                  {/* Button */}
                  <div className="d-grid">
                    <Button variant="primary" type="submit">
                      Sign In
                    </Button>
                  </div>
                  <div className="d-md-flex justify-content-between mt-4">
                    <div className="mb-2 mb-md-0">
                      <Link href="/authentication/sign-up" className="fs-5">
                        Create An Account
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="/authentication/forget-password"
                        className="text-inherit fs-5"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default SignIn;
