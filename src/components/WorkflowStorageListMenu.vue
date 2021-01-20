<template>
  <div class="row">
    <div class="column column-full-width table-row-data-light padding-left-right-15">

      <div class="row row-border-bottom-light">
        <div class="column column-grow workflow-column-data-header text-11">
          STORAGES
          <span class="text-9 margin-left-5" v-if="filter === 'active'">(Active)</span>
          <span class="text-9 margin-left-5" v-if="filter === 'archived'">(Archived)</span>
        </div>
        <div class="column cursor-pointer" v-if="!loading" @mouseover="showAddTooltip" @mouseout="hideAddTooltip" v-on:click="createStorageAction()">
          <img class="width-13 margin-right-10" src="/add.svg">
          <div class="add-tooltip" v-if="addTooltip">
            New Storage
          </div>
        </div>
        <div class="column cursor-pointer" @mouseover="showEditTooltip" @mouseout="hideEditTooltip" v-on:click="showDropdown">
          <img class="width-13 margin-right-10" src="/elipsis.svg">
          <div class="edit-tooltip" v-if="editTooltip">
            Storage Status
          </div>
        </div>
        <div class="edit-dropdown" v-if="dropdown">
          <div class="row edit-dropdown-row" v-on:click="changeFilterAction('active')">
            <div class="column padding-10 width-35 height-13">
              <img class="width-13 margin-left-10" src="/check.svg" v-if="filter === 'active'">
            </div>
            <div class="column column-grow edit-dropdown-button">Active</div>
          </div>
          <div class="row edit-dropdown-row" v-on:click="changeFilterAction('archived')">
            <div class="column padding-10 width-35 height-13">
              <img class="width-13 margin-left-10" src="/check.svg" v-if="filter === 'archived'">
            </div>
            <div class="column column-grow edit-dropdown-button">Archived</div>
          </div>
        </div>
        <Spinner v-if="loading"/>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import moment from 'moment-timezone'
import _ from 'lodash'

import Spinner from './Spinner'

export default {
  name: 'WorkflowStorageListMenu',
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
    ...mapState('project', ['selectedProjectId']),
    ...mapState('storage', ['option','editing','filter']),
    ...mapGetters('storage', ['selectedStorage']),
  },
  methods: {
    ...mapMutations('storage', ['changeFilter']),
    ...mapActions('storage', ['selectOrDeselectRow','createStorage']),
    createStorageAction: async function() {
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
    changeFilterAction: function(filter) {
      this.changeFilter(filter)
      this.hideDropdown()
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
    dateCreated: function(createdAt) {
      if (!createdAt) return ''
      return `${moment(createdAt).format('M-D-YYYY, h:mm a')}`
    },
  },
};
</script>

<style lang="scss" scoped>
.add-tooltip {
    position: absolute;
    top: -22px;
    right: -17px;
    
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
    right: -54px;
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
  right: -128px;
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
.padding-left-right-15 {
  padding: 0 15px !important;
}
.padding-left-5 {
  padding-left: 5px !important;
}
.padding-left-10 {
  padding-left: 10px !important;
}

.workflow-column-data-header {
  white-space: nowrap;
  overflow: auto;
  font-size: 10px;
  font-weight: 600;
}
</style>