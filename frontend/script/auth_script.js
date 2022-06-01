

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
           error: function (data) {

               window.alert(data.message)
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
            error: function (data) {
                 //to handle msg error

                window.alert(data.message)
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
            document.getElementById('password').value=""

          }

          //commit changes to the DB
          function save() {

          }

          function logout() {

            localStorage.clear();

            window.location.replace('/')

            console.log('Bye bye')

          }
