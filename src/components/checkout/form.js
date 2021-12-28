import React, { useState, useEffect } from 'react'
import { makeorder } from '../../apis/order'
import { CardElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import {Button } from '@mui/material'
import { useSelector,useDispatch } from 'react-redux'
const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#000",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}

export default function PaymentForm({paid,setPaid}) {
    const [success, setSuccess] = useState(false);
    const [loader,setLoader] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
     const user = useSelector(state=>state.user)
    const cart = useSelector(state=>state .cart)
   const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoader(true)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
        if (!error) {
            try {
                const { id } = paymentMethod
                const response = await makeorder({
                    amount: cart.bill,
                    id: id,
                    cart:cart
                },user.token)
                if (response.data.success) {
                    console.log("Payment successfull");
                    setSuccess(true)
                    paid.setPaid(true)
                    dispatch({type:'DISCARD'})
                }
            }
            catch (e) {
                console.log(e)

            }
        }
        else {
            console.log("ERROR ", error)
        }
        setLoader(false)
    }
    console.log(paid)

    return (
        <div style={{width:'100%'}}>
            {!success && cart.bill>0 ?
                <form onSubmit={handleSubmit} >
                    <fieldset className='FormGroup' style={{border:'0px'}}>
                        <div className="FormRow">
                            <CardElement options={CARD_OPTIONS} />
                            <Button type="submit" variant="contained" style={{float:'right',marginTop:'10px'}} disabled={!stripe || !elements}>
                                {!loader ? 'Pay' : 'Processing your payment...' }
                            </Button>
                        </div>
                    </fieldset>
                </form>
                :
                <div>
                    {paid.paid ? <h2>Payment successfull</h2> : <h2>Cart Empty </h2> }
                </div>
            }
        </div>


    )
}