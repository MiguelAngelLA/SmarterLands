using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

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
            MessageResponse mr = new MessageResponse();

            vm.Bins = Bin.GetAll();
            return Ok(vm);
        }

        // GET api/<BinController>/5
        [HttpGet("{id}")]
        public ActionResult<string> GetOne(int id)
        {
            SingleBinViewModel vm = new SingleBinViewModel();
            vm.Bin = Bin.GetOne(id);
            vm.Status = 0;
            if (vm.Bin.Id == 0)
            {
                MessageResponse mr = new MessageResponse();
                mr.Status = 1;
                mr.Message = "BinNotFoundError";
                return Ok(mr);
            }

            return Ok(vm);
        }

        // GET api/<BinController>/5
        [HttpGet("Crops/{id}")]
        public ActionResult<string> Get(int id)
        {
            BinWithCropViewModel vm = new BinWithCropViewModel();
            vm.Bins = BinWithCrop.Get(id);
            vm.Status = 0;
            if (!vm.Bins.Any()) { 
                MessageResponse mr = new MessageResponse();
                mr.Status = 1;
                mr.Message = "BinNotFoundError/BinDoesNotContainCropsError";
                return Ok(mr);
            }

            return Ok(vm);
        }

        // POST api/<BinController>
        [HttpPost]
        public ActionResult PostBin([FromForm] BinPostModel p)
        {

            MessageResponse mr = new MessageResponse();


            if (!string.IsNullOrEmpty(p.name) &&
               !string.IsNullOrEmpty(p.description) &&
               !string.IsNullOrEmpty(p.width_dimension.ToString()) &&
               !string.IsNullOrEmpty(p.height_dimension.ToString()))

            {
                mr.Status = Bin.Post(p.name, p.description, p.width_dimension, p.height_dimension);
            }
            else
            {
                mr.Status = 255;
            }
            mr.Message = Enum.GetName(typeof(BinMessagesEnum), mr.Status);
            return Ok(mr);

        }

        // PUT api/<BinController>
        [HttpPut]
        public ActionResult PutBin([FromForm] BinPostModel p)
        {

            MessageResponse mr = new MessageResponse();


            if (!string.IsNullOrEmpty(p.id.ToString()) &&
               !string.IsNullOrEmpty(p.name) &&
               !string.IsNullOrEmpty(p.description) &&
               !string.IsNullOrEmpty(p.width_dimension.ToString()) &&
               !string.IsNullOrEmpty(p.height_dimension.ToString()))

            {
                mr.Status = Bin.Put(p.id, p.name, p.description, p.width_dimension, p.height_dimension);
            }
            else
            {
                mr.Status = 255;
            }
            mr.Message = Enum.GetName(typeof(BinMessagesEnum), mr.Status);
            return Ok(mr);

        }

        // DELETE api/<BinController>/5
        [HttpDelete("{id}")]
        public ActionResult DeleteBin(int id)
        {
            MessageResponse mr = new MessageResponse();

            if (!string.IsNullOrEmpty(id.ToString()))

            {
                mr.Status = Bin.Del(id);
            }
            else
            {
                mr.Status = 255;
            }
            mr.Message = Enum.GetName(typeof(BinMessagesEnum), mr.Status);
            return Ok(mr);
        }

        // POST api/<BinController>/AddCrop
        [HttpPost("AddCrop")]
        public ActionResult PostAddCrop([FromForm] BinCropPostModel p)
        {

            MessageResponse mr = new MessageResponse();


            if (!string.IsNullOrEmpty(p.bin_id.ToString()) &&
                !string.IsNullOrEmpty(p.crop_id.ToString()) &&
                !string.IsNullOrEmpty(p.quantity.ToString()))

            {
                mr.Status = Bin.AddCrop(p.bin_id, p.crop_id, p.quantity);
            }
            else
            {
                mr.Status = 255;
            }
            mr.Message = Enum.GetName(typeof(BinMessagesEnum), mr.Status);
            return Ok(mr);
        }

        // POST api/<BinController>/RemoveCrop
        [HttpPost("RemoveCrop")]
        public ActionResult PostRemoveCrop([FromForm] BinCropPostModel p)
        {

            MessageResponse mr = new MessageResponse();


            if (!string.IsNullOrEmpty(p.bin_id.ToString()) &&
                !string.IsNullOrEmpty(p.crop_id.ToString()) &&
                !string.IsNullOrEmpty(p.quantity.ToString()))

            {
                mr.Status = Bin.RemoveCrop(p.bin_id, p.crop_id, p.quantity);
            }
            else
            {
                mr.Status = 255;
            }
            mr.Message = Enum.GetName(typeof(BinMessagesEnum), mr.Status);
            return Ok(mr);
        }
    }
}
