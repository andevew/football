$(document).ready(function () {
    // Validate on input
    $('#firstName, #lastName').on('input', function () {
        validateNameField($(this));
    });

    $('#passwordConfirmInput, #passwordInput').on('input', function () {
        validatePassword();
    });

    // Prevent form submission if validations fail
    $('#signupForm').on('submit', function (event) {
        var isFormValid = validateForm();
        if (!isFormValid) {
            event.preventDefault(); // Prevent form from submitting
            alert("Please fix the errors before submitting.");
        }
    });

    function validateNameField(element) {
        var inputValue = element.val().trim(); // Trim the input value
        element.val(inputValue); // Set the trimmed value back to the input field

        if (validateName(inputValue)) {
            element.css("border", "2px solid green");
            return true;
        } else {
            element.css("border", "2px solid red");
            return false;
        }
    }

    function validateName(data) {
        var specialCharPattern = /[^a-zA-Z]/; // Allow letters, numbers, and spaces
        return !specialCharPattern.test(data);
    }

    function validatePassword() {
        var password = $("#passwordInput").val().trim(); // Trim the input value
        $("#passwordInput").val(password); // Set the trimmed value back to the input field
        var confirmPassword = $("#passwordConfirmInput").val().trim(); // Trim the input value
        $("#passwordConfirmInput").val(confirmPassword); // Set the trimmed value back to the input field

        if (password.length < 5) {
            $("#passwordInput, #passwordConfirmInput").css("border", "2px solid red");
            return false;
        }
        else if (password === confirmPassword && password !== "") {
            $("#passwordInput, #passwordConfirmInput").css("border", "2px solid green");
            return true;
        } else {
            $("#passwordInput, #passwordConfirmInput").css("border", "2px solid red");
            return false;
        }
    }

    function validateForm() {
        var isFirstNameValid = validateNameField($('#firstName'));
        var isLastNameValid = validateNameField($('#lastName'));
        var isPasswordValid = validatePassword();

        // Ensure all validations are true
        return isFirstNameValid && isLastNameValid && isPasswordValid;
    }
});
