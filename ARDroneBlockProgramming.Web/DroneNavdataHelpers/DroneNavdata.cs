using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARDroneBlockProgramming.Web.DroneNavdataHelpers
{
    public class DroneNavdata
    {
        public double Header { get; set; }
        public DroneState DroneState { get; set; }
        public double SequenceNumber { get; set; }
        public double VisionFlag { get; set; }
        public DemoData Demo { get; set; }
    }
}
