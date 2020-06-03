<template>
    <div class="create-request-container">
        <div class="create-request-header-container">
            <button>+</button>
        </div>
        <div class="create-request-menu-container">
            
            <div class="create-request-menu-header">
                <span>Requests</span>
            </div>
            <div class="create-request-menu">
                <button>
                    <span>Get Cat Photo</span>
                </button>
            </div>

            <div class="create-request-menu-header">
                <span>Transform Requests</span>
            </div>
            <div class="create-request-menu">
                <button>
                    <span>Log Request</span>
                </button>
            </div>

            <div class="create-request-menu-header">
                <span>Transform Response</span>
            </div>
            <div class="create-request-menu">
                <button>
                    <span>Flatten Object</span>
                </button>
            </div>

            <div class="create-request-menu-header">
                <span>Transform Tasks</span>
            </div>
            <div class="create-request-menu">
                <button>
                    <span>Insert Parameters</span>
                </button>
            </div>

            <div class="create-request-menu-header">
                <span>Projects</span>
            </div>
            <div class="create-request-menu">
                <button>
                    <span>Animal Photos</span>
                </button>
            </div>


        </div>
        <div class="create-request-footer-container">
            <div class="create-request-menu">
                <button>
                    <span>Create Project</span>
                </button>
            </div>
            <div class="create-request-menu">
                <button>
                    <span>Logout</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CreateRequest'
}
</script>

<style lang="scss">
.create-request-container {
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    height: 50%;
    margin: 15px 5px 15px 15px;
    padding: 5px;
    width: 10%;
    background: rgba(29, 30, 33, 1);
    border-style: solid;
    border-width: 2px;
    border-color: rgba(1, 204, 188, 1);
}
.create-request-header-container {
    height: 5%;
    width:100%;
    display:flex;
    justify-content: flex-end;
}
.create-request-header-container button {
    margin: 5px 5px 0 0;
    height:15px;
    width:15px;
    padding: 0;
    font-size:0.6em;
}
.create-request-menu-container {
    flex-grow: 1;
}
.create-request-footer-container {
    height: 10%;
}
.create-request-menu-header {
    margin-bottom: 5px;
    color: rgba(203, 203, 203, 1);
    font-size: 0.6em;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    margin: 25px 0 5px 0;
}
.create-request-menu button {
    width:100%;
    text-align: left;
    // background: #595959;
    // color: white;
    // border-radius: 5px;
}
button span {
    font-size:0.8em;
}
</style>