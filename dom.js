document.addEventListener('DOMContentLoaded', () => {
    displayStudents();
});

function getStoredData() {
    return JSON.parse(localStorage.getItem('students')) || [];
}

function saveData(data) {
    localStorage.setItem('students', JSON.stringify(data));
}

function addStudent() {
    const name = document.getElementById('studentName').value.trim();
    const id = document.getElementById('studentID').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contactNumber').value.trim();

    if (!name || !id || !email || !contact) {
        alert('Please fill in all fields.');
        return;
    }

    const newStudent = { name, id, email, contact };
    const students = getStoredData();
    students.push(newStudent);
    saveData(students);
    displayStudents();
    document.getElementById('registrationForm').reset();
}

function displayStudents() {
    const students = getStoredData();
    const tbody = document.querySelector('#studentTable tbody');
    tbody.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editStudent(index) {
    const students = getStoredData();
    const student = students[index];
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentID').value = student.id;
    document.getElementById('email').value = student.email;
    document.getElementById('contactNumber').value = student.contact;
    students.splice(index, 1);
    saveData(students);
    displayStudents();
}

function deleteStudent(index) {
    const students = getStoredData();
    students.splice(index, 1);
    saveData(students);
    displayStudents();
}
