document.getElementById('bmi-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    
    if (weight > 0 && height > 0) {
        const bmi = weight / (height * height);
        alert('BMI = ' + bmi.toFixed(2));
    } else {
        alert('Weight and/or Height is invalid');
    }
});
