<template>
  <div class="row row-border-bottom">
    <div class="column column-full-width">

      <div class="row" v-if="checkoutType === 'standard'">
        <div class="column column-full-width blue-container">
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

      <div class="row" v-if="checkoutType === 'developer'">
        <div class="column column-full-width blue-container">
          <div class="row row-justify-center margin-bottom-10">
            <div class="column">
              <img src="/dash.svg" alt="" class="small-image">
            </div>
            <div class="spacer"></div>
            <div class="column column-grow margin-bottom-5">
              Developer Account
            </div>
          </div>
          
          <div class="row">
            <div class="column">
              <img src="/checkmark.png" alt="" id="checkmark-img" class="checkmark-list-item">
            </div>
            <div class="spacer"></div>
            <div class="column text-12">
              15 Requests Per Workflow
            </div>
          </div>
          <div class="row">
            <div class="column">
              <img src="/checkmark.png" alt="" id="checkmark-img" class="checkmark-list-item">
            </div>
            <div class="spacer"></div>
            <div class="column text-12">
              15 Requests Per Minute
            </div>
          </div>
          <div class="row">
            <div class="column">
              <img src="/checkmark.png" alt="" id="checkmark-img" class="checkmark-list-item">
            </div>
            <div class="spacer"></div>
            <div class="column text-12">
              30 Second Queue Delay
            </div>
          </div>
        </div>
      </div>

      <div class="row" v-if="checkoutType === 'professional'">
        <div class="column column-full-width blue-container">
          <div class="row row-justify-center margin-bottom-10">
            <div class="column">
              <img src="/dash.svg" alt="" class="small-image">
            </div>
            <div class="spacer"></div>
            <div class="column column-grow margin-bottom-5">
              Professional Account
            </div>
          </div>
          
          <div class="row">
            <div class="column">
              <img src="/checkmark.png" alt="" id="checkmark-img" class="checkmark-list-item">
            </div>
            <div class="spacer"></div>
            <div class="column text-12">
              50 Requests Per Workflow
            </div>
          </div>
          <div class="row">
            <div class="column">
              <img src="/checkmark.png" alt="" id="checkmark-img" class="checkmark-list-item">
            </div>
            <div class="spacer"></div>
            <div class="column text-12">
              50 Requests Per Minute
            </div>
          </div>
          <div class="row">
            <div class="column">
              <img src="/checkmark.png" alt="" id="checkmark-img" class="checkmark-list-item">
            </div>
            <div class="spacer"></div>
            <div class="column text-12">
              0 Minute Queue Delay
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
  name: "CheckoutFormAccountSummary",
  computed: {
    ...mapState('checkout', ['checkoutType']),
  }
};
</script>