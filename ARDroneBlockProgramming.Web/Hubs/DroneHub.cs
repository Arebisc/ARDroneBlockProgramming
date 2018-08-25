using ARDroneBlockProgramming.Web.ViewModels;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARDroneBlockProgramming.Web.Hubs
{
    public class DroneHub : Hub
    {
        public async Task SendActionsToDrone(DroneActionViewModel[] actionsToPerform)
        {
            await Clients.All.SendAsync("PerformActions", actionsToPerform);
        }
    }
}
