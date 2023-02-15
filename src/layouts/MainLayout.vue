<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>Analytics Dashboard </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Overview',
    caption: 'Overview of the platform with important metrics',
    icon: 'fas fa-home',
    link: 'https://quasar.dev',
  },
  {
    title: 'Users',
    caption: 'Analytics regarding users of the platform',
    icon: 'fas fa-users',
    link: 'users',
  },
  {
    title: 'Experiments',
    caption: 'Detailed usage analytics for experiments',
    icon: 'fas fa-flask',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Algorithm',
    caption: 'Detailed usage analytics for algorithms',
    icon: 'fas fa-code',
    link: 'https://forum.quasar.dev',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
