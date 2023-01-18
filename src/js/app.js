if (localStorage.getItem("peopleInf") === null) {
    localStorage.setItem('peopleInf', JSON.stringify(data));
}

let peopleInf = JSON.parse(localStorage.getItem('peopleInf')) || [];

function showPeopleList() {
    const peopleList = document.querySelector('.peopleList');
    peopleList.innerHTML = '';

    for (let i = 0; i < peopleInf.length; i++) {

        const itemInf = document.createElement('div');
        itemInf.classList.add('blockPeople');
        peopleList.appendChild(itemInf);

        const block = document.createElement('div');
        block.classList.add('blockNameAge');
        itemInf.appendChild(block);

        const item = document.createElement('div');
        item.classList.add('blockMoreInfo');
        item.setAttribute('id', `${peopleInf[i].id}`);
        itemInf.appendChild(item);

        const peopleName = document.createElement('div');
        peopleName.classList.add('peopleName');
        peopleName.textContent ='Name: '+ peopleInf[i].name;
        block.appendChild(peopleName);

        const peopleAge = document.createElement('div');
        peopleAge.textContent = 'Age: ' + peopleInf[i].age;
        block.appendChild(peopleAge);

        const itemButton = document.createElement('div');
        itemButton.classList.add('blockBtn');
        itemInf.appendChild(itemButton);

        const buttonView = document.createElement('button');
        buttonView.textContent = 'View';
        buttonView.classList.add('btnView');
        buttonView.setAttribute('id', `${peopleInf[i].id}`);
        itemButton.appendChild(buttonView);
        buttonView.addEventListener('click', showMoreInf);

        const buttonEdit = document.createElement('button');
        buttonEdit.textContent = 'Edit';
        buttonEdit.classList.add('btnEdit');
        buttonEdit.setAttribute('id', `${peopleInf[i].id}`);
        itemButton.appendChild(buttonEdit);
        buttonEdit.addEventListener('click', editInfo);

        const buttonDelete = document.createElement('button');
        buttonDelete.textContent = 'Delete';
        buttonDelete.classList.add('btnDelete');
        buttonDelete.setAttribute('id', `${peopleInf[i].id}`);
        itemButton.appendChild(buttonDelete);
        buttonDelete.addEventListener('click', requestDelete);
    }
    emptyList();
}

function emptyList() {
    if (peopleInf.length <= 0) {
        const peopleList = document.querySelector('.peopleList');
        const emptyBlock = document.createElement('div');
        emptyBlock.textContent = 'LIST EMPTY!';
        emptyBlock.style.fontSize = '30px';
        emptyBlock.style.marginLeft = 'auto';
        emptyBlock.style.marginRight = 'auto';
        peopleList.appendChild(emptyBlock);
    }
}

function requestDelete(event) {
    const id = event.target.getAttribute('id');
    const blockQueryDelete = document.querySelector('.confirmation');
    blockQueryDelete.style.display = 'block';

    const buttonYes = document.querySelector('.yes');
    buttonYes.setAttribute('id', id);
    buttonYes.addEventListener('click', deletePeople);

    const buttonNO = document.querySelector('.no');
    buttonNO.addEventListener('click', cancelDeletePeople);
}

function deletePeople(event) {
    const blockQueryDelete = document.querySelector('.confirmation');
    blockQueryDelete.style.display = 'none';
    const id = event.target.getAttribute('id');
    const actualOrders = JSON.parse(localStorage.getItem('peopleInf')).filter(item => item.id != id);
    peopleInf = actualOrders;
    localStorage.setItem('peopleInf', JSON.stringify(peopleInf));
    showPeopleList()
}

function cancelDeletePeople() {
    const blockQueryDelete = document.querySelector('.confirmation');
    blockQueryDelete.style.display = 'none';
}

