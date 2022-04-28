//注意：每次调用$.post()或$.ajax()的时候
//会先调用ajaxPrefiler这个函数
//在这个函数中，可以拿到我们给AJAX提供的配置对象
$.ajaxPrefilter(function(options){  
    //发起真正的Ajax请求之前，统一拼接请求的根路劲
    options.url = 'http://www.liulongbin.top:3007' + options.url
    //console.log(options.url)


    //统一为有权限的接口，设置headers请求头
    if(options.url.indexOf('/my/')!==-1){
         options.headers ={
        Authorization: localStorage.getItem('token')||''
    }
    }
   

    //全局统一挂载complete回调函数
    options.complete = function(res){
           //res.resoonseJSON拿到服务器响应回来的数据
           if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            localStorage.removeItem('token')
            location.href = './login.html'
        } 
      
    }
})