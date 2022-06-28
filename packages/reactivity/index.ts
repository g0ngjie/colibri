export interface IRef<T> {
    readonly _is_ref: boolean
    _value: T
    value: T
}

//  定义一个reactiveHandler处理对象
const reactiveHandler = {
    // 获取属性值
    get(target, prop) {
        const result = Reflect.get(target, prop);
        return result
    },
    // 修改属性值/添加属性
    set(target, prop, value) {
        const result = Reflect.set(target, prop, value);
        return result
    },
    deleteProperty(target, prop) {
        const result = Reflect.deleteProperty(target, prop);
        return result
    }
}

// 定义一个reactive函数，传入一个目标对象
export function reactive(target) {
    // 判断当前的目标对象是不是object类型(对象/数组)
    if (target && typeof target === 'object') {
        // 对数组或者是对象中所有的数据进行reactive的递归处理
        // 先判断当前的数据是不是数组
        if (Array.isArray(target)) {
            // 数组的数据要进行遍历操作0
            target.forEach((item, index) => {
                // 如果数组中还有数组
                // 使用递归
                target[index] = reactive(item);
            });
        } else {
            // 再判断当前的数据是不是对象
            // 对象的数据也要进行遍历的操作
            Object.keys(target).forEach(key => {
                target[key] = reactive(target[key]);
            });
        }
        return new Proxy(target, reactiveHandler);
    }
    // 如果传入的数据是基本类型的数据，那么就直接返回
    return target;
}

// 定义一个ref函数
export function ref<T>(target: T): IRef<T> {
    target = reactive(target);
    return {
        _is_ref: true, // 标识当前的对象是ref对象
        // 保存target数据保存起来
        _value: target,
        get value() {
            return this._value;
        },
        set value(val) {
            this._value = val;
        }
    }
}
