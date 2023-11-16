<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>Analytics Dashboard </q-toolbar-title>
        <q-space />
        <span>version 1.0.1</span>
        <!-- <q-btn v-if="!$keycloak.authenticated" outline label="Login" @click="$keycloak.login" />
        <q-btn v-if="$keycloak.authenticated" outline label="Logout" @click="$keycloak.logoutFn" /> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list class="q-pt-md">
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <GlobalLoader />
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GlobalLoader from 'src/components/GlobalLoader.vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Dashboard',
    caption: 'Summary of the analytics dashboard',
    icon: 'fas fa-home',
    link: '/',
  },
  {
    title: 'Users & Usage',
    caption: 'Users and Usage analytics',
    icon: 'fas fa-users',
    link: 'users',
  },
  {
    title: 'Experiments & Algorithms',
    caption: 'Detailed usage analytics for experiments',
    icon: 'fas fa-flask',
    link: 'experiments',
  },
  // {
  //   title: 'Algorithm',
  //   caption: 'Detailed usage analytics for algorithms',
  //   icon: 'fas fa-code',
  //   link: 'https://forum.quasar.dev',
  // },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
