<template>
  <div class="row row-border-bottom" id="site-header-container">
        <div class="column column-full-width">
        <div class="row">
            <div class="column text-button" id="site-header">Request Workbox</div>
            <div class="column column-grow"></div>
            <div class="column text-button" id="support-button">Support</div>
            <div class="column text-button" id="feedback-button">Feedback</div>
        </div>
        </div>
    </div>
</template>

<script>

export default {
  name: "Header",
};
</script>

<style lang="scss">
#site-header-container {
  background: black;
}
#site-header {
  font-size: 17px;
  font-weight: 700;
  background: transparent;
  color: white;
}
#support-button {
  background: transparent;
  color: white;
}
#feedback-button {
  background: transparent;
  color: white;
}
</style>