<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Emoji Password</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon class="ml-3">
            <router-link :to="item.to">
              <v-icon>{{item.icon}}</v-icon>
            </router-link>
          </v-list-item-icon>
          <v-list-item-content>
            <router-link :to="item.to">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-icon @click.stop="drawer = !drawer" class="pa-5">mdi-menu</v-icon>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: null,
      items: [
        { title: "Create Password", icon: "mdi-pencil", to: "/"},
        { title: "EmailTest", icon: "mdi-test-tube", to: "/emailTest" },
        { title: "BankTest", icon: "mdi-test-tube", to: "/bankTest" },
        { title: "MobileTest", icon: "mdi-test-tube", to: "/mobileTest" },
        { title: "About", icon: "mdi-information-outline", to: "/about" }
      ]
    };
  }
};
</script>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
}
</style>
