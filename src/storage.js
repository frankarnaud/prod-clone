import localStore from 'localforage'

export let projectsStore = localStore.createInstance({
    name: "projects"
  });
  
  export let imagesStore = localStore.createInstance({
    name: "images"
  });
