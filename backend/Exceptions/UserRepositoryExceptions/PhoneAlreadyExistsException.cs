namespace Backend.Exceptions.UserRepositoryExceptions;

public class PhoneAlreadyExistsException : Exception
{
    public PhoneAlreadyExistsException()
        : base("Phone number already exists.")
    {
    }
}
