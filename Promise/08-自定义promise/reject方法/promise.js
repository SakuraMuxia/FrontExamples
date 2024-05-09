(window => {
    class Promise {
        // 设置私有属性，记录实例的状态和结果
        #state = 'pendding';       
        #result;
        // 设置私有属性，保存then传入的回调函数
        #callbackList = [];

        /**
         * 构造器方法，实例化的时候自动执行
         * @param {Function} exector 执行器函数，实例化的时候自动执行 
         */
        constructor(exector) {
            // 执行该函数，可将实例状态更改为成功
            const changeResolved = value => {
                // 如果状态已经更改，结束该函数
                if (this.#state !== 'pendding') {
                    return;
                }
                // 修改状态和结果
                this.#state = 'fulfilled';
                this.#result = value;
                // 遍历回调函数列表-执行所有成功的回调
                this.#callbackList.forEach(callback =>{
                    callback.onResolved(value);

                });
                
            };

            // 执行该函数，可将实例状态更改为成功
            const changeRejected = reason => {
                // 如果状态已经更改，结束该函数
                if (this.#state !== 'pendding') {
                    return;
                }
                // 修改状态和结果
                this.#state = 'rejected';
                this.#result = reason;
                // 遍历回调函数列表-执行所有失败的回调
                this.#callbackList.forEach(callback =>{
                    callback.onRejected(reason);
                })
            };

            // 调用执行器函数， 如果执行器函数中有异常，修改状态为失败
            try {
                exector(changeResolved, changeRejected);
            } catch (error) {
                // 更改为失败状态，错误对象作为结果
                changeRejected(error);
            }
        }

        /**
         * 给实例传递成功和失败的回调函数,该方法会添加到实例的原型上
         */
        then(onResolved, onRejected) {

            // 如果传入的参数不是函数 给参数设置默认值
            if (typeof onResolved !== 'function') {
                // 参数是什么 ，返回值就是什么
                onResolved = value => value;
            }
            
            if (typeof onRejected !== 'function') {
                onRejected = reason => {
                    throw reason;
                }
            }
            // 实例化一个promise对象，并且将其返回
            const promise = new Promise((resolve, reject) => {

                // 封装函数 专门用于执行传入 then() 的回调
                const handler = cb =>{
                    try {
                        // 执行 then() 传入的回调函数并获取到返回值
                        const res = cb(this.#result); // 这里的this是then中的this，谁调用指向谁，因为是箭头函数，箭头函数中没有this向上找
                        
                        // 判断返回值res是否是Promise的实例
                        if (res instanceof Promise) {
                            // then()返回值的状态与res一致 情况三
                            res.then(resolve, reject); 
                            
                        }else {
                            // 把new的Promise对象改为成功状态，将返回值作为结果 情况一 情况二
                            resolve(res);
                        }
                    } catch (error) {
                        // 如果调用 then() 传入的回调函数的时候出现异常，改为失败状态 情况四
                        reject(error);
                    }
                }

                // 当传入回调函数时，实例的状态已经改为成功
                if (this.#state === 'fulfilled') {   
                    setTimeout(() => {
                        handler(onResolved);
                    });
                // 当传入回调函数时，实例的状态已经改为失败
                } else if (this.#state === 'rejected') {
                    setTimeout(() => {
                        handler(onRejected);
                    });
                // 当传入回调函数时，状态还未改变
                } else {   
                    // 将两个回调函数保存到私有属性中
                    this.#callbackList.push({
                        onResolved: () => {
                            handler(onResolved);
                        },
                        onRejected: () => {
                            handler(onRejected);
                        }
                    });
                }
            })
            return promise;
        }
        /**
         * 给实例传递失败的回调函数,该方法会添加到实例的原型上
         * @param {Function} onRejected 实例状态失败执行的回调
         */
        catch(onRejected) {
            return this.then(undefined,onRejected);
        }


        /**
         * 根据参数返回新的Promise实例，该方法添加到类本身(静态方法)
         */
        static resolve(value) {
            if(value instanceof Promise){
                // 情况三 参数就是Promise对象
                return value;
            }else if (typeof value?.then === 'function'){
                // 情况四 将resolve, reject传递给 value.then方法,由该 thenable 对象决定改为什么状态
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        value.then(resolve, reject);
                    })
                });
            }
        }

        /**
         * 返回新的失败状态的Promise实例，该方法添加到类本身(静态方法)
         * @param {Mixed} value 该参数作为返回值的result
         */
        static reject(value) {
            return new Promise((resolve, reject) => {
                reject(value);
            })
        }

        /**
         * 当传入的所有Promise实例都完成才返回一个Promise实例,该方法添加到类本身(静态方法)
         */
        static all() {

        }

        /**
         * 传入的多个Promise实例只要一个先完成就返回一个Promise实例，该方法添加到类本身(静态方法)
         */
        static race() {

        }


    }

    window.Promise = Promise;
})(window || global);