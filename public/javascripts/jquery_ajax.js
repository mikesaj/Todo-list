$(document).ready(function(){
    $("form#form_add_todo_item").submit(function(){
        //get form element values
        var id = $('#id').val();
        var title = $('#title').val();
        var date = $('#date').val();
        var location = $('#location').val();
        var notes = $('#notes').val();
        
        
    //Ajax $.post() method to send some data along with the request    
    //Submit form using Ajax into the "/add_list" route       
        $.post("/add_list",
        {
            id: id,
            title: title,
            date: date,
            location: location,
            notes: notes
        },
        function(data, status){
            //The optional callback parameter is a function to be executed if the request succeeds
            
            var new_todo_item = '<a href="#?uid='+id+'&todo_id=788'+' "class="list-group-item"><i class="fa fa-comment fa-fw"></i>'+title+' <span class="pull-right text-muted small"><em>4 minutes ago</em></span></a>';
            $("#todo_list").append(new_todo_item);
            
            //Fadein/Fadeout Feedback label after successful data save
            $("#feedback").fadeIn("slow");
            $("#feedback").fadeToggle("slow");
            
            //Reset form elements
            $('form').trigger("reset");
            console.log($('#location').val());
        });
        
        
    return false;
    });
});

