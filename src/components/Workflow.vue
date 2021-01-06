<template>
  <div id="workflow-container">
    <ProjectInfo />
    <WorkflowMenu />
    <WorkflowTableToolbar />
    <WorkflowTable />
    <WorkflowTableDetails />
    <WorkflowTableOptionsToolbar />
    <WorkflowOptionsActions />
    <WorkflowOptions />
    <Footer />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapActions } from 'vuex'

import ProjectInfo from './ProjectInfo'
import WorkflowMenu from './WorkflowMenu'
import WorkflowTableToolbar from './WorkflowTableToolbar'
import WorkflowTable from './WorkflowTable'
import WorkflowTableDetails from './WorkflowTableDetails'
import WorkflowTableOptionsToolbar from './WorkflowTableOptionsToolbar'
import WorkflowOptionsActions from './WorkflowOptionsActions'
import WorkflowOptions from './WorkflowOptions'
import Footer from './Footer'

export default {
  name: 'Workflow',
  props: ['projectId'],
  components: {
    ProjectInfo,
    WorkflowMenu,
    WorkflowTableToolbar,
    WorkflowTable,
    WorkflowTableDetails,
    WorkflowTableOptionsToolbar,
    WorkflowOptionsActions,
    WorkflowOptions,
    Footer,
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
    ...mapState('queue', ['queueOrderDirection']),
  },
  methods: {
    ...mapMutations('queue', ['addToQueues','editCurrentTime','updateQueueOrderDirection']),
    ...mapMutations('instance', ['addToInstances']),
    ...mapMutations('workflow',['editOption','updateWorkflowOrderDirection']),

    ...mapActions('project', ['getProject']),
    ...mapActions('request', ['listRequests']),
    ...mapActions('workflow', ['listWorkflows']),

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

        const queueOrderDirection = localStorage.getItem('queueOrderDirection') || this.queueOrderDirection
        this.updateQueueOrderDirection({ queueOrderDirection, })
        
        if (this.$route.query && this.$route.query.option) {
          this.editOption(this.$route.query.option)
        }

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
#workflow-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  overflow-x: hidden;

  min-width: 700px;
}
</style>