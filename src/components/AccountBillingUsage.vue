<template>
  <div class="row">
    <div class="column column-full-width">

      <div class="row row-border-bottom">
        <div class="column column-data column-header-text column-grow column-group-header">Usage</div>
      </div>

      <div class="row row-border-bottom">
        <div class="column column-full-width">
          <div class="row">
            
            <div class="column column-data column-20">
              <input
                type="text"
                placeholder="Key"
                class="column-input-text"
                value="Invoice Month"
                disabled
              />
            </div>
            
            <div class="column">
              <div class="row">
                <div class="spacer"></div>

                <!-- Date Filter -->
                <div class="column">
                  <select class="column-input-select" :value="'NOV'">
                    <option value="JAN">JAN</option>
                    <option value="FEB">FEB</option>
                    <option value="MAR">MAR</option>
                    <option value="APR">APR</option>
                    <option value="MAY">MAY</option>
                    <option value="JUN">JUN</option>
                    <option value="JUL">JUL</option>
                    <option value="AUG">AUG</option>
                    <option value="SEP">SEP</option>
                    <option value="OCT">OCT</option>
                    <option value="NOV">NOV</option>
                    <option value="DEC">DEC</option>
                  </select>
                </div>

                <div class="spacer"></div>

                <div class="column">
                  <select class="column-input-select" value="2020">
                    <option value="2020">2020</option>
                  </select>
                </div>

                <!-- Reload / Clear -->
                <div class="spacer"></div>
                <div
                  class="column text-button action"
                >
                  Load Usage
                </div>
        
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'AccountBillingUsage',
}
</script>