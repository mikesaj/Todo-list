/* geo_script.js
* This file contains the projects maps script

* Assignment By:
*  -Michael Sajuyigbe: 7434350
*  -Dhruvkumar Patel: 7453756
*/

//Geo auto complete script
$.log = function(message){
  var $logger = $("#logger");
  $logger.html($logger.html() + "\n * " + message );
}
      $(function(){
        
        $("#location").geocomplete()
          .bind("geocode:result", function(event, result){
            $.log("Result: " + result.formatted_address);
            
            //console.log("Lat: " + event.latLng);
            //console.log("Long: " + result.lng);
          })
          .bind("geocode:error", function(event, status){
            $.log("ERROR: " + status);
          })
          .bind("geocode:multiple", function(event, results){
            $.log("Multiple: " + results.length + " results found");
          });
        
        $("#find").click(function(){
          $("#location").trigger("geocode");
        });
        
        
        $("#examples a").click(function(){
          $("#location").val($(this).text()).trigger("geocode");
          return false;
        });
        
      });
      
      
      $(function(){
        $("#location").geocomplete({
          map: ".map_canvas",
          details: "form",
          types: ["geocode", "establishment"],
        });

        $("#find").click(function(){
          $("#location").trigger("geocode");
        });
      });     