<template>
  <div class="code-editor">
    <div>
      <p class="menu-label label-margin">
          SQL Editor 
      </p>
      <!-- Action buttons -->
      <div class="actions">
        <div class="buttons">
          <button class="button is-primary is-outlined" @click="saveCode()" v-tooltip="{ content: 'Save Query', placement: 'top-end'}">
            <span class="icon is-small">
               <i class="fas fa-save"></i>
            </span>
          </button>
          <button class="button is-success is-outlined" @click="runCode()" v-tooltip="{ content: 'Run Query', placement: 'top-end'}">
            <span class="icon is-small">
               <i class="fas fa-play"></i>
            </span>
          </button>
          <button class="button is-link is-outlined" @click="clearCode()" v-tooltip="{ content: 'Clear Code', placement: 'top-end'}">
            <span class="icon is-small">
               <i class="fas fa-broom"></i>
            </span>
          </button>
          <button class="button is-danger is-outlined" @click="deleteQuery()" v-tooltip="{ content: 'Delete Query', placement: 'top-end'}">
            <span class="icon is-small">
               <i class="fas fa-trash"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
    <!-- Editor Plugin -->
    <monaco-editor
    class="editor"
    v-model="editor_code"
    language="sql"
    theme="vs-dark">
    </monaco-editor>

    <!-- Output -->
    <div class="output">
      <p class="menu-label label-margin clearfix">
        OUTPUT
        <button class="button is-small is-link is-inverted is-pulled-right">Download CSV</button>
      </p>
      <div class="column has-text-centered" v-if="!query_executed">
        <p>Run query to view output</p>
        <button class="button is-inverted is-success" @click="runCode()">
          <span class="icon">
            <i class="fas fa-play"></i>
          </span>
          <span>Run Query</span>
        </button>
      </div>
      <div class="responsive-table" v-else>
        <table class="table is-striped is-fullwidth is-bordered">
          <thead>
            <tr>
              <th>orderID</th>
              <th>productID</th>
              <th>productName</th>
              <th>customerID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3</td>
              <td>91</td>
              <td>XYZ</td>
              <td>20</td>
              <td>20-11-2019</td>
            </tr>
            <tr>
              <td>38</td>
              <td>9</td>
              <td>Tofu</td>
              <td>21</td>
              <td>20-11-2019</td>
            </tr>
            <tr>
              <td>3</td>
              <td>91</td>
              <td>XYZ</td>
              <td>22</td>
              <td>18-11-2019</td>
            </tr>
            <tr>
              <td>3</td>
              <td>91</td>
              <td>XYZ</td>
              <td>23</td>
              <td>19-11-2019</td>
            </tr>
            <tr>
              <td>3</td>
              <td>91</td>
              <td>XYZ</td>
              <td>24</td>
              <td>21-11-2019</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'CodeEditor',
  props: {
    query:{
        type: Object,
        required: true
      }
  },
  watch: { 
    query: function(newVal) {
      this.editor_code = newVal.code
      this.query_executed = false
    }
  },
  data() {
    return {
      editor_code: '',
      query_executed: false
    }
  },
  created(){
    this.editor_code = this.query.code
  },
  methods:{
    saveCode(){
      this.$emit('save-code', this.editor_code)
    },
    runCode(){
      this.query_executed = true
    },
    clearCode(){
      this.editor_code = ''
    },
    deleteQuery(){
      this.$emit('delete-query')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.editor {
  width: 100%;
  height: 400px; 

  .monaco-editor{
    width: 100%;
  }
}
.label-margin{
  margin: 10px 0px 3px 0px !important;
}
.actions{
  margin-bottom: 10px;
}
.responsive-table{
  overflow-x:auto;
}
.code-editor{
  margin: 10px;
}
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
</style>
