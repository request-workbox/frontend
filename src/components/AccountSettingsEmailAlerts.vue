<template>
  <div class="row">
    <div class="column column-full-width">

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Email Alerts</div>
      </div>

      <!-- Marketing Alerts -->
      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            class="column-input-text"
            value="Marketing"
            disabled
          />
        </div>
        <div class="column email-alert-form-row">
          <input type="radio" id="sendEmailPromotions" :value="true" v-model="emailPromotions">
          <label for="sendEmailPromotions">Send</label>

          <input type="radio" id="doNotSendEmailPromotions" :value="false" v-model="emailPromotions">
          <label for="doNotSendEmailPromotions">Do Not Send</label>
        </div>
      </div>

      <!-- Product Updates -->
      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            class="column-input-text"
            value="Product Updates"
            disabled
          />
        </div>
        <div class="column email-alert-form-row">
          <input type="radio" id="sendEmailProducts" :value="true" v-model="emailProducts">
          <label for="sendEmailProducts">Send</label>

          <input type="radio" id="doNotSendEmailProducts" :value="false" v-model="emailProducts">
          <label for="doNotSendEmailProducts">Do Not Send</label>
        </div>
      </div>

      <!-- System Announcements -->
      <div class="row row-border-bottom">
        <div class="column column-data column-20">
          <input
            type="text"
            class="column-input-text"
            value="System Announcements"
            disabled
          />
        </div>
        <div class="column email-alert-form-row">
          <input type="radio" id="sendSystemUpdates" :value="true" v-model="emailSystemUpdates">
          <label for="sendSystemUpdates">Send</label>

          <input type="radio" id="doNotSendSystemUpdates" :value="false" v-model="emailSystemUpdates">
          <label for="doNotSendSystemUpdates">Do Not Send</label>
        </div>
      </div>

      

    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'AccountSettingsEmailAlerts',
  computed: {
    ...mapState("billing",{
      'emailPromotionsState':'emailPromotions',
      'emailProductsState':'emailProducts',
      'emailSystemUpdatesState':'emailSystemUpdates',
    }),
    userAttributeEmail: function () {
      return this.$store.getters['cognito/userAttributes']['email']
    },
    emailPromotions: {
      get() {
        return this.emailPromotionsState
      },
      set (value) {
        this.updateEmailPromotions(value)
        this.updateEmailAlert({
          emailAlertType: 'emailPromotions',
          emailAlertValue: value,
        })
      }
    },
    emailProducts: {
      get() {
        return this.emailProductsState
      },
      set(value) {
        this.updateEmailProducts(value)
        this.updateEmailAlert({
          emailAlertType: 'emailProducts',
          emailAlertValue: value,
        })
      }
    },
    emailSystemUpdates: {
      get() {
        return this.emailSystemUpdatesState
      },
      set(value) {
        this.updateEmailSystemUpdates(value)
        this.updateEmailAlert({
          emailAlertType: 'emailSystemUpdates',
          emailAlertValue: value,
        })
      }
    },
  },
  methods: {
    ...mapMutations('billing', ['updateEmailPromotions', 'updateEmailProducts', 'updateEmailSystemUpdates',]),
    ...mapActions('billing', ['updateEmailAlert'])
  }
}
</script>

<style lang="scss" scoped>
.email-alert-form-row {
  margin: 5px 0;

  input {
    margin: 5px 5px 5px 10px;
  }
  label {
    margin-left: 10px;
    font-size: 0.85em;
    font-weight: 400;
  }
}
</style>