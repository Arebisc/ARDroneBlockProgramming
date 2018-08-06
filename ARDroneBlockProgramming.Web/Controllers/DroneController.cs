using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using ARDroneBlockProgramming.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ARDroneBlockProgramming.Web.Controllers
{
    [Route("/api/Drone")]
    public class DroneController : Controller
    {
        private const string _droneEndpoint = "http://localhost:3000";

        [HttpPost]
        public async Task<IActionResult> Index([FromBody]DroneActionViewModel[] droneActionViewModel)
        {
            using (var client = new HttpClient())
            {
                var response = await client.PostAsync(
                    _droneEndpoint,
                     new StringContent(JsonConvert.SerializeObject(droneActionViewModel), Encoding.UTF8, "application/json"));
            }

            return Ok(droneActionViewModel);
        }
    }
}