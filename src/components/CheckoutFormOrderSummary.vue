<template>
  <div class="row row-border-bottom">
    <div class="column column-full-width">

      <!-- ORDER SUMMARY -->

      <div class="row">
        <div class="column column-grow">
          <p class="lineitem-text">{{ checkoutTypeFriendlyName }} Account</p>
        </div>
        <div class="column">
          <p class="lineitem-price">{{ price }}</p>
        </div>
      </div>

      <hr>

      <div class="row row-justify-between">
        <div class="column column-grow">
          <div class="row">
            <div class="column column-60 column-min-width-0">
              <input type="text" class="user-form-input user-form-input-stretch" placeholder="Discount Code" v-model="coupon" :disabled="this.checkoutDiscount !== 0 && this.checkoutDiscount !== ''">
            </div>
            <div class="spacer"></div>
            <div class="column" v-on:click="applyCode" v-if="this.checkoutDiscount === 0 || this.checkoutDiscount === ''">
              <p class="column-left-heading-cancel-text">Apply Code</p>
            </div>
            <div class="column" v-if="this.checkoutDiscount !== 0 && this.checkoutDiscount !== ''">
              <p class="column-left-heading-cancel-text">Code Applied</p>
            </div>
          </div>
        </div>
      </div>

      <hr>

      <div class="row row-align-start">
        <div class="column column-grow">
          <p class="lineitem-text">1st GB Data Transfer Free (monthly)</p>
          <p class="lineitem-subtext">$0.003/mb/month</p>
        </div>
        <div class="column">
          <p class="lineitem-price">$0.00</p>
        </div>
      </div>

      <div class="row row-align-start" v-if="this.checkoutDiscount !== 0 && this.checkoutDiscount !== ''">
        <div class="column column-grow">
          <p class="lineitem-text">Discount Code (monthly)</p>
          <p class="lineitem-subtext">for 3 Billing Cycles</p>
        </div>
        <div class="column">
          <p class="lineitem-price">-{{ discount }}</p>
        </div>
      </div>

      <hr>

      <div class="row row-align-start margin-bottom-10">
        <div class="column column-grow">
          <p class="lineitem-text">Pay Today</p>
          <p class="lineitem-subtext">One-time purchase</p>
        </div>
        <div class="column">
          <p class="lineitem-price">{{ total }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import _ from 'lodash'

export default {
  name: "CheckoutFormOrderSummary",
  data: function() {
    return {
      coupon: '',
    }
  },
  computed: {
    ...mapState('checkout', ['checkoutType', 'checkoutPrice', 'checkoutDiscount', 'checkoutTotal']),
    checkoutTypeFriendlyName: function() {
      if (this.checkoutType === '') return ''

      return _.upperFirst(this.checkoutType)
    },
    price: function() {
      if (this.checkoutPrice === '' || this.checkoutPrice === 0) {
        return '$0.00'
      } else {
        const price = (this.checkoutPrice / 100).toFixed(2)
        return `$${price}`
      }
    },
    discount: function() {
      if (this.checkoutDiscount === '' || this.checkoutDiscount === 0) {
        return '$0.00'
      } else {
        const price = (this.checkoutDiscount / 100).toFixed(2)
        return `$${price}`
      }
    },
    total: function() {
      if (this.checkoutTotal === '' || this.checkoutTotal === 0) {
        return '$0.00'
      } else {
        const price = (this.checkoutTotal / 100).toFixed(2)
        return `$${price}`
      }
    },
  },
  methods: {
    ...mapMutations('checkout', ['updateCoupon']),
    ...mapActions('checkout', ['previewCheckoutPrice']),
    applyCode: async function() {
      if (this.coupon === '') return;
      
      try {
        await this.previewCheckoutPrice({ checkoutType: this.checkoutType, coupon: this.coupon })

        if (this.checkoutDiscount !== 0 && this.checkoutDiscount !== '') {
          this.updateCoupon(this.coupon)
        }
      } catch(err) {
        console.log(err)
      }
    },
  }
};
</script>