import localforage from "localforage";

// 定义数据库配置类型
interface DatabaseConfig {
    driver: typeof localforage.INDEXEDDB | typeof localforage.WEBSQL | typeof localforage.LOCALSTORAGE;
    name: string;
    version: number;
    storeName: string;
}

// 默认配置
const DEFAULT_CONFIG: DatabaseConfig = {
    driver: localforage.INDEXEDDB,
    name: 'monitor-idb',
    version: 1.0,
    storeName: 'recordScreen',
};

export class Database {
    private store: LocalForage;

    constructor(config: Partial<DatabaseConfig> = {}) {
        // 合并默认配置和用户配置
        const finalConfig = {...DEFAULT_CONFIG, ...config};

        // 初始化 localforage
        this.store = localforage.createInstance({
            driver: finalConfig.driver,
            name: finalConfig.name,
            version: finalConfig.version,
            storeName: finalConfig.storeName,
        });
    }

    /**
     * 写入数据到 IndexedDB
     * @param key - 存储的键
     * @param value - 存储的值
     * @param retries - 重试次数（默认 3 次）
     */
    async set(key: string, value: any, retries: number = 3) {
        await this.store.setItem(key, value);
        console.log(`Data saved successfully with key: ${key}`);
    }

}