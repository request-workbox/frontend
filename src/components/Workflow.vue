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
      <WorkflowRequestList />
    </div>
    <div class="tabbar-fixed">

    </div>
    <div class="topbar-fixed">

    </div>
    <div class="right-sidebar-fixed">

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, mapActions } from 'vuex'

import WorkflowMenu from './WorkflowMenu'
import WorkflowList from './WorkflowList'
import WorkflowListMenu from './WorkflowListMenu'
import WorkflowRequestList from './WorkflowRequestList'

export default {
  name: 'Workflow',
  props: ['projectId'],
  components: {
    WorkflowMenu,
    WorkflowList,
    WorkflowListMenu,
    WorkflowRequestList,
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
  },
  methods: {
    ...mapMutations('queue', ['addToQueues','editCurrentTime']),
    ...mapMutations('instance', ['addToInstances']),
    ...mapMutations('workflow',['updateWorkflowOrderDirection']),

    ...mapActions('project', ['getProject']),
    ...mapActions('request', ['listRequests']),
    ...mapActions('workflow', ['listWorkflows','getWorkflow']),

    addToSchedule: function(socketStat) {
      if (socketStat.queueDoc) this.addToQueues(socketStat.queueDoc)
      else if (socketStat.instanceDoc) this.addToInstances(socketStat.instanceDoc)
    },

    init: async function () {
      try {

        const project = await this.getProject({ projectId: this.projectId })
        const requests = await this.listRequests({ projectId: this.projectId })
        const workflows = await this.listWorkflows({ projectId: this.projectId })

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
  background: #599bf1;
}

.full-sidebar-fixed {
  position: absolute;
  left: 0;
  top: 24px;
  width: 315px;
  height: auto;
  background: pink;
  z-index: 2;
  box-shadow: 0px 4px 3px 0px #e6e8ea;
}
.full-sidebar-fixed-detail {
  position: absolute;
  left: 0;
  top: 48px;
  width: 315px;
  height: 150px;
  background: pink;
  overflow: scroll;
}
.left-sidebar-fixed {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 315px;
  top: 198px;
  background: green;
}
.tabbar-fixed {
  position: absolute;
  top: 24px;
  right: 305px;
  left: 315px;
  height: 40px;
  background: purple;
}
.topbar-fixed {
  position: absolute;
  top: 64px;
  right: 305px;
  left: 315px;
  bottom: 0;
  background: yellow;
  overflow: auto;
}
.right-sidebar-fixed {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 305px;
  top: 24px;
  background: red;
}
</style>