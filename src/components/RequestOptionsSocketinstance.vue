<template>
  <div class="row">
    <div class="column column-full-width">

    <div class="row row-border-bottom">
      <div class="column column-data column-header column-10 column-padded">Status Code</div>
      <div class="column column-data column-header column-10 column-padded">Status Text</div>
      <div class="column column-data column-header column-10 column-padded">Request Name</div>
      <div class="column column-data column-header column-20 column-padded">Request Type</div>
      <div class="column column-data column-header column-grow column-padded">Date</div>
    </div>

    <div class="row row-border-bottom table-row-selectable" v-bind:class="{'table-row-selected':shouldBeSelected(stat._id)}" v-for="(stat) in this.selectedData().stats" :key="stat._id">
      <div class="column column-data column-10 column-padded">{{ stat.status }}</div>
      <div class="column column-data column-10 column-padded">{{ stat.statusText }}</div>
      <div class="column column-data column-10 column-padded">{{ stat.requestName }}</div>
      <div class="column column-data column-20 column-padded">{{ requestType(stat.requestType) }}</div>
      <div class="column column-data column-grow column-padded">{{ statisticCreatedAt(stat.createdAt) }}</div>
    </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import moment from 'moment-timezone'
import _ from 'lodash'

export default {
  name: "RequestOptionsSocketinstance",
  data: function() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapState('table', ['selectedStatId']),
    ...mapGetters("table", ["selectedData"]),
  },
  methods: {
    statisticCreatedAt: function(createdAt) {
      if (!createdAt) return ''
      return `${moment(createdAt).format('M-D-YYYY, h:mm:ss a')}`
    },
    shouldBeSelected: function(statId) {
      if (statId === this.selectedStatId) return true
      else return false
    },
    requestType: function(requestType) {
      return _.upperFirst(requestType)
    }
  }
};
</script>