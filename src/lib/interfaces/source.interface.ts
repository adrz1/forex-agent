export interface DataSource {
    listen(channel: string, callback: (data: string) => void): void;
    start(): void;
}