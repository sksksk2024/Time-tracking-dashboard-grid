document.addEventListener("DOMContentLoaded", () => {
    // Function to fetch data and update dashboard
    const fetchDataAndUpdateDashboard = async () => {
      try {
        const response = await fetch('./data.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        updateDashboard(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Function to update the dashboard based on the data
    const updateDashboard = (data) => {
      data.forEach(item => {
        const { title, timeframes } = item;
  
        // Update each category
        ['daily', 'weekly', 'monthly'].forEach(period => {
          const card = document.querySelector(`.card-2__${title.toLowerCase()} .${period}`);
          if (card) {
            const currentElement = card.querySelector('.container__improve h1');
            const previousElement = card.querySelector('.container__improve p');
            
            if (currentElement && previousElement) {
              currentElement.textContent = `${timeframes[period].current}hrs`;
              previousElement.textContent = `Previous - ${timeframes[period].previous}hrs`;
            }
          }
        });
      });
    };
  
    // Call the function to fetch data and update the dashboard
    fetchDataAndUpdateDashboard();
  
    // Event listeners for buttons
    const buttons = document.querySelectorAll(".card-1 .container__time button");
    const cardSets = document.querySelectorAll(".card-2 .daily, .card-2 .weekly, .card-2 .monthly");
  
    const showCards = (period) => {
      cardSets.forEach(card => card.classList.add("hide"));
      document.querySelectorAll(`.card-2 .${period}`).forEach(card => card.classList.remove("hide"));
    };
  
    const enableButton = (buttonToEnable) => {
      buttons.forEach(button => {
        if (button === buttonToEnable) {
          button.classList.add("enable");
        } else {
          button.classList.remove("enable");
        }
      });
    };
  
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const period = button.getAttribute("type");
        showCards(period);
        enableButton(button);
      });
    });
  
    // Set default view
    const defaultButton = document.querySelector(".card-1 .container__time button[type='daily']");
    if (defaultButton) {
      enableButton(defaultButton);
      showCards("daily");
    }
  });


// document.addEventListener("DOMContentLoaded", () => {
//     // Select all buttons
//     const buttons = document.querySelectorAll(".card-1 .container__time button");

//     // Function to fetch and display data based on the selected period
//     const displayData = async (period) => {
//         try {
//             const response = await fetch('data.json');
//             const data = await response.json();
            
//             // Loop through each item in the data
//             data.forEach((item, index) => {
//                 // Select the relevant card based on index and period
//                 const title = item.title.toLowerCase().replace(' ', '-');
//                 const currentData = item.timeframes[period].current;
//                 const previousData = item.timeframes[period].previous;

//                 // Find the corresponding card element
//                 const cardElement = document.querySelector(`.card-2__${title}.${period}`);
//                 if (cardElement) {
//                     cardElement.querySelector('.container__improve h1').textContent = `${currentData}hrs`;
//                     cardElement.querySelector('.container__improve p').textContent = `Previous - ${previousData}hrs`;
//                 }
//             });
//         } catch (error) {
//             console.error("Failed to fetch data:", error);
//         }
//     };

//     // Function to show specific cards based on the period (daily, weekly, monthly)
//     const showCards = (period) => {
//         // Hide all card sets
//         document.querySelectorAll(".card-2 .daily, .card-2 .weekly, .card-2 .monthly")
//             .forEach(card => card.classList.add("hide"));

//         // Show the specific set of cards for the selected period
//         document.querySelectorAll(`.card-2 .${period}`)
//             .forEach(card => card.classList.remove("hide"));

//         // Display the data for the selected period
//         displayData(period);
//     };

//     // Function to enable a specific button and disable others
//     const enableButton = (buttonToEnable) => {
//         buttons.forEach(button => {
//             if (button === buttonToEnable) {
//                 button.classList.add("enable");
//             } else {
//                 button.classList.remove("enable");
//             }
//         });
//     };

//     // Add event listeners to buttons
//     buttons.forEach(button => {
//         button.addEventListener("click", () => {
//             // Get the period from the type attribute of the button
//             const period = button.getAttribute("type");
//             // Show the corresponding cards
//             showCards(period);
//             // Enable the clicked button
//             enableButton(button);
//         });
//     });

//     // Initial view: show daily cards and enable the daily button by default
//     const defaultButton = document.querySelector(".card-1 .container__time button[type='daily']");
//     if (defaultButton) {
//         enableButton(defaultButton);
//         showCards("daily");
//     }
// });