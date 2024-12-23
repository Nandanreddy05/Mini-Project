document.getElementById("analyzeButton").addEventListener("click", async function () {
    const textInput = document.getElementById("textInput").value;
    const resultContainer = document.getElementById("resultContainer");
    const resultText = document.getElementById("resultText");

    // Reset result display
    resultContainer.style.display = "none";

    // Check if input is empty
    if (!textInput) {
        alert("Please enter text to analyze.");
        return;
    }

    // Winston API options
    const options = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer YOUR_API_KEY', // Replace YOUR_API_KEY with the actual token
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: textInput,
            file: "",
            website: "",
            version: "v2",
            sentences: true,
            language: "en",
        }),
    };

    try {
        const response = await fetch('https://api.gowinston.ai/v2/ai-content-detection', options);

        // Handle HTTP errors
        if (!response.ok) {
            const errorData = await response.json();
            console.error("API Error:", errorData);
            alert(`API Error: ${errorData.message || response.statusText}`);
            return;
        }

        // Parse response JSON
        const data = await response.json();

        // Extract plagiarism percentage or other relevant details
        const plagiarismPercentage = data.plagiarism || 0;

        // Display the result
        resultText.textContent = `Plagiarism Percentage: ${plagiarismPercentage}%`;
        resultContainer.style.display = "block";
    } catch (err) {
        // Network or unexpected errors
        console.error("Fetch Error:", err);
        if (err.name === "TypeError") {
            alert("Network Error: Unable to connect to the API. Please check your internet connection or CORS policy.");
        } else {
            alert("An unexpected error occurred. Please check the console for details.");
        }
    }
});
