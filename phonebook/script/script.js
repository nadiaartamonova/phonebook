import render from './modules/render.js'
import { getStorage } from './modules/serviceStorage.js';
import * as control from './modules/control.js'

{
    const init = (selectorApp, title) => {
        const data = getStorage('contactList');
        const sortBy = getStorage('sortBy');
        const app = document.querySelector(selectorApp);

        const {
            thead,
            list, 
            logo, 
            btnAdd,
            btnDel,
            formOverlay, 
            form,
        } = render.renderPhoneBook(app, title);

        const allRow = render.renderContacts(list, data);
        const {closeModal} = control.modalControl(btnAdd, formOverlay);
        
        control.hoverRow(allRow, logo);
        control.deleteControl(btnDel, list, thead, logo);
        control.formControl(form, list, closeModal);
        control.sortContacts(sortBy[0],list, logo);

    };

    window.phoneBookInit = init;
}
