using Application.Dtos;
using Application.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastracture.PhotoServise
{
    public class PhotoServise(Cloudinary cloudinary): IFileServise
    {

        public async Task<PhotoUploadResult> CreateImage(IFormFile form)
        {
            ImageUploadResult result;
            using (var stream = form.OpenReadStream())
            {

                var img = new ImageUploadParams
                {
                    Folder = "Test",
                    File = new FileDescription(form.Name, stream)
                };

                result = await cloudinary.UploadAsync(img);
            }

            return new PhotoUploadResult
            {
                PublicId = result.PublicId,
                URL = result.Url.ToString()
            };
        }

        public async Task<bool> DeletePhoto(string PublicId)
        {
            var paran = new DeletionParams(PublicId);
            var res = await cloudinary.DestroyAsync(paran);

            return res.Error != null ? false : true;
        }
    }
}
