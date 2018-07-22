using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ARDroneBlockProgramming.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace ARDroneBlockProgramming.Web.Controllers
{
    [Route("/api/Drone")]
    public class DroneController : Controller
    {
        [HttpPost]
        public IActionResult Index([FromBody]DroneActionViewModel[] droneActionViewModel)
        {
            return Ok(droneActionViewModel);
        }
    }
}