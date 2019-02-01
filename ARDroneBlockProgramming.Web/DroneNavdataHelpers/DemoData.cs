using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARDroneBlockProgramming.Web.DroneNavdataHelpers
{
    public class DemoData
    {
        public string ControlState { get; set; }
        public string FlyState { get; set; }
        public double BatteryPercentage { get; set; }
        public Rotation Rotation { get; set; }
        public double FrontBackDegrees { get; set; }
        public double LeftRightDegrees { get; set; }
        public double ClockwiseDegrees { get; set; }
        public double Altitude { get; set; }
        public double AltitudeMeters { get; set; }
        public Velocity Velocity { get; set; }
        public double XVelocity { get; set; }
        public double YVelocity { get; set; }
        public double ZVelocity { get; set; }
        public double FrameIndex { get; set; }
        public Detection Detection { get; set; }
        public Drone Drone { get; set; }
    }
}
