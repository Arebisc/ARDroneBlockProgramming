using ARDroneBlockProgramming.Web.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARDroneBlockProgramming.Web.ViewModels
{
    public class DroneActionViewModel
    {
        public string ActionLabel { get; set; }
        public ActionType ActionType { get; set; }
        public double Speed { get; set; }
        public int Duration { get; set; }
        public string[] Tags { get; set; }
    }
}
