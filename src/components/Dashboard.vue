<template>
  <div id="dashboard-container" v-on:mouseup="mouseUp">
    <div class="dashboard-menu">
      <DashboardMenu 
        v-on:singleWindow="singleWindow"
        v-on:splitHorizontal="splitHoriziontal" />
    </div>

    <div class="resource-picker">

    </div>

    <div class="resource-menu">

    </div>

    <div class="windows" v-on:mousemove="mouseMove">
      <div ref="window1" class="window-1">
        <div ref="panel1" class="panel-1">
          <div ref="panel1menu" class="panel-1-menu"></div>
        </div>
        <div ref="panel2" class="panel-2">
          <div ref="panel2slider" class="panel-2-slider" v-on:mousedown="panel2MouseDown"></div>
          <div ref="panel2menu" class="panel-2-menu"></div>
        </div>
      </div>

      <div ref="window2" class="window-2">
        <div ref="windowSlider" class="window-slider" v-on:mousedown="windowDown"></div>
        <div ref="panel3" class="panel-3">
          <div ref="panel3menu" class="panel-3-menu"></div>
        </div>
        <div ref="panel4" class="panel-4">
          <div ref="panel4slider" class="panel-4-slider" v-on:mousedown="panel4MouseDown"></div>
          <div ref="panel4menu" class="panel-4-menu"></div>
        </div>
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
  data: function() {
    return {
      windowView: 'single', // horizontal
      
      windowDrag: false,
      windowY: 0,
      
      panel2Drag: false,
      panel2X: 0,
      
      panel4Drag: false,
      panel4X: 0,
    }
  },
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
    singleWindow: function() {
      this.windowView = 'single'

      this.$refs.panel1.style.right = '50%'
      this.$refs.panel2.style.left = '50%'
      this.$refs.panel3.style.right = '50%'
      this.$refs.panel4.style.left = '50%'

      this.$refs.window1.style.right = '0'
      this.$refs.window1.style.bottom = '0'
      this.$refs.window1.style.height = 'auto'

      this.$refs.window2.style.display = 'none'
    },
    splitHoriziontal: function() {
      // window 1 - right 50% to right 0
      // window 1 - bottom 0 to bottom auto
      // window 1 - height 50%
      // window 2 - left 50% to left 0
      // window 2 - top 0 to top auto
      // window 2 - height 50%

      this.windowView = 'horizontal'

      this.$refs.panel1.style.right = '50%'
      this.$refs.panel2.style.left = '50%'
      this.$refs.panel3.style.right = '50%'
      this.$refs.panel4.style.left = '50%'

      this.$refs.window1.style.right = '0'
      this.$refs.window1.style.bottom = 'auto'
      this.$refs.window1.style.height = '50%'

      this.$refs.window2.style.left = '0'
      this.$refs.window2.style.top = 'auto'
      this.$refs.window2.style.height = '50%'
      this.$refs.window2.style.display = 'block'

      this.$refs.windowSlider.style.top = '0'
      this.$refs.windowSlider.style.right = '0'
      this.$refs.windowSlider.style.height = '2px'
      this.$refs.windowSlider.style.width = 'auto'
      this.$refs.windowSlider.style.bottom = 'auto'
      this.$refs.windowSlider.style.cursor = 'row-resize'
    },
    mouseUp: function() {
      this.windowDrag = false
      this.panel2Drag = false
      this.panel4Drag = false
    },
    mouseMove: function(event) {
      if (this.panel2Drag) {
        this.movePanel12(event)
      } else if (this.panel4Drag) {
        this.movePanel34(event)
      } else if (this.windowDrag && this.windowView === 'horizontal') {
        this.moveWindowHorizontal(event)
      }
    },
    windowDown: function(event) {
      this.windowDrag = true
      this.windowX = event.clientX
      this.windowY = event.clientY
    },
    panel2MouseDown: function(event) {
      this.panel2Drag = true
      this.panel2X = event.clientX
    },
    panel4MouseDown: function(event) {
      this.panel4Drag = true
      this.panel4X = event.clientX
    },
    movePanel12: function(event) {
      const 
        currentPanel1 = Number(window.getComputedStyle(this.$refs.panel1).right.split('px')[0]),
        currentPanel2 = Number(window.getComputedStyle(this.$refs.panel2).left.split('px')[0]);

      if (currentPanel1 < 10 || currentPanel2 < 10) return

      if (event.clientX >= this.panel2X) {
        const diff = event.clientX - this.panel2X
        this.$refs.panel1.style.right = `${currentPanel1 - diff}px`
        this.$refs.panel2.style.left = `${currentPanel2 + diff}px`

        this.panel2X = event.clientX 
      } else if (event.clientX <= this.panel2X) {
        const diff = this.panel2X - event.clientX
        this.$refs.panel1.style.right = `${currentPanel1 + diff}px`
        this.$refs.panel2.style.left = `${currentPanel2 - diff}px`

        this.panel2X = event.clientX 
      }
    },
    movePanel34: function(event) {
      const 
        currentPanel3 = Number(window.getComputedStyle(this.$refs.panel3).right.split('px')[0]),
        currentPanel4 = Number(window.getComputedStyle(this.$refs.panel4).left.split('px')[0]);

      if (currentPanel3 < 10 || currentPanel4 < 10) return

      if (event.clientX >= this.panel4X) {
        const diff = event.clientX - this.panel4X
        this.$refs.panel3.style.right = `${currentPanel3 - diff}px`
        this.$refs.panel4.style.left = `${currentPanel4 + diff}px`

        this.panel4X = event.clientX
      } else if (event.clientX <= this.panel4X) {
        const diff = this.panel4X - event.clientX
        this.$refs.panel3.style.right = `${currentPanel3 + diff}px`
        this.$refs.panel4.style.left = `${currentPanel4 - diff}px`

        this.panel4X = event.clientX 
      }
    },
    moveWindowHorizontal: function(event) {
      const 
        currentWindow1 = Number(window.getComputedStyle(this.$refs.window1).height.split('px')[0]),
        currentWindow2 = Number(window.getComputedStyle(this.$refs.window2).height.split('px')[0]);

      if (currentWindow1 < 30 || currentWindow2 < 30) return

      if (event.clientY >= this.windowY) {
        const diff = event.clientY - this.windowY
        this.$refs.window1.style.height = `${currentWindow1 + diff}px`
        this.$refs.window2.style.height = `${currentWindow2 - diff}px`

        this.windowY = event.clientY
      } else if (event.clientY <= this.windowY) {
        const diff = this.windowY - event.clientY
        this.$refs.window1.style.height = `${currentWindow1 - diff}px`
        this.$refs.window2.style.height = `${currentWindow2 + diff}px`

        this.windowY = event.clientY
      }
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