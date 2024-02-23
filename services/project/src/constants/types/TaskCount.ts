export default interface TaskCount {
  [key: string]: Date | number;
  date: Date;
  completed: number;
  planning: number;
  backlog: number;
  active: number;
}
