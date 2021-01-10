<template>
  <div class="row">
    <div class="column column-full-width">
      <div class="row row-border-bottom row-border-bottom-tall">
        <div class="column column-data column-header-text column-20 padding-10">Type</div>
        <div class="column column-data column-header-text column-grow padding-10">Configuration</div>
      </div>

      <div class="row row-border-bottom row-border-bottom-tall row-align-start">
        <div class="column column-data column-20 padding-10 break-spaces">
          <select class="column-input-select column-input-select-stretch" 
            :value="this.authorizationType" 
            v-on:input="editAuthorizationTypeAction($event)">
            <option value="noAuth">No Auth</option>
            <option value="basicAuth">Basic Auth</option>
          </select>
          <p>Authorization headers can be added to a request under the headers option, or by configuring basic auth on this page. 
            <span class="text-weight-600">Do not store sensitive information using Text Input. Use a Storage input instead.</span> 
          </p>
        </div>

        <div class="column column-data column-full-width column-grow" v-if="this.authorizationType === 'basicAuth'">

            <div class="row row-border-bottom">
              <div class="column column-data column-10">
                <input
                  disabled
                  type="text"
                  value="Username"
                  class="column-input-select border-hidden column-input-select-stretch"
                />
              </div>
              <div class="column column-data column-10">
                <select 
                  class="column-input-select border-hidden column-input-select-stretch"
                  :value="authorizationUsername().valueType"
                  v-on:input="editAuthorizationValueTypeAction('valueType', authorizationUsername()._id, $event)">
                    <option value="textInput">Text Input</option>
                    <option value="storage">Storage</option>
                    <option value="runtimeResult">Runtime Result</option>
                    <option value="incomingField">Incoming Field</option>
                  </select>
              </div>
              <div class="column column-data column-10" v-if="authorizationUsername().valueType === 'textInput'">
                <input
                  type="text"
                  placeholder="Text Input Value"
                  class="column-input-text border-hidden column-input-select-stretch"
                  :value="authorizationUsername().value"
                  v-on:input="editAuthorizationValueTypeAction('value', authorizationUsername()._id, $event)"
                />
              </div>
              <div class="column column-data column-10" v-if="authorizationUsername().valueType === 'storage'">
                <select class="column-input-select border-hidden column-input-select-stretch"
                  :value="authorizationUsername().value" 
                  v-on:input="editAuthorizationValueTypeAction('value', authorizationUsername()._id, $event)">
                    <option
                        v-for="(storage) in visibleStorages()"
                        :key="storage._id"
                        :value="storage._id"
                      >{{ storage.name }}</option>
                  </select>
              </div>
              <div class="column column-data column-10" v-if="authorizationUsername().valueType === 'runtimeResult'">
                <input
                  type="text"
                  placeholder="Request result name"
                  class="column-input-text border-hidden column-input-select-stretch"
                  :value="authorizationUsername().value"
                  v-on:input="editAuthorizationValueTypeAction('value', authorizationUsername()._id, $event)"
                />
              </div>
              <div class="column column-data column-10" v-if="authorizationUsername().valueType === 'incomingField'">
                <input
                  type="text"
                  placeholder="Field Name"
                  class="column-input-text border-hidden column-input-select-stretch"
                  :value="authorizationUsername().value"
                  v-on:input="editAuthorizationValueTypeAction('value', authorizationUsername()._id, $event)"
                />
              </div>
            </div>



            <div class="row row-border-bottom">
              <div class="column column-data column-10">
                <input
                  disabled
                  type="text"
                  value="Password"
                  class="column-input-select border-hidden column-input-select-stretch"
                />
              </div>
              <div class="column column-data column-10">
                <select class="column-input-select border-hidden column-input-select-stretch"
                :value="authorizationPassword().valueType"
                v-on:input="editAuthorizationValueTypeAction('valueType', authorizationPassword()._id, $event)">
                    <option value="textInput">Text Input</option>
                    <option value="storage">Storage</option>
                    <option value="runtimeResult">Runtime Result</option>
                    <option value="incomingField">Incoming Field</option>
                  </select>
              </div>
              <div class="column column-data column-10" v-if="authorizationPassword().valueType === 'textInput'">
                <input
                  type="text"
                  placeholder="Text Input Value"
                  class="column-input-text border-hidden column-input-select-stretch"
                  :value="authorizationPassword().value"
                  v-on:input="editAuthorizationValueTypeAction('value', authorizationPassword()._id, $event)"
                />
              </div>
              <div class="column column-data column-10" v-if="authorizationPassword().valueType === 'storage'">
                <select class="column-input-select border-hidden column-input-select-stretch"
                  :value="authorizationPassword().value" 
                  v-on:input="editAuthorizationValueTypeAction('value', authorizationPassword()._id, $event)">
                    <option
                        v-for="(storage) in visibleStorages()"
                        :key="storage._id"
                        :value="storage._id"
                      >{{ storage.name }}</option>
                  </select>
              </div>
              <div class="column column-data column-10" v-if="authorizationPassword().valueType === 'runtimeResult'">
                <input
                  type="text"
                  placeholder="Request result name"
                  class="column-input-text border-hidden column-input-select-stretch"
                  :value="authorizationPassword().value"
                  v-on:input="editAuthorizationValueTypeAction('value', authorizationPassword()._id, $event)"
                />
              </div>
              <div class="column column-data column-10" v-if="authorizationPassword().valueType === 'incomingField'">
                <input
                  type="text"
                  placeholder="Field Name"
                  class="column-input-text border-hidden column-input-select-stretch"
                  :value="authorizationPassword().value"
                  v-on:input="editAuthorizationValueTypeAction('value', authorizationPassword()._id, $event)"
                />
              </div>
            </div>


        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'RequestOptionsAuthorization',
  computed: {
    ...mapGetters('request', ['selectedRequest']),
    ...mapGetters('storage', ['visibleStorages']),
    authorizationType: function() {
      if (!this.selectedRequest()._id) return {}
      return this.selectedRequest().authorizationType      
    },
  },
  methods: {
    ...mapMutations('request', ['editRequestKey', 'editRequestAuthorization']),
    editAuthorizationTypeAction: function(event) {
      const value = event.target.value
      this.editRequestKey({ key: 'authorizationType', value, requestId: this.selectedRequest()._id })
    },
    editAuthorizationValueTypeAction: function(taskType, taskId, event) {
      this.editRequestAuthorization({ key: taskType, _id: taskId, value: event.target.value, requestId: this.selectedRequest()._id})
    },
    authorizationUsername: function() {
      if (!this.selectedRequest()._id) return {}
      return this.selectedRequest().authorization[0]      
    },
    authorizationPassword: function() {
      if (!this.selectedRequest()._id) return {}
      return this.selectedRequest().authorization[1]      
    },
  },
};
</script>