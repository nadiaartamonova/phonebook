import {
    createHeader,
    createFooter,
    createLogo,
    createMain,
    createButtonsGroup,
    createTable,
    createForm,
    createRow
    } from './createElements.js';

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
    const { form, overlay } = createForm();

    const footer = createFooter(title);

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay, footer);
    app.append(header, main);

    return {
        thead: table.thead,
        list: table.tbody,
        logo,
        btnAdd: buttonGroup.btns[0],
        btnDel: buttonGroup.btns[1],
        formOverlay: overlay,
        form,
    }
};

const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);

    return allRow;
};

export default {

    renderPhoneBook,
    renderContacts
}