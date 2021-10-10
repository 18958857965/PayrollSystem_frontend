<template>
  <div class="border" style="margin-top: 10px">


  </div>
</template>

<script>
export default {
  name: "Em_PayMethod",
  data(){
    return{
      payMethod:'',
      cardNumber:'',
      address:''


    }
  }
}
</script>

<style scoped>
.border {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px 10px 10px 10px;
  width: auto;
  height: 450px;
}

</style>