<template>
  <div class="row row-border-bottom" id="feedback-container-row" v-if="displayForm">
    <div class="column column-full-width" id="feedback-container">
      <!-- Title row -->
      <div class="row" id="feedback-title-row">
        <div class="column">
          <p>Submit Feedback</p>
          <p class="feedback-title-detail">We would love to hear from you.</p>
        </div>
      </div>
      <!-- Form row -->
      <div class="row"  id="feedback-form-row" v-if="!submitted">
        <div class="column">
          <input type="radio" id="feature" value="feature" v-model="feedbackType">
          <label for="feature">Feature Request</label>
          <br>
          <input type="radio" id="bug" value="bug" v-model="feedbackType">
          <label for="bug">Bug Report</label>
          <br>
          <input type="radio" id="general" value="general" v-model="feedbackType">
          <label for="general">General Feedback / Other</label>
        </div>
      </div>
      <!-- Text area row -->
      <div class="row" id="feedback-text-row" v-if="!submitted">
        <div class="column column-full-width">
          <textarea placeholder="Please enter feedback here." v-model="feedbackText"></textarea>
        </div>
      </div>
      <!-- Submit / Cancel row -->
      <div class="row" id="feedback-submit-row" v-if="!submitted">
        <div class="column text-button" v-if="!submitting" v-on:click="submitFeedbackAction">Submit</div>
        <div class="column text-button" v-if="submitting">Submitting...</div>

        <div class="column text-button" v-on:click="changeDisplayFormAction(false)">Cancel</div>
      </div>
      <!-- Response row -->
      <div class="row" id="feedback-response-row" v-if="submitted">
        <div class="column">
          <p>Thanks for your feedback!</p>
        </div>
        <div class="column text-button" v-on:click="changeDisplayFormAction(false)">Done</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: "HeaderFeedback",
  data: function() {
    return {
      feedbackType:'',
      feedbackText: '',

      submitting: false,
    }
  },
  computed: {
    ...mapState('header', ['displayForm','submitted']),
  },
  methods: {
      ...mapMutations('header', ['changeDisplayForm', 'changeSubmitted']),
      ...mapActions('header', ['submitFeedback']),
      changeDisplayFormAction: function(displayForm) {
          this.feedbackType = ''
          this.feedbackText = ''

          this.changeDisplayForm(displayForm)
          this.changeSubmitted(displayForm)
      },
      submitFeedbackAction: async function() {
        try {
          this.submitting = true
          await this.submitFeedback({
            feedbackType: this.feedbackType,
            feedbackText: this.feedbackText,
          })
        } catch(err) {
          console.log(err)
        } finally {
          this.submitting = false
        }
      }
  }
};
</script>

<style lang="scss">
#feedback-container-row {
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

  padding-top: 100px;
}
#feedback-container {
  background: #f9f9f9;
  height: auto;
  width:auto;

  border-radius: 3px;
  border:#868686 solid 1px;

  min-width: 375px;
}

#feedback-title-row {
  background: #526e84;

  p {
    width: 100%;
    margin: 10px;

    color:white;

    font-weight: 600;
  }

  .feedback-title-detail {
    color:white;
    font-size: 0.75em;

    font-weight: 400;
  }
}

#feedback-form-row {
  margin: 10px 0;

  input {
    margin: 5px 5px 5px 10px;
  }
  label {
    margin-left: 10px;
    font-size: 0.85em;
    font-weight: 600;
  }
}

#feedback-text-row {
  textarea {
    font-family :Arial, Helvetica, sans-serif;
    width: 92%;

    margin: 10px;
    padding-left: 5px;
    padding-top: 5px;
  }
}

#feedback-submit-row {
  justify-content: flex-end;
  margin-bottom: 10px;

  .text-button {
    margin-right: 10px;

    border: #bbbbbb solid 1px;
  }
}

#feedback-response-row {
  margin: 10px;
  justify-content: center;

  p {
    font-size: 0.75em;
  }
  .text-button {
    margin-left: 10px;
    border: #bbbbbb solid 1px;
  }
}
</style>