<template>
  <form v-on:submit.prevent="call(); (isEmty ? null : $emit('add-item', {vorname, name, beschreibung})); submitForm()">
    <div class="form-group">
      <label for="vornameInput">Vorname:</label>
      <input type="text" class="form-control" id="vornameInput" v-model="vorname">
      <label for="nameInput">Name:</label>
      <input type="text" class="form-control" id="nameInput" v-model="name">
      <label for="beschreibungInput">Beschreibung:</label>
      <textarea class="form-control" id="beschreibungInput" v-model="beschreibung" rows="3"></textarea>
    </div>
    <div v-if="isEmty" class="alert alert-danger" role="alert">
      Die Vor- und NachnameFeld Dürfen nicht leer Gelassen werden!
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Add',
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
    submitForm: function() {
      if((this.$data.vorname.length > 0)&& (this.$data.vorname.length > 0)){
      this.$data.vorname = '';
      this.$data.name = '';
      this.$data.beschreibung = ''
      this.$data.signal = false
      }else{
        this.$data.vorname = '';
        this.$data.name = '';
        this.$data.beschreibung = ''
        setTimeout(() => {
        this.$data.signal = false
      }, 3000);
      }
    },
    call: function() {
      this.$data.signal = true
    }
  }
})
</script>

<style scoped>

</style>
