<template>
  <div id="workflowz-container">
    <div class="full-topbar-fixed">
      <WorkflowMenu />
    </div>
    <div class="full-sidebar-fixed">
      <WorkflowListMenu />
    </div>
    <div class="full-sidebar-fixed-detail">
      <WorkflowList />
    </div>
    <div class="left-sidebar-fixed">
      <WorkflowRequestListMenu />
    </div>
    <div class="left-sidebar-fixed-detail">
      <WorkflowRequestList />
    </div>

    <div class="bottom-left-sidebar-fixed">
      <WorkflowStorageListMenu />
    </div>
    <div class="bottom-left-sidebar-fixed-detail">
      <WorkflowStorageList />
    </div>




    <div class="tabbar-fixed">
      <WorkflowTabMenu />
    </div>
    <div class="midbar-fixed">
      <WorkflowInstance />
    </div>
    <div class="topbar-fixed padding-0-15">
      <WorkflowTasksPayload />
      <div class="vertical-line"></div>
      <WorkflowTasksList />
      <div class="vertical-line"></div>
      <WorkflowTasksWebhook />
    </div>

    <div class="bottombar-fixed" v-if="this.selectedStorage()._id">
      <StorageOptionsActions />
      <StorageOptionsDetails />
    </div>


    <div class="right-sidebar-fixed">
      <WorkflowQueueMenu />
    </div>
    <div class="right-sidebar-fixed-detail">
      <Queue />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

import WorkflowMenu from './WorkflowMenu'
import WorkflowTabMenu from './WorkflowTabMenu'
import WorkflowList from './WorkflowList'
import WorkflowListMenu from './WorkflowListMenu'
import WorkflowRequestList from './WorkflowRequestList'
import WorkflowRequestListMenu from './WorkflowRequestListMenu'

import WorkflowTasksPayload from './WorkflowTasksPayload'
import WorkflowTasksList from './WorkflowTasksList'
import WorkflowTasksWebhook from './WorkflowTasksWebhook'

import WorkflowStorageListMenu from './WorkflowStorageListMenu'
import WorkflowStorageList from './WorkflowStorageList'

import WorkflowInstance from './WorkflowInstance'

import Queue from './Queue'
import WorkflowQueueMenu from './WorkflowQueueMenu'

import StorageOptionsActions from './StorageOptionsActions'
import StorageOptionsDetails from './StorageOptionsDetails'

export default {
  name: 'Workflow',
  props: ['projectId'],
  components: {
    WorkflowMenu,
    WorkflowTabMenu,
    WorkflowList,
    WorkflowListMenu,
    WorkflowRequestList,
    WorkflowRequestListMenu,
    WorkflowTasksPayload,
    WorkflowTasksList,
    WorkflowTasksWebhook,
    WorkflowStorageListMenu,
    WorkflowStorageList,
    WorkflowInstance,
    StorageOptionsDetails,
    StorageOptionsActions,
    Queue,
    WorkflowQueueMenu,
  },
  mounted: function () {
    this.init()
  },
  beforeRouteUpdate(to, from, next) {
    // this.init()
    return next()
  },
  computed: {
    ...mapState('workflow', ['workflowOrderDirection']),
    ...mapGetters('storage', ['selectedStorage']),
  },
  methods: {
    ...mapMutations('queue', ['addToQueues','editCurrentTime']),
    ...mapMutations('instance', ['addToInstances']),
    ...mapMutations('workflow',['updateWorkflowOrderDirection']),

    ...mapActions('project', ['getProject']),
    ...mapActions('request', ['listRequests']),
    ...mapActions('workflow', ['listWorkflows','getWorkflow']),
    ...mapActions('storage', ['listStorages']),

    addToSchedule: function(socketStat) {
      if (socketStat.queueDoc) this.addToQueues(socketStat.queueDoc)
      else if (socketStat.instanceDoc) this.addToInstances(socketStat.instanceDoc)
    },

    init: async function () {
      try {

        const project = await this.getProject({ projectId: this.projectId })
        const requests = await this.listRequests({ projectId: this.projectId })
        const workflows = await this.listWorkflows({ projectId: this.projectId })
        const storages = await this.listStorages({ projectId: this.projectId })

        const workflowOrderDirection = localStorage.getItem('workflowOrderDirection') || this.workflowOrderDirection
        this.updateWorkflowOrderDirection({ workflowOrderDirection, })

        const session = await this.$store.dispatch('cognito/fetchSession')
        const userSub = this.$store.getters['cognito/userSub']
        if (userSub) {
          Vue.$apiSocket.on(userSub, this.addToSchedule)
          Vue.$jobsSocket.on(userSub, this.addToSchedule)
        }

        const thisRef = this
        setInterval(function() {
          thisRef.editCurrentTime()
        }, 1000)

      } catch(err) {
        console.log('Workflow error', err.message)
      }
    },
  },
};
</script>

<style lang="scss">

#workflowz-container {
  position: fixed;
  top: 39px;
  bottom: 0;
  left:0;
  right: 0;
  background: white;
}

.full-topbar-fixed {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 24px;
  background: white;
}

.full-sidebar-fixed {
  position: absolute;
  left: 0;
  top: 24px;
  width: 315px;
  height: auto;
  z-index: 2;
}
.full-sidebar-fixed-detail {
  position: absolute;
  left: 0;
  top: 48px;
  width: 315px;
  height: 150px;
  overflow: scroll;
}
.left-sidebar-fixed {
  position: absolute;
  top: 213px;
  left: 0;
  width: 315px;
  height: 24px;
}
.left-sidebar-fixed-detail {
  position: absolute;
  top: 237px;
  left: 0;
  bottom: 0;
  width: 315px;
  height: 150px;
  overflow: scroll;
}
.bottom-left-sidebar-fixed {
  position: absolute;
  top: 402px;
  left: 0;
  width: 315px;
  height: 24px;
}
.bottom-left-sidebar-fixed-detail {
  position: absolute;
  top: 426px;
  left: 0;
  bottom: 0;
  width: 315px;
  bottom: 15px;
  overflow: scroll;
}
.tabbar-fixed {
  position: absolute;
  top: 21px;
  right: 305px;
  left: 315px;
  height: 35px;
}
.midbar-fixed {
  position: absolute;
  top: 56px;
  right: 305px;
  left: 315px;
  height: 101px;
}
.topbar-fixed {
  position: absolute;
  top: 175px;
  right: 305px;
  left: 315px;
  bottom: 0;
  overflow: auto;
  background:#fafcff;
}
.bottombar-fixed {
  position: absolute;
  right: 305px;
  left: 315px;
  bottom: 0;
  height: 255px;
  overflow: auto;
  background:white;
}

.right-sidebar-fixed {
  position: absolute;
  right: 0;
  height: 24px;
  width: 305px;
  top: 24px;
}
.right-sidebar-fixed-detail {
  position: absolute;
  right: 0;
  width: 305px;
  top: 48px;
  bottom: 15px;
  overflow: scroll;
}

.vertical-line {
  width: 1px;
  height: 25px;
  background: #b9b9b9;
  margin-left: 34px;
}
</style>