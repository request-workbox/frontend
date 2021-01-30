<template>
  <div class="row">
    <div class="column column-full-width">

      <div
        v-for="(workflow) in visibleWorkflows()"
        v-bind:key="workflow._id"
        class="row resource-row"
        v-on:click="selectOrDeselectRowAction(workflow)">
        <div 
          class="column column-full-width resource-button-nav"
          v-bind:class="{'resource-button-nav-selected':rowIsActive(workflow)}">
          <div class="row">
            <div class="column column-grow">
              <p class="resource-button-nav-text">{{ workflow.name }}</p>
            </div>
            <div class="column text-dark-blue text-22" v-if="rowIsActive(workflow)">•</div>
            <div class="column text-white text-22" v-if="!rowIsActive(workflow)">•</div>
          </div>
        </div>
      </div>

      <div class="row padding-top-bottom-5" v-if="!numberOfWorkflows">
        <div class="column column-grow text-center text-12 text-light-grey">You don't have any workflows here.</div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import moment from 'moment-timezone'
import _ from 'lodash'

export default {
  name: 'DashboardResourceListWorkflow',
  computed: {
    ...mapState('workflow', ['option']),
    ...mapGetters('workflow', ['visibleWorkflows','selectedWorkflow']),
    numberOfWorkflows: function() {
      if (!this.visibleWorkflows()) return 0
      else return _.size(this.visibleWorkflows())
    }
  },
  methods: {
    ...mapActions('workflow', ['selectOrDeselectRow']),
    
    rowIsActive: function (workflow) {
      if (workflow._id === this.selectedWorkflow()._id) return true
      else return false
    },
    dateCreated: function(createdAt) {
      if (!createdAt) return ''
      return `${moment(createdAt).format('M-D-YYYY, h:mm a')}`
    },
    selectOrDeselectRowAction: function(workflow) {
      this.selectOrDeselectRow(workflow)
    },
  },
};
</script>

<style lang="scss">
.resource-row-selectable {
  cursor: pointer;
  background:white;
}
.resource-row-selectable:hover {
  background: #dcf0ff !important;

  .text-white {
    color: #dcf0ff !important;
  }
}
.resource-row-selected {
    background: #dcf0ff;
    border-top: #018eff solid 1px !important;
    border-bottom: #018eff solid 1px !important;
    font-weight: 600;
  }

  .padding-right-13 {
    padding-right: 13px;
  }
  .padding-left-right-5 {
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
  .padding-left-5 {
    padding-left: 5px !important;
  }


  .resource-row {
    .text-button-selected {
      background: #e3f5e2;
    }

    display: flex;
    flex-direction: column;
    width: 175px;

    // padding-bottom:25px;

    background:white;

    // padding: 0 15px
  }

 .resource-button-nav {
    background: white;
    color: #395b75;
    cursor: pointer;
    font-size: 11px;
    width: 100%;
    padding: 0 3px;
  }

  .resource-button-nav-off {
    background: white;
    color: #395b75;
    font-size: 12px;

    width: 100%;
  }

  .resource-button-nav-text {
    padding: 0;
    margin: 0;
  }

  .resource-button-nav-selected {
    .resource-button-nav-text {
      color: #060b3e;
      font-weight: 600;
    }
    background: #f5f5f5;
  }

  .resource-button-nav:hover {

    .resource-button-nav-text {
      color: #060b3e;
    }

    background: #fbf9f9;
  }
</style>