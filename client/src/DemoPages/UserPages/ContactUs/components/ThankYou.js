import { Row, Col, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';


const { Title } = Typography;

const ThankYou = () => <Row align='middle' justify='center'>
    <Col xs={24}>
        <Title level={2}>Thanks for contacting Pivitle. We will respond to your query soon!</Title>
    </Col>
    <Col>
        <Link to='/'>
            <Button type='primary'>Home</Button>
        </Link>
    </Col>
</Row>

export default ThankYou;