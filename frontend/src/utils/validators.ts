export const Validators = {
    name: (v: string) => /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)?$/.test(v.trim()),
    email: (v: string) => /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(v.trim()),
    password: (v: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/.test(v.trim()),
};