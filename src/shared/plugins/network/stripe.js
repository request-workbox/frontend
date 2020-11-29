const StripeInstance = {
    install(Vue) {
        Vue.$stripe = Stripe(process.env.VUE_APP_STRIPE_KEY)
    }
};

export default StripeInstance;