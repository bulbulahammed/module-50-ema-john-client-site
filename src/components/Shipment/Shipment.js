import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import './Shipment.css';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import { useState } from 'react';

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const [shippingData, setShippingData] = useState(null);
  const onSubmit = data => {
    setShippingData(data);
  };

  const handlePaymentSuccess = paymentId => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      products: savedCart,
      shipment: shippingData,
      paymentId,
      orderTime: new Date()
    };

    fetch('https://blueberry-pudding-27562.herokuapp.com/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder();
          alert('Your Order placed Successfully');
        }
      })
  }



  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div style={{ display: shippingData ? 'none' : 'block' }} className="col-md-6 text-center">
          <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
            {errors.name && <span className="error">Name is required</span>}

            <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
            {errors.email && <span className="error">Email is required</span>}

            <input name="address" ref={register({ required: true })} placeholder="Your Address" />
            {errors.address && <span className="error">Address is required</span>}

            <input name="phone" ref={register({ required: true })} placeholder="Your Phone Number" />
            {errors.phone && <span className="error">Phone Number is required</span>}

            <input type="submit" />
          </form>
        </div>
        <div style={{ display: shippingData ? 'block' : 'none' }} className="col-md-6 text-center">
          <h2>Please pay for me</h2>
          <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
        </div>
      </div>
    </div>
  );
};

export default Shipment;