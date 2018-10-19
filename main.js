

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBCJ6I3JtUg44w1nLrGHGvoDRg3xUUIuBM",
    authDomain: "tareas-16269.firebaseapp.com",
    databaseURL: "https://tareas-16269.firebaseio.com",
    projectId: "tareas-16269",
    storageBucket: "",
    messagingSenderId: "237448322725"
  };
  firebase.initializeApp(config);
  var db = firebase.database();


Vue.component('app-tasks', {
    template: '#task-template',
    data: function(){
        return{
            nuevaTarea: null,
        editandoTarea: null,
        }
    }, 

    props: ['tareas'],

    methods: {
        agregarTarea: function(tarea) {
             db.ref('tareas/').push({
                titulo: tarea, completado: false
            });
            this.nuevaTarea = '';
        },
        editarTarea: function(tarea) {
            db.ref('tareas/' + tarea['.key']).update({
                titulo: tarea.titulo
            });
        },
        actualizarEstadoTarea(estado, tarea){
            db.ref('tareas/' + tarea['.key']).update({
                completado: estado ? true : false,
            });
        },
        eliminarTarea: function(tarea) {
            db.ref('tareas/' + tarea['.key']).remove();
    },
},
});





const vm = new Vue({
    el: 'body',
    //para conectar con la bd
    ready: function(){
        db.ref('tareas/').on('value', function(snapshot){
            vm.tareas = [];
            var objeto = snapshot.val();
            for (var propiedad in objeto){
                vm.tareas.unshift({
                    '.key': propiedad, 
                    completado: objeto[propiedad].completado,
                    titulo : objeto[propiedad].titulo
                });
            }
        });
    },
    data: {
        tareas: []
    },
    
}); 





                                         