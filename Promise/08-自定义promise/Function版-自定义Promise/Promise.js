(window => {
    // 定义构造函数 ----------------------------------------
    function Promise(exector) {
        // 给实例设置属性
        this.state = 'pendding';    // 记录状态
        this.result = undefined;    // 记录结果
        this.callbackList = [];     // 存储待执行的回调函数

        // 执行该函数，可将实例状态更改为成功
        const changeResolved = value => {
            // 如果状态已经更改，结束该函数
            if (this.state !== 'pendding') {
                return;
            }
            // 修改状态和结果
            this.state = 'fulfilled';
            this.result = value;
            // 遍历回调函数列表
            this.callbackList.forEach(callback => {
                callback.onResolved();
            });

        };

        // 执行该函数，可将实例状态更改为成功
        const changeRejected = reason => {
            // 如果状态已经更改，结束该函数
            if (this.state !== 'pendding') {
                return;
            }
            // 修改状态和结果
            this.state = 'rejected';
            this.result = reason;
            // 遍历回调函数列表
            this.callbackList.forEach(callback => {
                callback.onRejected();
            });
        };

        // 调用执行器函数， 如果执行器函数中有异常，修改状态为失败
        try {
            exector(changeResolved, changeRejected);
        } catch (error) {
            // 更改为失败状态，错误对象作为结果
            changeRejected(error);
        }
    }

    // 实例本身的方法 添加到实例的原型上 ---------------------
    Object.assign(Promise.prototype, {
        /**
         * 给实例传递成功和失败的回调函数,该方法会添加到实例的原型上
         */
        then(onResolved, onRejected) {
            // 如果传入的参数不是函数 给参数设置默认值
            if (typeof onResolved !== 'function') {
                onResolved = value => value;
            }

            if (typeof onRejected !== 'function') {
                onRejected = reason => {
                    throw reason;
                }
            }

            // 返回 Promise 对象
            return new Promise((resolve, reject) => {

                // 封装函数 专门用于执行传入 then() 的回调
                const handler = cb => {
                    try {
                        // 执行 then() 传入的回调函数并获取到返回值
                        const res = cb(this.result);
                        // 判断返回值res是否是Promise的实例
                        if (res instanceof Promise) {
                            // then()返回值的状态与res一致 情况三
                            res.then(resolve, reject);
                        } else {
                            // 改为成功状态，将返回值作为结果 情况一 情况二
                            resolve(res);
                        }
                    } catch (error) {
                        // 如果调用 then() 传入的回调函数的时候出现异常，改为失败状态 情况四
                        reject(error);
                    }
                };

                // 当传入回调函数时，实例的状态已经改为成功
                if (this.state === 'fulfilled') {
                    setTimeout(() => {
                        handler(onResolved);
                    });

                    // 当传入回调函数时，实例的状态已经改为失败
                } else if (this.state === 'rejected') {
                    setTimeout(() => {
                        handler(onRejected);
                    })

                    // 当传入回调函数时，状态还未改变
                } else {
                    // 将两个回调函数保存到私有属性中
                    this.callbackList.push({
                        onResolved: () => {
                            handler(onResolved);
                        },
                        onRejected: () => {
                            handler(onRejected);
                        }
                    });
                }
            })
        },

        /**
         * 给实例传递失败的回调函数,该方法会添加到实例的原型上
         * @param {Function} onRejected 实例状态失败执行的回调
         */
        catch(onRejected) {
            return this.then(undefined, onRejected);
        }
    });


    // Promise.prototype.then = () => {

    // };

    // Promise.prototype.catch = () => {

    // }


    // 构造函数自身的方法 添加到构造函数本身 ------------------
     /**
     * 根据参数返回新的Promise实例，该方法添加到类本身(静态方法)
     * @param {Mixed} value 该参数影响返回的Promise
     */
     Promise.resolve = value => {
        if (value instanceof Promise) {
            // 情况三 参数就是Promise对象
            return value;
        } else if (typeof value?.then === 'function') {
            // 情况四 将resolve, reject传递给 value.then方法,由该 thenable 对象决定改为什么状态
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    value.then(resolve, reject);
                })
            });
        } else {
            // 情况一 情况二 返回成功状态的Promise对象 value作为result
            return new Promise((resolve, reject) => {
                resolve(value);
            })
        }
    }

    /**
     * 返回新的失败状态的Promise实例，该方法添加到类本身(静态方法)
     * @param {Mixed} value 该参数作为返回值的result
     */
    Promise.reject = value => {
        return new Promise((resolve, reject) => {
            reject(value);
        });
    }

    /**
     * 当传入的所有Promise实例都完成才返回一个Promise实例,该方法添加到类本身(静态方法)
     * @param {Iterable} items 里面的成员都是Promise对象,不是Promise也会用Promise.resolve()变为Promise对象 
     * @return {Promise} 所有成员都成功状态成功
     */
    Promise.all = items => {
        return new Promise((resolve, reject) => {
            if (typeof items[Symbol.iterator] === 'function') {
                // 将参数 items 转为数组
                const itemsArr = Array.from(items);
                // 记录每个成员成功之后的结果
                const resArr = Array(itemsArr.length); 
                // let count = 0;
                // 遍历所有成员
                itemsArr.forEach((item, index) => {
                    const p = Promise.resolve(item);  // 处理每个成员
                    p
                    .then(res => {
                        resArr[index] = res;
                        // count ++;
                        // 如果resArr填充满了，说明所有的成员都完成了
                        if ((resArr.filter(()=>true)).length === itemsArr.length) {
                            resolve(resArr);
                        }
                    })
                    .catch(reason => {
                        reject(reason);
                    });
                })
            } else  {
                // 说明参数items不是可遍历对象
                reject('argument must is a iterable');
            }
        })
    }

    /**
     * 传入的多个Promise实例只要一个先完成就返回一个Promise实例，该方法添加到类本身(静态方法)
     * @param {Iterable} items 里面的成员都是Promise对象,不是Promise也会用Promise.resolve()变为Promise对象 
     * @return {Promsie}
    */
    Promise.race = items => {
        return new Promise((resolve, reject) => {
            if (typeof items[Symbol.iterator] === 'function') {
                // 遍历 items
                for (let item of items) {
                    const p = Promise.resolve(item);
                    p.then(resolve, reject)
                }
            } else {
                reject('argument must is a iterable');
            }
        });
    }


    // 将构造函数暴露到全局 ----------------------------------
    window.Promise = Promise;


})(window || global)