import ThankYou from './components/ThankYou';
import { Row, Col, Typography, Button, Image, Select, Form, Input, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../../config/variables';

const { Paragraph, Title } = Typography;
const { TextArea } = Input;

const ContactUs = () => {
    const [sent, setSent] = useState(false);

    const onFinish = async (values) => {
        const response = await axios.post(
            baseURL + '/static/sendUserEmail', 
            values, 
            { 
                headers: {
                    'Authorization': `Bearer ${(localStorage.getItem('Authorization'))}`
                } 
            }
        );
        console.log({ response, values })
        setSent(true);
    };

    return (
        <Row justify='center' align='middle'>
            <Col xs={24} style={{ background: 'lightblue' }}>
                <Row justify='center' align='middle'>
                    <Col xs={12}>
                        <Title level={2}>What would you like to discuss with our sales team?</Title>
                    </Col>
                    <Col xs={6}>
                        <Image
                            src="https://zentrumhub.com/wp-content/uploads/2022/11/5155590_2686827-1.png"
                        />
                    </Col>
                </Row>
            </Col>
            {
                sent ? <ThankYou/> : 
                    <Col style={{ marginTop: '2rem' }}>
                        <Form
                            onFinish={onFinish}
                            style={{
                                maxWidth: 800,
                            }}
                        >
                            <Form.Item 
                                name='discussAbout' 
                                label={<Title level={4}>I'd like to discuss</Title>} 
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please select topic to discuss!',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder='Select topic to discuss'
                                    style={{
                                        width: 280
                                    }}
                                    options={[
                                        {
                                            value: 'Pricing & quotes',
                                            label: 'Pricing & quotes'
                                        }, {
                                            value: 'Product features',
                                            label: 'Product features'
                                        }, {
                                            value: 'Migration options',
                                            label: 'Migration options'
                                        }, {
                                            value: 'Billing & licensing',
                                            label: 'Billing & licensing'
                                        }, {
                                            value: 'Technical support',
                                            label: 'Technical support'
                                        }
                                    ]}
                                />
                            </Form.Item>

                            <Paragraph>Get a quote or ask about pricing questions about a product or service you might purchase.</Paragraph>

                            <Form.Item 
                                name='companyEmail' 
                                label="Your company email" 
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please provide company email!',
                                    },
                                ]}
                            >
                                <Input placeholder="Email" />
                            </Form.Item>
                                
                            <Form.Item 
                                name='firstName' 
                                label="First Name" 
                                required={true}
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please provide first name!',
                                    },
                                ]}
                            >
                                <Input placeholder="First Name" />
                            </Form.Item>
                                
                            <Form.Item 
                                name='lastName' 
                                label="Last Name" 
                                required={true}
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please provide last name!',
                                    },
                                ]}
                            >
                                <Input placeholder="Last Name" />
                            </Form.Item>
                                
                            <Form.Item 
                                name='companyName' 
                                label="Company Name" 
                                required={true}
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please provide company name!',
                                    },
                                ]}
                            >
                                <Input placeholder="Company Name" />
                            </Form.Item>
                                
                            <Form.Item 
                                name='jobTitle' 
                                label="Job Title" 
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please provide Job Title!',
                                    },
                                ]}
                            >
                                <Input placeholder="Job Title" />
                            </Form.Item>

                            <Form.Item 
                                name='service' 
                                label="Which product or services are you inquiring about?" 
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please provide service!',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder='Select service'
                                    style={{
                                        width: 280
                                    }}
                                    options={[
                                        {
                                            value: 'Pivitle 360',
                                            label: 'Pivitle 360'
                                        }, {
                                            value: 'CoachBot',
                                            label: 'CoachBot'
                                        }, {
                                            value: 'CoachChat',
                                            label: 'CoachChat'
                                        }, {
                                            value: 'Coach-on-call',
                                            label: 'Coach-on-call'
                                        }
                                    ]}
                                />
                            </Form.Item>
                                
                            <Form.Item 
                                name='people' 
                                label="Number of people in your team" 
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please provide number of people!',
                                    },
                                ]}
                            >
                                <InputNumber min={1}/>
                            </Form.Item>
                        
                        
                            <Form.Item 
                                name='question' 
                                label="Your Question" 
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please provide your question!',
                                    },
                                ]}
                            >
                                <TextArea placeholder="Your Question"/>
                            </Form.Item>
                        
                        
                            <Paragraph>By signing up on this form, I acknowledge {<Link>Privacy Policy</Link>}.</Paragraph>
                        
                            <Form.Item>
                                <Button htmlType="submit" type="primary">Submit</Button>
                            </Form.Item>
                        </Form>
                    </Col>
            }
        </Row>
    )
};

export default ContactUs;