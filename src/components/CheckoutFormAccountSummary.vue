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
            <div class="column column-grow margin-bottom-5 light-blue-container">
              <span class="text-weight-600">Project name: </span>
              <span>{{ projectName }}</span>
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
    ...mapState('checkout', ['product','projectName']),
  }
};
</script>