using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SmarterLands_Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CropsController : ControllerBase
    {
        // GET: api/<CropsController>
        [HttpGet]
        public ActionResult<string> GetAll()
        {
            CropViewModel vm = new CropViewModel();
            vm.Status = 0;
            vm.Crops = Crop.GetAll();
            return Ok(vm);
        }

        // GET api/<CropsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CropsController>
        [HttpPost]
        public ActionResult PostCrop([FromForm] CropPostModel p)
        {

            MessageResponse mr = new MessageResponse();


            if (!string.IsNullOrEmpty(p.name) &&
               !string.IsNullOrEmpty(p.description) && 
               !string.IsNullOrEmpty(p.optimal_moisture.ToString())) 
                
            {
                if (!string.IsNullOrEmpty(p.photo)){ 
                    p.photo = Utils.transformPhoto(p.photo);
                }
                mr.Status = Crop.Post(p.name, p.description, p.photo, p.optimal_moisture, p.optimal_temperature);
            }
            else
            {
                mr.Status = 255;
            }
            mr.Message = Enum.GetName(typeof(CropMessagesEnum), mr.Status);
            return Ok(mr);

        }

        // PUT api/<CropsController>
        [HttpPut]
        public ActionResult PutCrop([FromForm] CropPostModel p)
        {

            MessageResponse mr = new MessageResponse();


            if (!string.IsNullOrEmpty(p.id.ToString()) &&
               !string.IsNullOrEmpty(p.name) &&
               !string.IsNullOrEmpty(p.description) &&
               !string.IsNullOrEmpty(p.optimal_moisture.ToString()))

            {
                mr.Status = Crop.Put(p.id, p.name, p.description, p.photo, p.optimal_moisture, p.optimal_temperature);
            }
            else
            {
                mr.Status = 255;
            }
            mr.Message = Enum.GetName(typeof(CropMessagesEnum), mr.Status);
            return Ok(mr);

        }

        // DELETE api/<CropsController>/5
        [HttpDelete("{id}")]
        public ActionResult DeleteCrop(int id)
        {
            MessageResponse mr = new MessageResponse();

            if (!string.IsNullOrEmpty(id.ToString()))

            {
                mr.Status = Crop.Del(id);
            }
            else
            {
                mr.Status = 255;
            }
            mr.Message = Enum.GetName(typeof(CropMessagesEnum), mr.Status);
            return Ok(mr);
        }
    }
}
