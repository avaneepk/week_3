// Fetching data from the API
const apiUrl = "table_list.json";
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => populateTable(data));

// Function to populate the table
function populateTable(data) {
  const tableBody = document.querySelector("#employment-table tbody");
  const municipalities = data.dataset.dimension.Alue.category.label;
  const populations = data.dataset.value;
  const employmentAmountsUrl = "list.json";
  fetch(employmentAmountsUrl)
    .then((response) => response.json())
    .then((employmentData) => {
      const employmentAmounts = employmentData.dataset.value;
      for (let i = 0; i < municipalities.length; i++) {
        const row = tableBody.insertRow(i);
        const municipalityCell = row.insertCell(0);
        municipalityCell.textContent = municipalities[i];
        const populationCell = row.insertCell(1);
        populationCell.textContent = populations[i];
        const employmentAmountCell = row.insertCell(2);
        employmentAmountCell.textContent = employmentAmounts[i];
        const employmentPercentCell = row.insertCell(3);
        const employmentPercent =
          (parseInt(employmentAmounts[i]) / parseInt(populations[i])) * 100;
        employmentPercentCell.textContent = employmentPercent.toFixed(2) + "%";
        row.setAttribute(
          "data-employment-percent-gt",
          employmentPercent > 45 ? "45" : ""
        );
        row.setAttribute(
          "data-employment-percent-lt",
          employmentPercent < 25 ? "25" : ""
        );
      }
    });
}
