<template>
  <div id="app">
    
    

<div v-if="displayMemes" class="masterdiv">


   <!--  <v-canvas-element v-for="item in memesJSON" v-bind:key="item.id"
       
       :id=item.id
      :content="item.name"
      label=""
      :title="item.caption"
      width="250px"
      height="460px"
      :image="item.url"
      :back_color="item.url"
    /> -->
   
    </div>


  <h1>Latest Memes</h1>
  <div class="location-contain">
    <div class="locations" v-for="location in memesJSON" :key="location.id" :id="location.id">
       <div class="place">
      <img :src="location.url" width="300" height="300"/>
      <slot></slot>
        <h2>Submitted by : {{ location.name }}</h2>
      <p>Caption : {{ location.caption }}</p>
      <div style=" text-align: right;  ">
      <img src="./assets/edit.png" width="24px" height="24px">
      </div>
       </div>
    </div>
  </div>


</div>
  

  
</template>


<script>
import connections from './js/conection'



export default {
  name: 'app',
  data () {
    return {
      displayMemes :false,
      memesJSON:[],
      memesResponse:[],
      msg: 'Welcome to XMEME'
    }
  },
  methods: {
      bodyClick: async function () {
        this.memesResponse = (await connections.axiosGet(''))
        this.memesJSON = this.memesResponse.data;
        this.displayMemes = true;
      console.log(this.memesResponse);
      console.log(this.memesResponse.data);
      console.log(this.memesResponse['data']);
      }
  },
  async mounted () {
		this.bodyClick()
	}
  
}
</script>

<style>
.place {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  border: 1px solid #ddd;
  padding: 20px 20px;
  margin: 10px;
  flex: 0 0 33.333333%;
    list-style: none;
    height: 400px;
    
}

.location-contain {
  display: flex;
  justify-content: wrap;
  padding-left: 0;
  max-width: inherit;
}
</style>
