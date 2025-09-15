using Application.Dtos;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IFileServise
    {
        Task<PhotoUploadResult> CreateImage(IFormFile form);
        Task<bool> DeletePhoto(string PublicId);

    }
}
