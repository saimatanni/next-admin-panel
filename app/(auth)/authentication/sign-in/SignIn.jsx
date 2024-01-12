"use client";

// import node module libraries
import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
// import hooks
import useMounted from "hooks/useMounted";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExclamationTriangleFill } from "react-bootstrap-icons";
import toast from "react-hot-toast";
import Image from "next/image";
const SignIn = () => {
  const hasMounted = useMounted();

  const router = useRouter();
  const { data: session } = useSession();
  // State for managing the form input values
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Set loading to true when the sign-in process starts
      // Sign in using NextAuth.js
      const response = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });
      console.log("response", response);

      if (!response.error) {
        setError("");
        router.push("/");

        router.refresh();
      } else {
        toast.error(`Login failed`, {
          duration: 3000,
        });
        setError("Login failed");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    } finally {
      setLoading(false); // Set loading to false when the sign-in process completes
    }
  };
  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-4">
             
              <Link href="/">
                <Image
                  src="/images/logo/logo.png"
                  className="mb-4"
                  alt=""
                  height={77.5}
                  width={350}
                />
              </Link>
              <p className="mb-6">Welcome to Paymentsave Partner Portal.</p>
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
                {error && (
                  <Alert variant="danger">
                    <ExclamationTriangleFill size={25} className="me-1" />
                    Email or password you entered is incorrect.
                  </Alert>
                )}
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
                    <Button variant="primary" type="submit" disabled={loading}>
                      {loading ? "Signing..." : "Sign In"}
                      {/* Sign In */}
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
