// script.js
const studentDataUrl = 'https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json';
let students = [];

//fecthing students data
async function fetchStudentData() {
  const response = await fetch(studentDataUrl);
  students = await response.json();
  displayStudents(students);
}

//displaying students data
function displayStudents(data) {
  const tbody = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
  tbody.innerHTML = '';
  data.forEach(student => {
    const row = tbody.insertRow();
    row.innerHTML = `
     <td>${student.id}</td>
      <td class="name-cell"><img src="${student.img_src}" alt="${student.first_name} ${student.last_name}" width="50" height="50">${student.first_name} ${student.last_name}</td>
      <td>${student.gender}</td>
      <td>${student.class}</td>
      <td>${student.marks}</td>
      <td>${student.passing ? 'Passing' : 'Failed'}</td>
      <td>${student.email}</td>
    `;
  });
}

//handling search 
function handleSearch() {
  const query = document.getElementById('search').value.toLowerCase();
  const filteredStudents = students.filter(student => 
    student.first_name.toLowerCase().includes(query) || 
    student.last_name.toLowerCase().includes(query) ||
    student.email.toLowerCase().includes(query)
  );
  displayStudents(filteredStudents);
}

function sortByName(order) {
  students.sort((a, b) => {
    const fullNameA = `${a.first_name} ${a.last_name}`.toLowerCase();
    const fullNameB = `${b.first_name} ${b.last_name}`.toLowerCase();
    if (fullNameA < fullNameB) return order === 'asc' ? -1 : 1;
    if (fullNameA > fullNameB) return order === 'asc' ? 1 : -1;
    return 0;
  });
  displayStudents(students);
}

function sortByMarks() {
  students.sort((a, b) => a.marks - b.marks);
  displayStudents(students);
}

function filterByPassing() {
  const passingStudents = students.filter(student => student.passing);
  displayStudents(passingStudents);
}

function sortByClass() {
  students.sort((a, b) => a.class - b.class);
  displayStudents(students);
}

function sortByGender() {
  const males = students.filter(student => student.gender === 'male');
  const females = students.filter(student => student.gender === 'female');
  displayStudents(females.concat(males));
}

fetchStudentData();
