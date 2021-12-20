<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-dark mb-5">
      <span class="navbar-brand mb-0 h1">{{ title }}</span>
    </nav>
    <div v-if="signalUpdate" class="alert alert-success" role="alert">
      {{alertUpdate}}
    </div>
    <div v-if="signalAdd" class="alert alert-success" role="alert">
      {{alertAdd}}
    </div>
    <div v-if="signalDelete" class="alert alert-success" role="alert">
      {{alertDelete}}
    </div>
    <div class="container">
      <div class="row">
        <List class="col-md-9" v-bind:user-list="UserList" v-bind:showModal=true @mark="del($event)" @update-item="updateUser($event)" @emit-id="passId($event)"></List>
        <Add class="col-md-3" v-on:add-item="add($event)"></Add>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {UserEntry} from './model/UserEntry'
import List from './components/List.vue'
import Add from './components/Add.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  components: {
    Add,
    List
  },
  data () {
    return {
      title: 'User-List',
      userList: [
        new UserEntry('Kevin', 'Piam', 'Anführer'),
        new UserEntry('Winnie', 'Tongle', 'Mitglied'),
        new UserEntry('Maxwell', 'Tchiabe', 'Mitglied')
      ],
      id: 0,
      signalAdd: false,
      signalUpdate: false,
      signalDelete: false,
      alertUpdate: '',
      alertAdd: '',
      alertDelete: ''
    }
  },
  computed: {
    UserList: function() {
      return this.$data.userList.filter((user: UserEntry) => !user.done)
    }
  },
  watch: {
    alertDelete: function(){
      this.$data.signalDelete = true
      setTimeout(() => {
        this.$data.signalDelete = false
        this.$data.alertDelete = ''
      }, 3000);
    },
    alertAdd: function(){
      this.$data.signalAdd = true
      setTimeout(() => {
        this.$data.signalAdd = false
        this.$data.alertAdd = ''
      }, 3000);
    },
    alertUpdate: function(){
      this.$data.signalUpdate = true
      setTimeout(() => {
        this.$data.signalUpdate = false
        this.$data.alertUpdate = ''
      }, 3000);
    }
  },
  methods: {
    add: function(data) {
      this.$data.userList.push(new UserEntry(data.vorname, data.name, data.beschreibung))
      this.$data.alertAdd = "User " + data.vorname + " "+ data.name + " wurde erfolgreich Hinzugefügt !";
    },
    del: function(id: number){
      let idDel;
      let userName ;
      for(let i= 0; i< this.$data.userList.length; i++){
        if(this.$data.userList[i].id == id){
          idDel = i
          userName = this.$data.userList[i].vorname +" "+ this.$data.userList[i].name
        }
      }
      this.$data.userList.splice(idDel, 1)
      this.$data.alertDelete = "User " + userName + " wurde erfolgreich gelöcht !"
    },
    passId: function (idR){
      this.$data.id = idR;
    },
    updateUser: function(data){
      let idEl;
      let userName;
      for(let i= 0; i< this.$data.userList.length; i++){
        if(this.$data.userList[i].id == this.$data.id) {
          idEl = i
          userName = this.$data.userList[i].vorname +" "+ this.$data.userList[i].name
        }
      }
      this.$data.userList.splice(idEl, 1, new UserEntry(data.vorname, data.name, data.beschreibung, this.$data.id))
      this.$data.alertUpdate = "Der User " + userName + " wurde erfolgreich zu " + data.vorname +" " + data.name + " registriert !"
    }
  }
});
</script>

<style scoped lang="scss">

</style>
