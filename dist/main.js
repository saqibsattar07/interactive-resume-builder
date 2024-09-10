"use strict";
const form = document.getElementById("resumeForm");
const resumeDisplay = document.getElementById("resumeDisplay");
const profileImageUpload = document.getElementById("profileImageUpload");
const profileImagePreview = document.getElementById("profileImagePreview");
if (form && resumeDisplay && profileImageUpload && profileImagePreview) {
    let profileImageDataURL = "profile-placeholder.png"; // Default profile image
    profileImageUpload.addEventListener("change", (event) => {
        const file = event.target?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileImageDataURL = e.target?.result;
                profileImagePreview.src = profileImageDataURL; // Display uploaded image
            };
            reader.readAsDataURL(file);
        }
    });
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name")?.value ?? "";
        const about = document.getElementById("about")?.value ?? "";
        const email = document.getElementById("email")?.value ?? "";
        const phone = document.getElementById("phone")?.value ?? "";
        const address = document.getElementById("address")?.value ?? "";
        const education = document.getElementById("education")?.value ?? "";
        const experience = document.getElementById("experience")?.value ?? "";
        const skills = document.getElementById("skills")?.value ?? "";
        const displayName = document.getElementById("displayName");
        const displayAbout = document.getElementById("displayAbout");
        const displayEmail = document.getElementById("displayEmail");
        const displayPhone = document.getElementById("displayPhone");
        const displayAddress = document.getElementById("displayAddress");
        const displayEducation = document.getElementById("displayEducation");
        const displayExperience = document.getElementById("displayExperience");
        const displaySkills = document.getElementById("displaySkills");
        displayName.textContent = name;
        displayAbout.textContent = about;
        displayEmail.textContent = email;
        displayPhone.textContent = phone;
        displayAddress.textContent = address;
        displayEducation.textContent = education;
        displayExperience.textContent = experience;
        displaySkills.textContent = skills;
        resumeDisplay.style.display = "block";
        form.style.display = "none";
    });
    document.getElementById("editResume")?.addEventListener("click", () => {
        form.style.display = "block";
        resumeDisplay.style.display = "none";
    });
    document.getElementById("downloadPDF")?.addEventListener("click", () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        // Set font
        doc.setFont("Helvetica");
        doc.setFontSize(12);
        // Define margins and other constants
        const margin = 10;
        const spacing = 10;
        const pageHeight = doc.internal.pageSize.height;
        // Set profile image
        doc.addImage(profileImageDataURL, "JPEG", margin, margin, 40, 40); // Add profile image to PDF
        // Add content
        let y = margin + 50; // Start below the profile image
        // Define types for function parameters
        const addText = (text, fontSize, maxWidth) => {
            doc.setFontSize(fontSize);
            doc.text(text, margin, y, { maxWidth });
            const textDimensions = doc.getTextDimensions(text, { fontSize, maxWidth });
            y += textDimensions.h + spacing;
        };
        addText("Name: " + document.getElementById("displayName")?.textContent || "", 16, doc.internal.pageSize.width - 2 * margin);
        addText("About: " + document.getElementById("displayAbout")?.textContent || "", 14, doc.internal.pageSize.width - 2 * margin);
        addText("Email: " + document.getElementById("displayEmail")?.textContent || "", 14, doc.internal.pageSize.width - 2 * margin);
        addText("Phone: " + document.getElementById("displayPhone")?.textContent || "", 14, doc.internal.pageSize.width - 2 * margin);
        addText("Address: " + document.getElementById("displayAddress")?.textContent || "", 14, doc.internal.pageSize.width - 2 * margin);
        addText("Education: " + document.getElementById("displayEducation")?.textContent || "", 14, doc.internal.pageSize.width - 2 * margin);
        addText("Experience: " + document.getElementById("displayExperience")?.textContent || "", 14, doc.internal.pageSize.width - 2 * margin);
        addText("Skills: " + document.getElementById("displaySkills")?.textContent || "", 14, doc.internal.pageSize.width - 2 * margin);
        // Check if content exceeds the page height
        if (y > pageHeight - margin) {
            doc.addPage(); // Add a new page if needed
            y = margin; // Reset y position
        }
        doc.save("resume.pdf");
    });
}
