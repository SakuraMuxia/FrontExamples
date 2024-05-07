(window => {
    class Promise {
        // 设置私有属性，记录实例的状态和结果
        #state = 'pendding';       
        #result;
        // 设置私有属性，保存then传入的回调函数
        #callbackObj = {};

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
                // 如果这个时候 then() 已经将成功的回调传入，直接调用
                this.#callbackObj.onResolved?.(value);
                // if (this.#callbackObj.onResolved) {
                //     this.#callbackObj.onResolved();
                // }
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
                // 如果这个时候 then() 已经将失败的回调传入，直接调用
                this.#callbackObj.onRejected?.(reason);
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
            if (this.#state === 'fulfilled') {   // 当传入回调函数时，实例的状态已经改为成功
                setTimeout(() => {
                    onResolved(this.#result);
                });
            } else if (this.#state === 'rejected') {   // 当传入回调函数时，实例的状态已经改为失败
                setTimeout(() => {
                    onRejected(this.#result);
                })
            } else {   // 当传入回调函数时，状态还未改变
                // 将两个回调函数保存到私有属性中
                this.#callbackObj = {
                    onResolved:onResolved,
                    onRejected:onRejected
                }
                console.log(this.#callbackObj);
            }
        }

        /**
         * 给实例传递失败的回调函数,该方法会添加到实例的原型上
         */
        catch() {

        }


        /**
         * 根据参数返回新的Promise实例，该方法添加到类本身(静态方法)
         */
        static resolve() {

        }

        /**
         * 返回新的失败状态的Promise实例，该方法添加到类本身(静态方法)
         */
        static reject() {

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