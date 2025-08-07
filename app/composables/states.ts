export const useThemeBackground = () => useState<string>('themeBackground', () => 'dark')

export const useUser = () => useState<string>('userrole', () => 'Admin')

export const rules = {
    required: (value: string) => !!value || 'Required.',
    username: (value: string) => {
        const pattern = /^[a-z_]{3,15}$/;
        return pattern.test(value) || 'Username must be 3-15 characters long and only contain lowercaseletters or underscores.';
    },
    email: (value: string) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Invalid e-mail.';
    },
    password: (value: string) => {
        const pattern = /^[A-Za-z\d@$!%*?&#]{8,}$/;
        return pattern.test(value) || 
        'Password must be at least 8 characters with atleast an uppercase & a lowercase letter, a number & a special character.';
    }
};

export const successMessage = ref('');
export const errorMessage = ref('');

export const setSuccessMessage = (message: string) => {
    successMessage.value = message;
    setTimeout(() => {
        successMessage.value = '';
    }, 1000);
}

export const setErrorMessage = (message: string) => {
    errorMessage.value = message;
    setTimeout(() => {
        errorMessage.value = '';
    }, 1000);
}

export const useAuth = () => {
    const isLoggedIn = useState('isLoggedIn', () => false);
    const token = useState('token', () => '');
    const role = useState('role', () => '');
    return { isLoggedIn, token, role };
};