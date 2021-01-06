<template>
  <div class="row row-border-bottom">
    <div class="column column-full-width">

      <div class="row row-justify-center margin-bottom-10">
        <div class="column column-grow margin-bottom-5 blue-container">
          <div class="row margin-bottom-10">
            <div class="column text-weight-600" v-if="product === 'standard'"> Standard Upgrade</div>
            <div class="column text-weight-600" v-if="product === 'developer'"> Developer Upgrade</div>
            <div class="column text-weight-600" v-if="product === 'professional'"> Professional Upgrade</div>
            <div class="column text-weight-600" v-if="product === 'gb'"> Data Transfer</div>
          </div>
          <div class="row">
            <div class="column">
              <img src="/checkmark.png" alt="" id="checkmark-img" class="checkmark-list-item">
            </div>
            <div class="spacer"></div>
            <div class="column text-12"> 
              <span v-if="product === 'standard'"><span class="text-weight-600">15 Requests</span> Per Minute</span>
              <span v-if="product === 'developer'"><span class="text-weight-600">50 Requests</span> Per Minute</span>
              <span v-if="product === 'professional'"><span class="text-weight-600">250 Requests</span> Per Minute</span>
              <span v-if="product === 'gb'"><span class="text-weight-600">1GB</span> Data Transfer Increase</span>
            </div>
          </div>
          <div class="row" v-if="product !== 'gb'">
            <div class="column">
              <img src="/checkmark.png" alt="" id="checkmark-img" class="checkmark-list-item">
            </div>
            <div class="spacer"></div>
            <div class="column text-12"> 
              <span v-if="product === 'standard'"><span class="text-weight-600">15 Second</span> Queue Delay</span>
              <span v-if="product === 'developer'"><span class="text-weight-600">5 Second</span> Queue Delay</span>
              <span v-if="product === 'professional'"><span class="text-weight-600">1 Second</span> Queue Delay</span>
            </div>
          </div>
          <div class="row" v-if="product !== 'gb'">
            <div class="column">
              <img src="/checkmark.png" alt="" id="checkmark-img" class="checkmark-list-item">
            </div>
            <div class="spacer"></div>
            <div class="column text-12"> 
              <span v-if="product === 'standard'"><span class="text-weight-600">1 Hour</span> Schedule Window</span>
              <span v-if="product === 'developer'"><span class="text-weight-600">12 Hour</span> Schedule Window</span>
              <span v-if="product === 'professional'"><span class="text-weight-600">24 Hour</span> Schedule Window</span>
            </div>
          </div>
          <div class="row" v-if="product !== 'gb'">
            <div class="column">
              <img src="/checkmark.png" alt="" id="checkmark-img" class="checkmark-list-item">
            </div>
            <div class="spacer"></div>
            <div class="column text-12"> 
              <span v-if="product === 'standard'"><span class="text-weight-600">3 Tasks</span> Per Workflow</span>
              <span v-if="product === 'developer'"><span class="text-weight-600">5 Tasks</span> Per Workflow</span>
              <span v-if="product === 'professional'"><span class="text-weight-600">10 Tasks</span> Per Workflow</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ORDER SUMMARY -->

      <div class="row">
        <div class="column column-grow">
          <p v-if="product !== 'gb'" class="lineitem-text">{{ upperFirstProduct }} {{ upperFirstIntentType }}</p>
          <p v-if="product === 'gb'" class="lineitem-text">{{ upperFirstIntentType }}</p>
        </div>
        <div class="column">
          <p class="lineitem-price">{{ productPrice }}</p>
        </div>
      </div>

      <hr>

      <div class="row row-justify-between">
        <div class="column column-grow">
          <div class="row">
            <div class="column column-60 column-min-width-0">
              <input type="text" class="user-form-input user-form-input-stretch" placeholder="Discount Code" v-model="coupon" :disabled="this.price === 0">
            </div>
            <div class="spacer"></div>
            <div class="column" v-if="this.price !== 0" v-on:click="applyCode">
              <p class="column-left-heading-cancel-text">Apply Code</p>
            </div>
            <div class="column" v-if="this.price === 0">
              <p class="column-left-heading-cancel-text">Code Applied</p>
            </div>
          </div>
        </div>
      </div>

      <hr>

      <div class="row row-align-start margin-bottom-10">
        <div class="column column-grow">
          <p class="lineitem-text">Pay Today</p>
          <p class="lineitem-subtext">One-time purchase</p>
        </div>
        <div class="column">
          <p class="lineitem-price">{{ productPrice }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import _ from 'lodash'

import Vue from 'vue'

export default {
  name: "CheckoutFormOrderSummary",
  data: function() {
    return {
      coupon: '',
    }
  },
  computed: {
    ...mapState('checkout', ['intentType','product','price']),
    upperFirstProduct: function() {
      if (this.product === '') return ''

      return _.upperFirst(this.product)
    },
    upperFirstIntentType: function() {
      if (this.intentType === '') return ''
      else if (this.intentType === 'datatransfer') return 'Data Transfer'
      else if (this.intentType === 'upgrade') return 'Upgrade'
    },
    productPrice: function() {
      if (this.price === '' || this.price === 0) {
        return 'Loading...'
      } else {
        const price = (this.price / 100).toFixed(2)
        return `$${price}`
      }
    },
  },
  methods: {
    ...mapActions('checkout', ['createPaymentIntentUpgrade','createPaymentIntentDataTransfer']),
    applyCode: async function() {
      if (this.price === 0) return;
      if (this.coupon === '') return;
      
      try {
        let paymentIntent;
        
        if (this.intentType === 'upgrade') {
          paymentIntent = await this.createPaymentIntentUpgrade({ coupon: this.coupon })
        } else if (this.intentType === 'datatransfer') {
          paymentIntent = await this.createPaymentIntentDataTransfer({ coupon: this.coupon })
        }
        
        if (!paymentIntent || !paymentIntent._id) throw new Error('Not found.')
        
        if (paymentIntent.status === 'completed') {
          Vue.$toast.open({ message: 'Success!', type: 'success' })

          setTimeout(function() {
            location.assign('/account')
          }, 2500)
        } else if (paymentIntent.status !== 'started') {
          throw new Error('Status not found.')
        }

      } catch(err) {
        console.log('Checkout form order summary error', err.message)
        
        Vue.$toast.open({ message: err.message })

        if (_.includes(err.message, 'Coupon')) return

        setTimeout(function() {
          location.assign('/account')
        }, 2500)
      }
    },
  }
};
</script>