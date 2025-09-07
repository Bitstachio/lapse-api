import { IClient } from "../types/client";

export const toClientGetDto = (client: IClient) => ({
  name: client.name,
  createdAt: client.createdAt,
});