function editInfo(event) {
    const button = event.target.getAttribute('id');
    const form = document.querySelector('.editAndAdd');
    form.style.display = 'block';

    const people = peopleInf[button];

    document.querySelector('.textName').value = peopleInf.name || people.name;
    document.querySelector('.textAge').value = peopleInf.age || people.age;
    document.querySelector('.textPassword').value = peopleInf.password || people.password;
    document.querySelector('.textMail').value = peopleInf.mail || people.mail;
    document.querySelector('.textPhone').value = peopleInf.mobile_phone || people.mobile_phone;
    document.querySelector('.textCard').value = peopleInf.bank_card || people.bank_card;

    const btnSavePpl = document.querySelector('.btnSavePeople');
    btnSavePpl.style.display = 'none';
    const btnSave = document.querySelector('.btnSave');
    btnSave.style.display = 'block';
    btnSave.setAttribute('id', button);
    btnSave.addEventListener('click', saveNewInfo);

    const btnClose = document.querySelector('.btnClose');
    btnClose.addEventListener('click', closeForm);
}

function closeForm() {
    const form = document.querySelector('.editAndAdd');
    form.style.display = 'none';
}

function saveNewInfo(event) {
    const button = event.target.getAttribute('id');

    const people = peopleInf[button];

    const newName = document.querySelector('.textName').value;
    const newAge = document.querySelector('.textAge').value;
    const newPassword = document.querySelector('.textPassword').value;
    const newMail = document.querySelector('.textMail').value;
    const newPhone = document.querySelector('.textPhone').value;
    const newCard = document.querySelector('.textCard').value;

    const checkAge = /^\d{1,2}$/;
    const checkPhone = /^\d{9,15}$/;
    const checkName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;;
    const checkPassword = /^[\w ]+$/;
    const checkMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const checkCard = /^\d{16}$/;

    const failAge = document.querySelector('.textAge');
    const failPhone = document.querySelector('.textPhone');
    const failMail = document.querySelector('.textMail');
    const failCard = document.querySelector('.textCard');
    const failName = document.querySelector('.textName');
    const failPassword = document.querySelector('.textPassword');
    

    failAge.classList.remove('Error');
    failCard.classList.remove('Error');
    failMail.classList.remove('Error');
    failPhone.classList.remove('Error');
    failName.classList.remove('Error');
    failPassword.classList.remove('Error');

    if (checkAge.test(newAge) && checkPhone.test(newPhone) && checkMail.test(newMail) && checkCard.test(newCard) && checkName.test(newName) && checkPassword.test(newPassword)) {
        people.bank_card = newCard;
        people.mobile_phone = newPhone;
        people.mail = newMail;
        people.password = newPassword;
        people.age = newAge;
        people.name = newName;

        localStorage.setItem('peopleInf', JSON.stringify(peopleInf));
        const form = document.querySelector('.editAndAdd');
        form.style.display = 'none';
        showPeopleList();
    }

    if (checkAge.test(newAge) === false) {
        failAge.classList.add('Error');
    }
    if (checkPhone.test(newPhone) === false) {
        failPhone.classList.add('Error');
    }
    if (checkMail.test(newMail) === false) {
        failMail.classList.add('Error');
    }
    if (checkCard.test(newCard) === false) {
        failCard.classList.add('Error');
    }
    if (checkName.test(newName) === false) {
        failName.classList.add('Error');
    }
    if (checkPassword.test(newPassword) === false) {
        failPassword.classList.add('Error');
    }
}

function showMoreInf(event) {
    const button = event.target.getAttribute('id');
    const item = document.getElementById(`${button}`);
    const people = peopleInf[button];
    item.innerHTML = '';

    const elemPassword = document.createElement('div');
    elemPassword.textContent = 'Password: '+ people.password;
    item.appendChild(elemPassword);

    const elemMail = document.createElement('div');
    elemMail.textContent = 'Mail: ' + people.mail;
    item.appendChild(elemMail);

    const elemMobPhone = document.createElement('div');
    elemMobPhone.textContent ='Mobile Phone: ' + people.mobile_phone;
    item.appendChild(elemMobPhone);

    const elemBankCard = document.createElement('div');
    elemBankCard.textContent ='Bank Card: '+ people.bank_card;
    item.appendChild(elemBankCard);
}

