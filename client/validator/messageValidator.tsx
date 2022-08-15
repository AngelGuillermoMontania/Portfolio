import { Message } from "../interfaces";

export function validate(input: Message) {
    let errors = {
        title: "",
        company: "",
        body: "",
        email: "",
        create: "",
        id: ""
    };
    if (!input.title) {
        Object.defineProperty(errors, 'title', {value: 'Title is required'})
    } else if (!/^[a-zA-Z\sñáéíóúüª!:?'¡].{3,100}$/.test(input.title)) {
        Object.defineProperty(errors, 'title', {value: 'Name is invalid (A-z, min 3)'})
    };
    if (!input.company) {
        Object.defineProperty(errors, 'company', {value: 'Company is required'})
    } else if (!/^[a-zA-Z\sñáéíóúüª!:?'¡].{3,100}$/.test(input.company)) {
        Object.defineProperty(errors, 'company', {value: 'Company is invalid (A-z, min 3)'})
    };
    if (!input.email) {
        Object.defineProperty(errors, 'email', {value: 'Email is required'})
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input.email)) {
        Object.defineProperty(errors, 'email', {value: 'Email is invalid (A-z, min 3)'})
    };
    if (!input.body) {
        Object.defineProperty(errors, 'body', {value: 'Message is required'})
    } else if (!/^[a-zA-Z\sñáéíóúü:=%&$·"!¿/[ª!?'¡].{10,1000}$/.test(input.body)) {
        Object.defineProperty(errors, 'body', {value: 'Message is invalid (min 10)'})
    };
    /* if (!input.cost) {
        errors.cost = 'Cost is required'
    } else if (!/^[0-9].{1,9}$/.test(input.cost)) {
        errors.cost = 'Cost is invalid (10-9999999999)'
    };
    if (!input.m2) {
        errors.m2 = 'Square meters is required'
    } else if (!/^[0-9].{1,5}$/.test(input.m2)) {
        errors.m2 = 'Square meters is invalid (10-999999)'
    };
    if (!input.country) {
        errors.country = 'Country is required'
    } else if (!/^[a-zA-Z\sñáéíóúüª!:?'¡].{5,100}$/.test(input.country)) {
        errors.country = 'Country is invalid'
    };
    if (!input.state) {
        errors.state = 'The state/province is required'
    } else if (!/^[a-zA-Z0-9-\sñáéíóúüª!:?'¡].{2,100}$/.test(input.state)) {
        errors.state = 'The state/province is invalid'
    };
    if (!input.address) {
        errors.address = 'Adress is required'
    } else if (!/^[a-zA-Z\sñáéíóúü:=%&$·"!¿/[ª!?'¡].{5,200}$/.test(input.address)) {
        errors.address = 'Adress is invalid'
    };
    if (!input.city) {
        errors.city = 'City is required'
    } else if (!/^[a-zA-Z\sñáéíóúü:=%&$·"!¿/[ª!?'¡].{2,200}$/.test(input.city)) {
        errors.city = 'City is invalid'
    };
    if (!input.cp) {
        errors.cp = 'Postal code is required'
    } else if (!/^[0-9].{1,5}$/.test(input.cp)) {
        errors.cp = 'Postal code is invalid (0-999999)'
    };
    if (!input.propertyType) {
        errors.propertyType = 'Property Type is required'
    } else if (!/^[a-zA-Z\sñáéíóúü:=%&$·"!¿/[ª!?'¡].{2,200}$/.test(input.propertyType)) {
        errors.propertyType = 'Property Type is invalid'
    };
    if(input.features.length === 0) {
      errors.features = 'Minimun 1 feature is required'
    }
    if(!input.img && !input.photos) {
        errors.img = 'Minimun 1 image';
    } */
    return errors
}