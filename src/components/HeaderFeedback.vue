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
          <input type="radio" id="general" value="general" v-model="feedbackType">
          <label for="general">Feedback</label>
          <br>
          <input type="radio" id="bug" value="bug" v-model="feedbackType">
          <label for="bug">Bug Report</label>
          <br>
          <input type="radio" id="feature" value="feature" v-model="feedbackType">
          <label for="feature">Feature Request</label>
        </div>
      </div>
      <!-- Text area row -->
      <div class="row" id="feedback-text-row" v-if="!submitted">
        <div class="column column-full-width">
          <p class="feedback-title-detail-margin">Enter your message below.</p>
          <textarea v-model="feedbackText"></textarea>
          <p class="feedback-title-detail-margin" v-if="feedbackError">Please enter a message before submitting.</p>
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
      feedbackType:'general',
      feedbackText: '',
      feedbackError: false,

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
          this.feedbackType = 'general'
          this.feedbackText = ''
          this.feedbackError = false

          this.changeDisplayForm(displayForm)
          this.changeSubmitted(displayForm)
      },
      submitFeedbackAction: async function() {
        try {
          if (this.feedbackText === '') {
            return this.feedbackError = true
          }
          this.submitting = true
          await this.submitFeedback({ feedbackType: this.feedbackType, feedbackText: this.feedbackText, })
        } catch(err) {
          console.log('Header feedback error', err.message)
        } finally {
          this.submitting = false
        }
      }
  }
};
</script>

<style lang="scss">
#feedback-container-row {
  // position: fixed;
  // width:100%;
  // height:100%;
  // top:0;
  // bottom:0;
  // left:0;
  // right:0;

  // background: #00000029;

  // z-index:1;

  // display: flex;
  // flex-direction: column;

  // padding-top: 100px;
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
#feedback-container {
  // background: #f9f9f9;
  // height: auto;
  // width:auto;

  // border-radius: 3px;
  // border:#868686 solid 1px;

  // min-width: 375px;
  background: #edeff1;
  height: auto;
  width:auto;
  border-radius: 3px;
  border:#dcdcdc solid 1px;
  min-width: 500px;
  padding: 10px 50px 25px 50px;
  box-shadow:0px 2px 4px 2px #595a5a;
}

#feedback-title-row {
  // background: #526e84;

  p {
    width: 100%;
    margin: 10px;

    color:black;

    font-weight: 600;
  }

  .feedback-title-detail {
    color:black;
    font-size: 0.75em;

    font-weight: 400;
  }
}

.feedback-title-detail-margin {
    color:black;
    font-size: 0.75em;

    font-weight: 400;
    margin-left: 10px;
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
    min-height: 73px;
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