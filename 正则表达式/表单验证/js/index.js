(function(){
            // 验证用户
            var usernameInput = document.querySelector('#usernameInput');
            var usernameInfo = document.querySelector('#usernameInfo');
            usernameInput.onblur = checkUsername;

            // 验证邮箱
            var emailInput = document.querySelector('#emailInput');
            var emailInfo = document.querySelector('#emailInfo');
            emailInput.onblur = checkEmail;

            // 验证密码；
            var pwdInput = document.querySelector('#pwdInput');
            var pwdInfo = document.querySelector('#pwdInfo');
            pwdInput.onblur = checkRwd;

            // 验证确认密码
            var repwdInput = document.querySelector('#repwdInput');
            var repwdInfo = document.querySelector('#repwdInfo');
            repwdInput.onblur = checkRepwd;


            // 表单监听提交事件
            var formBox = document.querySelector('#formBox');
            formBox.onsubmit = function() {
                //当返回false时，阻止浏览器默认行为
                return checkUsername() && checkEmail() && checkRwd() && checkRepwd();
            };



            // 验证用户名的函数
            function checkUsername() {
                // 定义验证用户名的正则
                var reg = /^\w{4,12}$/;
                // 验证判断
                if (reg.test(usernameInput.value)) {
                    usernameInfo.innerHTML = '用户名可用！';
                    usernameInfo.style.color = '#080';
                    return true;
                } else {
                    usernameInfo.innerHTML = '用户名必须是4到12位数字、字母、下划线组成！';
                    usernameInfo.style.color = '#f00';
                    return false;
                }
            };
       
            // 验证邮箱的函数
            function checkEmail() {
                // 验证邮箱的正则表达式
                var reg = /^[\w-]+@\w+(\.\w+){1,2}$/;
                 // 验证判断
                 if (reg.test(emailInput.value)) {
                    emailInfo.innerHTML = '邮箱可用！';
                    emailInfo.style.color = '#080';
                    return true;
                } else {
                    emailInfo.innerHTML = '请输入正确的邮箱！';
                    emailInfo.style.color = '#f00';
                    return false;
                } 
            };
            
            // 验证密码的函数
            function checkRwd() {
                // 验证密码
                if (pwdInput.value.length >= 6 && pwdInput.value.length <= 18) {
                    pwdInfo.innerHTML = '密码可用！';
                    pwdInfo.style.color = '#080';
                    return true;
                } else {
                    pwdInfo.innerHTML = '密码必须是6到18位！';
                    pwdInfo.style.color = '#f00';
                    return false;
                } 
            };
        
            function checkRepwd() {
                if (repwdInput.value === pwdInput.value) {
                    repwdInfo.innerHTML = '密码一致！';
                    repwdInfo.style.color = '#080';
                    return true;
                } else {
                    repwdInfo.innerHTML = '两次密码不一致';
                    repwdInfo.style.color = '#f00';
                    return false
                } 
            };            
        })();