// ===== Models =====

export interface IInterval {
  startTime: Date;
  targetDuration: number;
  prevSessionsDuration: number;
}

// ===== DTOs =====

export interface IIntervalCreateDto {
  targetDuration: number;
}

export interface IIntervalStatusDto extends IInterval {
  remainingDuration: number;
}
