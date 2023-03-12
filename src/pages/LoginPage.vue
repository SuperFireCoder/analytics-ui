<template>
  <q-page class="flex flex-center">
    <div class="row window-width justify-center items-center">
      <transition appear enter-active-class="animated bounceInLeft" leave-active-class="animated bounceInRight">
        <div class="col-md-4 col-xs-10 col-lg-3">
          <q-card class="shadow-24 q-pa-sm">
            <div class="row q-py-sm justify-center items-center">
              <div class="col-auto">
                <img width="350" src="~/assets/ec_logo.png">
              </div>
            </div>
            <div class="row q-pb-sm justify-center items-center">
              <div class="column">
                <div class="text-body2 q-pb-md text-center">You need additional permission to see this portal.Please
                  contact
                  support@ecocommons.org.au</div>
                <q-btn color="primary" label="Login" @click="$keycloak.login" no-caps />
              </div>
            </div>
          </q-card>
        </div>
      </transition>
    </div>
  </q-page>
</template>
<script setup lang="ts">
</script>
