import render from './render.js'
import { createRow }  from './createElements.js';
import { addContactData, getStorage, setStorage, removeStorage }  from './serviceStorage.js';

export const addContactPage = (contact, list) => {
    list.append(createRow(contact));
};

export const hoverRow = (allRow, logo) => {
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

export const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const newContact = Object.fromEntries(formData);
        addContactData(newContact);
        addContactPage(newContact, list);

        form.reset();
        closeModal();
    })
}

export const modalControl  = (btnAdd, formOverlay) => {

    const openModal = () => {
        formOverlay.classList.add('is-visible');
    };

    const closeModal = () => {
        formOverlay.classList.remove('is-visible');
    }

    btnAdd.addEventListener('click', openModal);

    formOverlay.addEventListener('click', (e) => {
        const target = e.target;
        if(target === formOverlay || target.classList.contains('close')){
            closeModal();
        }           
    });

    return {
        closeModal,
    }
};

export const deleteControl = (btnDel, list, thead, logo) => {

    btnDel.addEventListener('click', () => {
        document.querySelectorAll('.delete').forEach(del => {
            del.classList.toggle('is-visible');
        })
    });

    thead.addEventListener('click', (e) => {
        const sortBy = e.target.getAttribute('value').trim('');
        setStorage('sortBy', sortBy);
        sortContacts(sortBy, list, logo);
    });

    list.addEventListener('click', (e) => {
        if(e.target.closest('.del-icon')){
            const contact = e.target.closest('.contact');
            const number = contact.querySelector('.phone__number').textContent;
            removeStorage(number);
            e.target.closest('.contact').remove();
        } 
    });
}

export const sortContacts = (sortBy = 'name', list, logo) => {
    const data = getStorage('contactList');
    const sortedData = data.sort((a, b) => {
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
    const allRow = render.renderContacts(list, sortedData);

    hoverRow(allRow, logo);
}