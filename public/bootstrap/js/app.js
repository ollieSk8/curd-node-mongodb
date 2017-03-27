/**
 * Created by XD on 2017/3/27.
 */
(function(){
    $(function () {
        $('.delete-btn').on('click',function(){
            var name= $(this).attr('data-name');
            $('.delete-title').html('确定删除<span style="color:red;">'+name+'</span>的内容');
            $('#delete-modal').modal(true);
            $('#confirm-btn').on('click',function () {
                $.ajax({
                    url:'/delete',
                    type:'post',
                    data:{name:name},
                    success:function (res) {
                        if(res){
                            window.location.reload();
                        }
                    },
                    error:function(err){
                        console.log(err);
                    }
                });
            })
        });
        $('.edit-btn').on('click',function () {
            var name= $(this).attr('data-name');
            var quote= $(this).attr('data-quote');
            $('.edit-title').html('修改<span style="color:red;">'+name+'</span>的内容');
            $('#fix-name').val(name);
            $('#fix-quote').val(quote);
            $('#edit-modal').modal(true);
            $('#confirm-edit-btn').on('click',function () {
                var fix_name=$('#fix-name').val();
                var fix_quote=$('#fix-quote').val();
                $.ajax({
                    url:'/edit',
                    type:'post',
                    data:{
                        query:name,
                        name:fix_name,
                        quote:fix_quote
                    },
                    success:function (res) {
                        if(res){
                            window.location.reload();
                        }
                    },
                    error:function(err){
                        console.log(err);
                    }
                });
            })
        })
    })
})();