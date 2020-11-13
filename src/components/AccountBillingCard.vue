<template>
  <div class="row row-border-bottom" id="card-container-row">
    <div class="column column-full-width" id="card-container">
      <!-- Header -->
      <div class="row">
        <div class="column column-full-width">
          <p class="column-left-heading-header">Update Card</p>
        </div>
        <div class="column column-16 column-left-heading-cancel" v-on:click="toggleUpdateCardView">
          <p class="column-left-heading-cancel-text">⬅ Go Back</p>
        </div>
      </div>

      <!-- BILLING INFORMATION -->
      <div class="row">
        <div class="column-column-full-width">
          <p class="column-left-heading-subheader">Billing Information</p>
        </div>
      </div>

      <!-- Name -->
      <div class="row row-justify-between row-shadow row-white">
        <div class="column column-min-100">
          <div class="row">
            <div class="column column-full-width column-left-heading">
              <p class="column-left-heading-text">Name</p>
            </div>
          </div>
        </div>
        <div class="column column-grow">
          <div class="row">
            <div class="column column-full-width">
              <input type="text" class="card-container-input-text" placeholder="John Rosen" autocomplete="name">
            </div>
          </div>
        </div>
      </div>

      <!-- Email -->
      <div class="row row-justify-between row-shadow row-white">
        <div class="column column-min-100">
          <div class="row">
            <div class="column column-full-width column-left-heading">
              <p class="column-left-heading-text">Email</p>
            </div>
          </div>
        </div>
        <div class="column column-grow">
          <div class="row">
            <div class="column column-full-width">
              <input type="text" class="card-container-input-text card-container-input-text-short" placeholder="john@example.com" autocomplete="email">
            </div>
          </div>
        </div>
      </div>

      <!-- Address -->
      <div class="row row-justify-between row-shadow row-white">
        <div class="column column-min-100">
          <div class="row">
            <div class="column column-full-width column-left-heading">
              <p class="column-left-heading-text">Address</p>
            </div>
          </div>
        </div>
        <div class="column column-grow">
          <div class="row">
            <div class="column column-full-width">
              <input type="text" class="card-container-input-text card-container-input-text-short" placeholder="185 Congress Street Suite 550" autocomplete="street-address">
            </div>
          </div>
        </div>
      </div>

      <!-- City -->
      <div class="row row-justify-between row-shadow row-white">
        <div class="column column-min-100">
          <div class="row">
            <div class="column column-full-width column-left-heading">
              <p class="column-left-heading-text">City</p>
            </div>
          </div>
        </div>
        <div class="column column-grow">
          <div class="row">
            <div class="column column-full-width">
              <input type="text" class="card-container-input-text card-container-input-text-short" placeholder="Austin" autocomplete="address-level2">
            </div>
          </div>
        </div>
      </div>

      <!-- State and Zip -->
      <div class="row row-justify-between row-shadow row-white">
        <div class="column column-min-100">
          <div class="row">
            <div class="column column-full-width column-left-heading">
              <p class="column-left-heading-text">State</p>
            </div>
          </div>
        </div>
        <div class="column column-grow">
          <div class="row">
            <div class="column column-full-width">
              <input type="text" class="card-container-input-text card-container-input-text-short" placeholder="TX"  autocomplete="address-level1">
            </div>
          </div>
        </div>
        <div class="column column-20">
          <div class="row">
            <div class="column column-full-width column-left-heading">
              <p class="column-left-heading-text">Zip</p>
            </div>
          </div>
        </div>
        <div class="column column-grow">
          <div class="row">
            <div class="column column-full-width">
              <input type="text" class="card-container-input-text card-container-input-text-short" placeholder="78701"  autocomplete="postal-code">
            </div>
          </div>
        </div>
      </div>

      <!-- PAYMENT INFORMATION -->
      <div class="row">
        <div class="column-column-full-width">
          <p class="column-left-heading-subheader">Payment Information</p>
        </div>
      </div>

      <!-- Card -->
      <div class="row row-justify-between row-shadow row-white">
        <div class="column column-min-100">
          <div class="row">
            <div class="column column-full-width column-left-heading">
              <p class="column-left-heading-text">Card</p>
            </div>
          </div>
        </div>
        <div class="column column-grow">
          <div class="row">
            <div class="column column-full-width" id="card-info">
              
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="row row-justify-between row-shadow row-white">
        <div class="column column-grow">
          <div class="row">
            <div class="column column-grow column-button">
              <p class="column-button-text">Save Card</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: "AccountBillingCard",
  mounted: function() {
    const card = this.$stripe.elements().create('card')
      card.mount('#card-info')
  },
  methods: {
    ...mapMutations('billing', ['toggleUpdateCardView']),
  }
};
</script>

<style lang="scss">
#card-container-row {
  position: fixed;
  width:100%;
  height:100%;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background: #00000082;
  z-index:1;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
}
#card-container {
  background: #edeff1;
  height: auto;
  width:auto;
  border-radius: 3px;
  border:#dcdcdc solid 1px;
  min-width: 500px;
  padding: 10px 50px 25px 50px;
  box-shadow:0px 2px 4px 2px #595a5a;
}
.card-container-input-label {
  font-size: 0.75em;
}
.card-container-input-text {
  width: 80%;
  border:none;
  border-radius: 3px;
  font-size: 15px;

    color: #011321;
    padding-left: 15px;
}
.card-container-input-text:focus {
    outline: none;
}
#card-info {
  margin-top: 5px;
}

.column-left-heading {
  text-align: right;
}
.column-left-heading-text {
  font-size: 15px;
  color: #5281ff;
  margin-top: 11px;
  margin-bottom: 11px;
}
.column-left-heading-header {
  font-size: 19px;
  color: #060d3d;
  margin-top: 11px;
  margin-bottom: 11px;
  text-transform: uppercase;
  font-weight: 600;
}
.column-left-heading-subheader {
  font-size: 13px;
  color: #060b3e;
  margin-top: 11px;
  margin-bottom: 11px;
  text-transform: uppercase;
  font-weight: 600;
}

.column-button {
  background: #5280ff;
  text-align: center;
  margin: 10px;
  border-radius:3px;
  cursor: pointer;
}
.column-button:hover {
  box-shadow: -1px 2px 5px 3px #eff0f7;
}
.column-button-text {
  color:white !important;
  font-size: 15px;
  margin-top: 9px;
  margin-bottom: 9px;
  font-weight: 600;
}

.column-left-heading-cancel {
  text-align: right;
  background: white;
  border-radius:3px;
  cursor: pointer;
  padding: 5px;
  box-shadow: -1px 2px 5px 3px #eaedff;
}
.column-left-heading-cancel-text {
  font-size: 12px;
  color: #5281ff;
  text-transform: uppercase;
  font-weight: 600;
  margin:0;
  padding:0;
  cursor:pointer;
}

.StripeElement {
  box-sizing: border-box;

  height: 40px;

  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>