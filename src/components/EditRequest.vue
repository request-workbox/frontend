<template>
    <div class="edit-request-container">
        <div class="edit-details">
            <span class="label">Project Name</span>
            <input type="text" class="text-input">
        </div>
        <div class="edit-details">
            <span class="label">Request Name</span>
            <input type="text" class="text-input">
        </div>

        <span class="label">Request Status</span>
        <div class="button-group">
            
            <div class="group-button">
                Active
            </div>
            <div class="group-button">
                Inactive
            </div>
        </div>

        <span class="label">Request Type</span>
        <div class="button-group">
            
            <div class="group-button">
                Request
            </div>
            <div class="group-button">
                Transform
            </div>
        </div>

        <span class="label">Request Type</span>
        <div class="button-group">
            
            <div class="group-button-three">
                Request
            </div>
            <div class="group-button-three">
                Transform
            </div>
            <div class="group-button-three">
                Transform
            </div>
        </div>

        <div class="edit-details">
            <span class="label">Success Codes</span>
            <input type="text" class="text-input">
        </div>

        <div class="edit-details">
            <span class="label">Error Codes</span>
            <input type="text" class="text-input">
        </div>
    </div>
</template>

<style lang="scss">
.button-group {
    display: flex;
    flex-direction: row;
    margin-top:10px;
}
.group-button {
    background:white;
    color:rgba(29, 30, 33, 1);
    width:50%;
    text-align: center;
}
.group-button-three {
    background:white;
    color:rgba(29, 30, 33, 1);
    width:33%;
    text-align: center;
}
.edit-request-container {
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    height: 50%;
    margin: 15px 5px 15px 15px;
    padding: 5px;
    width: 15%;
    background: rgba(29, 30, 33, 1);
    border-style: solid;
    border-width: 2px;
    border-color: rgba(1, 204, 188, 1);
}
.edit-details {
    display:flex;
    flex-direction: column;
}
.label {
    margin-bottom: 5px;
    color: rgba(203, 203, 203, 1);
    font-size: 0.6em;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    margin: 15px 0 5px 0;
}
</style>