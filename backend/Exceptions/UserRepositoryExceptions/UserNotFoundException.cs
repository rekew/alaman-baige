namespace Backend.Exceptions.UserRepositoryExceptions;

public class UserNotFoundException : Exception
{
    public UserNotFoundException()
        : base("User not found.")
    {
    }
}
