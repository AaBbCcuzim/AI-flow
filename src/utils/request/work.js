import { service } from "../request";

async function getWorkList(data) {
  const response = await service.post("/completion-messages", data);
  return response.data;
}

export { getWorkList };
