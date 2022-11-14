using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SmarterLands_Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BinController : ControllerBase
    {
        // GET: api/<BinController>
        [HttpGet]
        public ActionResult<string> GetAll()
        {
            BinViewModel vm = new BinViewModel();
            vm.Status = 0;
            vm.Bins = Bin.GetAll();
            return Ok(vm);
        }

        // GET api/<BinController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<BinController>
        [HttpPost]
        public ActionResult PostBin([FromForm] BinPostModel p)
        {

            MessageResponse vm = new MessageResponse();


            if (!string.IsNullOrEmpty(p.name) &&
               !string.IsNullOrEmpty(p.description) &&
               !string.IsNullOrEmpty(p.width_dimension.ToString()) &&
               !string.IsNullOrEmpty(p.height_dimension.ToString()))

            {
                vm.Status = Bin.Post(p.name, p.description, p.width_dimension, p.height_dimension);
            }
            else
            {
                vm.Status = 255;
            }
            vm.Message = Enum.GetName(typeof(BinMessagesEnum), vm.Status);
            return Ok(vm);

        }

        // PUT api/<BinController>
        [HttpPut]
        public ActionResult PutBin([FromForm] BinPostModel p)
        {

            MessageResponse vm = new MessageResponse();


            if (!string.IsNullOrEmpty(p.id.ToString()) &&
               !string.IsNullOrEmpty(p.name) &&
               !string.IsNullOrEmpty(p.description) &&
               !string.IsNullOrEmpty(p.width_dimension.ToString()) &&
               !string.IsNullOrEmpty(p.height_dimension.ToString()))

            {
                vm.Status = Bin.Put(p.id, p.name, p.description, p.width_dimension, p.height_dimension);
            }
            else
            {
                vm.Status = 255;
            }
            vm.Message = Enum.GetName(typeof(BinMessagesEnum), vm.Status);
            return Ok(vm);

        }

        // DELETE api/<BinController>/5
        [HttpDelete("{id}")]
        public ActionResult DeleteBin(int id)
        {
            MessageResponse vm = new MessageResponse();

            if (!string.IsNullOrEmpty(id.ToString()))

            {
                vm.Status = Bin.Del(id);
            }
            else
            {
                vm.Status = 255;
            }
            vm.Message = Enum.GetName(typeof(BinMessagesEnum), vm.Status);
            return Ok(vm);
        }

        // POST api/<BinController>/AddCrop
        [HttpPost("AddCrop")]
        public ActionResult PostAddCrop([FromForm] BinCropPostModel p)
        {

            MessageResponse vm = new MessageResponse();


            if (!string.IsNullOrEmpty(p.bin_id.ToString()) &&
                !string.IsNullOrEmpty(p.crop_id.ToString()) &&
                !string.IsNullOrEmpty(p.quantity.ToString()))

            {
                vm.Status = Bin.AddCrop(p.bin_id, p.crop_id, p.quantity);
            }
            else
            {
                vm.Status = 255;
            }
            vm.Message = Enum.GetName(typeof(BinMessagesEnum), vm.Status);
            return Ok(vm);
        }

        // POST api/<BinController>/RemoveCrop
        [HttpPost("RemoveCrop")]
        public ActionResult PostRemoveCrop([FromForm] BinCropPostModel p)
        {

            MessageResponse vm = new MessageResponse();


            if (!string.IsNullOrEmpty(p.bin_id.ToString()) &&
                !string.IsNullOrEmpty(p.crop_id.ToString()) &&
                !string.IsNullOrEmpty(p.quantity.ToString()))

            {
                vm.Status = Bin.RemoveCrop(p.bin_id, p.crop_id, p.quantity);
            }
            else
            {
                vm.Status = 255;
            }
            vm.Message = Enum.GetName(typeof(BinMessagesEnum), vm.Status);
            return Ok(vm);
        }
    }
}
