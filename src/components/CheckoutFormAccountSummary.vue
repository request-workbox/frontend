<template>
  <div class="row row-border-bottom">
    <div class="column column-full-width">

      <div class="row">
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

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: "CheckoutFormAccountSummary",
};
</script>