<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { VueFlow } from "@vue-flow/core";
import { useLayout } from "@/hooks/useLayout";
import { getWorkList } from "@/utils/request/work";
import { useWorkGraph } from "@/hooks/useWorkGraph";
import { Background } from "@vue-flow/background";
import PendingNode from "@/components/node/PendingNode.vue";
import SuccessNode from "@/components/node/SuccessNode.vue";
import WarningNode from "@/components/node/WarningNode.vue";
import ErrorNode from "@/components/node/ErrorNode.vue";

const { layout } = useLayout();
const { buildGraph } = useWorkGraph();

const nodes = ref([]);
const edges = ref([]);

let text = ref("");

async function send() {
  const data = await getWorkList({
    inputs: {
      query: text.value,
    },
    response_mode: "blocking",
    user: "abc-123",
  });

  const answer = JSON.parse(data.answer);
  const res = answer.res;

  const elements = buildGraph(res);

  nodes.value = elements.nodes;
  edges.value = elements.edges;

  nodes.value = layout(nodes.value, edges.value, "LR");
}

onMounted(() => {});
</script>

<template>
  <div class="main">
    <VueFlow :nodes="nodes" :edges="edges" :default-viewport="{ zoom: 1.2 }">
      <Background />

      <template #node-pending="pendingNodeProps">
        <PendingNode v-bind="pendingNodeProps" />
      </template>

      <template #node-success="successNodeProps">
        <SuccessNode v-bind="successNodeProps" />
      </template>

      <template #node-warning="warningNodeProps">
        <WarningNode v-bind="warningNodeProps" />
      </template>

      <template #node-error="errorNodeProps">
        <ErrorNode v-bind="errorNodeProps" />
      </template>
    </VueFlow>
    <div class="input">
      <v-text-field v-model="text" placeholder="输入你的计划,例如“我上午去公司汇报工作并整理昨天的会议内容，下午去钓鱼，晚上和朋友喝酒”" variant="outlined" width="80vw" density="compact">
        <template v-slot:append>
          <v-btn @click="send">生成</v-btn>
        </template>
      </v-text-field>
    </div>
  </div>
</template>

<style>
.main {
  position: relative;
  width: 100vw;
  height: 100vh;
}
.input {
  position: absolute;
  bottom: 5px;
  right: 50%;
  transform: translate(50%, -50%);
}
</style>
