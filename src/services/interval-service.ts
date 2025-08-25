import { InvalidArgumentError } from "../errors/process/invalid-argument-error";
import { IntervalRepository } from "../repositories/interval-repository";
import { IInterval, IIntervalCreateDto, IIntervalGetDto } from "../types/interval";

export class IntervalService {
  constructor(private repository: IntervalRepository) {}

  getById(id: number): IIntervalGetDto {
    const interval = this.repository.findById(id);
    if (interval) return interval;
    throw new Error(); // TODO: Add no interval error
  }

  create(interval: IIntervalCreateDto): IInterval {
    if (interval.targetDuration <= 0)
      throw new InvalidArgumentError("Interval target duration must be larger than zero");
    return this.repository.create(interval);
  }
}
