
function list() {
    // $ is a shorthand for the jQuery object
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:3010/students',
        dataType: 'JSON',
        success: function (data) {
            let list_data = '';
            for (let i = 0; i < data.length; i++) {
                list_data += `
                          <tr>
                            <td>${data[i].name}</td>
                            <td>${data[i].info}</td>
                            <td>${data[i].exercise_points == null ? '–' : data[i].exercise_points}</td>
                          </tr>
                        `
            }
            $('#tbody').html(list_data);

            for (let i = 0; i < data.length; i++) {
                if (data[i].exercise_points < 50) {
                    var trs = document.querySelector('tbody').querySelectorAll('tr');
                    trs[i].style.backgroundColor = '#dd7698';
                }
            }
        },

        error: function (error) {
            console.log('Error! ' + error);
        }
    });
}

let studentId = 5;
function add() {
    let newdata = {
        name: document.querySelector('#name').value == '' ? 'Student X (id ' + studentId + ')' : document.querySelector('#name').value,
        info: document.querySelector('#info').value == '' ? 'No info.' : document.querySelector('#info').value,
        exercise_points: document.querySelector('#points').value
    };

    const response = fetch('http://127.0.0.1:3010/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newdata)
    }).then(resp => { return resp.json(); }).then(newdata => console.log(newdata));

    list();
    studentId++;
}
