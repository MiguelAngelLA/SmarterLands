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
        public ActionResult<string> Get()
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
        public ActionResult LoginAgent([FromForm] CropPostModel p)
        {

            MessageResponse vm = new MessageResponse();


            if (!string.IsNullOrEmpty(p.name) &&
               !string.IsNullOrEmpty(p.description) && 
               !string.IsNullOrEmpty(p.optimal_moisture.ToString())) 
                
            {
                vm.Status = Crop.Post(p.name, p.description, p.photo, p.optimal_moisture, p.optimal_temperature);
            }
            else
            {
                vm.Status = 999;
            }
            vm.Message = Enum.GetName(typeof(CropMessages), vm.Status);
            return Ok(vm);

        }

        // PUT api/<CropsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CropsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
