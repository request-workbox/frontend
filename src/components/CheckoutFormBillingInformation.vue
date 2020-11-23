<template>
  <div class="row row-border-bottom">
    <div class="column column-full-width">

      <div class="row">
        <div class="column column-full-width">
          <div class="row row-justify-center margin-bottom-10">
            <div class="column">
              <img src="/dash.svg" alt="" class="small-image">
            </div>
            <div class="spacer"></div>
            <div class="column column-grow margin-bottom-5">
              Standard Account
            </div>
          </div>
          
          <div class="row">
            <div class="column">
              <img src="/checkmark.png" alt="" id="checkmark-img" class="checkmark-list-item">
            </div>
            <div class="spacer"></div>
            <div class="column text-12">
              5 Requests Per Workflow
            </div>
          </div>
          <div class="row">
            <div class="column">
              <img src="/checkmark.png" alt="" id="checkmark-img" class="checkmark-list-item">
            </div>
            <div class="spacer"></div>
            <div class="column text-12">
              5 Requests Per Minute
            </div>
          </div>
          <div class="row">
            <div class="column">
              <img src="/checkmark.png" alt="" id="checkmark-img" class="checkmark-list-item">
            </div>
            <div class="spacer"></div>
            <div class="column text-12">
              1 Minute Queue Delay
            </div>
          </div>
        </div>
      </div>

      <!-- BILLING INFORMATION -->
      <div class="row margin-top-10">
        <div class="column column-full-width">
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

      <!-- Address
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
      </div> -->

      <!-- City
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
      </div> -->

      <!-- State and Zip -->
      <!-- <div class="row row-justify-between row-shadow row-white">
        <div class="column column-min-100">
          <div class="row">
            <div class="column column-full-width column-left-heading">
              <p class="column-left-heading-text">Promo</p>
            </div>
          </div>
        </div>
        <div class="column column-grow">
          <div class="row">
            <div class="column column-full-width">
              <input type="text" class="card-container-input-text card-container-input-text-short" placeholder="Enter Promo Code">
            </div>
          </div>
        </div>
        <div class="column column-20">
          <div class="row">

          </div>
        </div>
        <div class="column column-grow">
          <div class="row">
            <div class="column column-grow">
              <p class="column-left-heading-cancel-text">Apply Code</p>
            </div>
          </div>
        </div>
      </div> -->
      
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: "CheckoutFormBillingInformation",
};
</script>