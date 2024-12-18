<template>
  <div class="node">
    <Handle type="target" :position="Position.Left" />
    <div class="icon d-flex justify-center align-center">
      <v-icon color="white" size="small">mdi-alert</v-icon>
    </div>
    <div class="d-flex justify-center align-center content">
      <div>{{ label }}</div>
    </div>
    <Handle type="source" :position="Position.Right" />
  </div>
  <NodeToolbar :is-visible="data.toolbarVisible" :position="data.toolbarPosition">
    <v-btn @click="changeType('success')">success</v-btn>
    <v-btn @click="changeType('error')">error</v-btn>
    <v-btn @click="changeType('pending')">pending</v-btn>
  </NodeToolbar>
</template>

<script setup>
import { Position, Handle, useNode } from "@vue-flow/core";
import { NodeToolbar } from "@vue-flow/node-toolbar";

const props = defineProps({
  label: String,
  data: Object,
});

const { node } = useNode();

function changeType(type) {
  node.type = type;
  node.draggable = false;

  // 后期活得入边，出边信息后可删掉重写逻辑
  if (type === "success") {
    instance.edges.value.forEach((edge) => {
      if (edge.id.startsWith(node.id)) {
        edge.animated = false;
        
      }
    });
  } else {
    instance.edges.value.forEach((edge) => {
      if (edge.id.startsWith(node.id)) {
        edge.animated = true;
       
      }
    });
  }
}
</script>

<style scoped>
.node {
  padding: 5px;
  border: 1px solid #ffff00;
  border-radius: 5px;
}
.icon {
  width: 25px;
  height: 25px;
  background-color: #ffff00;
  border-radius: 5px;
}
.content {
  min-width: 100px;
}
</style>
