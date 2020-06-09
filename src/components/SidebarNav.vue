<template>
  <div id="sidebarnav-container">
    <div class="paper">
      <div class="rowmenu">
        <div class="rowmenu-link rowmenu-link-active">Endpoints</div>
        <div class="rowmenu-link">Plugins</div>
        <div class="rowmenu-link">Workflows</div>
        <div class="rowmenu-link">Instances</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#sidebarnav-container {
  height: auto;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  
  padding-top:12px;
}

.paper {
  width: 100%;
}

.rowmenu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.rowmenu-link {
  color: #ffffff;

  width: 91%;

  text-align: left;
  text-transform: none;

  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem;

  cursor: pointer;

  padding: 10px 0 10px 20px;

  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
.rowmenu-link-active {
  background-color: #277bf4;
  color: white;

}
</style>