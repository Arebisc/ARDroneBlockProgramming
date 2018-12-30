using ARDroneBlockProgramming.Web.DroneNavdataHelpers;
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

        public async Task DroneFinishedPerformingActions()
        {
            await Clients.All.SendAsync("SendDroneFinishedActionsToClient");
        }

        public async Task TagsRecognizedByDrone(string[] tags)
        {
            await Clients.All.SendAsync("DroneRecognizedTagsToClient", tags);
        }

        public async Task DroneRecognizedObjectFromAction(string recognizedObject)
        {
            await Clients.All.SendAsync("AlertRecognizedObject", recognizedObject);
        }

        public async Task DroneFinishedOneAction()
        {
            await Clients.All.SendAsync("DroneFinishedAction");
        }

        public async Task NavdataFromDrone(DroneNavdata droneNavdata)
        {
            await Clients.All.SendAsync("DroneSendsNavdata", droneNavdata);
        }
    }
}
