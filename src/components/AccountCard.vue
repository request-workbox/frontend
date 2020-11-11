<template>
  <div class="row row-border-bottom" id="card-container-row">
    <div class="column column-full-width" id="card-container">

      <!-- BILLING INFORMATION -->
      <div class="row">
        <div class="column-column-full-width">
          <p class="column-left-heading-header">Billing Information</p>
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
              <input type="text" class="card-container-input-text" placeholder="Jenny Rosen">
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
              <input type="text" class="card-container-input-text card-container-input-text-short" placeholder="jenny@example.com">
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
              <input type="text" class="card-container-input-text card-container-input-text-short" placeholder="185 Congress Street Suite 550">
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
              <input type="text" class="card-container-input-text card-container-input-text-short" placeholder="Austin">
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
              <input type="text" class="card-container-input-text card-container-input-text-short" placeholder="TX">
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
              <input type="text" class="card-container-input-text card-container-input-text-short" placeholder="78701">
            </div>
          </div>
        </div>
      </div>

      <!-- Country -->
      <div class="row row-justify-between row-shadow row-white">
        <div class="column column-min-100">
          <div class="row">
            <div class="column column-full-width column-left-heading">
              <p class="column-left-heading-text">Country</p>
            </div>
          </div>
        </div>
        <div class="column column-grow">
          <div class="row">
            <div class="column column-full-width">
              <input type="text" class="card-container-input-text card-container-input-text-short" placeholder="United States">
            </div>
          </div>
        </div>
      </div>

      <!-- PAYMENT INFORMATION -->
      <div class="row">
        <div class="column-column-full-width">
          <p class="column-left-heading-header">Payment Information</p>
        </div>
      </div>

      <!-- Name -->
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

      <!-- Pay Now Button -->
      <div class="row row-justify-between row-shadow row-white">
        <div class="column column-grow">
          <div class="row">
            <div class="column column-grow column-button">
              <p class="column-button-text">Pay $5.00</p>
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
  name: "AccountCard",
  mounted: function() {
    const card = this.$stripe.elements().create('card')
      card.mount('#card-info')
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

  background: #00000029;

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
  border:#868686 solid 1px;

  min-width: 500px;

  padding: 50px;
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
    // border-bottom-style: solid;
    // border-bottom-width: 3px;
    // border-bottom-color: #1c96f3;
}
#card-info {
  margin-top: 5px;
  // box-shadow: 1px 2px 3px 0px #d4d4d4;
}



.row-white {
  background:white !important;

  border-bottom-color: #edeff1;
    border-bottom-style: solid;
    border-bottom-width: 1px;
}
.row-shadow {
  justify-content: space-between;
  box-shadow: 0px 2px 4px 0px #bac7d0;
}



.column-left-heading {
  text-align: right;
}
.column-left-heading-text {
  font-size: 15px;
  color: #6772e5;
  margin-top: 11px;
  margin-bottom: 11px;
}
.column-left-heading-header {
  font-size: 15px;
  color: #060b3e;
  margin-top: 11px;
  margin-bottom: 11px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 13px;
}

.column-button {
  background: #6772e5;
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
</style>