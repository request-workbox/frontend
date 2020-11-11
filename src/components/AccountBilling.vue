<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Account Type</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Account Type"
            disabled
          />
        </div>
        <div class="column text-button action" v-on:click="updateAccountTypeAction('free')">
          <span>Free</span>
        </div>
        <div class="column text-button action" v-on:click="updateAccountTypeAction('standard')">
          <span>Standard</span>
        </div>
        <div class="column text-button action" v-on:click="updateAccountTypeAction('developer')">
          <span>Developer</span>
        </div>
        <div class="column text-button action" v-on:click="updateAccountTypeAction('professional')">
          <span>Professional</span>
        </div>
        <div class="column column-grow"></div>
        <span class="tiny-text tiny-text-spaced">Balances are prorated.</span>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Premium Requests</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Credit Remaining"
            disabled
          />
        </div>
        <span class="tiny-text tiny-text-spaced">$7.95</span>
        <div class="column text-button action"><span>$5</span></div>
        <div class="column text-button action"><span>$25</span></div>
        <div class="column text-button action"><span>$50</span></div>
        <div class="column column-grow"></div>
        <span class="tiny-text tiny-text-spaced">Credit is required to run premium requests.</span>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Payment Information</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            placeholder="Key"
            class="column-input-text"
            value="Payment Card"
            disabled
          />
        </div>
        <span class="tiny-text tiny-text-spaced">VISA 4444</span>
        <div class="column text-button action" v-on:click="changeCardAction">
          <span>Change Card</span>
        </div>
        <div class="column text-button action">
          <span>Remove Card</span>
        </div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Usage</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-full-width">
          <div class="row">
            
            <div class="column column-data column-20">
              <input
                type="text"
                placeholder="Key"
                class="column-input-text"
                value="Invoice Month"
                disabled
              />
            </div>
            
            <div class="column">
              <div class="row">
                <div class="spacer"></div>

                <!-- Date Filter -->
                <div class="column">
                  <select class="column-input-select" :value="'NOV'">
                    <option value="JAN">JAN</option>
                    <option value="FEB">FEB</option>
                    <option value="MAR">MAR</option>
                    <option value="APR">APR</option>
                    <option value="MAY">MAY</option>
                    <option value="JUN">JUN</option>
                    <option value="JUL">JUL</option>
                    <option value="AUG">AUG</option>
                    <option value="SEP">SEP</option>
                    <option value="OCT">OCT</option>
                    <option value="NOV">NOV</option>
                    <option value="DEC">DEC</option>
                  </select>
                </div>

                <div class="spacer"></div>

                <div class="column">
                  <select class="column-input-select" value="2020">
                    <option value="2020">2020</option>
                  </select>
                </div>

                <!-- Reload / Clear -->
                <div class="spacer"></div>
                <div
                  class="column text-button action"
                >
                  Load Usage
                </div>
        
              </div>
            </div>
          </div>
        </div>
      </div>

      <AccountBeta />

      <AccountCard />

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AccountBeta from './AccountBeta'
import AccountCard from './AccountCard'

export default {
  name: 'AccountBilling',
  components: {
    AccountBeta,
    AccountCard,
  },
  methods: {
    ...mapActions('billing', ['updateAccountType']),
    updateAccountTypeAction: async function(accountType) {
      try {
        await this.updateAccountType({ accountType: accountType })
      } catch(err) {
        console.log(err)
      }
    },
    changeCardAction: async function() {
      
    }
  }
}
</script>

<style lang="scss">
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