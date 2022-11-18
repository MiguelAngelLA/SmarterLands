using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SmarterLands_Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        // GET: api/<PhotosController>
        [HttpGet]
        public ActionResult<string> GetAll()
        {
            PhotoResponse pr = new PhotoResponse();

            pr.Photos = PhotoMapper.GetAllPhotos();
            pr.Status = 0;
            return Ok(pr);
        }
    }
}
