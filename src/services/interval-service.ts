import { InvalidArgumentError } from "../errors/process/invalid-argument-error";
import { IntervalRepository } from "../repositories/interval-repository";
import { IIntervalCreateDto } from "../types/interval";

export class IntervalService {
  constructor(private repository: IntervalRepository) {}

  create(interval: IIntervalCreateDto) {
    if (interval.targetDuration <= 0)
      throw new InvalidArgumentError("Interval target duration must be larger than zero");

    this.repository.create(interval);
  }
}
