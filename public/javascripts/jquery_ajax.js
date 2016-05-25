$(document).ready(function(){
    $("form").submit(function(){
        //get form element values
        var id = $('#id').val();
        var title = $('#title').val();
        var date = $('#date').val();
        var location = $('#location').val();
        var notes = $('#notes').val();
        
        
        
    //Submit form using Ajax        
        $.post("/add_list",
        {//Ajax Post call
            id: id,
            title: title,
            date: date,
            location: location,
            notes: notes
        },
        function(data, status){
            
            var new_todo_item = '<a href="#" class="list-group-item"><i class="fa fa-comment fa-fw"></i>'+title+' <span class="pull-right text-muted small"><em>4 minutes ago</em></span></a>';
            $("#todo_list").append(new_todo_item);
            //alert("\nNew data Added");
            
            $('form').trigger("reset");
            console.log($('#location').val());
        });
        
        
    return false;});
});

