<template>
  <div class="row">
    <div class="column column-full-width">

      <div
        v-for="(request) in visibleRequests()"
        v-bind:key="request._id"
        class="row resource-row row-border-bottom-light"
        v-on:click="selectOrDeselectRowAction(request)">
        <div 
          class="column column-full-width resource-button-nav"
          v-bind:class="{'resource-button-nav-selected':rowIsActive(request)}">
          <div class="row">
            <div class="column column-grow">
              <p class="resource-button-nav-text">{{ request.name }}</p>
            </div>
            <div class="column text-dark-blue text-22 padding-right-13" v-if="rowIsActive(request)">•</div>
            <div class="column text-white text-22 padding-right-13" v-if="!rowIsActive(request)">•</div>
          </div>
        </div>
      </div>

      <div class="row row-border-bottom-light padding-top-bottom-5" v-if="!numberOfRequests">
        <div class="column column-grow text-center text-12 text-light-grey">You don't have any requests here.</div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import moment from 'moment-timezone'
import _ from 'lodash'

export default {
  name: 'DashboardResourceListRequest',
  computed: {
    ...mapState('request', ['option','editing']),
    ...mapGetters('request', ['visibleRequests','selectedRequest']),
    numberOfRequests: function() {
        if (!this.visibleRequests()) return 0
        else return _.size(this.visibleRequests())
      }
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
    },
  },
};
</script>

<style lang="scss">

  .resource-row {
    .text-button-selected {
      background: #e3f5e2;
    }

    display: flex;
    flex-direction: column;
    width: 175px;

    padding-bottom:25px;

    background:white;

    padding: 0 15px
  }

 .resource-button-nav {
    background: white;
    color: #395b75;
    cursor: pointer;
    font-size: 11px;

    width: 100%;

    margin: 2px 2px;

    border-radius: 3px;

    // transition: 0.1s;

    border: solid 1px #a5adff;
  }

  .resource-button-nav-off {
    background: white;
    color: #395b75;
    font-size: 12px;

    width: 100%;
  }

  .resource-button-nav-text {
    padding-left: 7px;
    margin: 7px;
  }

  .resource-button-nav-selected {
    .resource-button-nav-text {
      color: #060b3e;
      font-weight: 600;
      font-size: 12px;
    }
    background: #f5f5f5;
  }

  .resource-button-nav:hover {

    .resource-button-nav-text {
      color: #0c5894;
      color: #060b3e;
    }

    background: #fbf9f9;
  }

  .resource-button-nav-text-header {
    padding-left: 7px;
    font-weight: 700;
    cursor: default;
    font-size: 10px !important;
    text-transform: uppercase;
  }

  .padding-right-7 {
    padding-right: 7px;
  }

  .width-11 {
    width: 11px;
  }
</style>