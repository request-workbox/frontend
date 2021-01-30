<template>
  <div class="resource-picker">
    <div class="row flex-direction-column">
      <div 
        class="column column-full-width display-flex justify-content-center padding-top-bottom-10 cursor-pointer resource" 
        v-bind:class="{ 'resource-selected': selectedResource === 'workflow' }"
        v-on:click="updateSelectedResourceAction('workflow')"
        v-on:mouseover="showTooltip('workflow')" v-on:mouseout="hideTooltip('workflow')">
        <img class="width-25 margin-right-5" src="/workflow.svg">
        <div v-if="workflowTooltip" class="tooltip tooltip-workflow">Workflows</div>
      </div>
      <div 
        class="column column-full-width display-flex justify-content-center padding-top-bottom-10 cursor-pointer resource" 
        v-bind:class="{ 'resource-selected': selectedResource === 'request' }"
        v-on:click="updateSelectedResourceAction('request')"
        v-on:mouseover="showTooltip('request')" v-on:mouseout="hideTooltip('request')">
        <img class="width-25 margin-right-5" src="/request.svg">
        <div v-if="requestTooltip" class="tooltip tooltip-request">Requests</div>
      </div>
      <div 
        class="column column-full-width display-flex justify-content-center padding-top-bottom-10 cursor-pointer resource" 
        v-bind:class="{ 'resource-selected': selectedResource === 'storage' }"
        v-on:click="updateSelectedResourceAction('storage')"
        v-on:mouseover="showTooltip('storage')" v-on:mouseout="hideTooltip('storage')">
        <img class="width-25 margin-right-5" src="/storage.svg">
        <div v-if="storageTooltip" class="tooltip tooltip-storage">Storages</div>
      </div>
      <div 
        class="column column-full-width display-flex justify-content-center padding-top-bottom-10 cursor-pointer resource" 
        v-bind:class="{ 'resource-selected': selectedResource === 'queue' }"
        v-on:click="updateSelectedResourceAction('queue')"
        v-on:mouseover="showTooltip('queue')" v-on:mouseout="hideTooltip('queue')">
        <img class="width-25 margin-right-5" src="/queue.svg">
        <div v-if="queueTooltip" class="tooltip tooltip-queue">Queues</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'DashboardResourcePicker',
  data: function() {
    return {
      workflowTooltip: false,
      requestTooltip: false,
      storageTooltip: false,
      queueTooltip: false,
    }
  },
  computed: {
    ...mapState('dashboard',['selectedResource'])
  },
  methods: {
    ...mapMutations('dashboard', ['updateSelectedResource']),
    showTooltip: function(type) {
      const tooltipType = `${type}Tooltip`
      this[tooltipType] = true
    },
    hideTooltip: function(type) {
      const tooltipType = `${type}Tooltip`
      this[tooltipType] = false
    },
    updateSelectedResourceAction: function(resource) {
      this.updateSelectedResource(resource)
    },
  }
};
</script>

<style lang="scss">

</style>