// Retrieve DOM elements
// 1. CREATE section

const createForm = document.getElementById("createTourForm");
const createMessage = document.getElementById("createMessage");

// inputs and selects
const title = document.getElementById("title");
const description = document.getElementById("description");
const pickUp = document.getElementById("pick_up");
const meetingPoint = document.getElementById("meeting_point");
const dropOff = document.getElementById("drop_off");
const duration = document.getElementById("duration");
const durationUnitSelect = document.getElementById("duration_unit");

// 2. SEARCH section
const searchForm = document.getElementById("searchTourForm");
const searchTerm = document.getElementById("searchTerm");

// buttons
const fetchAllBtn = document.getElementById("fetchAllBtn");
const searchBtn = document.getElementById("searchBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");

// 2.1 SEARCH display section
// hidden form
const tourDetailsHidden = document.getElementById("tourDetails");
// div for displaying tours dynamically
const displayTourDetails = document.getElementById("displayTourDetails");
// inputs
const hiddenId = document.getElementById("hiddenId");
const displayTourId = document.getElementById("displayTourId");
const editTitle = document.getElementById("editTitle");
const editDescription = document.getElementById("editDescription");
const editPickUp = document.getElementById("editPickUp");
const editMeetingPoint = document.getElementById("editMeetingPoint");
const editDropOff = document.getElementById("editDropOff");
const editDuration = document.getElementById("editDuration");
const editDurationUnitSelect = document.getElementById("editDurationUnit");

//  Displaying Tour Data Dynamically

function displayTours(data, edit = false, displayEditBtn = false) {
  createMessage.textContent = "";
  tourDetailsHidden.classList.add("hidden");
  const tourList = document.createElement("div");
  const closeAllBtn = document.createElement("button");

  tourList.classList.add(
    "tourList",
    "flex",
    "flex-col",
    "overflow-y-scroll",
    "m-1",
    "gap-2"
  );

  closeAllBtn.classList.add(
    "w-8",
    "h-8",
    "rounded-full",
    "bg-green-600",
    "hover:bg-green-800",
    "text-white",
    "flex",
    "items-center",
    "justify-center",
    "sticky",
    "top-0",
    "z-10",
    "mx-auto"
  );

  closeAllBtn.textContent = "▲";

  closeAllBtn.addEventListener("click", () => {
    const closeAll = tourList.classList.toggle("hidden");
    closeAllBtn.textContent = closeAll ? "▼" : "▲";
  });
  data.forEach((tour) => {
    const tourElement = document.createElement("div");

    tourElement.classList.add(
      "tourElement",
      "border",
      "p-4",
      "mt-4",
      "mb-4",
      "rounded-sm",
      "bg-white",
      "shadow",
      "overflow-hidden"
    );

    tourElement.innerHTML = `
      <h3 class="text-xl font-semibold mb-2">${tour.title}</h3>
      <p class="mb-1"><strong>Tour ID:</strong> ${tour.id}</p>
      <p class="mb-1"><strong>Description:</strong> ${
        // empty sent as undefined, which was breaking trim() while fetching all tours.
        // Hence, optional  chaining
        tour.description?.trim() || "N/A"
      }</p>
      <p class="mb-1"><strong>Pick Up:</strong> ${tour.pick_up}</p>
      <p class="mb-1"><strong>Meeting Point:</strong> ${
        tour.meeting_point?.trim() || "N/A"
      }</p>
      <p class="mb-1"><strong>Drop Off:</strong> ${tour.drop_off}</p> 
      <p class="mb-1"><strong>Duration:</strong> ${tour.duration} ${
      tour.duration_unit
    }</p>
      <p class="mb-1"><strong>Created On:</strong> ${tour.createdAt}</p>
      <button class=" editBtn hidden mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
      `;
    tourList.appendChild(tourElement);
    // edit button reveal
    if (edit) {
      const editBtn = tourElement.querySelector(".editBtn");
      editBtn.addEventListener("click", () => {
        tourDetailsHidden.classList.remove("hidden");
        displayTourDetails.classList.add("hidden");
        // Populate edit fields
        hiddenId.value = tour.id;
        displayTourId.textContent = tour.id;
        editTitle.value = tour.title;
        editDescription.value = tour.description;
        editPickUp.value = tour.pick_up;
        editMeetingPoint.value = tour.meeting_point;
        editDropOff.value = tour.drop_off;
        editDuration.value = tour.duration;
        editDurationUnitSelect.value = tour.duration_unit;
      });
      editBtn.classList.remove("hidden");
      return; // Only one tour in edit mode, so exit loop
    }
  });
  // Clear previous details
  displayTourDetails.innerHTML = "";
  // Show details section
  displayTourDetails.classList.remove("hidden");
  displayTourDetails.appendChild(closeAllBtn);
  displayTourDetails.appendChild(tourList);
}

