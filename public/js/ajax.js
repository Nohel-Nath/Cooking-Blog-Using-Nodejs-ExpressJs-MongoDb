import { get } from 'mongoose';
$(function() {
    $('#contact-section').submit(function(e) {
      e.preventDefault();
      $.ajax({
        type: 'POST',
        url: '/contact',
        data: $('#contact-section').serialize(),
        success: function(response) {
          $('#success-message').html(response.message);
          $('#contact-section form')[0].reset();
        },
        error: function() {
          $('#success-message').html('Oops! Something went wrong.');
        }
      });
    });
});



/*$("#contact-section").submit(function(event){
    event.preventDefault();
    alert("Thank you for your message!");
})*/


/*$("#contact-section").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
        data[n['email']] =n['email']
        data[n['message']]=n['message']
    })


    var request = {
        
        "method" : "POST",
        url: '/contact',
        data: $('#contact-section').serialize(),
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})*/