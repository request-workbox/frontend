<template>
  <div class="row">
    <div class="column column-full-width padding-left-right-15">

      <div
        v-for="(request) in visibleRequests()"
        v-bind:key="request._id"
        class="row request-row"
        v-on:click="selectOrDeselectRowAction(request)">
          <!-- <div class="column column-data column-20">{{ dateCreated(request.createdAt) }}</div> -->
          <div class="column column-full-width request-button-nav">
            <div class="row">
              <div class="column column-grow">
                <p class="request-button-nav-text">{{ request.name }}</p>
              </div>
              <div class="column padding-right-7">
                <img class="width-11" src="/drag.svg" alt="">
              </div>
            </div>
          </div>
          <!-- <div class="column column-data column-grow">{{ request.url }}</div>
          <div class="column column-data column-20">{{ request._id }}</div> -->
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
  name: 'WorkflowRequestList',
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

      // if (this.selectedRequest()._id === request._id) {
      //   this.$router.replace({ path: this.$route.name, query: { option: this.option, }}).catch((err) => err)
      // } else {
      //   this.$router.replace({ path: this.$route.name, query: { id: request._id, option: this.option, }}).catch((err) => err)
      // }
    },
  },
};
</script>

<style lang="scss">

  .request-row {
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

 .request-button-nav {
    background: white;
    color: #395b75;
    cursor: pointer;
    font-size: 11px;

    width: 100%;

    margin: 2px 2px;

    border-radius: 3px;

    transition: 0.7s;

    border: solid 1px #a5adff;
  }

  .request-button-nav-off {
    background: white;
    color: #395b75;
    font-size: 12px;

    width: 100%;
  }

  .request-button-nav-text {
    padding-left: 7px;
    margin: 7px;
  }

  .request-button-nav-selected {
    .request-button-nav-text {
      color: #060b3e;
      font-weight: 600;
      font-size: 12px;
    }
    background: #addbff;
  }

  .request-button-nav:hover {

    cursor: move;

    .request-button-nav-text {
      color: #0c5894;
      color: #060b3e;
      font-weight: 600;
    }

    background: #d9dcff;
  }

  .request-button-nav-text-header {
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