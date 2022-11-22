using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SmarterLands_Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            NotificationViewModel vm = new NotificationViewModel();
            vm.Notifications = Notification.Get(id);
            vm.Status = 0;
            if (!vm.Notifications.Any())
            {
                MessageResponse mr = new MessageResponse();
                mr.Status = 1;
                mr.Message = "NoNotificationsFoundError";
                return Ok(mr);
            }

            return Ok(vm);
        }
    }
}
