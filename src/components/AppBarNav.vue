<template>
  <div id="appbarnav-container">
    <div class="paper paper-dark">
      <div class="scrollmenu-header">
        <!-- <div class="scrollmenu-title scrollmenu-title-active">Application</div>
        <div class="scrollmenu-title">App</div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

#appbarnav-container {
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.paper {
  width: 100%;
}
.paper-dark {
  background: #04002d;
}
.paper-light {
  background: #f5f5f5;
}

.scrollmenu-header {
  overflow: auto;
  white-space: nowrap;
  height: 50px;
  margin: 10px 5px 0 15px;
}
.scrollmenu-title {
  display: inline-block;

  padding: 5px 15px;

  margin-top: 5px;

  color: #2ea3cb;
  background: #050030;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: #050030;

  text-align: center;
  text-transform: uppercase;

  font-weight: 700;
  font-size: 0.95em;
  color: white;

  cursor: pointer;
}
.scrollmenu-title-active {
  background-color: #0061ef;
  color: white;

  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: #0061ef;
}

</style>