// --- CREATE TOUR ---
// https://localhost:5500/tour, POST
createForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // stop form from reloading page

  // Gather values
  const data = {
    title: title.value.trim(),
    // undefined will skip minLength validation for description
    // and will fail numeric garbage values for meeting point and description in controller validation
    // otherwise empty string were triggering numeric garbage validation
    description: description.value.trim() || undefined,
    pick_up: pickUp.value.trim(),
    meeting_point: meetingPoint.value.trim() || undefined,
    drop_off: dropOff.value.trim(),
    duration: parseFloat(duration.value),
    duration_unit: durationUnitSelect.value,
  };

  // Basic validation
  if (!data.title || !data.pick_up || !data.drop_off || isNaN(data.duration)) {
    createMessage.textContent = "Please fill all required fields correctly.";
    createMessage.classList.remove("text-green-700");
    createMessage.classList.add("text-red-600", "italic");
    return;
  }

  try {
    const res = await fetch("http://localhost:5500/api/v1/tours", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(res);
    const result = await res.json();

    if (res.ok) {
      createMessage.classList.remove("text-red-600");
      createMessage.classList.add("text-green-700");
      createMessage.textContent = "Tour Created Successfully!";
      // reset form
      createForm.reset();
    } else {
      console.error(result.message || "Failed to create tour.");
      createMessage.classList.remove("text-green-700");
      createMessage.textContent = result.message || "Failed to create tour.";
      createMessage.classList.add("text-red-600");
    }
  } catch (err) {
    console.error(err);
    createMessage.classList.remove("text-green-700");
    createMessage.classList.add("text-red-700", "italic", "text-sm");
    createMessage.textContent =
      err.error || "Network error. Please try again later.";
  }
});

// --- FETCH ALL TOURS ---
// http://localhost:5500/tour, GET
fetchAllBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5500/api/v1/tours");
    const data = await res.json();
    // Checking response
    if (!res.ok) {
      console.error("Failed to fetch tours :", data.error);
      createMessage.textContent =
        data.error.message || "Failed to fetch tours.";
      createMessage.classList.remove("text-green-700");
      createMessage.classList.add("text-red-600", "italic");
      throw new Error(data.error || "Failed to fetch tours");
    }
    // Handle empty list
    if (data.length === 0) {
      console.error("No tours available.");
      alert("No tours available. Please create one.");
      tourDetailsHidden.classList.add("hidden");
      return;
    }
    // displaying tours
    displayTours(data);
  } catch (err) {
    console.error("Error fetching Tours:", err);
    createMessage.textContent =
      err.message === "failed"
        ? "Failed to fetch tours."
        : "Network error. Please try again later.";
    createMessage.classList.add("text-red-700", "italic", "text-sm");
    tourDetailsHidden.classList.add("hidden");
    displayTourDetails.classList.add("hidden");
  }
});

