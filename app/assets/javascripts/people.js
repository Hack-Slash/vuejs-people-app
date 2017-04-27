document.addEventListener("DOMContentLoaded", function(event) {
  var app = new Vue({
    el: '#app',
    data: {
      people: [
      ],
      newPersonName: '',
      newPersonBio: ''
    },
    mounted: function() {
      console.log('mounted is working');
      // grab the data
      // put that
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
        this.people.push(
          {
            name: this.newPersonName,
            bio: this.newPersonBio,
            bioVisible: false
          }
        )
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
      }
    }
  });
});
