<template>
<div class="container">
  Message : <textarea v-model="message" type="text" />
  To (separated by line break) :   <textarea v-model="to" type="text" />
<button v-on:click="()=>{send_sms()}" >Send SMS</button>
</div>
</template>

<script>
const axios = require('axios').default;
export default {
  name: 'App',
  data() {
    return {
      message: "Enter you text here ...",
      to: "06....."
    }
  },

  methods: {

    async get_api_key(){
      let Key;
      await axios.get("../.netlify/functions/api")
      .then(res => {
          Key = res.data.api;
      })
      return Key
    },
    async send_sms()  {

      const apiKey = await this.get_api_key()
      console.log(apiKey)
      // simple format for the list of numbers remove zore at the beginning and add country code 
      const toArray = this.to.split(/\r?\n|\r|\n/g).map(x =>  {return{ 'to': '+212' + x.substring(1) }});
   
      const data = JSON.stringify({
                "messages": [
                    {
                        "destinations": toArray,
                        "from": "From",
                        "text": this.message
                    }
                ]
            })

      axios.post( "https://gy28xe.api.infobip.com/sms/2/text/advanced", data, {
          headers: {
              'authorization': 'App ' + apiKey,
              'content-Type': 'application/json',
              'accept': 'application/json'
          },
      })      
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
          console.log(error)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  margin: 0 auto;
  width: 60%;
  display: flex;
  flex-direction: column;
}

@media only screen and (max-width: 600px) {
  .container{
     width: 85%;
  }
}

textarea{
  height: 100px;
}

button {
  height: 43px;
    width: 200px;
    margin: 18px auto;
}
</style>
