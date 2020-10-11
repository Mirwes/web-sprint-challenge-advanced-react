// write your custom hook here to control your checkout form
import { useState } from 'react';

const useForm = initialValue => {
    const [formState, setFormState] = useState(initialValue);

    const handleChanges = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };
    return [formState, handleChanges];
}

export default useForm;