//  --- SEARCH TOUR BY ID ---
// http://localhost:5500/tour/:id, GET
searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const tourId = searchTerm.value.trim();
    // validate tourId
    if (!tourId) {
      alert("Please enter a valid Tour ID.");
      tourDetailsHidden.classList.add("hidden");
      // since, displayTourDetails is an empty div hidden by default we're not hiding it again
      return;
    }
    const res = await fetch(`http://localhost:5500/api/v1/tours/${tourId}`);
    const data = await res.json();
    // Checking response
    if (!res.ok) {
      createMessage.textContent =
        data.error.message || "Failed to fetch tours.";
      createMessage.classList.remove("text-green-700");
      createMessage.classList.add("text-red-600", "italic");
      console.error("Failed to fetch tours :", data.error);
      throw new Error(data.error || "Failed to fetch tours");
    }
    // Handle empty list
    if (data.length === 0) {
      createMessage.textContent = "No tours available. Please create one.";
      createMessage.classList.remove("text-green-700");
      createMessage.classList.add("text-red-600", "italic");
      tourDetailsHidden.classList.add("hidden");
      return;
    }
    // Dynamically update the display based on the number of tours
    createMessage.textContent = "";
    hiddenId.value = tourId;

    displayTours([data], true); // Wrap single tour in array, since we are expecting an array in displayTours
  } catch (err) {
    console.error("Error fetching Tours:", err);

    createMessage.textContent =
      err.message === "failed"
        ? "Failed to fetch tours"
        : "Network error. Please try again later.";

    createMessage.classList.add("text-red-700", "italic", "text-sm");
    tourDetailsHidden.classList.add("hidden");

    // if somebody fetches all and searches for a tour when  an error has occured
    displayTourDetails.classList.add("hidden");
  }
});

// --- UPDATE TOUR BY ID ---
// http://localhost:5500/tour/:id, PUT

updateBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const tourId = hiddenId.value.trim();

    // validating entries
    if (
      !editTitle.value &&
      !editDescription.value &&
      !editDropOff.value &&
      !editDuration.value &&
      !editDurationUnitSelect.value &&
      !editMeetingPoint.value &&
      !editPickUp.value
    ) {
      alert("Nothing changed! Edit something to proceed.");
      return;
    }
    const data = {
      title: editTitle.value.trim(),
      description: editDescription.value.trim(),
      pick_up: editPickUp.value.trim(),
      meeting_point: editMeetingPoint.value.trim(),
      drop_off: editDropOff.value.trim(),
      duration: parseFloat(editDuration.value),
      duration_unit: editDurationUnitSelect.value,
    };

    const res = await fetch(`http://localhost:5500/tour/${tourId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (res.ok) {
      alert("Tour updated successfully!");
      // Optionally, refresh the displayed tour details
      hiddenId.value = result.body.id;
      displayTours([result.body], true); // Re-fetch the tour details
    } else if (result.error === "failed") {
      console.error(result.error || "Failed to update tour.");
      alert(result.error.message || "Failed to update tour.");
    } else {
      alert(result.error.message || "Network error. Please try again later.");
      console.error(result.error || "Network error. Please try again later.");
    }
  } catch (err) {
    alert("Error updating tour. Please try again later.");
    console.error("Error updating tour:", err);
  }
});

deleteBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`http://localhost:5500/tour/${hiddenId.value}`, {
      method: "DELETE",
    });
    const result = await res.json();

    if (res.ok) {
      alert("Tour deleted successfully!");
      // Optionally, refresh the displayed tour details
      hiddenId.value = "";
      searchTerm.value = "";
      tourDetailsHidden.classList.add("hidden");
      displayTourDetails.classList.add("hidden");
    } else {
      console.error(result.error || "Failed to delete tour.");
      alert(result.error.message || "Failed to delete tour.");
    }
  } catch (err) {
    alert("Error deleting tour. Please try again later.");
    console.error("Error deleting tour:", err);
  }
});
