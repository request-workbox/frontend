const StripeInstance = {
    install(Vue) {
        // const stripe = loadStripe('pk_test_51Ha7CVJzZURMKlQ3m7CtvxXK4cFuJbznhCXG39BX675qgw1E33q55v6ZalTcC450sggHyAcZi9GQp1hoB4imONuw00Cggm8OYX')
        Vue.$stripe = Stripe('pk_test_51Ha7CVJzZURMKlQ3m7CtvxXK4cFuJbznhCXG39BX675qgw1E33q55v6ZalTcC450sggHyAcZi9GQp1hoB4imONuw00Cggm8OYX')
    }
};

export default StripeInstance;