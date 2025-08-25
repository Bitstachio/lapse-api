import { IClient } from "../types/client";
import { ClientRepository } from "../repositories/client-repository";
import { ClientNotFoundError } from "../errors/process/client-not-found-error";

export class ClientService {
  constructor(private clientRepository: ClientRepository) {}

  findByName(name: string) {
    const client = this.clientRepository.findByName(name);
    if (client) return client;
    throw new ClientNotFoundError("name", name);
  }
}
