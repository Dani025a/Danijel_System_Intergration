import Stripe from 'stripe';
import dotenv from 'dotenv'

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const stripeService = {
    async createPaymentIntent(orderDetails) {
        try {
            const lineItems = orderDetails.dummyCart.map(product => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.name,
                        metadata: {
                            product_id: product._id,
                            product_name: product.name,
                        },
                    },
                    unit_amount: product.price * 100,
                },
                quantity: product.selectedQuantity,
            }));
    
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: 'payment',
                success_url: 'http://localhost:3000/success',
                cancel_url: 'http://localhost:3000/cancel',
            });

            return {
                sessionId: session.url
            };
        } catch (error) {
            throw new Error('Error creating payment intent: ' + error.message);
        }
    }
};

export default stripeService;