<template>
    <ProjectInfo />
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

import ProjectInfo from "./ProjectInfo";

export default {
    name: 'Workflow',
    props: ['projectId'],
    components: {
        ProjectInfo,
    },
    mounted: function() {
        this.init()
    },
    beforeRouteUpdate (to, from, next) {
        this.init()
        return next()
    },
    methods: {
        ...mapMutations('project/projectInfo', ['changeUrlProjectId']),
        ...mapActions('project/projectInfo', ['getProjectName']),
        init: function() {
            this.getProjectName({ projectId: this.projectId })
        }
    }
}
</script>