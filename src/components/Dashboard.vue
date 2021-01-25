<template>
  <div id="dashboard-container">
    <div class="dashboard-menu">
      <DashboardMenu 
        v-on:singleWindow="singleWindow"
        v-on:splitHorizontal="splitHoriziontal" 
        v-on:splitVertical="splitVertical" />
    </div>

    <div class="resource-picker">

    </div>

    <div class="resource-menu">

    </div>

    <div class="windows">
      <div ref="window1" class="window-1">
        <div class="pane1"></div>
        <div class="pane2"></div>
      </div>

      <div ref="window2" class="window-2">
        <div class="pane3"></div>
        <div class="pane4"></div>
      </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

import DashboardMenu from './DashboardMenu'

export default {
  name: 'Dashboard',
  props: ['projectId'],
  components: {
    DashboardMenu,
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

    singleWindow: function() {
      this.$refs.window1.style.right = '0'
      this.$refs.window1.style.bottom = '0'
      this.$refs.window1.style.height = 'auto'

      this.$refs.window2.style.display = 'none'
    },

    splitHoriziontal: function() {
      // split vertical
      // window 1 - right 50% to right 0
      // window 1 - bottom 0 to bottom auto
      // window 1 - height 50%
      // window 2 - left 50% to left 0
      // window 2 - top 0 to top auto
      // window 2 - height 50%

      this.$refs.window1.style.right = '0'
      this.$refs.window1.style.bottom = 'auto'
      this.$refs.window1.style.height = '50%'

      this.$refs.window2.style.left = '0'
      this.$refs.window2.style.top = 'auto'
      this.$refs.window2.style.height = '50%'
      this.$refs.window2.style.display = 'block'
    },
    splitVertical: function() {
      // split horizontal
      // window 1 - right 0 to right 50%
      // window 1 - bottom auto to bottom 0
      // window 1 - height 50% to height auto
      // window 2 - left 0 to left 50% 
      // window 2 - top auto to top 0 
      // window 2 - height 50% to height auto

      this.$refs.window1.style.right = '50%'
      this.$refs.window1.style.bottom = '0'
      this.$refs.window1.style.height = 'auto'

      this.$refs.window2.style.left = '50%'
      this.$refs.window2.style.top = '0'
      this.$refs.window2.style.height = 'auto'
      this.$refs.window2.style.display = 'block'
    },
  },
};
</script>

<style lang="scss">

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
  background: red;
}

.resource-menu {
  position: absolute;
  top: 25px;
  left: 50px;
  bottom: 0;
  width: 275px;
  background: blue;
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

// split vertical
// .window-1 {
//   position: absolute;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   background: purple;
//   right: 50%;
// }
// .window-2 {
//   position: absolute;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   background: yellow;
//   left: 50%;
// }


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