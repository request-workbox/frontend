<template>
  <div id="dashboard-container" v-on:mouseup="mouseUpAction">

    <DashboardMenu 
        v-on:singleWindow="singleWindowAction"
        v-on:splitHorizontal="splitHoriziontalAction" />

    <DashboardResourcePicker />

    <DashboardResourceMenuWorkflow />

    <DashboardWindows ref="dashboardWindows" />

  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

import DashboardMenu from './DashboardMenu'
import DashboardResourcePicker from './DashboardResourcePicker'
import DashboardResourceMenuWorkflow from './DashboardResourceMenuWorkflow'
import DashboardWindows from './DashboardWindows'

export default {
  name: 'Dashboard',
  props: ['projectId'],
  data: function() {
    return {
      windowView: 'single', // horizontal
    }
  },
  components: {
    DashboardMenu,
    DashboardResourcePicker,
    DashboardResourceMenuWorkflow,
    DashboardWindows,
  },
  mounted: function () {
    this.init()
  },
  beforeRouteUpdate(to, from, next) {
    // this.init()
    return next()
  },
  created() {
    window.addEventListener('resize', this.resizeWindowAction)
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeWindowAction)
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

    init: async function () {
      try {

        const project = await this.getProject({ projectId: this.projectId })
        // const requests = await this.listRequests({ projectId: this.projectId })
        // const workflows = await this.listWorkflows({ projectId: this.projectId })
        // const storages = await this.listStorages({ projectId: this.projectId })

        // const workflowOrderDirection = localStorage.getItem('workflowOrderDirection') || this.workflowOrderDirection
        // this.updateWorkflowOrderDirection({ workflowOrderDirection, })

        // const session = await this.$store.dispatch('cognito/fetchSession')
        // const userSub = this.$store.getters['cognito/userSub']
        // if (userSub) {
        //   Vue.$apiSocket.on(userSub, this.addToSchedule)
        //   Vue.$jobsSocket.on(userSub, this.addToSchedule)
        // }

        // const thisRef = this
        // setInterval(function() {
        //   thisRef.editCurrentTime()
        // }, 1000)

        console.log('Dashboard')

      } catch(err) {
        console.log('Dashboard error', err.message)
      }
    },
    addToSchedule: function(socketStat) {
      if (socketStat.queueDoc) this.addToQueues(socketStat.queueDoc)
      else if (socketStat.instanceDoc) this.addToInstances(socketStat.instanceDoc)
    },
    resizeWindowAction: function() {
      if (this.windowView === 'single') return this.$refs.dashboardWindows.singleWindow()
      else if (this.windowView === 'horizontal') return this.$refs.dashboardWindows.splitHorizontal()
    },
    mouseUpAction: function() {
      this.$refs.dashboardWindows.mouseUp()
    },
    singleWindowAction: function() {
      this.windowView = 'single'
      this.$refs.dashboardWindows.singleWindow()
    },
    splitHoriziontalAction: function() {
      this.windowView = 'horizontal'
      this.$refs.dashboardWindows.splitHorizontal()
    },
  },
};
</script>

<style lang="scss">

.tooltip {
  font-size: 10px;
  background: white;
  z-index: 2;
  padding: 4px;
  /* border-radius: 2px; */
  color: #42596b;
  // border-color: #42596b;
  // border-style: solid;
  border-radius: 2px;
  border-width: 1px;
  transition: 1s;
}

.tooltip-workflow {
  position: absolute;
  top: -13px;
  right: -39px;
}
.tooltip-request {
  position: absolute;
  top: 31px;
  right: -34px;
}
.tooltip-storage {
  position: absolute;
  top: 77px;
  right: -34px;
}
.tooltip-queue {
  position: absolute;
  top: 122px;
  right: -29px;
}

#dashboard-container {
  position: fixed;
  top: 39px;
  bottom: 0;
  left:0;
  right: 0;
  background: white;
}

.dashboard-menu {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 25px;
  background: white;
}

.resource-picker {
  position: absolute;
  top: 25px;
  left: 0;
  bottom: 0;
  width: 50px;
  background: white;
}

.resource:hover {
  background: #d1d1d1;
}

.windows {
  position: absolute;
  background: green;
  top: 25px;
  left: 325px;
  right: 0;
  bottom: 0;
}

// single window (initial state)
.window-1 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: auto;
  background: purple;
}
.window-2 {
  // (horizontal but hidden)
  display: none;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  background: yellow;
  height: 50%;
}

// split horizontal (initial state)
// .window-1 {
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   height: 50%;
//   background: purple;
// }
// .window-2 {
//   position: absolute;
//   bottom: 0;
//   right: 0;
//   left: 0;
//   background: yellow;
//   height: 50%;
// }

// row resize
.window-slider {
  position: absolute;
  background: slategray;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;

  cursor: row-resize;
  z-index: 1;
}

// column-resize
// .window-slider {
//   position: absolute;
//   background: slategray;
//   top: 0;
//   left: 0;
//   width: 2px;
//   bottom: 0;

//   cursor: col-resize;
//   z-index: 1;
// }

// column-resize
.panel-2-slider {
  position: absolute;
  background:springgreen;
  top: 0;
  left: 0;
  bottom: 0;
  width: 2px;

  cursor: col-resize;
  z-index: 1;
}

.panel-4-slider {
  position: absolute;
  background:steelblue;
  top: 0;
  left: 0;
  bottom: 0;
  width: 2px;

  cursor: col-resize;
  z-index: 1;
}

.panel-1-menu {
  position: absolute;
  background: sandybrown;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
}
.panel-2-menu {
  position: absolute;
  background:seagreen;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
}
.panel-3-menu {
  position: absolute;
  background:skyblue;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
}
.panel-4-menu {
  position: absolute;
  background:slateblue;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
}


.panel-1 {
  position: absolute;
  background: white;
  top: 0;
  bottom: 0;
  right: 50%;
  left: 0;
}
.panel-2 {
  position: absolute;
  background: black;
  top: 0;
  bottom: 0;
  right: 0;
  left: 50%;
}

.panel-3 {
  position: absolute;
  background: lightblue;
  top: 0;
  bottom: 0;
  right: 50%;
  left: 0;
}
.panel-4 {
  position: absolute;
  background: salmon;
  top: 0;
  bottom: 0;
  right: 0;
  left: 50%;
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