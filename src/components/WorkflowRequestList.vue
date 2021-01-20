<template>
  <div class="row" id="table-row">
    <div class="column column-full-width table-row-data-light">

      <div class="row row-border-bottom-light">
        <div class="column account-column-data-header text-11">REQUESTS</div>
      </div>

      <div
        v-for="(request) in visibleRequests()"
        v-bind:key="request._id"
        class="row row-border-bottom table-row-selectable"
        v-bind:class="{ 'table-row-selected': rowIsActive(request) }"
        v-on:click="selectOrDeselectRowAction(request)">
          <!-- <div class="column column-data column-20">{{ dateCreated(request.createdAt) }}</div> -->
          <div class="column column-data column-grow">{{ request.name }}</div>
          <!-- <div class="column column-data column-grow">{{ request.url }}</div>
          <div class="column column-data column-20">{{ request._id }}</div> -->
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import moment from 'moment-timezone'
import _ from 'lodash'

export default {
  name: 'WorkflowRequestList',
  computed: {
    ...mapState('request', ['option','editing']),
  ...mapGetters('request', ['visibleRequests','selectedRequest']),
  },
  methods: {
    ...mapActions('request', ['selectOrDeselectRow']),
    rowIsActive: function (request) {
      if (request._id === this.selectedRequest()._id) return true
      else return false
    },
    dateCreated: function(createdAt) {
      if (!createdAt) return ''
      return `${moment(createdAt).format('M-D-YYYY, h:mm a')}`
    },
    selectOrDeselectRowAction: function(request) {
      this.selectOrDeselectRow(request)

      // if (this.selectedRequest()._id === request._id) {
      //   this.$router.replace({ path: this.$route.name, query: { option: this.option, }}).catch((err) => err)
      // } else {
      //   this.$router.replace({ path: this.$route.name, query: { id: request._id, option: this.option, }}).catch((err) => err)
      // }
    },
  },
};
</script>