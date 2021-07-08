//$ represent jquery
$(document).ready(
	function(){

		$('#register').submit(function (event) {
			event.preventDefault();

			var formdata= new FormData();
			var myFormData={
				//key and values
                image:$('#image')[0].files[0],
				firstName: $('#firstName').val(),
				lastName: $('#lastName').val(),
                phone: $('#phone').val(),
                state: $('#state').val(),
                city: $('#city').val(),
                address: $('#address').val(),
				gender: $('input[name="gender"]:checked').val(),
				email: $('#email').val(),
				password: $('#password').val(),
				pw: $('#pw').val(),
				usertype: $('#usertype').val()
			}

            for (key in myFormData){
              formdata.append(key,myFormData[key])
            }

            $.ajax({
                // users is the route in backend and v1 is the version, Json won't pass so we should first convert to string
                url:'http://localhost:3000/v1/users',
                method:'POST',
               contentType:false,
                processData:false,
                data: formdata,
                dataType:'json',

                success:function(result,status){
                    console.log(result);
                    console.log(status);
                    $('#message').append(' <div class="alert alert-success" >\n' +
                        '                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\n' +
                        '         '+ result.message+'          \n' +
                        '            </div>');
                    window.location.href="login.html";

                },

                error:function (jqXHR,status) {
                    // console.log(status);
					// console.log(jqXHR.responseJSON.message);
                    $('#emailexist').append(' <div class="alert alert-danger" >\n' +
                        '                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\n' +
                        '         '+ jqXHR.responseJSON.message+'          \n' +
                        '            </div>');
                }

            })
		})



        $('#loginform').submit(function (event) {
            event.preventDefault();
            var myLoginForm={

                email: $('#email').val(),
                password: $('#password').val()
            }

            $.ajax({
                // users is the route in backend and v1 is the version, Json won't pass so we should first convert to string
                url:'http://localhost:3000/v1/login',
                method:'POST',
                contentType:'application/json',
                dataType:'json',
                // headers: { 'Authorization' : window.localStorage.getItem('token')},
                data: JSON.stringify(myLoginForm),

                success:function(result,status){
                    window.localStorage.setItem('token',result.token);
                    window.localStorage.setItem('userid',result.result.userId);
                    window.localStorage.setItem('firstname',result.result.firstName);
                    window.localStorage.setItem('lastname',result.result.lastName);
                    window.localStorage.setItem('phone',result.result.phone);
                    window.localStorage.setItem('state',result.result.state);
                    window.localStorage.setItem('city',result.result.city);
                    window.localStorage.setItem('address',result.result.address);
                    window.localStorage.setItem('gender',result.result.gender);
                    window.localStorage.setItem('email',result.result.email);
                    window.localStorage.setItem('usertype',result.result.usertype);
                    window.localStorage.setItem('image',result.result.image);
                    console.log(result.result.usertype);
                    if (result.result.usertype == "Hirer"){
                        window.location.href='Hirer/hirerdashboard.html';
                    }
                    else
                    {
                        window.location.href='Employee/employeedashboard.html'
                    }


// 					console.log(result.token);

                    // console.log(status);
                    // $('#message').html(result.message);

                },

                error:function (jqXHR,status) {
                    // console.log(status);
                    // console.log(jqXHR.responseJSON.message);
                    // $('#message').html(jqXHR.responseJSON.message);
                    $('#message').append(' <div class="alert alert-danger" >\n' +
                        '                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\n' +
                        '         ' + jqXHR.responseJSON.message + '          \n' +
                        '            </div>');
                }

            })
        })
        $('#getUsers').click(function (event) {
            event.preventDefault();
            console.log('click');

            $.ajax({
                // users is the route in backend and v1 is the version, Json won't pass so we should first convert to string
                url:'http://localhost:3000/v1/allusers',
                method:'GET',
                contentType:'application/json',
                dataType:'json',
                // headers: { 'Authorization' : window.localStorage.getItem('token')},


                success:function(result,status){

					console.log(result);

                    // console.log(status);
                    // $('#message').html(result.message);

                },

                error:function (jqXHR,status) {
                    // console.log(status);
                    // console.log(jqXHR.responseJSON.message);
                    // $('#message').html(jqXHR.responseJSON.message);
                }

            })
        })



        })



