<template>
  <div class="resource-menu">
    <div class="row row-border-bottom-light">
      <div class="column column-grow workflow-column-data-header text-11">
        QUEUE
      </div>
      <div class="column cursor-pointer" v-if="!loading" @mouseover="showAddTooltip" @mouseout="hideAddTooltip" v-on:click="listQueuesAction()">
        <img class="width-13 margin-right-10" src="/refresh.svg">
        <div class="add-tooltip" v-if="addTooltip">
          Reload History
        </div>
      </div>
      <div class="column cursor-pointer" @mouseover="showEditTooltip" @mouseout="hideEditTooltip" v-on:click="toggleDropdown">
        <img class="width-13 margin-right-10" src="/elipsis.svg">
        <div class="edit-tooltip" v-if="editTooltip">
          Workflow API
        </div>
      </div>
      <div class="edit-dropdown" v-if="dropdown">
        <div class="row edit-dropdown-row" v-on:click="copyToClipboard('return')">
          <div class="column edit-dropdown-button">Copy Return URL</div>
        </div>
        <div class="row edit-dropdown-row" v-on:click="copyToClipboard('queue')">
          <div class="column edit-dropdown-button">Copy Queue URL</div>
        </div>
        <div class="row edit-dropdown-row" v-on:click="copyToClipboard('schedule')">
          <div class="column edit-dropdown-button">Copy Schedule URL</div>
        </div>
      </div>
      <Spinner v-if="loading"/>
    </div>

    <div class="row row-border-bottom-light display-hide width-0" v-if="this.selectedWorkflow()._id">
      <div class="column account-column-data column-20">
        <div class="column text-button action action-text-center">Copy Return URL</div>
      </div>
      <div class="column account-column-data">
        <input
          type="text"
          placeholder="Key"
          class="column-input-text"
          :value="triggerUrl('return')"
          ref="returnUrl"
        />
      </div>
    </div>

    <div class="row row-border-bottom-light display-hide width-0" v-if="this.selectedWorkflow()._id">
      <div class="column account-column-data column-20">
        <div class="column text-button action action-text-center">Copy Queue URL</div>
      </div>
      <div class="column account-column-data">
        <input
          type="text"
          placeholder="Key"
          class="column-input-text"
          :value="triggerUrl('queue')"
          ref="queueUrl"
        />
      </div>
    </div>

    <div class="row row-border-bottom-light display-hide width-0" v-if="this.selectedWorkflow()._id">
      <div class="column account-column-data column-20">
        <div class="column text-button action action-text-center">Copy Schedule URL</div>
      </div>
      <div class="column account-column-data">
        <input
          type="text"
          placeholder="Key"
          class="column-input-text"
          :value="triggerUrl('schedule')"
          ref="scheduleUrl"
        />
      </div>
    </div>


    <div class="row flex-direction-column row-align-start">
      <div class="column column-full-width row-border-bottom-light">
        <p class="resource-label">Untitled Folder</p>
      </div>
      <div class="column column-full-width row-border-bottom-light">
        <p class="resource-detail">Apple</p>
      </div>
      <div class="column column-full-width row-border-bottom-light">
        <p class="resource-detail">Stripe</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import _ from 'lodash'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

import Spinner from './Spinner'

