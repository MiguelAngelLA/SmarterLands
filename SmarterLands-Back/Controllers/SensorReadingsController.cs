using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SmarterLands_Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SensorReadingsController : ControllerBase
    {
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            SensorReadingViewModel vm = new SensorReadingViewModel();
            vm.SensorReadings = SensorReading.Get(id);
            vm.Status = 0;
            if (!vm.SensorReadings.Any())
            {
                MessageResponse mr = new MessageResponse();
                mr.Status = 1;
                mr.Message = "NoSensorReadingsFoundError";
                return Ok(mr);
            }

            return Ok(vm);
        }

        [HttpGet("Limit/{id}")]
        public ActionResult<string> GetLimit(int id)
        {
            SensorReadingViewModel vm = new SensorReadingViewModel();
            vm.SensorReadings = SensorReading.GetLimit(id);
            vm.Status = 0;
            if (!vm.SensorReadings.Any())
            {
                MessageResponse mr = new MessageResponse();
                mr.Status = 1;
                mr.Message = "NoSensorReadingsFoundError";
                return Ok(mr);
            }

            return Ok(vm);
        }
    }
}
