using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARDroneBlockProgramming.Web.DroneNavdataHelpers
{
    public class Camera
    {
        public Rotation2 Rotation { get; set; }
        public Translation Translation { get; set; }
        public double Type { get; set; }
    }
}
