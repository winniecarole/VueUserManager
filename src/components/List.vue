<template>
<div>
  <table class="table">
    <thead>
    <tr>
      <th>Id</th>
      <th>Vorname</th>
      <th>Name</th>
      <th>Beschreibung</th>
      <th>Date</th>
      <th>Done</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="user in userList" v-bind:key="user.id">
      <td>{{ user.id }}</td>
      <td>{{ user.vorname}}</td>
      <td>{{ user.name }}</td>
      <td>{{ user.beschreibung }}</td>
      <td>{{ user.date.toISOString() }}</td>
      <td>
        <b-button class="btn btn-info" v-b-modal.modal-center @click="$emit('emit-id', user.id)">Bearbeiten</b-button>
        <button class="btn btn-info" v-on:click="$emit('mark', user.id)">Delete</button>
      </td>
    </tr>
    </tbody>
  </table>
  <div>
      <b-modal v-if="showModal == true" id="modal-center" centered title="Füge ein Neue User" @ok="call">
          <div class="form-group">
            <label for="vornameInput">Vorname:</label>
            <input type="text" class="form-control" id="vornameInput" v-model="vorname">
            <label for="nameInput">Name:</label>
            <input type="text" class="form-control" id="nameInput" v-model="name">
            <label for="beschreibungInput">Beschreibung:</label>
            <textarea class="form-control" id="beschreibungInput" v-model="beschreibung" rows="3"></textarea>
            <label for="idInput">Id:</label>
            <input type="text" class="form-control" id="idInput" readonly>
          </div>
          <div v-if="isEmty" class="alert alert-danger" role="alert">
            Die Vor- und NachnameFeld Dürfen nicht leer Gelassen werden!
          </div>
      </b-modal >
  </div>
</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: 'List',
  props: {
    userList: Array,
    showModal: Boolean
  },
  data () {
    return {
      vorname: '',
      name: '',
      beschreibung: '',
      signal: false
    }
  },
  computed:{
    isEmty: function(){
      return (this.$data.signal && !(this.$data.vorname.length > 0) && !(this.$data.name.length > 0) && !(this.$data.beschreibung.length > 0))
    }
  },
  methods: {
      call: function(){
        this.$data.signal = true
        if(!this.isEmty){
          this.$emit("update-item", this.$data)
        }
      }
    }
})
</script>

<style scoped>
.btn {
  margin-bottom: 0.5em;
}
</style>
