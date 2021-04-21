import component from './vue-avatar-cropper.vue';

// executed by Vue.use()
const install = (Vue) => {
  if (install.installed) return;
  install.installed = true;
  Vue.component(component.name, component);
};

// auto-install when Vue is found
let GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use({ install });
}

// to allow module use
export default component;