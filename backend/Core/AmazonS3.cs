using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.Extensions.Configuration;

namespace Backend.Core;

public class AmazonS3
{
    private readonly IAmazonS3 _amazonS3;
    private readonly string _publicUrl;

    public AmazonS3(IAmazonS3 amazonS3, IConfiguration configuration)
    {
        _amazonS3 = amazonS3;
        _publicUrl = configuration["CloudflareR2:PublicUrl"] ?? string.Empty;
    }

    public async Task UploadFileAsync(Stream stream, string fileName)
    {
        var request = new PutObjectRequest
        {
            BucketName = "alaman-baige",
            Key = fileName,
            InputStream = stream,
            DisablePayloadSigning = true
        };

        await _amazonS3.PutObjectAsync(request);
    }

    public string GetPublicUrl(string fileName)
    {
        if (string.IsNullOrWhiteSpace(fileName))
        {
            return string.Empty;
        }

        return $"{_publicUrl.TrimEnd('/')}/{fileName}";
    }
}