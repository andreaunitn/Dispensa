

      rootUrl = document.location.origin

      ingredienti = []
      ingredienti_lista=[]
      ricettePerTitolo=[]
      ingredienti_da_stampare=[]

      //Check if user is authenticated
        $(document).ready(function(){
          //const token = localStorage.getItem("user")
          //Token di prova

          $.ajax({
              type: 'GET',
              url: rootUrl + '/api/v1/users/me',
              data: {token: localStorage.getItem('token')},
              datatype: 'json',
              success: function (data) {
                //console.log('ciao')
                document.getElementById('login').innerHTML = '<b style="font-size: 20px">Ciao, ' + data.nome +'</b>'
                document.getElementById('login').setAttribute('onclick','window.location.href="/myProfile"')
                ingredienti = data.ingredienti
                localStorage.setItem('ingredienti',ingredienti)
              },
              error: function (data) {
                document.getElementById('login').innerHTML='<b style="font-size: 20px">Accedi</b>'

              }
          });
        });

        //Permette al pulsante di eseguire l'azione quando viene premuto il tasto invio
        $("#ingrediente").keyup(function(event) {
            if (event.keyCode === 13) {
                $("#submit_ingredienti").click();
            }
        });

        $("#titolo_ricetta").keyup(function(event) {
            if (event.keyCode === 13) {
                $("#submit_titolo").click();
            }
        });

        function stampa_ricette_trovate() {

          var div = document.getElementById("ricette_cercate")
          var ul = document.createElement('ul')

          if (ricette_trovate != '' && ricette_trovate.length == 0 ) {
            document.getElementById('ricette_cercate').innerHTML = 'Nessuna ricetta trovata...'
          } else {
            for (var i = 0; i < ricette_trovate.length; i++) {
              const ricetta = ricette_trovate[i]

              var li = document.createElement('li')
              var a = document.createElement('a')

              var appendix = ""

              if (ricetta[2]) {
                appendix = "✅"
              }
              else {
                appendix = "❌"
              }

              a.classList.add('elem_stampati')
              a.innerHTML = ricetta[0] + " " + appendix
              a.href = rootUrl + "/api/v1/ricette/" + ricetta[3]

              li.appendChild(a)
              var button = document.createElement("button")
              button.setAttribute("onclick","missing_ingredients(this)");
              button.id=i
              button.classList.add('btn1')
              button.innerHTML="Cosa manca?"
              div=document.createElement("div")
              div.id="dettaglio_"+i
              li.appendChild(div)
              li.append(button)
              ul.appendChild(li)

            }

            var new_div = document.createElement('div')
            new_div.appendChild(ul)

            document.getElementById('ricette_cercate').innerHTML = new_div.innerHTML
          }
        }

        function cercaRicette() {

          $.ajax({
              type: 'GET',
              url: rootUrl + '/api/v1/ricette',
              data: 'ingredienti=' + JSON.stringify({ 'ingredienti': ingredienti }),
              datatype: 'json',
              success: function (data) {

                var result = data

                //Visualizzo le ricette trovate
                var div = document.getElementById("lista_ricette")
                var ul = document.createElement('ul')

                if (result.length == 0 ) {
                  document.getElementById('lista_ricette').innerHTML = 'Nessuna ricetta trovata...'
                } else {
                  for (var i = 0; i < result.length; i++) {
                    const ricetta = result.ricette[i]

                    var li = document.createElement('li')
                    var a = document.createElement('a')
                    a.classList.add('elem_stampati')
                    a.innerHTML = ricetta.titolo
                    a.href = rootUrl + "/api/v1/ricette/" + ricetta._id

                    li.appendChild(a)
                    ul.appendChild(li)

                  }

                  var new_div = document.createElement('div')
                  new_div.appendChild(ul)
                  //se aggiungo piu ingredienti, stampo la lista di ricette attuali e sostituisco quella precedente.
                  //fix: prima veniva appesa a quella precedente
                  document.getElementById('lista_ricette').innerHTML = new_div.innerHTML
                }
              }
          });
        }


        function consiglia_ricette() {

           //recupero da localStorage gli ingredienti e popolo l'array locale "ingredienti"
           //acquisti.html -> home.html
           if (localStorage.getItem('ingredienti')) {
             temp = localStorage.getItem('ingredienti').split(",")
             ingredienti=temp

              cercaRicette()
              feasability()

              //Rende permanente i dati
              localStorage.setItem('ingredienti', ingredienti);
           } else {
             document.getElementById("lista_ricette").innerHTML = "Niente ingredienti? niente ricette.."
           }
        }

        function cercaRicettePerTitolo(titolo) {
            $.ajax({
                type: 'GET',
                url: rootUrl + '/api/v1/ricette',
                data: 'titolo=' + titolo,
                datatype: 'json',
                success: function (data) {

                    ricettePerTitolo = data.ricette //variabile globale
                    //console.log(ricettePerTitolo)

                    feasability()

                }
            })
        }

        function feasability() {

          //Ripulisco l'array prima di utilizzarlo
          ricette_trovate = []
          if (localStorage.getItem('ingredienti')) {
            ingredienti=localStorage.getItem('ingredienti').split(",")

            let ricette = ricettePerTitolo

            //Scorro tra le ricette trovate e verifico se possono essere cucinate
            for(var i = 0; i < ricette.length; i++) {
                let r = ricette[i].ingredienti
                let t = ricette[i].titolo
                let id = ricette[i]._id

                const result = r.every(val => ingredienti.includes(val));

                ricette_trovate.push([t, r, result, id])
            }

            stampa_ricette_trovate()
          } else {
            document.getElementById("ricette_cercate").innerHTML="Niente ingredienti? niente ricette..."
          }

        }

        function search_recipe() {
            const text_field = document.getElementById('titolo_ricetta')
            const titolo = text_field.value
            text_field.value = ""

            //Richiesta ajax per ottenere le ricette in base al titolo
            cercaRicettePerTitolo(titolo)
        }

        //verifico quali ingredienti mi mancano: diff tra ricettePerTitolo.ingredienti e ingredienti
        function missing_ingredients(elem) {

          ingredienti_necessari=ricette_trovate[elem.id][1]

          let difference = ingredienti_necessari.filter(x => !ingredienti.includes(x));

          //console.log("missing:")
          //console.log(difference)

          if (difference=='') {
            document.getElementById("dettaglio_"+elem.id).innerHTML="Niente! tutto pronto ;)"
          } else {
            document.getElementById("dettaglio_"+elem.id).innerHTML="<b>Ti mancano: </b>"+difference
          }

          document.getElementById(elem.id).style="visibility:hidden"

        }

        function openForm() {
            document.getElementById("myForm").style.display = "block";
          }

        function closeForm() {
            document.getElementById("myForm").style.display = "none";
          } name = ""

          ingredienti_per_ricetta=[]

          //Invio la ricetta per essere inserita nel DB
          function inserisci_ricetta() {

              const titolo = document.getElementById("titolo")
              const ingr = document.getElementById("ingrediente")
              const num_per = document.getElementById("num_per")
              const energia = document.getElementById("energia")
              const descrizione = document.getElementById("descrizione")

              if(titolo.value != "" && !isNaN(num_per.value)  && !isNaN(energia.value) && descrizione.value != "" && ingredienti_per_ricetta.length != 0) {

                  console.log(titolo.value)
                  console.log(num_per.value)
                  console.log(energia.value)
                  console.log(descrizione.value)
                  console.log(ingredienti_per_ricetta)

                  $.post(rootUrl + '/api/v1/ricette', {
                      titolo: titolo.value,
                      ingredienti: ingredienti_per_ricetta,
                      num_per: num_per.value,
                      energia: energia.value,
                      descrizione: descrizione.value
                    },
                    function(data, status, xhr){
                        if(xhr.status == 201) {
                          window.location.replace(xhr.getResponseHeader("location"));
                        }
                    }).fail(
                        function(jqXHR, textStatus, errorThrown) {
                          var json_err = JSON.parse(jqXHR.responseText)

                          window.alert(json_err.message)
                        }
                      );

              } else {
                  window.alert("Alcuni campi della ricetta non sono stati specificati oppure hanno un formato sbagliato")
              }

              titolo.value = ""
              ingrediente.value = ""
              num_per.value = ""
              energia.value = ""
              descrizione.value = ""
          }

          //Prendo l'ingrediente inserito lo aggiungo alla lista
          function add_ingrediente() {
              const text_field = document.getElementById("ingrediente")
              const ingr = text_field.value
              text_field.value = ""

              //Se un ingrediente è già presente nella lista non lo aggiungo
              if (!ingredienti.includes(ingr) && ingr != '') {
                  ingredienti_per_ricetta.push(ingr)
              }
          }

          //autocomplete
          function ottieniIngredienti() {
              $.ajax({
                  type: 'GET',
                  url: rootUrl + '/api/v1/ingredients',
                  data: '',
                  datatype: 'json',
                  success: function (data) {

                      ingredienti_lista = data.ingredienti.ingredienti //variabile globale
                      //console.log(ingredienti_lista)

                      autocomplete(document.getElementById("ingrediente"), ingredienti_lista)
                  }
              })
          }

          function autocomplete(inp, arr) {
                  /*the autocomplete function takes two arguments,
                  the text field element and an array of possible autocompleted values:*/
                  var currentFocus;
                  /*execute a function when someone writes in the text field:*/
                  inp.addEventListener("input", function(e) {
                      var a, b, i, val = this.value;
                      /*close any already open lists of autocompleted values*/
                      closeAllLists();
                      if (!val) { return false;}
                      currentFocus = -1;
                      /*create a DIV element that will contain the items (values):*/
                      a = document.createElement("DIV");
                      a.setAttribute("id", this.id + "autocomplete-list");
                      a.setAttribute("class", "autocomplete-items");
                      /*append the DIV element as a child of the autocomplete container:*/
                      this.parentNode.appendChild(a);
                      /*for each item in the array...*/
                      for (i = 0; i < arr.length; i++) {
                        /*check if the item starts with the same letters as the text field value:*/
                        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                          /*create a DIV element for each matching element:*/
                          b = document.createElement("DIV");
                          /*make the matching letters bold:*/
                          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                          b.innerHTML += arr[i].substr(val.length);
                          /*insert a input field that will hold the current array item's value:*/
                          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                          /*execute a function when someone clicks on the item value (DIV element):*/
                          b.addEventListener("click", function(e) {
                              /*insert the value for the autocomplete text field:*/
                              inp.value = this.getElementsByTagName("input")[0].value;
                              /*close the list of autocompleted values,
                              (or any other open lists of autocompleted values:*/
                              closeAllLists();
                          });
                          a.appendChild(b);
                        }
                      }
                  });

                  /*execute a function presses a key on the keyboard:*/
                  inp.addEventListener("keydown", function(e) {
                      var x = document.getElementById(this.id + "autocomplete-list");
                      if (x) x = x.getElementsByTagName("div");
                      if (e.keyCode == 40) {
                        /*If the arrow DOWN key is pressed,
                        increase the currentFocus variable:*/
                        currentFocus++;
                        /*and and make the current item more visible:*/
                        addActive(x);
                      } else if (e.keyCode == 38) { //up
                        /*If the arrow UP key is pressed,
                        decrease the currentFocus variable:*/
                        currentFocus--;
                        /*and and make the current item more visible:*/
                        addActive(x);
                      } else if (e.keyCode == 13) {
                        /*If the ENTER key is pressed, prevent the form from being submitted,*/
                        e.preventDefault();
                        if (currentFocus > -1) {
                          /*and simulate a click on the "active" item:*/
                          if (x) x[currentFocus].click();
                        }
                      }
                  });
                  function addActive(x) {
                    /*a function to classify an item as "active":*/
                    if (!x) return false;
                    /*start by removing the "active" class on all items:*/
                    removeActive(x);
                    if (currentFocus >= x.length) currentFocus = 0;
                    if (currentFocus < 0) currentFocus = (x.length - 1);
                    /*add class "autocomplete-active":*/
                    x[currentFocus].classList.add("autocomplete-active");
                  }
                  function removeActive(x) {
                    /*a function to remove the "active" class from all autocomplete items:*/
                    for (var i = 0; i < x.length; i++) {
                      x[i].classList.remove("autocomplete-active");
                    }
                  }
                  function closeAllLists(elmnt) {
                    /*close all autocomplete lists in the document,
                    except the one passed as an argument:*/
                    var x = document.getElementsByClassName("autocomplete-items");
                    for (var i = 0; i < x.length; i++) {
                      if (elmnt != x[i] && elmnt != inp) {
                        x[i].parentNode.removeChild(x[i]);
                      }
                    }
                  }
                  /*execute a function when someone clicks in the document:*/
                  document.addEventListener("click", function (e) {
                      closeAllLists(e.target);
                  });
                }

          //ingredienti_lista=["farina","latte","uova","zucchero","sale","olio","lievito","pomodoro","mozzarella","acqua","panna","conservanti","limone","mele","pere","banane","fragole","prosciutto cotto","prosciutto crudo","bastoncini","piselli","ceci","tonno","pane","petto di pollo","pan grattato","olio per friggere","pasta per lasagne","ragu","besciamella","grana","burro"]

          ricette_lista=["pane","pasta","focaccia","pizza","pane e tonno","pane e prosciutto","lasagne","gnocchi di pane","gnocchi di patate","macedonia","piselli al pomodoro","cotolette","salamine alla griglia"]

          autocomplete(document.getElementById("titolo_ricetta"), ricette_lista);


      function resendUpdatedIngredients(arr) {

        $.ajax({
            type: 'PUT',
            url: 'http://localhost:3000/api/v1/users/me',
            headers: {
              'x-access-token':localStorage.getItem('token')
            },
            data: 'ingredienti='+arr,
            //datatype: 'json',
            success: function (data) {
              console.log(data)
            },
        });

      }

      function loadIngredienti() {

        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/api/v1/users/me',
            data: {token: localStorage.getItem('token')},
            datatype: 'json',
            success: function (data) {

              var res = data.ingredienti;

              var span = document.getElementById('lista_ingredienti')
              //ingredienti_da_stampare=localStorage.getItem('ingredienti')

              if ( res !== [] || res !== null || res[0] !== '' ) {

                console.log(typeof(res))

                ingredienti_da_stampare = res

                for (var i = 0; i < ingredienti_da_stampare.length; i++) {
                  var button = document.createElement('button')

                  const ingr = ingredienti_da_stampare[i]

                  if (ingr !== '') {

                    button.textContent = ingr
                    button.classList.add('btn1')
                    button.id = ingr
                    button.onclick = function () {

                    for (j = 0; j < ingredienti_da_stampare.length; j++) {
                      if (ingredienti_da_stampare[j] == ingr) {
                        ingredienti_da_stampare.splice(j, 1)
                        const ingr_list = document.getElementById('lista_ingredienti')
                        const i = document.getElementById(ingr)
                        ingr_list.removeChild(i)

                        console.log(ingredienti_da_stampare)
                        }
                       }

                        //preserve client-server coherence
                        localStorage.setItem('ingredienti',ingredienti_da_stampare)
                        resendUpdatedIngredients(ingredienti_da_stampare)

                      }

                    span.appendChild(button)

                  } else {
                    document.getElementById("lista_ingredienti").innerHTML = "Lista vuota... conviene far le spese!"
                  }

                }
              } else {
                document.getElementById("lista_ingredienti").innerHTML = "Lista vuota... "
              }

            }
        });

      }





          //Prendo l'ingrediente inserito lo aggiungo alla lista
          function add_ingredient() {
              ingredienti = []
              const text_field = document.getElementById('ingrediente');
              const ingr = text_field.value
              text_field.value = ""

              //Se un ingrediente è già presente nella lista non lo aggiungo
              if(!ingredienti.includes(ingr) && ingr != '') {
                  ingredienti.push(ingr)

                  //Visualizzo gli ingredienti. Se premo su un ingrediente lo rimuovo dalla lista
                  var span = document.getElementById('lista_ingredienti')
                  var button = document.createElement('button')
                  button.textContent = ingr
                  button.classList.add('btn1')
                  button.id = ingr
                  button.onclick = function () {

                      for (j = 0; j < ingredienti.length; j++) {
                          if (ingredienti[j] == ingr) {
                              ingredienti.splice(j, 1)
                              const ingr_list = document.getElementById('lista_ingredienti')
                              const i = document.getElementById(ingr)
                              ingr_list.removeChild(i)

                              console.log(ingredienti)
                          }
                      }
                  }
                  span.appendChild(button)
              }

              /////////////////////////////////////////////////////////

              if (localStorage.getItem('ingredienti')) {

                array=localStorage.getItem('ingredienti').split(",")

                for (i=0; i<array.length; i++) {
                  ingredienti.push(array[i])
                }

                localStorage.setItem('ingredienti',ingredienti)

              } else {
                localStorage.setItem('ingredienti',ingredienti)
                console.log("Non c'erano ingredienti, ma ora si:" + localStorage.getItem('ingredienti'))
              }

              $.ajax({
                  type: 'PUT',
                  url: 'http://localhost:3000/api/v1/users/me',
                  headers: {
                    'x-access-token':localStorage.getItem('token')
                  },
                  data: 'ingredienti='+localStorage.getItem('ingredienti'),
                  //datatype: 'json',
                  success: function (data) {
                    console.log(data)
                  },
              });

          }


              function includeHTML() {
                var z, i, elmnt, file, xhttp;
                /* Loop through a collection of all HTML elements: */
                z = document.getElementsByTagName("*");
                for (i = 0; i < z.length; i++) {
                  elmnt = z[i];
                  /*search for elements with a certain atrribute:*/
                  file = elmnt.getAttribute("w3-include-html");
                  console.log(file)
                  if (file) {
                    /* Make an HTTP request using the attribute value as the file name: */
                    xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function() {
                      if (this.readyState == 4) {
                        if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                        if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                        /* Remove the attribute, and call this function once more: */
                        elmnt.removeAttribute("w3-include-html");
                        includeHTML();
                      }
                    }
                    xhttp.open("GET", file, true);
                    xhttp.send();
                    /* Exit the function: */
                    return;
                  }
                }
              }

              includeHTML();
