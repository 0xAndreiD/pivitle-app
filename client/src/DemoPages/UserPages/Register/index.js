import axios from "axios";
import { baseURL } from "../../../config/variables";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { Fragment, Component } from "react";

import Slider from "react-slick";

import bg3 from "../../../assets/utils/images/originals/citynights.jpg";

import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        passwordrep: "",
      },
      formErrors: {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        passwordrep: "",
      },
    };
  }

  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      initialSlide: 0,
      autoplay: true,
      adaptiveHeight: true,
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({
        ...this.state,
        formData: {
          ...this.state.formData,
          [name]: value,
        },
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const errors = validateForm(this.state.formData);
      if (Object.keys(errors).length === 0) {
        try {
          const response = await axios.post(baseURL + "/user/register", {
            email: this.state.formData.email,
            firstName: this.state.formData.firstName,
            lastName: this.state.formData.lastName,
            password: this.state.formData.password,
          });
          if (response.data.message == "Success")
            toast.success(`OTP has been sent to ${this.state.formData.email}`);
          console.log({ response });

          this.props.history.push(
            `/pages/verifyUser?email=${this.state.formData.email}`
          );

          this.setState({
            formData: {
              email: "",
              firstName: "",
              lastName: "",
              password: "",
              passwordrep: "",
            },
            formErrors: {
              email: "",
              firstName: "",
              lastName: "",
              password: "",
              passwordrep: "",
            },
          });
        } catch (err) {
          toast.error(err.response.data.message);
          this.setState({
            ...this.state,
            formErrors: {
              ...err,
            },
          });
        }
      } else {
        this.setState({
          ...this.state,
          formErrors: {
            ...errors,
          },
        });
      }
    };

    const validateForm = (data) => {
      let errors = {};
      if (!data.firstName?.trim()) {
        errors.firstName = "First Name is required.";
      }
      if (!data.lastName?.trim()) {
        errors.lastName = "Last Name is required.";
      }
      if (!data.password?.trim()) {
        errors.password = "Password is required.";
      }
      if (!data.passwordrep?.trim()) {
        errors.passwordrep = "Please re-enter password.";
      }
      if (!data.email?.trim()) {
        errors.email = "Email is required.";
      } else if (!isValidEmail(data.email)) {
        errors.email = "Invalid email address.";
      }
      return errors;
    };

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    return (
      <Fragment>
        <div className="h-100">
          <Row className="h-100 g-0">
            <Col
              lg="7"
              md="12"
              className="h-100 d-md-flex d-sm-block bg-white justify-content-center align-items-center"
            >
              <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                <div className="app-logo" />
                <h4>
                  <div>Welcome,</div>
                  <span>
                    It only takes a{" "}
                    <span className="text-success">few seconds</span> to create
                    your account
                  </span>
                </h4>
                <div>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleEmail">
                            <span className="text-danger">*</span> Email
                          </Label>
                          <Input
                            type="email"
                            name="email"
                            id="exampleEmail"
                            placeholder="Email here..."
                            value={this.state.email}
                            onChange={handleChange}
                            invalid={!!this.state.formErrors.email}
                          />
                          {this.state.formErrors.email && (
                            <FormFeedback>
                              {this.state.formErrors.email}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleName">First Name</Label>
                          <Input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="First Name here..."
                            value={this.state.formData.firstName}
                            onChange={handleChange}
                            invalid={!!this.state.formErrors.firstName}
                          />
                          {this.state.formErrors.firstName && (
                            <FormFeedback>
                              {this.state.formErrors.firstName}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleName">Last Name</Label>
                          <Input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Last Name here..."
                            value={this.state.formData.lastName}
                            onChange={handleChange}
                            invalid={!!this.state.formErrors.lastName}
                          />
                          {this.state.formErrors.lastName && (
                            <FormFeedback>
                              {this.state.formErrors.lastName}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="examplePassword">
                            <span className="text-danger">*</span> Password
                          </Label>
                          <Input
                            type="password"
                            name="password"
                            id="examplePassword"
                            placeholder="Password here..."
                            value={this.state.formData.password}
                            onChange={handleChange}
                            invalid={!!this.state.formErrors.password}
                          />
                          {this.state.formErrors.password && (
                            <FormFeedback>
                              {this.state.formErrors.password}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="examplePasswordRep">
                            <span className="text-danger">*</span> Repeat
                            Password
                          </Label>
                          <Input
                            type="password"
                            name="passwordrep"
                            id="examplePasswordRep"
                            placeholder="Repeat Password here..."
                            value={this.state.formData.passwordrep}
                            onChange={handleChange}
                            invalid={!!this.state.formErrors.passwordrep}
                          />
                          {this.state.formErrors.passwordrep && (
                            <FormFeedback>
                              {this.state.formErrors.passwordrep}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup className="mt-3" check>
                      <Input type="checkbox" name="check" id="exampleCheck" />
                      <Label for="exampleCheck" check>
                        Accept our{" "}
                        <a
                          href="https://colorlib.com/"
                          onClick={(e) => e.preventDefault()}
                        >
                          Terms and Conditions
                        </a>
                        .
                      </Label>
                    </FormGroup>
                    <div className="mt-4 d-flex align-items-center">
                      <h5 className="mb-0">
                        Already have an account?{" "}
                        <a href="#/pages/login" className="text-primary">
                          Sign in
                        </a>
                      </h5>
                      <div className="ms-auto">
                        <Button
                          color="primary"
                          className="btn-wide btn-pill btn-shadow btn-hover-shine"
                          size="lg"
                          type="submit"
                        >
                          Create Account
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </Col>
            </Col>
            <Col lg="5" className="d-lg-flex d-xs-none">
              <div className="slider-light">
                <Slider {...settings}>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-premium-dark">
                    <div
                      className="slide-img-bg"
                      style={{
                        backgroundImage: "url(" + bg3 + ")",
                      }}
                    />
                    <div className="slider-content">
                      <h3>Scalable, Modular, Consistent</h3>
                      <p>
                        Easily exclude the components you don't require.
                        Lightweight, consistent Bootstrap based styles across
                        all elements and components
                      </p>
                    </div>
                  </div>
                </Slider>
              </div>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}
