<template>
  <div id="app">
    <div class="columns">
    <!-- Side Menu -->
    <div class="column is-2">
      <aside class="menu">
        <p class="menu-label">
          Workspace 
        </p>

        <!-- Options Buttons -->
        <div class="buttons has-text-centered">
          <button class="button" @click="openQueryModal()" v-tooltip="{ content: 'Add Query', placement: 'bottom-end'}">
            <span class="icon is-small">
               <i class="fas fa-plus"></i>
            </span>
          </button>
          <button class="button" @click="openWorkspaceModal()" v-tooltip="{ content: 'Add Workspace', placement: 'bottom-end'}">
            <span class="icon is-small">
               <i class="fas fa-folder-plus"></i>
            </span>
          </button>
          <button class="button" v-if="workspaces[selected_wokspace].name !== 'Default'" @click="deleteWorkspace()" v-tooltip="{ content: 'Delete Workspace', placement: 'bottom-end'}">
            <span class="icon is-small">
               <i class="fas fa-trash"></i>
            </span>
          </button>
        </div>

        <!-- Dropdown -->
        <div class="dropdown" :class="{'is-active': menu_options.workspace_dropdown}" @click="toggleDropdown()">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
              <span>{{workspaces[selected_wokspace].name}}</span>
              <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a v-for="(workspace, index) in workspaces" :key="workspace.id" class="dropdown-item" @click="changeWorkspace(index)">
                {{workspace.name}}
              </a>
            </div>
          </div>
        </div>

        <!-- Query List -->
        <p class="menu-label cursor-point" @click="toggleQueries()">
          Query List
          <i class="fas fa-minus is-pulled-right" v-if="menu_options.query_list_menu"></i>
          <i class="fas fa-plus is-pulled-right" v-else></i>
        </p>
        <ul class="menu-list" v-if="menu_options.query_list_menu && workspaces[selected_wokspace].queries.length">
          <li v-for="(query, index) in workspaces[selected_wokspace].queries" :key="query.id" @click="changeQuery(index)">
            <a :class="{'is-active': query.id === workspaces[selected_wokspace].queries[selected_query].id}">{{query.name}}</a>
          </li>
        </ul>
        <hr>

        <!-- Frequent Queries -->
        <p class="menu-label cursor-point" @click="toggleFrequent()">
          Frequently Used
          <i class="fas fa-minus is-pulled-right" v-if="menu_options.frequently_used_menu"></i>
          <i class="fas fa-plus is-pulled-right" v-else></i>
        </p>
        <ul class="menu-list" v-if="menu_options.frequently_used_menu">
          <li><a>All Orders</a></li>
          <li><a>Recent Orders</a></li>
        </ul>
        <hr>

        <!-- Options list -->
       <p class="menu-label cursor-point" @click="toggleOptions()">
          Options
          <i class="fas fa-minus is-pulled-right" v-if="menu_options.options_menu"></i>
          <i class="fas fa-plus is-pulled-right" v-else></i>
        </p>
        <ul class="menu-list"  v-if="menu_options.options_menu">
          <li><a><i class="fas fa-cog"></i> Settings</a></li>
          <li><a><i class="far fa-comment"></i> Report a bug</a></li>
          <li><a><i class="fas fa-sign-out-alt"></i> Logout</a></li>
        </ul>
      </aside>
    </div>

    <!-- Editor -->
    <div class="column" v-if="workspaces[selected_wokspace].queries.length">
      <code-editor :query='workspaces[selected_wokspace].queries[selected_query]' @save-code="updateCode" @delete-query="deleteQuery"/>
    </div>
    <!-- No query present -->
    <div class="column empty-placeholder" v-else>
      <div>
        <p>No Query present in this workspace</p>
        <button class="button is-inverted is-success" @click="openQueryModal()">
          <span class="icon">
            <i class="fas fa-plus"></i>
          </span>
          <span>Add Query</span>
        </button>
      </div>
    </div>

    </div>

    <!-- Add Workspace Modal -->
    <div class="modal" :class="{'is-active': menu_options.workspace_modal}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <form @submit.prevent="addWorkspace()">
            <div class="field">
              <p class="control has-icons-left">
                <input v-model="new_workspace_name" class="input" type="text" placeholder="Name" ref="workspace" required>
                <span class="icon is-small is-left">
                  <i class="fas fa-pen"></i>
                </span>
              </p>
            </div>
            <div class="buttons">
              <button class="button is-success" type="submit">Add Workspace</button>
              <button class="button" @click="closeWorkspaceModal()">Cancel</button>
            </div>
          </form>
        </section>
      </div>
    </div>

    <!-- Add Query Modal -->
    <div class="modal" :class="{'is-active': menu_options.query_modal}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <form @submit.prevent="addQuery()">
            <div class="field">
              <p class="control has-icons-left">
                <input v-model="new_query_name" class="input" type="text" placeholder="Name" ref="query" required>
                <span class="icon is-small is-left">
                  <i class="fas fa-pen"></i>
                </span>
              </p>
            </div>
            <div class="buttons">
              <button class="button is-success" type="submit">Add Query</button>
              <button class="button" @click="closeQueryModal()">Cancel</button>
            </div>
          </form>
        </section>
      </div>
    </div>

    <!-- Notification -->
    <notifications group="notification" class="noti"/>

  </div>
