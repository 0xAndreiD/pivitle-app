import { Row, Col, Typography, Button } from "antd";
import Package from "./components/Package";
import { useSelector } from "react-redux";

const { Title } = Typography;

const Subscriptions = ({ props }) => {
  const Auth = useSelector((state) => state.Auth);
  const { subscriptions } = useSelector((state) => state.Auth) || {};

  return (
    <Col>
      <Row justify="center" style={{ textAlign: "center" }}>
        <Col>
          <Title level={3}>
            Select your subscription plan today and get the full benefit of
            utilizing Pivitle's Agile Transformation Runbook
          </Title>
        </Col>
        {subscriptions?.map((el) => (
          <Package props={props} data={el} />
        ))}
      </Row>
    </Col>
  );
};

export default Subscriptions;
