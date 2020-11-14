<template>
  <div class="row" id="marketing-container-row">
    <div class="column column-full-width" id="marketing-container">

      <!-- Quck and free sign up -->
      <div class="row row-justify-between row-align-start">
        <div class="column column-min-100">
          <div class="row">
            <div class="column column-full-width column-left-heading">
              <!-- <img src="/checkmark.png" alt="" id="checkmark-img" class="checkmark"> -->
            </div>
          </div>
        </div>
        <div class="column column-grow">
          <div class="row">
            <div class="column column-full-width">
              <p class="column-list-heading-header">API Request Management</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quck and free sign up -->
      <div class="row row-justify-between row-align-start">
        <div class="column column-min-100">
          <div class="row">
            <div class="column column-full-width column-left-heading">
              <img src="/checkmark.png" alt="" id="checkmark-img" class="checkmark">
            </div>
          </div>
        </div>
        <div class="column column-grow">
          <div class="row">
            <div class="column column-full-width">
              <p class="column-list-heading-text">Quick and free sign‑up</p>
              <p class="column-list-heading-subtext">Enter your email address to create an account.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Run APIs Without Code -->
      <div class="row row-justify-between row-align-start">
        <div class="column column-min-100">
          <div class="row">
            <div class="column column-full-width column-left-heading">
              <img src="/checkmark.png" alt="" id="checkmark-img" class="checkmark">
            </div>
          </div>
        </div>
        <div class="column column-grow">
          <div class="row">
            <div class="column column-full-width">
              <p class="column-list-heading-text">Run APIs without code</p>
              <p class="column-list-heading-subtext">Create, edit and run requests without a programmer.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Test and connect public and private endpoints -->
      <div class="row row-justify-between row-align-start">
        <div class="column column-min-100">
          <div class="row">
            <div class="column column-full-width column-left-heading">
              <img src="/checkmark.png" alt="" id="checkmark-img" class="checkmark">
            </div>
          </div>
        </div>
        <div class="column column-grow">
          <div class="row">
            <div class="column column-full-width">
              <p class="column-list-heading-text">Test and connect public and private endpoints</p>
              <p class="column-list-heading-subtext">Perform requests via the Dashboard or programmatically through the API.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'

export default {
  name: 'UserRegisterMarketing',
}
</script>