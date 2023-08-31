import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { baseURL } from "../../../config/variables";
import { setUser } from "../../../reducers/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";

import bg1 from "../../../assets/utils/images/originals/city.jpg";
import bg2 from "../../../assets/utils/images/originals/citydark.jpg";
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

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        email: "",
        password: "",
      },
      formErrors: {
        email: "",
        password: "",
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

    let { user, setUser, Authorization } = this.props;

    if (Authorization) this.props.history.push("/home");

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
          const response = await axios.post(baseURL + "/auth/login", {
            email: this.state.formData.email,
            password: this.state.formData.password,
          });
          setUser(response.data.data);
          toast.success(
            `Welcome ${
              response.data.data.data.firstName +
              " " +
              response.data.data.data.lastName
            }`
          );

          this.setState({
            formData: {
              email: "",
              password: "",
            },
            formErrors: {
              email: "",
              password: "",
            },
          });
          this.props.history.push("/home");
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
      if (!data.password?.trim()) {
        errors.password = "Password is required.";
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
            <Col lg="4" className="d-none d-lg-block">
              <div className="slider-light">
                <Slider {...settings}>
                  <div className="h-100 d-flex justify-content-center align-items-center bg-plum-plate">
                    <div
                      className="slide-img-bg"
                      style={{
                        backgroundImage: "url(" + bg1 + ")",
                      }}
                    />
                    <div className="slider-content">
                      <h3>Perfect Balance</h3>
                      <p>
                        ArchitectUI is like a dream. Some think it's too good to
                        be true! Extensive collection of unified React Boostrap
                        Components and Elements.
                      </p>
                    </div>
                  </div>
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
                  <div className="h-100 d-flex justify-content-center align-items-center bg-sunny-morning">
                    <div
                      className="slide-img-bg opacity-6"
                      style={{
                        backgroundImage: "url(" + bg2 + ")",
                      }}
                    />
                    <div className="slider-content">
                      <h3>Complex, but lightweight</h3>
                      <p>
                        We've included a lot of components that cover almost all
                        use cases for any type of application.
                      </p>
                    </div>
                  </div>
                </Slider>
              </div>
            </Col>
            <Col
              lg="8"
              md="12"
              className="h-100 d-flex bg-white justify-content-center align-items-center"
            >
              <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
                <div className="app-logo" />
                <h4 className="mb-0">
                  <div>Welcome back,</div>
                  <span>Please sign in to your account.</span>
                </h4>
                <h6 className="mt-3">
                  No account?{" "}
                  <a href="#/pages/register" className="text-primary">
                    Sign up now
                  </a>
                </h6>
                <Row className="divider" />
                <div>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="exampleEmail">Email</Label>
                          <Input
                            type="email"
                            name="email"
                            id="exampleEmail"
                            placeholder="Email here..."
                            value={this.state.formData.email}
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
                          <Label for="examplePassword">Password</Label>
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
                    </Row>
                    <FormGroup check>
                      <Input type="checkbox" name="check" id="exampleCheck" />
                      <Label for="exampleCheck" check>
                        Keep me logged in
                      </Label>
                    </FormGroup>
                    <Row className="divider" />
                    <div className="d-flex align-items-center">
                      <div className="ms-auto">
                        <a
                          href="#/pages/forgot-password"
                          className="btn-lg btn btn-link"
                        >
                          Recover Password
                        </a>{" "}
                        <Button color="primary" size="lg" type="submit">
                          Login to Dashboard
                        </Button>
                      </div>
                    </div>
                    <ToastContainer />
                  </Form>
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.Auth.user,
  Authorization: state.Auth.Authorization,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