function clickButtonAdd() {
    const buttonAdd = document.querySelector('.buttonAdd');
    buttonAdd.addEventListener('click', createNewPeople);
}

function createNewPeople() {
    const form = document.querySelector('.editAndAdd');
    form.style.display = 'block';

    document.querySelector('.textName').value = '';
    document.querySelector('.textAge').value = '';
    document.querySelector('.textPassword').value = '';
    document.querySelector('.textMail').value = '';
    document.querySelector('.textPhone').value = '';
    document.querySelector('.textCard').value = '';

    const btnSavePpl = document.querySelector('.btnSavePeople');
    const btnSave = document.querySelector('.btnSave');
    btnSave.style.display = 'none';
    btnSavePpl.style.display = 'block';
    btnSavePpl.addEventListener('click', saveNewPeople);

    const btnClose = document.querySelector('.btnClose');
    btnClose.addEventListener('click', closeForm);
}

function saveNewPeople() {
    const newName = document.querySelector('.textName').value;
    const newAge = document.querySelector('.textAge').value;
    const newPassword = document.querySelector('.textPassword').value;
    const newMail = document.querySelector('.textMail').value;
    const newPhone = document.querySelector('.textPhone').value;
    const newCard = document.querySelector('.textCard').value;

    const checkAge = /^\d{1,2}$/;
    const checkName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;;
    const checkPassword = /^[\w ]+$/;
    const checkPhone = /^\d{9,15}$/;
    const checkMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const checkCard = /^\d{16}$/;

    const failAge = document.querySelector('.textAge');
    const failPhone = document.querySelector('.textPhone');
    const failMail = document.querySelector('.textMail');
    const failCard = document.querySelector('.textCard');
    const failName = document.querySelector('.textName');
    const failPassword = document.querySelector('.textPassword');
 

    failAge.classList.remove('Error');
    failCard.classList.remove('Error');
    failMail.classList.remove('Error');
    failPhone.classList.remove('Error');
    failName.classList.remove('Error');
    failPassword.classList.remove('Error');

    if (checkAge.test(newAge) && checkPhone.test(newPhone) && checkMail.test(newMail) && checkCard.test(newCard) && checkName.test(newName) && checkPassword.test(newPassword)) {
        if (peopleInf.length <= 0) {
            const newPeople = {
                name: newName,
                password: newPassword,
                age: newAge,
                mail: newMail,
                mobile_phone: newPhone,
                bank_card: newCard,
                id: 0,
            }
            peopleInf.push(newPeople);
            localStorage.setItem('peopleInf', JSON.stringify(peopleInf));
            const form = document.querySelector('.editAndAdd');
            form.style.display = 'none';
            showPeopleList();
        }
        else {
            const newPeople = {
                name: newName,
                password: newPassword,
                age: newAge,
                mail: newMail,
                mobile_phone: newPhone,
                bank_card: newCard,
                id: peopleInf[peopleInf.length - 1].id + 1,
            }
            peopleInf.push(newPeople);
            localStorage.setItem('peopleInf', JSON.stringify(peopleInf));
            const form = document.querySelector('.editAndAdd');
            form.style.display = 'none';
            showPeopleList();
        }
    }
    if (checkAge.test(newAge) === false) {
        failAge.classList.add('Error');
    }
    if (checkPhone.test(newPhone) === false) {
        failPhone.classList.add('Error');
    }
    if (checkMail.test(newMail) === false) {
        failMail.classList.add('Error');
    }
    if (checkCard.test(newCard) === false) {
        failCard.classList.add('Error');
    }
    if (checkName.test(newName) === false) {
        failName.classList.add('Error');
    }
    if (checkPassword.test(newPassword) === false) {
        failPassword.classList.add('Error');
    }
}

showPeopleList();
clickButtonAdd();