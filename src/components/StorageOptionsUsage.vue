<template>
  <div class="row">
    <div class="column column-full-width">

      <div class="row row-border-bottom table-row-selectable" v-for="(total, key) in usageTotal()" :key="key">
        <div class="column column-data column-10 column-padded">{{ `Total` }}</div>
        <div class="column column-data column-10 column-padded">{{ key }}</div>
        <div class="column column-data column-10 column-padded">{{ total }}</div>
        <div class="column column-data column-10 column-padded">{{ `` }}</div>
        <div class="column column-data column-grow column-padded">{{ `` }}</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-data column-header column-10 column-padded">Location</div>
        <div class="column column-data column-header column-10 column-padded">Type</div>
        <div class="column column-data column-header column-10 column-padded">Usage Amount</div>
        <div class="column column-data column-header column-10 column-padded">Measurement</div>
        <div class="column column-data column-header column-10 column-padded">Direction</div>
        <div class="column column-data column-header column-20 column-padded">Date</div>
        <div class="column column-data column-header column-grow column-padded">Detail</div>
      </div>

      <div class="row row-border-bottom table-row-selectable" v-for="(usage) in this.selectedData().usage" :key="usage._id">
        <div class="column column-data column-10 column-padded">{{ usageUppercase(usage.usageLocation) }}</div>
        <div class="column column-data column-10 column-padded">{{ usageUppercase(usage.usageType) }}</div>
        <div class="column column-data column-10 column-padded">{{ usage.usageAmount }}</div>
        <div class="column column-data column-10 column-padded">{{ usage.usageMeasurement }}</div>
        <div class="column column-data column-10 column-padded">{{ usage.usageDirection }}</div>
        <div class="column column-data column-20 column-padded">{{ usageCreatedAt(usage.createdAt) }}</div>
        <div class="column column-data column-grow column-padded">{{ usage.usageDetail }}</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column text-button action" v-if="!loadingUsage" v-on:click="getStorageUsageAction()">Load Usage</div>
        <div class="column text-button action" v-if="loadingUsage">Loading Usage...</div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import moment from 'moment-timezone'
import _ from 'lodash'

export default {
  name: "StatisticOptionsUsage",
  data: function() {
    return {
      loadingUsage: false,
    }
  },
  computed: {
    ...mapGetters("table", ['selectedData', 'selectedStat', 'usageTotals']),
  },
  methods: {
    ...mapActions('table', ['getStorageUsage']),
    getStorageUsageAction: async function() {
      try {
        this.loadingUsage = true
        await this.getStorageUsage({storageId: this.selectedData()._id})
      } catch(err) {
        console.log('Error getting storage usage')
      } finally {
        this.loadingUsage = false
      }
    },
    usageUppercase: function(usage) {
      if (usage === 'api') return 'Dashboard'
      return _.upperFirst(usage)
    },
    usageCreatedAt: function(createdAt) {
      if (!createdAt) return ''
      return `${moment(createdAt).format('M-D-YYYY, h:mm:ss a')}`
    },
    usageTotal: function() {
      return this.usageTotals(this.selectedData()._id)
    },
  }
};
</script>

<style lang="scss">
.table-row-selectable:hover {
  background: #dcf0ff !important;
  border-top: #2196f3 solid 1px !important;
  border-bottom: #2196f3 solid 1px !important;
}
</style>