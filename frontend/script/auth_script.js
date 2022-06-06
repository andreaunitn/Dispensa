

      var loggedUser = {};
      rootUrl = document.location.origin

      function login() {

        //not a good idea :)
        //console.log('mail='+document.getElementById('loginEmail').value)
        //console.log('psw='+document.getElementById('loginPassword').value)

        $.ajax({
            type: 'POST',
            url: rootUrl + '/api/v1/authentication/login',
            data: 'email='+document.getElementById('loginEmail').value+'&password='+document.getElementById('loginPassword').value,
            datatype: 'json',
            success: function (data) {
              //console.log(data)

                console.log(data.token)
                localStorage.setItem('token',data.token)
                //loggedUser.add(data)
                window.location.href='/'

            },
           error: function (jqXHR, textStatus, errorThrown) {

               var json_err = JSON.parse(jqXHR.responseText)

               window.alert(json_err.message)
               document.getElementById('loginPassword').value=''


           }
        });
        };

        function register() {

          nome = document.getElementById('registerNome').value
          cognome = document.getElementById('registerCognome').value
          email = document.getElementById('registerEmail').value
          password = document.getElementById('registerPassword').value


          $.ajax({
              type: 'POST',
              url:  rootUrl + '/api/v1/authentication/register',
              data: 'nome=' + nome + '&cognome=' + cognome + '&email=' + email + '&password=' + password,
              datatype: 'json',
              success: function (data) {

                  //console.log(data.token)
                  localStorage.setItem('token',data.token)
                  window.location.href='/'

              },
              error: function (jqXHR, textStatus, errorThrown) {


                var json_err = JSON.parse(jqXHR.responseText)

                window.alert(json_err.message)

                document.getElementById('registerNome').value=''
                document.getElementById('registerCognome').value=''
                document.getElementById('registerEmail').value=''
                document.getElementById('registerPassword').value=''

            }

          });
          };


          //pulisce i campi del form
          function reset() {

            console.log("X");

            document.getElementById('nome').value=""
            document.getElementById('cognome').value=""
            document.getElementById('email').value=""
            //document.getElementById('password').value=""

          }

          //commit changes to the DB
          function fillPersonalDataFields() {

            $.ajax({
                type: 'GET',
                url:  rootUrl + '/api/v1/users/me',
                headers: {'x-access-token':localStorage.getItem('token')},
                datatype: 'json',
                success: function (data) {

                    document.getElementById('nome').value=data.nome
                    document.getElementById('cognome').value=data.cognome
                    document.getElementById('email').value=data.email

                },
              error: function (jqXHR, textStatus, errorThrown) {
                   //to handle error msgs

                  window.alert(jqXHR.code+" "+jqXHR.responseText+" "+errorThrown)
                  document.getElementById('nome').value=''
                  document.getElementById('cognome').value=''
                  document.getElementById('email').value=''

              }

            });

          }

          function logout() {

            localStorage.clear();

            window.location.href='/'

            console.log('Bye bye')

          }

          function home() {
            window.location.href='/'
          }
