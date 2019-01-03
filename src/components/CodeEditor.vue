<template>
  <div class="code-editor">
    <div>
      <p class="menu-label label-margin">
          SQL Editor 
      </p>
      <div class="actions">
        <div class="buttons">
          <button class="button is-primary is-outlined" @click="saveCode()" v-tooltip="{ content: 'Save Query', placement: 'top-end'}">
            <span class="icon is-small">
               <i class="fas fa-save"></i>
            </span>
          </button>
          <button class="button is-success is-outlined" v-tooltip="{ content: 'Run Query', placement: 'top-end'}">
            <span class="icon is-small">
               <i class="fas fa-play"></i>
            </span>
          </button>
          <button class="button is-link is-outlined" @click="clearCode()" v-tooltip="{ content: 'Clear Code', placement: 'top-end'}">
            <span class="icon is-small">
               <i class="fas fa-broom"></i>
            </span>
          </button>
          <button class="button is-danger is-outlined" v-tooltip="{ content: 'Delete Query', placement: 'top-end'}">
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

    <div class="output">
      <p class="menu-label label-margin">
        OUTPUT
        <button class="button is-small is-link is-inverted is-pulled-right">Download CSV</button>
      </p>
      <div class="responsive-table">
        <table class="table is-striped is-fullwidth is-bordered">
          <thead>
            <tr>
              <th>orderID</th>
              <th>productID</th>
              <th>productName</th>
              <th>customerID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>38</td>
              <td>9</td>
              <td>Tofu</td>
              <td>22</td>
            </tr>
            <tr>
              <td>38</td>
              <td>9</td>
              <td>Tofu</td>
              <td>22</td>
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
    }
  },
  data() {
    return {
      table_data: {

      },
      editor_code: '',
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

    },
    clearCode(){
      this.editor_code = ''
    },
    deleteQuery(){

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
  margin: 10px 0px 3px 0px;
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
</style>
