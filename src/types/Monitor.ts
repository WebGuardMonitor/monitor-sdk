export interface Monitor {
    start(): void;
    stop?(): void; // 可选停止方法
}
