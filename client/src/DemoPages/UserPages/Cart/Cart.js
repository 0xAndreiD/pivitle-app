import { Row, Col, Typography, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, getClientSecret } from '../../../reducers/Auth';
import axios from 'axios';
import { baseURL } from '../../../config/variables';

const { Paragraph, Title } = Typography;

let dollarUSLocale = Intl.NumberFormat('en-US');

const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems, cart, addedToCart, paymentRedirect } = useSelector(state => state.Auth);

    console.log({
        cart,
        cartItems
    });

    if(paymentRedirect) window.location.replace(paymentRedirect);

    const handleCheckout = async () => {
        const response = await axios.post(
            baseURL + '/user/subscription', 
            cartItems, 
            { 
                headers: {'Authorization': `Bearer ${(localStorage.getItem('Authorization'))}`} 
            }
        );
        console.log({ response });
        dispatch(getClientSecret(response.data));
    };
    
    return (
        <Row justify='end' style={{ borderRadius: '12px' }}>
            {
                addedToCart ? 
                    <Col xs={24}>
                        <Row style={{ padding: '1rem', background: '#FFFFCC' }}>
                            <Col xs={4}>
                                <Link to='/'>
                                    <Button type='primary'>Continue Shopping</Button>
                                </Link>
                            </Col>
                            <Col xs={18}><Paragraph>{addedToCart}</Paragraph></Col>
                        </Row>
                    </Col> : null
            }
            <Col xs={24}>
                <Row justify='start' style={{ boxShadow: '0 0 1px #000' }}>
                    <Col xs={18}>
                        <Title level={4}>PRODUCT</Title>
                    </Col>
                    <Col xs={6}>
                        <Title level={4}>PRICE</Title>
                    </Col>
                </Row>
            </Col>
            <Col xs={24}>
                {
                    cartItems.map(el => 
                        <Row style={{ boxShadow: '0 0 1px #000' }}>
                            <Col xs={1}>
                                    <Button style={{ height: '100%', color: 'blueviolet', borderRadius: 0 }} onClick={() => dispatch(removeFromCart(el))}>X</Button>
                            </Col>
                            <Col xs={17} style={{ padding: '1rem' }}>
                                <Paragraph style={{ textAlign: 'center' }} level={4}>{el.label}</Paragraph>
                            </Col>
                            <Col xs={6} style={{ padding: '1rem' }}>
                                <Paragraph style={{ textAlign: 'center' }} level={4}>${dollarUSLocale.format(el.price)}</Paragraph>
                            </Col>
                        </Row>
                    )
                }
            </Col>
            <Col xs={6} style={{ boxShadow: '0 0 1px #000', padding: '0 1rem', marginTop: '1rem' }}>
                <Row justify='center'>
                    <Col xs={24}><Title style={{ textAlign: 'left' }} level={4}>Cart Total</Title></Col>
                    <Col xs={24}>
                        <Row>
                            <Col xs={12}><Title level={5}>Subtotal</Title></Col>
                            <Col xs={12}><Paragraph style={{ paddingTop: '1.5rem' }}>${dollarUSLocale.format(cart.subTotal)}</Paragraph></Col>
                        </Row>
                    </Col>
                    <Col xs={24}>
                        <Row>
                            <Col xs={12}><Title level={5}>Tax</Title></Col>
                            <Col xs={12}><Paragraph style={{ paddingTop: '1.5rem' }}>${dollarUSLocale.format(cart.tax)}</Paragraph></Col>
                        </Row>
                    </Col>
                    <Col xs={24}>
                        <Row>
                            <Col xs={12}><Title level={5}>Total</Title></Col>
                            <Col xs={12}><Paragraph style={{ paddingTop: '1.5rem' }}>${dollarUSLocale.format(cart.total)}</Paragraph></Col>
                        </Row>
                    </Col>
                    <Col xs={24}>
                        <Row justify='center' style={{ padding: '1rem' }}>
                            <Col>
                                <Button type='primary' onClick={handleCheckout}>Proceed to checkout</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
};

export default Cart;