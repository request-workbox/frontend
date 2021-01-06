<template>
  <div class="row" id="table-row">
    <div class="column column-full-width table-row-data">
      <div class="row row-border-bottom">
        <div class="column column-data column-header column-20">
          <span class="column-text-button" v-on:click="toggleRequestOrderDirection">Date Created</span>
        </div>
        <div class="column column-data column-header column-10">Name</div>
        <div class="column column-data column-header column-grow">Url</div>
        <div class="column column-data column-header column-20">Request ID</div>
      </div>

      <div
        v-for="(request) in visibleRequests()"
        v-bind:key="request._id"
        class="row row-border-bottom table-row-selectable"
        v-bind:class="{ 'table-row-selected': rowIsActive(request) }"
        v-on:click="selectOrDeselectRowAction(request)">
          <div class="column column-data column-20">{{ dateCreated(request.createdAt) }}</div>
          <div class="column column-data column-10">{{ request.name }}</div>
          <div class="column column-data column-grow">{{ request.url }}</div>
          <div class="column column-data column-20">{{ request._id }}</div>
      </div>

      <div
        v-for="(row) in leftoverRows"
        v-bind:key="row._id"
        class="row row-border-bottom table-row-selectable">
          <div class="column column-data column-20 column-filler"></div>
          <div class="column column-data column-10 column-filler"></div>
          <div class="column column-data column-grow column-filler"></div>
          <div class="column column-data column-20 column-filler"></div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import moment from 'moment-timezone'
import _ from 'lodash'

export default {
  name: 'RequestTable',
  computed: {
    ...mapState('request', ['option','editing']),
    ...mapGetters('request', ['visible','selectedRequest']),
    leftoverRows: function() {
      const leftover = 10 - _.size(this.visibleRequests())
      return leftover
    }
  },
  methods: {
    ...mapMutations('request', ['toggleRequestOrderDirection']),
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

      if (this.selectedRequest()._id === request._id) {
        this.$router.replace({ path: this.$route.name, query: { option: this.option, }}).catch((err) => err)
      } else {
        this.$router.replace({ path: this.$route.name, query: { id: request._id, option: this.option, }}).catch((err) => err)
      }
    },
  },
};
</script>