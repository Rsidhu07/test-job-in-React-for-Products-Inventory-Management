const isFormValid = (updatedFormData) => {
    let formIsValid = true;
        for(let inputIdentifier in updatedFormData) {
            formIsValid = updatedFormData[inputIdentifier].valid && formIsValid;
        }
    return formIsValid;
};

export default isFormValid;

