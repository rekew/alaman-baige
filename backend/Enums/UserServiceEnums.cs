namespace Backend.Enums;

public enum UpdateUserResult
{
    Success,
    NotFound,
    PhoneNumberAlreadyUsed
}

public enum PatchUserResult
{
    Success,
    NotFound,
    NoFieldsToUpdate,
    PhoneNumberAlreadyUsed
}

public enum DeleteUserResult
{
    Success,
    NotFound
}
