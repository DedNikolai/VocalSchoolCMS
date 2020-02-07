const storage = window.localStorage;

export default {
    Keys: {
        TOKEN: 'token',
    },

    get(key) {
        if (!(key in storage)) {
            return undefined;
        }
        return JSON.parse(storage.getItem(key));
    },

    set(key, value) {
        if (typeof value === 'undefined') {
            this.delete(key);
            return;
        }

        storage.setItem(key, JSON.stringify(value));
    },

    delete(key) {
        storage.removeItem(key);
    },

    clear() {
        storage.clear();
    },
};