</template>

<script>
import CodeEditor from './components/CodeEditor.vue'

export default {
  name: 'app',
  components: {
    CodeEditor
  },
  data(){
    return {
      workspaces: [
        {
          name: 'Default',
          id: 1,
          queries: [
            {
              name: 'Recent Orders',
              id: 1,
              code: `SELECT  orderID 
        ,productID
        ,productName
        ,customerID 
FROM PRODUCTS AS qs
ORDER BY orderDtae DESC;`
            },
            {
              name: 'All Orders',
              id: 2,
              code: `SELECT * ORDERS;`
            },
            {
              name: 'Get by Products',
              id: 3,
              code: `SELECT  orderID 
        ,productID
        ,productName
        ,customerID 
FROM PRODUCTS AS qs
ORDER BY productID ASEC;`
            }
          ]
        },
        {
          name: 'Workspace Two',
          id: 2,
          queries: [
            {
              name: 'All Orders',
              id: 1,
              code: `select * from tbl_access_logs tal1 where tal1.username = "nraboy" and tal1.activity_date = max(tal1.activity_date);`
            }
          ]
        }
      ],
      menu_options:{
        workspace_dropdown: false,
        query_list_menu: true,
        frequently_used_menu: false,
        options_menu: false,
        workspace_modal: false,
        query_modal: false
      },
      new_workspace_name: '',
      new_query_name: '',
      selected_wokspace: 0,
      selected_query: 0
    }
  },
  methods:{
    toggleDropdown(){
      this.menu_options.workspace_dropdown = !this.menu_options.workspace_dropdown
    },
    toggleQueries(){
      this.menu_options.query_list_menu = !this.menu_options.query_list_menu
    },
    toggleFrequent(){
      this.menu_options.frequently_used_menu = !this.menu_options.frequently_used_menu
    },
    toggleOptions(){
      this.menu_options.options_menu = !this.menu_options.options_menu
    },
    changeWorkspace(index){
      this.selected_wokspace = index
      this.selected_query = 0
    },
    changeQuery(index){
      this.selected_query = index
    },
    addWorkspace(){
      if(this.new_workspace_name !== ''){
        let id = this.workspaces[this.workspaces.length - 1].id
        this.workspaces.push({name: this.new_workspace_name, id: ++id, queries: []})
        this.new_workspace_name = ''
        this.closeWorkspaceModal()
        this.$notify({
          group: 'notification',
          type: 'success',
          title: 'Workspace Added'
        });
      }
      else{
        this.$notify({
          group: 'notification',
          type: 'warn',
          title: 'Name cannot be empty!'
        });
      }
      
    },
    addQuery(){
      if(this.new_query_name !== ''){
        let queries = this.workspaces[this.selected_wokspace].queries
        let id = 0
        if(queries.length !== 0){
          id = queries[queries.length - 1].id 
        }
        this.workspaces[this.selected_wokspace].queries.push({name: this.new_query_name, id: ++id, code: ''})
        this.new_query_name = ''
        this.closeQueryModal()
        this.$notify({
          group: 'notification',
          type: 'success',
          title: 'Query Added'
        });
      }
      else{
        this.$notify({
          group: 'notification',
          type: 'warn',
          title: 'Name cannot be empty!'
        });
      }
    },
    openWorkspaceModal(){
      this.menu_options.workspace_modal = true
    },
    openQueryModal(){
      this.menu_options.query_modal = true
    },
    closeWorkspaceModal(){
      this.menu_options.workspace_modal = false
    },
    closeQueryModal(){
      this.menu_options.query_modal = false
    },
    deleteWorkspace(){
      this.workspaces.splice(this.selected_wokspace,1)
      this.selected_wokspace = 0
      this.selected_query = 0
    },
    deleteQuery(){
      this.workspaces[this.selected_wokspace].queries.splice(this.selected_query, 1)
      this.selected_query = 0
    },
    updateCode(code){
      this.workspaces[this.selected_wokspace].queries[this.selected_query].code = code
      this.$notify({
        group: 'notification',
        type: 'success',
        title: 'Query Saved'
      });
    }
    
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.dropdown{
  margin-bottom: 10px;
}

.empty-placeholder{
  text-align: center;
  position: relative;
  margin: 50px 20px 0px 30px;
  border: 1px dashed lightgrey;
  height: 400px;

  div{
    top: 50%;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}

.menu{
  padding: 10px;

  button {
    margin: 5px;
  }
}

.menu-list a.is-active {
    background-color: #fff !important;
    color: #3273dc !important;
}

.modal-card-body{
  border-radius: 10px;
}

.cursor-point{
  cursor: pointer;
}

/* Notification */
.noti{
  margin: 10px;
}

.vue-notification{
  padding: 10px;
}

.notification-title{
  font-size: 16px !important;
}

// Tooltip 
.tooltip {
  display: block !important;
  z-index: 10000;
  font-size: 12px;

  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }

  &[x-placement^="top"] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
}
</style>
