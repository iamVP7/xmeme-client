<template>
  <div id="app">
    
    

<div v-if="displayMemes" class="masterdiv">


   
    </div>


  <h1>Latest Memes</h1>
      <button class="btn" @click="openCreateMeme">CreateDialogue</button>
  <CreateDialogue
      v-show="isCreateMemeVisible"
      v-on:my-event="doSomething"
      @close="closeCreateMeme"
    />

  <div class="location-contain">
    <div class="locations" v-for="location in memesJSON" :key="location.id" :id="location.id">
       <div class="place">
         <div>
      <img :src="location.url" width="300" height="300"/>
      <slot></slot>
        <h2>Submitted by : {{ location.name }}</h2>
      <p>Caption : {{ location.caption }}</p>
      </div>
       </div>
    </div>
  </div>
    

</div>
  

  
</template>



<script>
import connections from './js/conection'
    import ModalDirection from "./Dialogue";
    import CreateDialogue from "./CreateDialogue";

export default {
  name: 'app',
   components: {
    ModalDirection,CreateDialogue 
  },
  data () {
    return {
      displayMemes :false,
      memesJSON:[],
      memesResponse:[],
      msg: 'Welcome to XMEME',
      modalOpen: false,
      isModalVisible: false,
      isCreateMemeVisible : false,
      currentMeme:null
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
      },
       openModal() {
            this.modalOpen = !this.modalOpen;
        } ,
        showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },

      openCreateMeme(){
        this.isCreateMemeVisible = true
      },
      closeCreateMeme(){
        this.isCreateMemeVisible = false
      },
      doSomething: async function(url,name,caption){
        var jsonToSend = {};
          jsonToSend['url'] = url;
          jsonToSend['name'] = name;
          jsonToSend['caption'] = caption;

          var postResponse = (await connections.axiosPost('',jsonToSend))
          console.log(postResponse);
          if (postResponse.id) {
            this.isCreateMemeVisible = false;
                    location.reload();
          } else if(postResponse.code == 409){
            this.isCreateMemeVisible = false;
            this.url = null;
            alert('You have submitted same URL and caption');
          }
      },
      swapComponent :function(memeToShow){

        console.log(memeToShow)
       this.currentMeme =memeToShow; 
       this.isModalVisible = true;
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
  width: 25%;
    list-style: none;
    height: 450px;
    max-height: 500px;
    float: left;
}

.location-contain {
  justify-content: wrap;
  padding-left: 0;
  max-width: inherit;
}

</style>
