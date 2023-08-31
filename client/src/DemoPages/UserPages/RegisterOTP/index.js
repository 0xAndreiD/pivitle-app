import axios from "axios";
import { connect } from "react-redux";
import { baseURL } from "../../../config/variables";
import { toast } from "react-toastify";
import { setUser } from "../../../reducers/Auth";
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

class RegisterOTP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        email: "",
        OTP: "",
      },
      formErrors: {
        email: "",
        OTP: "",
      },
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const queryParams = new URLSearchParams(location.search);

    this.setState({
      formData: {
        email: queryParams.get("email"),
      },
    });
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

    let { user, setUser } = this.props;

    console.log({ email: this.state.formData.email });

    const handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({
        formData: {
          [name]: value,
        },
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const errors = validateForm(this.state.formData);
      if (Object.keys(errors).length === 0) {
        try {
          const response = await axios.post(baseURL + "/user/verifyUser", {
            email: this.state.formData.email,
            OTP: this.state.formData.OTP,
          });

          console.log(response.data.verified);

          setUser(response.data.verified);

          this.props.history.push(`/home`);
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
      if (!data.OTP?.trim()) {
        errors.OTP = "OTP is required.";
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
                            type="text"
                            name="Email"
                            id="email"
                            placeholder="Email here..."
                            value={this.state.formData.email}
                            onChange={handleChange}
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
                          <Label for="exampleEmail">
                            <span className="text-danger">*</span> OTP
                          </Label>
                          <Input
                            type="text"
                            name="OTP"
                            id="otp"
                            placeholder="OTP here..."
                            value={this.state.OTP}
                            onChange={handleChange}
                          />
                          {this.state.formErrors.OTP && (
                            <FormFeedback>
                              {this.state.formErrors.OTP}
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="mt-4 d-flex align-items-center">
                      <div className="ms-auto">
                        <Button
                          color="primary"
                          className="btn-wide btn-pill btn-shadow btn-hover-shine"
                          size="lg"
                          type="submit"
                        >
                          Verify OTP
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

const mapStateToProps = (state) => ({
  user: state.Auth.user,
  Authorization: state.Auth.Authorization,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterOTP);
