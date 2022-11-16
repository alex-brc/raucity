import type { DataStructure } from "./DataStructure";

export class Data {
    static read(structure: string, key: string) : DataStructure | null {
        let storageKey = this.storageKey(structure, key);
        let raw = localStorage.getItem(storageKey);
        let obj: DataStructure | null = raw ? JSON.parse(raw) : null;
        // console.log(`For key: %s, raw: %s, parsed: `, storageKey, raw, obj);
        return obj;
    }

    static write(data: DataStructure) {
        let key = this.storageKey(data.constructor.name, data.key);
        let json = JSON.stringify(data);
        localStorage.setItem( key, json );
        console.log(`Written data: %s, at key: %s`, json, key);
    }

    public static seed() {
        return Math.floor(Math.random() * 1000000).toString();
    }

    private static storageKey(structureName: string, itemKey: string) {
        return structureName + ":" + itemKey;
    }
}