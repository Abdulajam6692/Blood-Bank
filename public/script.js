document.addEventListener("DOMContentLoaded", () => {
    loadBloodData();
  
    document.getElementById("bloodForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      const age = parseInt(form[2].value); // Get the entered age
      const type = document.getElementById("formTitle").dataset.action;
  
      // Check if age is less than 18
      if (age < 18) {
        alert("You must be at least 18 years old to donate or request blood.");
        return; // Stop the form submission if age is less than 18
      }
  
      const data = {
        name: form[0].value,
        address: form[1].value,
        age: age,
        blood_type: form[3].value,
        quantity: parseInt(form[4].value)
      };
  
      const res = await fetch(`/api/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
  
      const msg = await res.text();
      alert(msg);
      form.reset();
      document.getElementById("formContainer").classList.add("hidden");
      loadBloodData();
    });
  });
  
  function loadBloodData() {
    fetch("/api/blood")
      .then(res => res.json())
      .then(data => {
        const tbody = document.querySelector("#bloodTable tbody");
        tbody.innerHTML = "";
        data.forEach(row => {
          const tr = document.createElement("tr");
          tr.innerHTML = `<td>${row.blood_type}</td><td>${row.quantity}</td>`;
          tbody.appendChild(tr);
        });
      });
  }
  
  function showForm(type) {
    document.getElementById("formContainer").classList.remove("hidden");
    const title = document.getElementById("formTitle");
    title.innerText = type === "donate" ? "Donate Blood" : "Request Blood";
    title.dataset.action = type;
  }
  