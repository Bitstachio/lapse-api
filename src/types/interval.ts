// ===== Models =====

export interface IInterval {
  id: number;
  startTime: Date;
  targetDuration: number;
  prevSessionsDuration: number;
}

export interface IIntervalRow {
  id: number;
  startTime: string;
  targetDuration: number;
  prevSessionsDuration: number;
}

// ===== DTOs =====

export interface IIntervalGetDto {
  startTime: Date;
  targetDuration: number;
  prevSessionsDuration: number;
}

export interface IIntervalCreateDto {
  targetDuration: number;
}

export interface IIntervalStatusDto extends IInterval {
  remainingDuration: number;
}
