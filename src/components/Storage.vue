<template>
  <div id="storage-container">
    <ProjectInfo />
    <StorageMenu />
    <StorageTableToolbar />
    <StorageTable />
    <StorageTableDetails />
    <StorageTableOptionsToolbar />
    <StorageOptionsActions />
    <StorageOptions />
    <Footer />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations, mapActions } from 'vuex'

import ProjectInfo from './ProjectInfo'
import StorageMenu from './StorageMenu'
import StorageTableToolbar from './StorageTableToolbar'
import StorageTable from './StorageTable'
import StorageTableDetails from './StorageTableDetails'
import StorageTableOptionsToolbar from './StorageTableOptionsToolbar'
import StorageOptionsActions from './StorageOptionsActions'
import StorageOptions from './StorageOptions'
import Footer from './Footer'

export default {
  name: 'Storage',
  props: ['projectId'],
  components: {
    ProjectInfo,
    StorageMenu,
    StorageTableToolbar,
    StorageTable,
    StorageTableDetails,
    StorageTableOptionsToolbar,
    StorageOptionsActions,
    StorageOptions,
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
    ...mapState('request', ['storageOrderDirection']),
  },
  methods: {
    ...mapMutations('storage',['editOption','updateStorageOrderDirection']),

    ...mapActions('project', ['getProject']),
    ...mapActions('storage',['listStorages']),
    init: async function () {
      try {

        const project = await this.getProject({ projectId: this.projectId })
        const storages = await this.listStorages({ projectId: this.projectId })

        const storageOrderDirection = localStorage.getItem('storageOrderDirection') || this.storageOrderDirection
        this.updateStorageOrderDirection({ storageOrderDirection, })
        
        if (this.$route.query && this.$route.query.option) {
          this.editOption(this.$route.query.option)
        }

      } catch(err) {
        console.log('Storage error', err.message)
      }
    },
  },
};
</script>

<style lang="scss">
#storage-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  overflow-x: hidden;

  min-width: 700px;
}
</style>