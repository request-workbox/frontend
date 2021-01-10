<template>
  <div id="request-container">
    <ProjectInfo />
    <RequestMenu />
    <RequestTableToolbar />
    <RequestTable />
    <RequestTableDetails />
    <RequestTableOptionsToolbar />
    <RequestOptionsActions />
    <RequestOptions />
    <Footer />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapMutations, mapState } from 'vuex'

import ProjectInfo from './ProjectInfo'
import RequestMenu from './RequestMenu'
import RequestTableToolbar from './RequestTableToolbar'
import RequestTable from './RequestTable'
import RequestTableDetails from './RequestTableDetails'
import RequestTableOptionsToolbar from './RequestTableOptionsToolbar'
import RequestOptionsActions from './RequestOptionsActions'
import RequestOptions from './RequestOptions'
import Footer from './Footer'

export default {
  name: 'Request',
  props: ['projectId'],
  components: {
    ProjectInfo,
    RequestMenu,
    RequestTableToolbar,
    RequestTable,
    RequestTableDetails,
    RequestTableOptionsToolbar,
    RequestOptionsActions,
    RequestOptions,
    Footer,
  },
  mounted: function() {
    this.init()
  },
  beforeRouteUpdate (to, from, next) {
    // this.init()
    return next()
  },
  computed: {
    ...mapState('request', ['requestOrderDirection']),
  },
  methods: {
    ...mapMutations('queue', ['addToQueues','editCurrentTime']),
    ...mapMutations('instance', ['addToInstances']),
    ...mapMutations('request',['editOption','updateRequestOrderDirection']),

    ...mapActions('project', ['getProject']),
    ...mapActions('request', ['listRequests']),
    ...mapActions('storage', ['listStorages']),

    addToSchedule: function(socketStat) {
      if (socketStat.queueDoc) this.addToQueues(socketStat.queueDoc)
      else if (socketStat.instanceDoc) this.addToInstances(socketStat.instanceDoc)
    },
    
    init: async function() {
      try {
        const project = await this.getProject({ projectId: this.projectId })
        const storages = await this.listRequests({ projectId: this.projectId })
        const requests = await this.listStorages({ projectId: this.projectId })

        const requestOrderDirection = localStorage.getItem('requestOrderDirection') || this.requestOrderDirection
        this.updateRequestOrderDirection({ requestOrderDirection, })
        
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
        console.log('Request error', err.message)
      }
    }
  }
};
</script>