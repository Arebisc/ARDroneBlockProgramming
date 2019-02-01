using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARDroneBlockProgramming.Web.DroneNavdataHelpers
{
    public class DroneState
    {
        public double Flying { get; set; }
        public double VideoEnabled { get; set; }
        public double VisionEnabled { get; set; }
        public double ControlAlgorithm { get; set; }
        public double AltitudeControlAlgorithm { get; set; }
        public double StartButtonState { get; set; }
        public double ControlCommandAck { get; set; }
        public double CameraReady { get; set; }
        public double TravellingEnabled { get; set; }
        public double UsbReady { get; set; }
        public double NavdataDemo { get; set; }
        public double NavdataBootstrap { get; set; }
        public double MotorProblem { get; set; }
        public double CommunicationLost { get; set; }
        public double SoftwareFault { get; set; }
        public double LowBattery { get; set; }
        public double UserEmergencyLanding { get; set; }
        public double TimerElapsed { get; set; }
        public double MagnometerNeedsCalibration { get; set; }
        public double AnglesOutOfRange { get; set; }
        public double TooMuchWind { get; set; }
        public double UltrasonicSensorDeaf { get; set; }
        public double CutoutDetected { get; set; }
        public double PicVersionNumberOk { get; set; }
        public double AtCodecThreadOn { get; set; }
        public double NavdataThreadOn { get; set; }
        public double VideoThreadOn { get; set; }
        public double AcquisitionThreadOn { get; set; }
        public double ControlWatchdogDelay { get; set; }
        public double AdcWatchdogDelay { get; set; }
        public double ComWatchdogProblem { get; set; }
        public double EmergencyLanding { get; set; }
    }
}
