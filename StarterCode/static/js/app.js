
function displayDemoInfo (subjectID) {
    // Name and path to JSON file with dataset 
    let json_file = "samples.json";

    // Read in JSON file with D3
    d3.json(json_file).then(function(data) {

        // Filter metadata set to return only metadata for matching ID and subjectID function parameter
        // i.e. Only returns metadata for the desired subject
        let subject_metadata = data.metadata.filter(subject => subject.id == subjectID)

        // Display metadata to console for checking
        // Using an index of 0 as subject_metadata is an array of length 1
        console.log(subject_metadata[0]);

        // Use D3 to select the panel on the page to display the demogrpahic information
        let panel_body = d3.select(".panel-body");

        // Clear any previous output from panel
        panel_body.html("");

        // Display demographic information to designated panel on page
        Object.entries(subject_metadata[0]).forEach(([key, value]) => {

            // Append each piece of demographic info to the panel with the <p> HTML tag
            // Stored as key-value pairs in subject_metadata[0]
            let demoInfo = panel_body.append("p").text(`${key}: ${value}`);

        });
    });
}

// Call function to update displays of demographic information panel and plots
// when the dropdown menu selection is changed
d3.selectAll("#selDataset").on("change", optionChanged);

// Function to display demographic information panel and plots from dropdown menu selection
function optionChanged() {

    // Assign dropdown menu to variable using D3 and ID for menu given in HTML
    let dropdownMenu = d3.select("#selDataset");

    // Assign the value of the dropdown menu option to a variable
    let subject = dropdownMenu.property("value");
    
    // Display the demographic information panel for the desired subject
    displayDemoInfo(subject);

}

// Initialisation function
function init() {
    // Name and path to JSON file with dataset 
    let json_file = "samples.json";

    // Read in JSON file with D3
    d3.json(json_file).then(function(data) {
    
        // Display datset read from JSON file to console
        console.log(data);
        
        // Select the ID of the dropdown menu
        let dropdownMenu = d3.select("#selDataset");

        // Populate the dropdown list with the names/IDs of the subjects
        // Set with HTML tag <option>, attribute of the name/ID and text display of the name/ID
        data.names.forEach(nameID => {
            dropdownMenu.append("option").attr("value", nameID).text(nameID);
        });
        
    displayDemoInfo(data.names[0]);


  });
  
}

// Call initialisation function
init();