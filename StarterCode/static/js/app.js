// Function to generate HTML code for display of demographic information of a subject in panel
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

// Function to plot bar and bubble charts
function displayPlots (subjectID) {

    // Name and path to JSON file with dataset 
    let json_file = "samples.json";

    // Read in JSON file with D3
    d3.json(json_file).then(function(data) {

        // Filter metadata set to return only sample data for matching ID and subjectID function parameter
        // i.e. Only returns metadata for the desired subject
        let subject_samples = data.samples.filter(subject => subject.id == subjectID)

        // Display metadata to console for checking
        // Using an index of 0 as subject_samples is an array of length 1
        console.log(subject_samples[0]);

        // Retrieve Top 10 sample values 
        // Already sorted in JSON data so can use .slice for values
        let sampleValuesTop10 = subject_samples[0].sample_values.slice(0,10);

        // Display sample values to console for checking
        console.log(sampleValuesTop10);

        // Retrieve otu IDs for Top 10 sample values
        let otuIDsTop10 = subject_samples[0].otu_ids.slice(0,10);

        // Display otu IDs to console for checking
        console.log(otuIDsTop10);

        // Convert otu IDs to array of strings with value "OTU {otuID}"
        // To provide clearer display in bar chart
        let otuIDsList = otuIDsTop10.map(otuID => `OTU ${otuID}`)

        // Display strings to console for checking
        console.log(otuIDsList);

        // Retrieve otu labels for use in hovertext of bar chart
        let otuLabelsTop10 = subject_samples[0].otu_labels.slice(0,10);

        // Display labels to console for checking
        console.log(otuLabelsTop10);

        // Set up data for horizontal bar plot
        // Must use reverse on arrays to display in descending order of sample values
        let barData = [{
            type: "bar",
            x: sampleValuesTop10.reverse(),
            y: otuIDsList.reverse(),
            type: "bar",
            orientation: "h",
            text: otuLabelsTop10.reverse()
          }];
          
        // Use plotly to display bar chart at div ID "bar" with barData
        Plotly.newPlot('bar', barData);

        // Set up data for bubble chart
        // Parameters set as given in assignment instructions
        let  bubbleData = [{
            x: subject_samples[0].otu_ids,
            y: subject_samples[0].sample_values,
            mode: "markers",
            marker: {
              color: subject_samples[0].otu_ids,
              size:subject_samples[0].sample_values,
            },
            text: subject_samples[0].otu_labels
          }];

        // Set name of x-axis for bubble chart
        let bubbleLayout = {
            xaxis: { title: "OTU ID" }
        };

        // Use plotly to display bubble chart at div ID "bubble" with barData and barLayout
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);

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
    displayPlots(subject);

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
        
    // Initialise page with demographic information and plots for first subject in dataset    
    displayDemoInfo(data.names[0]);
    displayPlots(data.names[0])

  });
  
}

// Call initialisation function
init();