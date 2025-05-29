import React, { useState, useContext } from 'react';
import { Form, Input, Button, Checkbox, Typography, Divider, Row, Col, Card } from 'antd';
import { AuthContext } from '../../context/AuthContext';
import assets from '../assets/assets';

const { Title, Text } = Typography;

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPaasword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const { login } = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }
    login(currState === "Sign up" ? "signup" : "login", { fullName, email, password, bio });
  };
  const whiteLabelStyle = {
    color: 'white',
    fontWeight: 500
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <Row justify="center" gutter={[32, 32]} style={{ width: '100%' }}>
        <Col xs={24} sm={16} md={10} lg={8}>
          <Card
            bordered={false}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
              color: 'white'
            }}
          >
            <Form onSubmitCapture={onSubmitHandler} layout="vertical">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={3} style={{ color: 'white', margin: 0 }}>{currState}</Title>
                {isDataSubmitted && (
                  <img
                    src={assets.arrow_icon}
                    alt="Back"
                    onClick={() => setIsDataSubmitted(false)}
                    style={{ width: 20, cursor: 'pointer' }}
                  />
                )}
              </div>

              {currState === "Sign up" && !isDataSubmitted && (
                <Form.Item
                  label={<span style={whiteLabelStyle}>Full Name</span>}
                  name="fullName"
                  rules={[{ required: true }]}
                >
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </Form.Item>
              )}

              {!isDataSubmitted && (
                <>
                  <Form.Item
                    label={<span style={whiteLabelStyle}>Email Address</span>}
                    name="email"
                    rules={[{ required: true, type: 'email' }]}
                  >
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </Form.Item>

                  <Form.Item
                    label={<span style={whiteLabelStyle}>Password</span>}
                    name="password"
                    rules={[{ required: true }]}
                  >
                    <Input.Password
                      value={password}
                      onChange={(e) => setPaasword(e.target.value)}
                      placeholder="Enter your password"
                    />
                  </Form.Item>
                </>
              )}

              {currState === "Sign up" && isDataSubmitted && (
                <Form.Item
                  label={<span style={whiteLabelStyle}>Short Bio</span>}
                  name="bio"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us something about yourself"
                  />
                </Form.Item>
              )}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{
                    backgroundColor: '#1677ff',
                    border: 'none'
                  }}
                >
                  {currState === "Sign up" ? "Create Account" : "Login Now"}
                </Button>
              </Form.Item>

              <Form.Item name="agreement" valuePropName="checked" noStyle>
                <Checkbox style={{ color: 'white' }}>
                  Agree to the terms of use & privacy policy.
                </Checkbox>
              </Form.Item>

              <Divider style={{ borderColor: 'rgba(255,255,255,0.2)' }} />

              <div style={{ textAlign: 'center' }}>
                {currState === "Sign up" ? (
                  <Text style={{ color: '#e0e0e0' }}>
                    Already have an account?{" "}
                    <span
                      onClick={() => {
                        setCurrState("Login");
                        setIsDataSubmitted(false);
                      }}
                      style={{ color: '#69b1ff', cursor: 'pointer' }}
                    >
                      Login here
                    </span>
                  </Text>
                ) : (
                  <Text style={{ color: '#e0e0e0' }}>
                    Don't have an account?{" "}
                    <span
                      onClick={() => setCurrState("Sign up")}
                      style={{ color: '#69b1ff', cursor: 'pointer' }}
                    >
                      Sign up here
                    </span>
                  </Text>
                )}
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