export default {
  name: 'DashboardResourceMenuWorkflow',
  data: function() {
    return {
      loading: false,
      addTooltip: false,
      editTooltip: false,
      dropdown: false,
    }
  },
  components: {
    Spinner,
  },
  computed: {
    ...mapState('workflow',['apiUrl']),
    ...mapState('queue', ['queueDate']),

    ...mapGetters('workflow', ['selectedWorkflow'])
  },
  methods: {
    ...mapActions('queue', ['listQueues']),
    listQueuesAction: async function () {
      try {
        this.loading = true

        const payload = { workflowId: this.selectedWorkflow()._id, date: moment(this.queueDate), }
        const queues = await this.listQueues(payload)
      } catch (err) {
        console.log('Queue actions error', err.message)
      } finally {
        this.loading = false
      }
    },
    reloadHistoryAction: async function() {
      try {
        this.loading = true
        this.addTooltip = false
        const payload = ({ projectId: this.selectedProjectId, storageType: 'text' })
        const storage = await this.createStorage(payload)
      } catch(err) {
        console.log('Storage menu error', err.message)
      } finally {
        this.loading = false
      }
    },
    showAddTooltip: function() {
      this.addTooltip = true
    },
    hideAddTooltip: function() {
      this.addTooltip = false
    },
    showEditTooltip: function() {
      this.editTooltip = true
    },
    hideEditTooltip: function() {
      this.editTooltip = false
    },
    showDropdown: function() {
      this.dropdown = true
    },
    hideDropdown: function() {
      this.dropdown = false
    },
    toggleDropdown: function() {
      this.dropdown = !this.dropdown
    },
    dateCreated: function(createdAt) {
      if (!createdAt) return ''
      return `${moment(createdAt).format('M-D-YYYY, h:mm a')}`
    },
    copyToClipboard: function(queueType) {

      const queueTypeRef = `${queueType}Url`
      const ref = this.$refs[queueTypeRef]

      console.log(queueTypeRef)
      console.log(ref)

      /* Select the text field */
      ref.select();
      ref.setSelectionRange(0, 99999); /*For mobile devices*/

      /* Copy the text inside the text field */
      document.execCommand("copy");

      Vue.$toast.open({ message: 'Copied text to clipboard!', type: 'success', })

      this.dropdown = false
    },
    triggerUrl: function(queueType) {
      if (!this.selectedWorkflow() || !this.selectedWorkflow()._id) return ''

      if (queueType === 'schedule') {
        return `${this.apiUrl}/schedule-workflow/${this.selectedWorkflow()._id}?date=[ISO 8601]`
      } else {
        return `${this.apiUrl}/${queueType}-workflow/${this.selectedWorkflow()._id}`
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.resource-menu {
  position: absolute;
  top: 25px;
  left: 50px;
  bottom: 0;
  width: 275px;
  background: white;
}
.resource-menu-header {
  margin: 3px;
  padding: 0;
  font-weight: 600;
  font-size: 13px;
}
.resource-label {
  margin: 3px;
  padding: 0;
  font-size: 12px;
}
.resource-detail {
  margin: 3px;
  padding: 0;
  font-size: 14px;
}


.display-hide {
  visibility: hidden;
}
.width-0 {
  width: 0 !important;
}
.add-tooltip {
    position: absolute;
    top: -22px;
    right: 56px;
    font-size: 9px;
    background: #011321;
    z-index: 2;
    padding: 4px;
    /* border-radius: 2px; */
    color: #cee9ff;
    border-color: #42596b;
    border-style: solid;
    border-radius: 2px;
    border-width: 1px;
    transition: 1s;
}
.edit-tooltip {
    position: absolute;
    top: -22px;
    right: 39px;
    font-size: 9px;
    background: #011321;
    z-index: 2;
    padding: 4px;
    /* border-radius: 2px; */
    color: #cee9ff;
    border-color: #42596b;
    border-style: solid;
    border-radius: 2px;
    border-width: 1px;
    transition: 1s;
}
.edit-dropdown {
  position: absolute;
  top: 23px;
  right: 22px;
  font-size: 9px;
  background: white;
  color:black;
  z-index: 2;
  padding: 0;
  width: 150px;
  /* border-radius: 2px; */
  color: #cee9ff;
  border-color: #42596b;
  border-style: solid;
  border-radius: 2px;
  border-width: 1px;
  transition: 1s;
}
.edit-dropdown-button {
  color: #011321;
  cursor: pointer;
  font-size: 12px;
  padding: 8px;
  border-radius: 2px;
  min-width: 61px;
}
.edit-dropdown-row {
  background: #ecf0f9;
}
.edit-dropdown-row:hover {
  background: #d8dce6;
}

.workflow-column-data-header {
  white-space: nowrap;
  overflow: auto;
  font-size: 10px;
  font-weight: 600;
}
</style>