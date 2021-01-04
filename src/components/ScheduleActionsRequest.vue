<template>
  <div class="row row-border-bottom">
    <div class="column column-full-width">
      <div class="row row-justify-between">
        <div class="column">
          <div class="row">
            
            <!-- Date Filter -->
            <div class="column">
              <span class="tiny-text tiny-text-spaced">{{ currentTime }}</span>
            </div>
            <div class="column">
              <input type="date" name="" id="" :value="scheduleDate" v-on:change="changeScheduleDateAction"/>
            </div>

            <!-- Reload / Clear -->
            <div class="spacer"></div>
            <div
              class="column text-button action"
              v-if="!loading"
              v-bind:class="{ disabled: !this.selectedData()._id }"
              v-on:click="getScheduleAction"
            >
              Reload
            </div>
            <div
              class="column text-button action"
              v-if="loading"
            >
              Loading...
            </div>
            <div
              class="column text-button action"
              v-if="!clearing"
              v-bind:class="{ disabled: !this.selectedData()._id }"
              v-on:click="archiveAllQueueAction"
            >
              Archive Upcoming
            </div>
            <div
              class="column text-button action"
              v-if="clearing"
            >
              Archiving...
            </div>


            <div class="large-spacer" v-if="this.selectedData()._id"></div>

            <!-- Schedule Request -->
            <div class="column text-button action action-text-center" v-if="this.selectedData()._id" v-on:click="returnRequestAction">Return Request</div>
            <div class="column text-button action action-text-center" v-if="this.selectedData()._id" v-on:click="queueRequestAction">Queue Request</div>
            <div class="column text-button action action-text-center" v-if="this.selectedData()._id" v-on:click="scheduleRequestAction">Schedule Request</div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import moment from 'moment-timezone'
import Vue from 'vue'

export default {
  name: "ScheduleActionsRequest",
  data: function () {
    return {
      loading: false,
      clearing: false,
    };
  },
  computed: {
    ...mapState('schedule', ['scheduleDate','scheduleType', 'scheduleStatus', 'currentTime']),
    ...mapGetters("table", ["selectedData"]),
    ...mapState("table", ["editing"]),
    ...mapState("table", ["option"]),
  },
  methods: {
    ...mapMutations('schedule', ['changeScheduleDate', 'changeScheduleType', 'changeScheduleStatus']),
    ...mapMutations('table', ['changeSelectedQueueStatId','changeSelectedInstanceStatId']),
    ...mapActions("table", [
      'returnRequest','queueRequest','scheduleRequest',
    ]),
    ...mapActions('schedule', [
      'getSchedule',
      'archiveAllQueue'
    ]),
    changeScheduleDateAction: function(event) {
      this.changeSelectedQueueStatId('')
      this.changeSelectedInstanceStatId('')
      this.changeScheduleDate(event.srcElement.value)
    },
    getScheduleAction: async function () {
      if (!this.selectedData()._id) return;
      if (!this.selectedData().workflowId) return;
      
      this.loading = true
      try {
        const payload = {
          workflowId: this.selectedData().workflowId,
          date: moment(this.scheduleDate),
        };
        await this.getSchedule(payload);
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false
      }
    },
    archiveAllQueueAction: async function(queueId) {
      if (!this.selectedData()._id) return;
      if (!this.selectedData().workflowId) return;

      const date = moment(this.scheduleDate)
      const workflowId = this.selectedData().workflowId
      const queueType = this.scheduleType

      const confirm = window.confirm(`Are you sure you want to unschedule [${queueType}] queue types occurring on [${this.scheduleDate}]?`)
      if (confirm) {
        this.clearing = true
        try {
          const payload = {
            date: date,
            workflowId: workflowId,
            queueType: queueType,
          }
          await this.archiveAllQueue(payload)
        } catch(err) {
          console.log(err)
        } finally {
          this.clearing = false
        }
      }
    },
    returnRequestAction: async function() {
      if (!this.selectedData()._id) return;
      if (!this.selectedData().workflowId) return;

      try {
        // Info
        Vue.$toast.open({
          message: 'Returning request...',
          type: 'info',
        })
        // Start
        await this.returnRequest(this.selectedData()._id)
        // Success
        Vue.$toast.open({
          message: 'Request returned successfully',
          type: 'success',
        })
      } catch(err) {
        Vue.$toast.open(err.response.data)
      }
    },
    queueRequestAction: async function() {
      if (!this.selectedData()._id) return;
      if (!this.selectedData().workflowId) return;

      try {
        await this.queueRequest(this.selectedData()._id)
        Vue.$toast.open({
          message: 'Queued request',
          type: 'info',
        })
      } catch(err) {
        Vue.$toast.open(err.response.data)
      }
    },
    scheduleRequestAction: async function() {
      if (!this.selectedData()._id) return;
      if (!this.selectedData().workflowId) return;

      try {
        await this.scheduleRequest(this.selectedData()._id)
        Vue.$toast.open({
          message: 'Scheduled request',
          type: 'info',
        })
      } catch(err) {
        Vue.$toast.open(err.response.data)
      }
    },
  },
};
</script>

<style lang="scss">
input[type="date"] {
  font-family: "Open Sans", sans-serif;
}
</style>