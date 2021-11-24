"use strict"

$(function(){
    let organizations = [[1, "Lada"], [2, "Audi"], [3, "Toyoya"]];
    let positions = [[10, "Директор"], [20, "Инженер"], [30, "Менеджер"]];
    let employees = [
        [1, "Сидоров Иван Петрович",  1, 10],
        [2, "Клюквина Анастасия Викторовна", 1, 30],
        [3, "Yoshimoro Katsumi", 3, 10],
        [4, "Albrecht Wallenstein", 2, 20],
        [5, "Архипов Федот Ярополкович", 1, 20],
        [6, "Синицына Ксения Игоревна", 1, 30],
        [7, "Gustaf Grefberg", 2, 10],	
        [8, "Simidzu Koyama", 3, 20],
        [9, "Miura Hirana", 3, 20], 
        [10, "Кузьмин Егор Владимирович", 1, 30],
        [11, "Мазурик Алёна Васильевна", 1, 20],
        [12, "Gudrun Ensslin", 2, 30],
        [13, "Ernst Rommel", 2, 20]
    ];
    
    let company = {};
    for (let [orgId, orgName] of organizations) {
        company[orgName] = { "organizationId": orgId };
        company[orgName].positions = {};
    
        for (let [posId] of positions) {
            company[orgName].positions[posId] = {};
    
            for (let [id, name, empOrgId, empPosId] of employees) {
                if (empOrgId == orgId && empPosId == posId) {
                    company[orgName].positions[posId][id] = name;
                }
            }
        }
    }

    let organizationSelect = $('#organization-select');
    let employeeSelect = $('#employee-select');
    let checkboxesList = $('.checkboxes-list');
    let addButton = $('#add-button');
    let cleanButton = $('#clean-button');
    let textInfo = $('.info > span');
    
    for (let checkbox of positions) {
        checkboxesList.append( 
            $(`<div>
                <input type="checkbox" value="${checkbox[0]}"> 
                <label for="director">${checkbox[1]}</label> 
            </div>`)     
        );    
    }

    let checkboxes = $('.checkboxes-list div > input');

    for (let [id, name] of organizations) {
        organizationSelect.append(`<option value="${id}">${name}</option>`);
    };
    $('#organization-select option:odd').css('background-color', 'lightgray');


    organizationSelect.change(createEmployeeDropDownList);
    checkboxes.click(createEmployeeDropDownList)
    cleanButton.click(() => {textInfo.text('')});
    addButton.click(function() {
        if (!(employeeSelect.val() === '')) {
            let empId = employeeSelect.val();
            textInfo.append(
                `${employees[empId-1][1]} - 
                ${positions[employees[empId-1][3]/10-1][1]} 
                (${organizations[employees[empId-1][2]-1][1]})` + '<br>'
                );
        }
    }); 

    function createEmployeeDropDownList(){
        let checked = [];
        $('.checkboxes-list div > input:checkbox:checked').each(function(){
            checked.push($(this).val());
        });

        if (!(organizationSelect.val() === '')) {
            employeeSelect.prop('disabled', false);
            
            employeeSelect.empty();
            employeeSelect.append('<option value="">Сотрудник</option>');

            let result = [];
            for (let orgKey in company) {
                if (company[orgKey].organizationId == organizationSelect.val()) {
                    for (let id of checked) {
                        for (let employeeIdKey in company[orgKey].positions[id]) {
                            result.push([employeeIdKey, company[orgKey].positions[id][employeeIdKey]]);
                        }
                    }
                }
            }

            for (let [id, name] of result) {
                employeeSelect.append(`<option value="${id}">${name}</option>`);
            }

            $('#employee-select option:odd').css('background-color', 'lightgray')

        } else {
            employeeSelect.prop('disabled', true);
            employeeSelect.empty();
            employeeSelect.append('<option value="">Сотрудник</option>');
        }
    }

});
