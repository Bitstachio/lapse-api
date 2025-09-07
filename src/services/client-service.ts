import { ClientRepository } from "../repositories/client-repository";
import { ClientNotFoundError } from "../errors/process/client-not-found-error";
import { IClientGetDto } from "../types/client";
import { toClientGetDto } from "../mappers/client";

export class ClientService {
  constructor(private repo: ClientRepository) {}

  getByName(name: string): IClientGetDto {
    const client = this.repo.findByName(name);
    if (!client) throw new ClientNotFoundError("name", name);
    return toClientGetDto(client);
  }
}
