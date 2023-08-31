import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Typography, Card, Select, Button } from 'antd';
import { addToCart } from '../../../reducers/Auth';


const { Meta } = Card;
const { Title } = Typography;

let dollarUSLocale = Intl.NumberFormat('en-US');

const Package = ({ data, props }) => {
    const dispatch = useDispatch();
    const rate = data.price / (data.teams * data.min)

    var options = [];
    if(data.max) {
        for (let i = data.min; i<=data.max; i++) {
            options.push({
                value: i,
                label: `${data.teams * i} teams ${data.people * i} @ $${dollarUSLocale.format(rate * (10 * i))}`
            })
        };
    }
    
    const [selectedQuantity, setSelectedQuantity] = useState(() => data.teams ? {
        title: data.title,
        label: data.showTeams,
        teams: data.teams * data.min,
        showTeams: data.showTeams,
        people: data.people * data.min,
        price: data.price,
        quantity: 1
    } : null);

    const onSelectChange = (value) => {
        const body = {
            title: data.title,
            label: `Up to ${data.teams * value} teams (${data.people * value} people) annual subscription`,
            teams: data.teams * value,
            people: data.people * value,
            price: rate * (10 * value),
            quantity: value
        };
        setSelectedQuantity(body);
    }

    const handleAction = () => {
        dispatch(addToCart(selectedQuantity));
        props.history.push('/cart');
    };

    return (
        <Col style={{ margin: '0.3rem', minHeight: '40vh' }}>
            <Card
                hoverable
                style={{
                    width: 340,
                    height: 480
                }}
            >
            <Meta title={data.title}/>
            <Meta description={[
                <Row>
                    <Col xs={24}>
                        <Title level={2} style={{ color: 'blueviolet' }}>{ data.price ? `$${dollarUSLocale.format(selectedQuantity?.price)}` : 'Contact us' }</Title>
                    </Col>
                    <Col xs={24}>
                        {
                            selectedQuantity ? 
                                <Title level={5}>Up to {selectedQuantity?.teams} teams ({selectedQuantity?.people} people) annual subscription</Title> :
                                <Title level={5}>{data.showTeams}</Title>
                        }
                    </Col>
                    {
                        data.price ? 
                            <Col xs={24}>
                                <Select
                                    onChange={onSelectChange}
                                    placeholder="Select your custom package below"
                                    style={{
                                        width: 280
                                    }}
                                    options={options}
                                />
                            </Col> : null
                    }
                    <Col xs={24}>
                        <Title level={5} style={{ color: 'blueviolet' }}>What’s Included</Title>
                    </Col>
                    <Col xs={24}>
                        <Title level={5}>{data.includes}</Title>
                    </Col>
                    <Col xs={24} style={{marginTop: '1rem'}}>
                        {
                            data.teams ? 
                                <Button onClick={handleAction} size={24} type='primary'>Get Started</Button> :
                                <a href='#/contactUs'>
                                    Contact Us
                                </a>
                        }
                    </Col>
                </Row>
            ]}/>
            </Card>
        </Col>
    )
};


export default Package;