using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SmarterLands_Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SensorController : ControllerBase
    {
        // GET: api/<SensorController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<SensorController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<SensorController>
        [HttpPost]
        public ActionResult PostCrop([FromForm] SensorReadingPostModel p)
        {

            MessageResponse mr = new MessageResponse();


            if (!string.IsNullOrEmpty(p.time.ToString()) &&
               !string.IsNullOrEmpty(p.temperature.ToString()) &&
               !string.IsNullOrEmpty(p.humidity.ToString()) &&
               !string.IsNullOrEmpty(p.moisture.ToString()) &&
               !string.IsNullOrEmpty(p.precipitation.ToString()) &&
               !string.IsNullOrEmpty(p.bin_id.ToString()) &&
               !string.IsNullOrEmpty(p.notification_message) &&
               !string.IsNullOrEmpty(p.notification_type.ToString()))

            {
                mr.Status = SensorReading.Post(p.time, p.temperature, p.humidity, p.moisture, p.precipitation, p.bin_id, p.notification_message, p.notification_type);
            }
            else
            {
                mr.Status = 255;
            }
            mr.Message = Enum.GetName(typeof(SensorReadingMessagesEnum), mr.Status);
            return Ok(mr);

        }

        // PUT api/<SensorController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SensorController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
