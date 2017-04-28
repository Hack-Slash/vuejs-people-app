document.addEventListener("DOMContentLoaded", function(event) {
  var app = new Vue({
    el: '#app',
    data: {
      people: [],
      newPersonName: '',
      newPersonBio: '',
      errors: [],
      nameSearch: '',
      bioSearch: ''
    },
    mounted: function() {
      console.log('mounted is working');
      $.get("/api/v1/people", function(response) {
        console.log(response);
        console.log(this);
        this.people = response;
      }.bind(this));
    },
    methods: {
      toggleBioVisible: function(inputPerson) {
        console.log('toggling...');
        console.log(inputPerson);
        inputPerson.bioVisible = !inputPerson.bioVisible;
      },
      addPerson: function() {
        console.log('adding the person...');
        // push an object into the perople array
        var parameters = {
          name: this.newPersonName,
          bio: this.newPersonBio
        }

        $.post("/api/v1/people", parameters, function(response){
          console.log('success');
          this.people.push(response);
          this.newPersonName = '';
          this.newPersonBio = '';

        }.bind(this)).fail(function(responseError){
          console.log(responseError.responseJSON.errors);
          this.errors = responseError.responseJSON.errors
        }.bind(this))
      },
      countOfPeople: function() {
        return this.people.length;
      },
      removePerson: function(inputPerson) {
        console.log('removing person...');
        // get the index of that person
        // sPlice them out
        var index = this.people.indexOf(inputPerson);
        console.log(index);
        this.people.splice(index, 1);
      },
      isValidPerson: function(inputPerson) {
        return inputPerson.bio.toLowerCase().indexOf(this.bioSearch.toLowerCase()) > -1 && inputPerson.name.toLowerCase().indexOf(this.nameSearch.toLowerCase()) > -1;
      }
    },
    computed: {
     modifiedPeople: function() {
       // write a sort function
       return this.people.sort(function(person1, person2){
        return person1.name.toLowerCase().localeCompare(person2.name.toLowerCase());
       })
     }
    }
  });
});
