'use strict';

const data = [
    {
      name: 'Иван',
      surname: 'Петров',
      phone: '+79514545454',
    },
    {
      name: 'Игорь',
      surname: 'Семёнов',
      phone: '+79999999999',
    },
    {
      name: 'Семён',
      surname: 'Иванов',
      phone: '+79800252525',
    },
    {
      name: 'Мария',
      surname: 'Попова',
      phone: '+79876543210',
    },
  ];

{
    const createContainer = () => {
        const container = document.createElement('div');
        container.classList.add('container');
        return container;
    };

    const createHeader = () => {
        const header = document.createElement('div');
        header.classList.add('header');

        const headerContainer = createContainer();
        header.append(headerContainer);
        header.headerContainer = header; // зачем???

        return header;
    };

    const createFooter = (title) => {
        const footer = document.createElement('div');
        footer.classList.add('footer');

        const footerContainer = createContainer();
        const paragraph = document.createElement('p');
        paragraph.textContent = `All right © ${title}`;

        footerContainer.append(paragraph);

        footer.append(footerContainer);
        footer.footerContainer = footer;
        
        return footer;
    };

    const createLogo = (title) => {
        const h1 = document.createElement('h1');
        h1.classList.add('logo');
        h1.textContent = ` Телефонный справочник. ${title}`;

        return h1;
    };

    const createMain = () => {
        const main = document.createElement('div');
        const mainContainer = createContainer();

        main.append(mainContainer);
        main.mainContainer = mainContainer;
        return main;
    }

    const createButtonsGroup = params => {
        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('btn-wrapper');

        const btns = params.map( ({className, type, text}) => {
            const button = document.createElement('button');
                button.type = type;
                button.className = className;
                button.textContent = text;
            return button;
        })
        btnWrapper.append(...btns);

        return {
            btnWrapper, btns
        };
    };

    const createTable = () => {
        const table = document.createElement('table');
        table.classList.add('table', 'table-striped');

        const thead = document.createElement('thead');
        thead.insertAdjacentHTML('beforeend', `
        <tr>
            <th class = "delete"> delete</th>
            <th value = "name">FirstName</th>
            <th value = "surname">LastName </th>
            <th value = "phone">Phone number</th>
            <th>Edit</th>
        </tr>
        `);

        const tbody = document.createElement('tbody');
        
        table.append(thead, tbody);
        table.thead = thead;
        table.tbody = tbody;
        return table;
    };

    const createForm = () => {
        const overlay = document.createElement('div');
        overlay.classList.add('form-overlay');
        
        const form = document.createElement('form');
        form.classList.add('form');
        form.insertAdjacentHTML('beforeend', `
            <button class="close" type = "button"></button>
            <h2 class = "form-title">Add new contact</h2>
            <div class = "form-group">
                <label class = "form-label" for ="name">FirstName: </label>
                <input class = "form-input" name = "name" type = "text" requered placeholder = "first name">
            </div>

            <div class = "form-group">
                <label class = "form-label" for ="lastName">LastName: </label>
                <input class = "form-input" name = "lastName" type = "text" requered placeholder = "last name">
            </div>

            <div class = "form-group">
                <label class = "form-label" for ="phone">Phone number: </label>
                <input class = "form-input" name = "phone" type = "number" requered placeholder = "phone">
            </div>
        `);
        const buttonGroup = createButtonsGroup([
            { 
                className: 'btn btn-primary mr-3',
                type: 'submit',
                text: 'Add',
            },
            { 
                className: 'btn btn-danger',
                type: 'reset',
                text: 'Remove',
            },
        ]);

        form.append(...buttonGroup.btns)
        overlay.append(form);

        return {
            overlay, 
            form,
        }


    };

    const renderPhoneBook = (app, title) => {
        
        const header = createHeader();
        const logo = createLogo(title);
        const main = createMain();
        const buttonGroup = createButtonsGroup([
            { 
                className: 'btn btn-primary mr-3 js-add',
                type: 'button',
                text: 'Add',
            },
            { 
                className: 'btn btn-danger',
                type: 'button',
                text: 'Remove',
            },
        ]);
        const table = createTable();
        const form = createForm();

        const footer = createFooter(title);

        header.headerContainer.append(logo);
        main.mainContainer.append(buttonGroup.btnWrapper, table, form.overlay, footer);
        app.append(header, main);

        return {
            thead: table.thead,
            list: table.tbody,
            logo,
            btnAdd: buttonGroup.btns[0],
            btnDel: buttonGroup.btns[1],
            formOverlay: form.overlay,
            form: form.form,
        }
    };
    
    const createRow = ({name: firstName, surname, phone}) => {

        const tr = document.createElement('tr');
        tr.classList.add('contact');

        const tdDel = document.createElement('td');
        tdDel.classList.add('delete');
        const buttonDel = document.createElement('button');
        buttonDel.classList.add('del-icon');
        tdDel.append(buttonDel);

        const tdEdit = document.createElement('td');
        const buttonEdit = document.createElement('button');
        buttonEdit.classList.add('edit-icon');
        tdEdit.append(buttonEdit);


        const tdName = document.createElement('td');
        tdName.textContent = firstName;

        const tdLastName = document.createElement('td');
        tdLastName.textContent = surname;

        const tdPhone = document.createElement('td');
        const phoneLink = document.createElement('a');
        phoneLink.href = `tel:${phone}`;
        phoneLink.textContent = phone;

        tr.phoneLink = phoneLink;
        tdPhone.append(phoneLink);

        tr.append(tdDel, tdName, tdLastName, tdPhone, tdEdit,);

        return tr;
    }

    const hoverRow = (allRow, logo) => {
        const text = logo.textContent;
        allRow.forEach(contact => {
            contact.addEventListener('mouseenter', () => {
                logo.textContent = contact.phoneLink.textContent;;
            });

            contact.addEventListener('mouseleave', () => {
                logo.textContent = text;
            });
        });
    }

    const renderContacts = (elem, data) => {
        const allRow = data.map(createRow);
        elem.append(...allRow);

        return allRow;
    };

    const init = (selectorApp, title) => {
        const app = document.querySelector(selectorApp);
        const phoneBook = renderPhoneBook(app, title);

        const {
            thead,
            list, 
            logo, 
            btnAdd,
            btnDel,
            formOverlay, 
            form,
        } = phoneBook;

        const allRow = renderContacts(list, data);
        hoverRow(allRow, logo);

        btnAdd.addEventListener('click', () => {
            formOverlay.classList.add('is-visible');
        });
        btnDel.addEventListener('click', () => {
            document.querySelectorAll('.delete').forEach(del => {
                del.classList.toggle('is-visible');
            })
        })

        formOverlay.addEventListener('click', (e) => {
            const target = e.target;
            if(target === formOverlay || target.classList.contains('close')){
                formOverlay.classList.remove('is-visible');
            }           
        });

        list.addEventListener('click', (e) => {
            if(e.target.closest('.del-icon')){
                e.target.closest('.contact').remove();
            }
        });
        thead.addEventListener('click', (e) => {
            const sortBy = e.target.getAttribute('value').trim('');
            const sortedData = data.sort((a, b) => {
                console.log(sortBy.trim(''));
                const itemA = a[sortBy].toLowerCase();
                const itemB = b[sortBy].toLowerCase();
            
                if (itemA < itemB) {
                    return -1;
                }
                if (itemA > itemB) {
                    return 1;
                }
                    return 0;
            });
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
            const allRow2 = renderContacts(list, sortedData);

            hoverRow(allRow2, logo);


        });




    };

    window.phoneBookInit = init;
}
