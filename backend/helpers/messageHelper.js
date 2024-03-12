 const globalMessage = {
    errorMessage: 'Something went wrong, Please try again later',
    recordsFound: 'Records found',
    recordsNotFound: 'Records not found',
    invalidToken: 'Invalid Token, please enter valid token',
    userIdRequired: 'UserId is required',
    noToken: 'No token provided, Please provide token',
}
 const alertMessage = {
    users: {
        createSuccess: 'User saved successfully',
        createError: 'Error while creating user, Please try again later',
        updateSuccess: 'User updated successfully',
        updateError: 'Error while updating user, Please try again later',
        deleteSucces: 'User deleted successfully',
        deleteError: 'Error while deleting user, please try again later',
        listSuccess: 'User record(s) found successfully',
        listError: 'User record(s) not found, please try again later',
        internalError: 'Internal error',
        loginSuccess: 'Login successfully',
        loginError: 'Email / mobile number or password is incorrect, please try again',
        logoutSuccess: 'Logout successfully',
        logoutError: 'Error while logout, please try again',
        invalidPassword: 'Sorry, your password is incorrect, please try again',
        noUserDataFound: 'User not found',
        passwordChangeSuccess: 'Password changed successfully',
        userAlreadyExistsEmail: "User already exist with given email",
        inActiveAccount: "Your account is deactivated by admin",
        blockUser: "This user is block, Please contact to admin",
    }, 
    products:{
        createSuccess: 'Product saved successfully',
        createError: 'Error while creating product, Please try again later',
        updateSuccess: 'Product updated successfully',
        updateError: 'Error while updating product, Please try again later',
        deleteSucces: 'Product deleted successfully',
        deleteError: 'Error while deleting product, please try again later',
        listSuccess: 'Product record(s) found successfully',
        listError: 'Product record(s) not found, please try again later',
        noProducts: 'No product data available.',
        idRequired:'Product Id is required.'
    },
    categoty:{
        createSuccess: 'Category saved successfully',
        createError: 'Error while creating category, Please try again later',
        updateSuccess: 'Category updated successfully',
        updateError: 'Error while updating category, Please try again later',
        deleteSucces: 'Category deleted successfully',
        deleteError: 'Error while deleting category, please try again later',
        listSuccess: 'Category record(s) found successfully',
        listError: 'Category record(s) not found, please try again later',
        noCategories: 'No Category data available.'
    }
};

module.exports = {globalMessage, alertMessage};