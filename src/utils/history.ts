export class History<T> {
  private capacity: number;
  private data: T[];
  private currentIndex: number;
  private paused: boolean;

  constructor(capacity: number, initialData: T[]) {
    this.capacity = capacity || 10;
    this.data = initialData || [];
    this.currentIndex = this.data.length - 1;
    this.paused = false;
  }

  back(): T | null {
    if (!this.paused && this.currentIndex > 0) {
      this.currentIndex--;
      return this.data[this.currentIndex];
    } else {
      return null;
    }
  }

  forward(): T | null {
    if (!this.paused && this.currentIndex < this.data.length - 1) {
      this.currentIndex++;
      return this.data[this.currentIndex];
    } else {
      return null;
    }
  }

  push(item: T): void {
    if (!this.paused) {
      if (this.currentIndex < this.data.length - 1) {
        this.data.splice(this.currentIndex + 1);
      }
      this.data.push(item);
      this.currentIndex = this.data.length - 1;

      if (this.data.length > this.capacity) {
        this.data.shift();
      }
    }
  }

  pause(): void {
    this.paused = true;
  }

  resume(): void {
    this.paused = false;
  }

  get value(): T {
    return this.data[this.currentIndex];
  }
}