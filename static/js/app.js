function buildChoices(choice) {
  
    url=`/buildchoice/`+ choice;
  
    d3.json(url).then(function(data){

      // console.log(data)

    document.getElementById("app").innerHTML = `
      <h1 class="app-title">You have (${data.length} options)</h1>
      ${data.map(foodTemplate).join("")}
      <p class="footer">These ${data.length} were found. Check back soon for new otions.</p>
    `;
  });
}

function foodTemplate(data) {
  return `
    <div class="animal">
    <img class="pet-photo" src="${data.image_url}">
    <a href="${data.item_url}" </a>
    <h2 class="pet-name">${data.Beverage} <span class="species">(${data.Type})</span></h2>
    <p><strong>Calories:</strong> ${data.Calories}</p>
    <p><strong>Fat:</strong> ${data.Fat}</p>
    <p><strong>Sugar:</strong> ${data.Sugar}</p>
    <p><strong>Protein:</strong> ${data.Protein}</p>
    <p><strong>Caffeine:</strong> ${data.Caffeine}</p>
    </div>
  `;
}

function init() {

    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    var choices = [    
                      {"choice" : "Light Beverage" },
                      {"choice" : "Feel good snack" },
                      {"choice" : "High Protien Low Sugar Meal" },
                      {"choice" : "Beverage" },
                      {"choice" : "Healthy Snack" }
                    ] 
             
    var arrayLength = choices.length;

    for (var i = 0; i < arrayLength; i++) {
        //Populate Dropdown with Choices
                    selector
                     .append("option")
                     .text(choices[i].choice)
                     .property("value", choices[i].choice);
            
        }                

      // Use the first Company (Starbucks) from the list to build the initial plots
      const firstSample = choices[0].choice;      
      buildChoices(firstSample);

}
  
function optionChanged(newSample) {
      // Fetch new data each time a new sample is selected      
      buildChoices(newSample);;
}
  
// Initialize the dashboard
init();
  