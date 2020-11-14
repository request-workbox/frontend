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

</style>